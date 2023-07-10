// current state of the application
const appState = {
  topic: "Universal",
  color: "#8CFF32",
  search: {
    visibility: false,
    type: "", //type means search or title or color
  },
};
// contains the application information
// this also stores the items that are added by the users
// such as the topics and categories and highlits as well.
const appData = {
  topics: ["universal"],
  colors: ["#8CFF32", "#E9FF32", "#FF9C35", "#AEE2FF", "#E90064"],
  data: [
    // {
    //   domain: "The url of the highlited data",
    //   highlightedData: [
    //     {
    //       data: "highlited data",
    //       mode: "text",
    //       time:"new time"
    //     },
    //   ],
    // },
  ],
};

// fetches the previous state stored in the local storage.
getPreviousState();

// listening for shortcuts
if (browser.commands.onCommand)
  browser.commands.onCommand.addListener((command) =>
    handleShortcutChange(command)
  );

// listening for messages from other scripts
browser.runtime.onMessage.addListener(handleMessage);

// handles the different shortcut keypress
function handleShortcutChange(state) {
  // repeatign shortcut. used during changing between multiple categories or topics
  switch (state) {
    case "search":
      sendSearchData(state);
      break;
    case "color":
      // change the current color
      sendSearchData(state);
      break;
    case "topic":
      // change the topic
      sendSearchData(state);
      break;
  }
}

function sendSearchData(type) {
  // inverse the visibility
  setSearchVisibility(!appState.searchVisibility);

  // sends the data to the active tabs content script
  browser.tabs.query({ active: true, currentWindow: true }, (response) => {
    if (!response) return;
    browser.tabs.sendMessage(response[0].id, {
      msg: "activate-search",
      type,
      appState,
      appData,
    });
  });
}

// turns search box on or off
function setSearchVisibility(changedState) {
  appState.searchVisibility = changedState;
}

// get the previous state from the local storage
// and sets to the current state
function getPreviousState() {
  const state = localStorage.getItem("state");
  if (!state) return;
  const { color, topic } = JSON.parse(state);
  appState.color = color;
  appState.topic = topic;
}

// accepts two params one is the name of the  state to save and another is the value of the state to save
function saveInformation(stateName, value) {
  // converting the value into a json string
  const sValue = JSON.stringify(value);
  localStorage.setItem(stateName, sValue);
}

function handleMessage(request, sender, sendResponse) {
  switch (request.msg) {
    // send the global state to the content script
    case "globalState":
      sendResponse(appState);
      break;

    // sends the color state to popup and updates in the context script
    case "getColors":
      sendResponse({
        activeColor: appState.color,
        colors: appData.colors,
      });
      break;

    // changes the global app active state
    case "changeActive":
      appState.color = request.active;
      break;

    // inverses the visibility and acts as a toggle switch for the search box
    case "getSearchVisibility":
      sendResponse({
        status: appState.searchVisibility,
      });
      break;
  }
}
