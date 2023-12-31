import { createElement } from "./CreateElement";

export function createSearch(type: string) {
  const mainContainer = createElement("div", "mainContainer-highlighter");
  const searchBox = createElement("input", "searchInput-highlighter");
  const searchContainer = createElement("div", "searchContainer-highlighter");
  const resultContainer = createElement("div", "resultContainer-highlighter");

  const addBtn = createElement("div", "addBtn-highlighter");
  const disposer = createElement("div", "disposer-highlighter");

  // adding event listeners
  disposer.addEventListener("click", closeSearchBox);
  searchBox.addEventListener("keyup", (e) => {
    updateSearchResultsUI(e, type);
  });

  // search container holds the search box and the results
  searchContainer.append(searchBox, resultContainer);
  // main container contains search container, addbtn , disposer
  mainContainer.append(searchContainer, addBtn, disposer);
  // appending to the body
  document.body.appendChild(mainContainer);

  const appendedInput: HTMLInputElement = document.querySelector(
    ".searchInput-highlighter"
  );

  appendedInput.focus();
  appendedInput.autofocus = true;
}

export function closeSearchBox() {
  const existingSearch = document.querySelector(".mainContainer-highlighter");

  // if the popup is active then turn it off
  if (existingSearch) {
    document.body.removeChild(existingSearch);
  }
}

// first initial search result ui
export function createSearchResultsUI(type: string) {
  const resultContainer = document.querySelector(
    ".resultContainer-highlighter"
  );
  if (!resultContainer) return;

  // clearing out the previous result
  resultContainer.innerHTML = "";

  let activeState;

  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then((res) => {
    activeState = res.state;
  });
  switch (type) {
    case "colors":
      chrome.runtime.sendMessage({ msg: "getAllColors" }).then((res) => {
        if (res.colors.length === 0) return;

        res.colors.forEach((color) => {
          const result = createElement("div", "result-highlighter");
          if (color === activeState.activeColor) {
            result.classList.add("activeResult-highlighter");
            result.style.background = color;
          }
          result.innerText = color;
          resultContainer.appendChild(result);
          result.addEventListener("click", () => {
            chrome.runtime.sendMessage({
              msg: "changeActiveColor",
              color: color,
            });
            closeSearchBox();
          });
        });
      });
      break;

    case "topic":
      chrome.runtime.sendMessage({ msg: "getAllTopics" }).then((res) => {
        if (res.topics.length === 0) return;

        res.topics.forEach((topic) => {
          const result = createElement("div", "result-highlighter");
          if (topic === activeState.activeTopic) {
            result.classList.add("activeResult-highlighter");
            result.style.background = activeState.activeColor;
          }
          result.innerText = topic;
          resultContainer.appendChild(result);
          result.addEventListener("click", () => {
            chrome.runtime.sendMessage({
              msg: "changeActiveTopic",
              topic,
            });
            closeSearchBox();
          });
        });
      });

      break;

    // just for making the Ui and testing purpose
    case "highlightedData":
      const site = window.location.origin + window.location.pathname;
      browser.runtime
        .sendMessage({ msg: "getCurrentSitesHighlight", domain: site })
        .then(({ items }) => {
          if (items.length === 0) {
            resultContainer.append(highlightedDataMarkup("", "initial"));
            return;
          }
          items.forEach((item) => {
            resultContainer.append(highlightedDataMarkup(item, ""));
          });
        });
      break;
  }
}

function highlightedDataMarkup(item: any, mode: string, searchData?: string) {
  let result = createElement("div", "result-highlighter");

  if (mode === "initial") {
    result = createElement("div", "result-highlighter-initial");

    const image = createElement(
      "div",
      "highlightedData-initialImage-highlighter"
    );
    const msg = createElement("div", "highlightedData-initialMsg-highlighter");
    const title = createElement(
      "h1",
      "highlightedData-initialMsg-title-highlighter"
    );
    title.innerText = "Try searching something";
    const desc = createElement(
      "div",
      "highlightedData-initialMsg-desc-highlighter"
    );
    desc.innerText = "like: categories or anything like good extension.";
    msg.append(title, desc);
    result.append(image, msg);
    return result;
  }
  if (mode === "noSearch") {
    result = createElement("div", "result-highlighter-initial");

    const image = createElement("div", "highlightedData-noSearch-highlighter");
    const msg = createElement("div", "highlightedData-initialMsg-highlighter");
    const title = createElement(
      "h1",
      "highlightedData-initialMsg-title-highlighter"
    );
    title.innerText = "Sorry, Request failed!";
    const desc = createElement(
      "div",
      "highlightedData-initialMsg-desc-highlighter"
    );
    desc.innerText =
      "No Search Results for " +
      searchData +
      " found." +
      " Try searching something else or creating a highlight first.";
    msg.append(title, desc);
    result.append(image, msg);
    return result;
  }
  const topic = createElement("div", "highlightedData-topic-highlighter");
  const domain = createElement("div", "highlightedData-domain-highlighter");
  const liveLocate = createElement(
    "button",
    "highlightedData-liveLocate-highlighter"
  );
  liveLocate.addEventListener("click", () => {
    locateHighlightedData(item);
  });
  const liveLocateIcon = createElement(
    "div",
    "highlightedData-liveLocate-icon-highlighter"
  );
  const liveLocateTxt = createElement(
    "div",
    "highlightedData-liveLocate-Txt-highlighter"
  );
  const data = createElement("div", "highlightedData-data-highlighter");
  const selectedColor = createElement(
    "div",
    "highlightedData-selectedColor-highlighter"
  );
  const timeStamp = createElement(
    "div",
    "highlightedData-timeStamp-highlighter"
  );

  const upperContainer = createElement(
    "div",
    "highlightedData-upperContainer-highlighter"
  );
  const sideSection = createElement(
    "div",
    "highlightedData-sideSection-highlighter"
  );

  topic.innerText = item.topic;
  domain.innerText = item.domain;
  liveLocateTxt.innerText = "Live Locate";
  data.innerText = item.data;
  selectedColor.style.background = item.color;
  timeStamp.innerText = item.time;

  liveLocate.append(liveLocateTxt, liveLocateIcon);
  sideSection.append(selectedColor, liveLocate);
  upperContainer.append(topic, sideSection);

  result.append(upperContainer, domain, data, timeStamp);
  return result;
}

function locateHighlightedData(item) {
  window.open(item.domain, "_");

  // for firefox compatibility
  setTimeout(() => {
    browser.runtime.sendMessage({ msg: "getActiveTabId" }).then((res) => {
      const currentTabId = res.id;
      chrome.runtime.sendMessage({
        msg: "locateHighlightedData",
        data: item,
        currentTab: currentTabId,
      });
    });
  }, 2000);
}

// runs when there is a keyboard input
export function updateSearchResultsUI(e: KeyboardEvent, type: string) {
  const inputBox: HTMLInputElement = document.querySelector(
    ".searchInput-highlighter"
  );
  inputBox.focus();
  inputBox.autofocus = true;

  let searchTerm = inputBox.value;

  switch (e.key) {
    case "ArrowDown":
      changeActiveSelection(1, type);
      break;

    case "ArrowUp":
      changeActiveSelection(-1, type);
      break;

    case "Enter":
      if (type !== "colors" && type !== "topic") return;

      switch (type) {
        case "colors":
          const activeColor = document.querySelector(
            ".activeResult-highlighter"
          ).textContent;
          const newColor = document
            .querySelector(".activeResult-highlighter")
            .getAttribute("color");

          chrome.runtime.sendMessage({ msg: "getAllColors" }).then((res) => {
            if (res.colors.includes(activeColor)) {
              chrome.runtime.sendMessage({
                msg: "changeActiveColor",
                color: activeColor,
              });
            } else {
              chrome.runtime.sendMessage({
                msg: "addNewColor",
                color: newColor,
              });
            }
          });
          break;
        case "topic":
          const activeTopic = document.querySelector(
            ".activeResult-highlighter"
          ).textContent;
          const newTopic = document
            .querySelector(".activeResult-highlighter")
            .getAttribute("topic");
          chrome.runtime.sendMessage({ msg: "getAllTopics" }).then((res) => {
            if (res.topics.includes(activeTopic)) {
              chrome.runtime.sendMessage({
                msg: "changeActiveTopic",
                topic: activeTopic,
              });
            } else {
              chrome.runtime.sendMessage({
                msg: "addNewTopic",
                topic: newTopic,
              });
            }
          });

          break;
      }
      closeSearchBox();
      break;

    case "Escape":
      closeSearchBox();
      searchTerm = "";
      //   resetting the ui
      createSearchResultsUI(type);
      break;

    case "Backspace":
      searchTerm = inputBox.value;
      changeSearchResultUI(type, searchTerm);
      break;

    default:
      if (isPrintableKey(e.key, e)) {
        searchTerm = inputBox.value;
        changeSearchResultUI(type, searchTerm);
      }

      break;
  }
}

// checks whether the key is a special key or not
function isPrintableKey(key: string, e: KeyboardEvent) {
  return (
    key.length === 1 && key !== " " && !e.ctrlKey && !e.altKey && !e.metaKey
  );
}
// is called by the update search results ui
function changeSearchResultUI(type: string, searchTerm: string) {
  const resultContainer = document.querySelector(
    ".resultContainer-highlighter"
  );

  if (type === "highlightedData") {
    if (searchTerm.trim() === "") {
      resultContainer.innerHTML = "";
      resultContainer.append(highlightedDataMarkup("", "initial"));
      return;
    }
    chrome.runtime
      .sendMessage({ msg: "searchHighlightedData", searchTerm: searchTerm })
      .then((res) => {
        if (!resultContainer) return;
        resultContainer.innerHTML = "";
        const items = res.items;
        if (items.length === 0) {
          resultContainer.append(
            highlightedDataMarkup("", "noSearch", searchTerm)
          );
          return;
        }
        items.forEach((item) =>
          resultContainer.append(highlightedDataMarkup(item, ""))
        );
      });
    return;
  }

  searchTerm = searchTerm.trim();
  chrome.runtime
    .sendMessage({ msg: "getSearchResults", type, searchTerm })
    .then((res) => {
      const items = res.items;
      switch (type) {
        case "colors":
          if (!resultContainer) return;

          // clearing out the previous result
          resultContainer.innerHTML = "";
          if (items.length === 0) {
            const color = searchTerm;
            const result = createElement("div", "result-highlighter");
            result.classList.add("activeResult-highlighter");
            result.style.background = color;
            result.innerText = "Add " + color + " to your colors list";
            result.addEventListener("click", () => {
              chrome.runtime.sendMessage({
                msg: "addNewColor",
                color: color,
              });
              closeSearchBox();
            });
            result.setAttribute("color", color);
            resultContainer.appendChild(result);
            return;
          }
          items.forEach((item, index) => {
            const color = item.color;
            const result = createElement("div", "result-highlighter");
            result.addEventListener("click", () => {
              chrome.runtime.sendMessage({
                msg: "changeActiveColor",
                color: color,
              });
              closeSearchBox();
            });
            if (index === 0) {
              result.classList.add("activeResult-highlighter");
              result.style.background = color;
            }
            result.innerText = color;
            resultContainer.appendChild(result);
          });
          break;
        case "topic":
          chrome.runtime.sendMessage({ msg: "getGlobalState" }).then((res) => {
            let globalState = res.state;
            if (!resultContainer) return;
            // clearing out the previous result
            resultContainer.innerHTML = "";
            if (items.length === 0) {
              const topic = searchTerm;
              const result = createElement("div", "result-highlighter");
              result.classList.add("activeResult-highlighter");
              result.style.background = globalState.activeColor;
              result.innerText = "Add " + topic + " to your topics list";
              result.addEventListener("click", () => {
                chrome.runtime.sendMessage({
                  msg: "addNewTopic",
                  topic,
                });
                closeSearchBox();
              });

              result.setAttribute("topic", topic);
              resultContainer.appendChild(result);
              return;
            }
            // if there are topic
            items.forEach((item, index) => {
              const topic = item.topic;
              const result = createElement("div", "result-highlighter");
              result.addEventListener("click", () => {
                chrome.runtime.sendMessage({
                  msg: "changeActiveTopic",
                  topic,
                });
                closeSearchBox();
              });
              if (index === 0) {
                result.classList.add("activeResult-highlighter");
                result.style.background = globalState.activeColor;
              }
              result.innerText = topic;
              resultContainer.appendChild(result);
            });

            // returning if there is no any search term
            if (searchTerm.trim() === "") return;
            // appending a add topic regardless of the present topics
            const topic = searchTerm;
            const result = createElement("div", "result-highlighter");
            result.innerText = "Add " + topic + " to your topics list";
            result.addEventListener("click", () => {
              chrome.runtime.sendMessage({
                msg: "addNewTopic",
                topic,
              });
              closeSearchBox();
            });

            result.setAttribute("topic", topic);
            resultContainer.appendChild(result);
          });
          break;
      }
    });
}

// is also called by the update search results ui but it's special keyboard keys
function changeActiveSelection(number: number, type: string) {
  const results: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    ".result-highlighter"
  );
  const totalResults = results.length;

  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then((res) => {
    let globalState = res.state;

    let currentActiveIndex = 0;
    let newActiveIndex = 0;
    results.forEach((result, index) => {
      if (result.classList.contains("activeResult-highlighter")) {
        currentActiveIndex = index;
        result.style.background = "white";
        result.classList.remove("activeResult-highlighter");
      }
    });

    newActiveIndex = currentActiveIndex + number;

    if (newActiveIndex < 0) newActiveIndex = totalResults - 1;
    if (newActiveIndex === totalResults) newActiveIndex = 0;

    const newActiveElement = results[newActiveIndex];
    newActiveElement.classList.add("activeResult-highlighter");

    newActiveElement.style.background = globalState.activeColor;
    if (type === "colors") {
      newActiveElement.style.background = newActiveElement.innerText;
    }
  });
}
