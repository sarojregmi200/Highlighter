import { globalState } from "./DataStore";

export function initializeShortcuts() {
  chrome.commands.onCommand.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (response) => {
      if (!response || !response[0].id) return;

      switch (command) {
        case "search":
          chrome.tabs.sendMessage(response[0].id, {
            msg: "activateSearch",
            type: "highlightedData",
          });
          break;
        case "topic":
          chrome.tabs.sendMessage(response[0].id, {
            msg: "activateSearch",
            type: "topic",
          });
          break;
        case "color":
          chrome.tabs.sendMessage(response[0].id, {
            msg: "activateSearch",
            type: "colors",
          });
          break;
        case "pen":
          globalState.penState = !globalState.penState;
          break;
      }
    });
  });
}
