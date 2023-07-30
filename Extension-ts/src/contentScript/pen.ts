export function initializePen() {
  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then(({ state }) => {
    const globalState = state;

    const highlightedData = getHighlitedText();
    if (highlightedData.empty) return; // if nothings is highlited

    processHighlitedText(globalState.activeColor, globalState.activeTopic, {
      text: highlightedData.text,
      location: highlightedData.location,
    });
  });
}

function getHighlitedText(): {
  text?: string;
  location?: string;
  empty: boolean;
} {
  const selection = window.getSelection();
  const selctionText = selection.getRangeAt(0).toString().trim();
  if (
    (selection.isCollapsed && selection.rangeCount <= 0) ||
    !selection ||
    !selctionText
  )
    return { empty: true };
  return { text: selctionText, location: "xpath", empty: false };
}

function processHighlitedText(
  color: string,
  topic: string,
  highlightedData: { text: string; location: string }
) {
  const domain = window.location.origin + window.location.pathname;

  console.log({
    domain,
    color,
    topic,
    highlightedData,
  });
}
