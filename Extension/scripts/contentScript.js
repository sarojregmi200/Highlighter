// this is a script that gets injected in every tab
// it looks like it doesnot work on some pages even after providing all urls in the manifest file

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
  span.classList.add(`wrapper-highliter-highlit`);
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
