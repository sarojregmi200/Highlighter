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
    console.log("I am called");
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
  console.log("I am also called");
  const inputBox: HTMLInputElement = document.querySelector(
    ".searchInput-highlighter"
  );
  const resultContainer = document.querySelector(
    ".resultContainer-highlighter"
  );
  // clearing out the previous result
  resultContainer.innerHTML = "";

  let searchTerm = inputBox.value;

  switch (e.key) {
    case "ArrowDown":
      break;

    case "ArrowUp":
      break;

    case "Enter":
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
  // clearing out the previous result
  resultContainer.innerHTML = "";

  chrome.runtime
    .sendMessage({ msg: "getSearchResults", type, searchTerm })
    .then((res) => {
      console.log({ SearchedResult: res });
    });
}
