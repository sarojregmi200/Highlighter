// current state of the application
const appState = {
  task: "Universal",
  category: "text",
  searchVisibility: false,
};
// contains the application information
// this also stores the items that are added by the users
// such as the tasks and categories and highlits as well.
const appData = {
  tasks: ["universal"],
  categories: ["text", "code"],
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

// handles the different shortcut keypress
function handleShortcutChange(state) {
  // repeatign shortcut. used during changing between multiple categories or topics
  switch (state) {
    case "search":
      // for the first search shortcut the search box will be visible and if the shortcut is pressed again then it should close
      setSearchVisibility();
      break;
    case "category":
      // change the current category
      changeCategory();
      break;
    case "topic":
      // change the topic
      changeTasks();
      break;
  }
}

// changing the extension settings using the functions
function changeCategory() {
  console.log("Changing the category");
}

// used to switch the task
function changeTasks() {
  console.log("changing the tasks");
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

  const { category, task } = JSON.parse(state);

  appState.category = category;
  appState.task = task;
}

// stores the current state in the local storage
function saveApplicationState() {
  // converts into a json string
  const state = JSON.stringify(appState);
  localStorage.setItem("state", state);
}
