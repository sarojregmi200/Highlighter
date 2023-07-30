export function initializeShortcuts() {
  chrome.commands.onCommand.addListener((command) => {
    console.log(command);
  });
}
