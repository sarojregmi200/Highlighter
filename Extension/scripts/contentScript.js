// these are the data from the global state
let color;
let topic = "New application research";

// listing to mouse up for processing the highted text if it exists
document.addEventListener("mouseup", processHighlitedText);

function processHighlitedText() {
  // selected data but unfiltered
  const rawSelection = getHighlitedText();
  // if there is no selection no need to perform further operations
  if (!rawSelection) return;
  // selected part as a fragment.

  // gets the global state and sets it in the respective variable
  getGlobalState();

  const range = rawSelection.getRangeAt(0);
  const selectedText = range.toString();
  if (selectedText.trim() === "") return;

  // creating a wrapper
  const span = document.createElement("span");
  span.classList.add(`wrapper-highlighter-highlight`);
  span.innerText = selectedText;
  span.style.textDecorationColor = color;

  // removing the content of the range
  range.deleteContents();

  // inserting back with the wrapper
  range.insertNode(span);
}

// gets the highlited text with it's property. in a format {
// content: selectedContent
// location: dom location
// }

// send a request to the background script and gets the response with the global states
function getGlobalState() {
  const request = browser.runtime.sendMessage({
    msg: "globalState",
  });
  request.then(
    (response) => {
      color = response.color;
      title = response.title;
    },
    (e) => {
      console.log("Cannot get global state");
    }
  );
}

function getHighlitedText() {
  const selection = window.getSelection();
  if (selection.isCollapsed && selection.rangeCount <= 0) return null;
  return document.getSelection();
}

function updateData(newData) {
  console.log(newData);
}

// listening for the messages
browser.runtime.onMessage.addListener(({ msg, type, appState, appData }) => {
  if (msg === "activate-search") {
    const existingSearch = document.querySelector(".mainContainer-highlighter");

    // if the popup is active then turn it off
    if (existingSearch) {
      document.body.removeChild(existingSearch);
      return;
    }
    createSearch(type, appData, appState);
  }
});

// generates a element with the given class name and type and return it
function createElement(type, className) {
  const element = document.createElement(type);
  element.classList.add(className);
  return element;
}

// generates a the search markup and calls the updatesearchresultui to populate the markup
function createSearch(type, appData, appState) {
  // the main wrapper
  const mainContainer = createElement("div", "mainContainer-highlighter");
  // search box
  const searchBox = createElement("input", "searchInput-highlighter");
  // search and result container
  const searchContainer = createElement("div", "searchContainer-highlighter");
  // results container
  const resultContainer = createElement("div", "resultContainer-highlighter");
  // add btn when something is not available
  const addBtn = createElement("div", "addBtn-highlighter");
  // used to close the search
  const disposer = createElement("div", "disposer-highlighter");

  // adding event listeners
  disposer.addEventListener("click", closeSearchBox);

  // search container holds the search box and the results
  searchContainer.append(searchBox, resultContainer);
  // main container contains search container, addbtn , disposer
  mainContainer.append(searchContainer, addBtn, disposer);
  // appending to the body
  document.body.appendChild(mainContainer);

  // updates the appended elements with the correct data
  updateSearchResultUi(type, appData, appState);
}

// updates the search result with the provided search type elements data
function updateSearchResultUi(type, appData, appState) {
  const resultContainer = document.querySelector(
    ".resultContainer-highlighter"
  );

  // clearing out the previous result
  resultContainer.innerHTML = "";

  if (type === "color") {
    // appending the new result
    appData.colors.forEach((color) => {
      const result = createElement("div", "result-highlighter");
      if (color === appState.color)
        result.classList.add("activeResult-highlighter");
      result.innerText = color;
      resultContainer.appendChild(result);
    });
  }
}

// closes the search popup
function closeSearchBox() {
  chrome.runtime.sendMessage({ msg: "getSearchVisibility" }).then();
}
