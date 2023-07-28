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
