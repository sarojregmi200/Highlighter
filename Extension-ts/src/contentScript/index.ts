import { createSearch, createSearchResultsUI } from "../components";
import { initializePen } from "./pen";

document.addEventListener("mouseup", initializePen);

// listing for shortcuts
chrome.runtime.onMessage.addListener((req, sender, res) => {
  const msg = req.msg;
  if (msg === "activateSearch") {
    const type = req.type;

    // if search is already open closing it
    const search = document.querySelector(".mainContainer-highlighter");
    if (search) {
      document.body.removeChild(search);
    }
    createSearch(type);
    createSearchResultsUI(type);
  }
});
