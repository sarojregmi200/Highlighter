import { createSearch, createSearchResultsUI } from "../components";
import { initializePen } from "./pen";

document.addEventListener("mouseup", () => {
  initializePen();
  loadPreviousHighlights();
});

// listing for shortcuts
chrome.runtime.onMessage.addListener((req, sender, res) => {
  const msg = req.msg;
  switch (msg) {
    case "activateSearch":
      const type = req.type;
      // if search is already open closing it
      const search = document.querySelector(".mainContainer-highlighter");
      if (search) {
        document.body.removeChild(search);
      }
      createSearch(type);
      createSearchResultsUI(type);
      break;

    case "highlightGivenData":
      const data = req.data;
      const element = document.evaluate(
        data.xpath,
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (!element) return;

      highlightTrackedData(data, element);
      break;
  }
});

function highlightTrackedData(data, element: Node) {
  // if it is previously style then leaving it as it is
  if (
    (element as HTMLElement).querySelector(`.wrapper-highlighter-highlight`)
  ) {
    return;
  }
}

function loadPreviousHighlights() {
  const domain = window.location.origin + window.location.pathname;

  browser.runtime
    .sendMessage({ msg: "getCurrentSitesHighlight", domain })
    .then((res) => {
      const items = res.items;
      console.log(items);
    });
}
