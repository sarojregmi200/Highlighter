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
  const xpath = getXpath(selection);

  if (
    (selection.isCollapsed && selection.rangeCount <= 0) ||
    !selection ||
    !selctionText ||
    xpath === ""
  )
    return { empty: true };
  return { text: selctionText, location: xpath, empty: false };
}

function processHighlitedText(
  color: string,
  topic: string,
  highlightedData: { text: string; location: string }
) {
  const domain = window.location.origin + window.location.pathname;

  const timeNow = Date.now().toString();

  const newHighlightedData = {
    color,
    topic,
    ...highlightedData,
    domain,
    time: timeNow,
  };

  chrome.runtime.sendMessage({
    msg: "addNewHighlightedData",
    ...newHighlightedData,
  });
}

function getXpath(selection: Selection): string {
  let xpath = "";

  const range = selection.getRangeAt(0);
  const containerNode = range.commonAncestorContainer;
  console.log(range);
  if (containerNode.nodeType !== Node.TEXT_NODE) return "";

  const containerElement = containerNode.parentElement;

  xpath = generateXpath(containerElement);
  return xpath;
}

function generateXpath(element: HTMLElement) {
  console.log(element);
  if (!element || !element.tagName) return "";
  const tagName = element.tagName.toLowerCase();
  const parent = element.parentElement;
  const siblings = Array.from(parent.children).filter(
    (child) => child.tagName === tagName
  );
  if (siblings.length === 1) {
    return `${generateXpath(parent)}/${tagName}`;
  } else {
    const index = siblings.indexOf(element) + 1;
    return `${generateXpath(parent)}/${tagName}[${index}]`;
  }
}
