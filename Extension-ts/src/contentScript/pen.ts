export function initializePen() {
  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then(({ state }) => {
    const globalState = state;
    processHighlitedText(globalState.activeColor, globalState.activeTopic);
  });
}

function processHighlitedText(color: string, topic: string) {}

function getHighlitedText(): { text?: string; location?: string } {
  const selection = window.getSelection();
  const selctionText = selection.getRangeAt(0).toString().trim();
  if (
    (selection.isCollapsed && selection.rangeCount <= 0) ||
    !selection ||
    !selctionText
  )
    return {};

  return { text: selctionText };
}
