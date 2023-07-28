import { colorDb } from "../../background/DataStore";
import { search } from "../../background/orama";
import { createElement } from "./CreateElement";

export function createSearch() {
  const mainContainer = createElement("div", "mainContainer-highlighter");
  const searchBox = createElement("input", "searchInput-highlighter");
  const searchContainer = createElement("div", "searchContainer-highlighter");
  const resultContainer = createElement("div", "resultContainer-highlighter");
  const addBtn = createElement("div", "addBtn-highlighter");
  const disposer = createElement("div", "disposer-highlighter");

  // adding event listeners
  disposer.addEventListener("click", closeSearchBox);
  searchBox.addEventListener("keypress", updateSearchResultsUI);

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

export function updateSearchResultsUI() {}
