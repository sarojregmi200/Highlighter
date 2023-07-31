import { createSearch, createSearchResultsUI } from "../components";
import { initializePen } from "./pen";

document.addEventListener("mouseup", initializePen);

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
      );
      console.log(element);
      break;
  }
});
