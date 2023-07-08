// current state of the application
const appState = {
  task: "",
  category: "",
  searchVisibility: false,
};

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
      setSearchVisibility(!recurringShortcut);
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
