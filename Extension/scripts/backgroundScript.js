// current state of the application
const appState = {
  topic: "Universal",
  color: "green",
  searchVisibility: false,
};
// contains the application information
// this also stores the items that are added by the users
// such as the topics and categories and highlits as well.
const appData = {
  topics: ["universal"],
  colors: ["yellow", "green"],
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
      // for the first search shortcut the search box will be visible and if the shortcut is pressed again then it should close
      setSearchVisibility();
      break;
    case "color":
      // change the current color
      changeColor();
      break;
    case "topic":
      // change the topic
      changetopics();
      break;
  }
}

// changing the extension settings using the functions
function changeColor() {
  console.log("Changing the color");
}

// used to switch the topic
function changetopics() {
  console.log("changing the topics");
}

// used to search the item
function searchItem(data) {
  console.log("searching item", data);
}

// turns search box on or off
function setSearchVisibility(changedState) {
  if (changedState) {
    // create the search btn
    // then return
    return;
  }
  //   find the search box and make it invisible
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
  if (request.msg === "globalState") {
    sendResponse(appState);
  }
}
