import { colorDb } from "../../background/DataStore";
import { search } from "../../background/orama";
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
}

function closeSearchBox() {
  const existingSearch = document.querySelector(".mainContainer-highlighter");

  // if the popup is active then turn it off
  if (existingSearch) {
    //   document.removeEventListener(keybordControls, () =>
    //     console.log("removed event")
    //   );
    document.body.removeChild(existingSearch);
  }
}

export function createSearchResultsUI(type: string) {
  const resultContainer = document.querySelector(
    ".resultContainer-highlighter"
  );
  // clearing out the previous result
  resultContainer.innerHTML = "";

  let activeState;

  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then((res) => {
    activeState = res.state;
  });

  chrome.runtime.sendMessage({ msg: "getAllColors" }).then((res) => {
    // #todo no search result or no color or any error
    if (!res) return;

    res.colors.forEach((color) => {
      const result = createElement("div", "result-highlighter");
      if (color === activeState.activeColor) {
        result.classList.add("activeResult-highlighter");
        result.style.background = color;
      }
      result.innerText = color;
      resultContainer.appendChild(result);
    });
  });
}

export function updateSearchResultsUI(e: KeyboardEvent, type: string) {
  const inputBox: HTMLInputElement = document.querySelector(
    ".searchInput-highlighter"
  );

  let searchTerm = inputBox.value;

  switch (e.key) {
    case "ArrowDown":
      changeActiveSelection(1, type);
      break;

    case "ArrowUp":
      changeActiveSelection(-1, type);
      break;

    case "Enter":
      if (type !== "colors") return;
      const activeColor = document.querySelector(
        ".activeResult-highlighter"
      ).textContent;

      chrome.runtime.sendMessage({
        msg: "changeActiveColor",
        color: activeColor,
      });

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
function isPrintableKey(key: string, e: KeyboardEvent) {
  console.log({ key: key });
  console.log("is printable");
  return (
    key.length === 1 && key !== " " && !e.ctrlKey && !e.altKey && !e.metaKey
  );
}

function changeSearchResultUI(type: string, searchTerm: string) {
  const resultContainer = document.querySelector(
    ".resultContainer-highlighter"
  );

  chrome.runtime
    .sendMessage({ msg: "getSearchResults", type, searchTerm })
    .then((res) => {
      const items = res.items;
      // clearing out the previous result
      resultContainer.innerHTML = "";
      if (type === "colors") {
        if (items.length === 0) {
          const color = searchTerm;
          const result = createElement("div", "result-highlighter");
          result.classList.add("activeResult-highlighter");
          result.style.background = color;
          result.innerText = "Add " + color + " to your colors list";
          resultContainer.appendChild(result);
          return;
        }
        items.forEach((item, index) => {
          const color = item.color;
          const result = createElement("div", "result-highlighter");
          if (index === 0) {
            result.classList.add("activeResult-highlighter");
            result.style.background = color;
          }
          result.innerText = color;
          resultContainer.appendChild(result);
        });
      }
    });
}

function changeActiveSelection(number: number, type: string) {
  const results: NodeListOf<HTMLDivElement> = document.querySelectorAll(
    ".result-highlighter"
  );
  const totalResults = results.length;

  let currentActiveIndex = 0;
  let newActiveIndex = 0;
  results.forEach((result, index) => {
    result.classList.contains("activeResult-highlighter")
      ? (currentActiveIndex = index)
      : null;
  });

  newActiveIndex = currentActiveIndex + number;

  if (newActiveIndex < 0) newActiveIndex = totalResults - 1;
  if (newActiveIndex === totalResults) newActiveIndex = 0;

  results.forEach((result, index) => {
    if (result.classList.contains("activeResult-highlighter")) {
      result.style.background = "white";
      result.classList.remove("activeResult-highlighter");
    }
    if (index != newActiveIndex) return;

    result.classList.add("activeResult-highlighter");
    if (type === "colors") {
      result.style.background = result.innerText;
    }
  });
}
