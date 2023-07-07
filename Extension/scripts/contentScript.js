// this is a script that gets injected in every tab
// it looks like it doesnot work on some pages even after providing all urls in the manifest file

let selectedText = "";

let buffer;
document.addEventListener("selectionchange", () => {
  if (buffer) clearTimeout(buffer);
  selectedText = getHighlitedText();
  setTimeout(updateData(selectedText), 100);
});

// gets the highlited text with it's property. in a format {
// content: selectedContent
// location: dom location
// }
function getHighlitedText() {
  const selection = window.getSelection();
  if (!selection.isCollapsed) {
    return document.getSelection();
  }
}

function updateData(newData) {
  console.log(newData);
}
