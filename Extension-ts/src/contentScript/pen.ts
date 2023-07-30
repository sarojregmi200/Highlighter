export function initializePen() {
  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then(({ state }) => {
    const globalState = state;

    const highlightedData = getHighlitedText();
    if (highlightedData.empty) return; // if nothings is highlited

    processHighlitedText(
      globalState.activeColor,
      globalState.activeTopic,
      {
        text: highlightedData.text,
        location: highlightedData.location,
      },
      highlightedData.range
    );
  });
}

function getHighlitedText(): {
  text?: string;
  location?: string;
  empty: boolean;
  range?: Range;
} {
  const selection = window.getSelection();
  if (!selection || !selection.getRangeAt(0)) return;

  const selectedText = selection.getRangeAt(0).toString().trim();

  if (
    (selection.isCollapsed && selection.rangeCount <= 0) ||
    !selection ||
    !selectedText
  )
    return { empty: true };

  const xpath = "In another version";
  if (!xpath) return { empty: true };

  return {
    text: selectedText,
    location: xpath,
    empty: false,
    range: selection.getRangeAt(0),
  };
}

function processHighlitedText(
  color: string,
  topic: string,
  highlightedData: { text: string; location: string },
  range: Range
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

  styleHighlightedData(range, color, topic, timeNow);

  chrome.runtime.sendMessage({
    msg: "addNewHighlightedData",
    ...newHighlightedData,
  });
}

function getXpath(selection: Selection): string {
  let xpath = "";

  const range = selection.getRangeAt(0);
  const containerNode = range.commonAncestorContainer;
  let containerElement;

  if (containerNode.nodeType === Node.TEXT_NODE)
    containerElement = containerNode.parentElement;
  else containerElement = containerNode;

  xpath = generateXpath(containerElement);
  console.log(xpath);
  return xpath;
}

function generateXpath(element: HTMLElement) {
  if (!element || !element.tagName) return "";
  const tagName = element.tagName.toLowerCase();
  const parent = element.parentElement;
  // checking for the last parent
  if (!parent) return "";
  const siblings = Array.from(parent.children).filter(
    (child) => child.tagName === tagName
  );

  console.log({
    siblings,
    element,
  });
  if (siblings.length === 1) {
    return `${generateXpath(parent)}/${tagName}`;
  } else {
    const index = siblings.indexOf(element) + 1;
    return `${generateXpath(parent)}/${tagName}[${index}]`;
  }
}

function styleHighlightedData(
  range: Range,
  color: string,
  topic: string,
  time: string
) {
  const selectedText = range.toString();
  if (selectedText.trim() === "") return;

  const textContainer = range.commonAncestorContainer;

  // creating a wrapper
  const span = document.createElement("span");
  span.classList.add(`wrapper-highlighter-highlight`);
  if (hasInnerHTML(textContainer)) {
    span.innerHTML = (textContainer as HTMLElement).innerHTML;
  } else {
    span.innerHTML = selectedText;
  }
  span.style.textDecorationColor = color;
  span.style.background = color;
  const hoverEffectChild = createHoverElement(span, { topic, color, time });
  span.appendChild(hoverEffectChild);
  // generating the light version of the selected color
  const colorInRGB = span.style.background;
  const rgbArr = colorInRGB.match(/\d+/g).map(Number);
  span.style.background = `rgba(${rgbArr[0]},${rgbArr[1]},${rgbArr[2]},0.2)`;

  // removing the content of the range
  range.deleteContents();

  // inserting back with the wrapper
  range.insertNode(span);
}

function hasInnerHTML(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

function createHoverElement(
  span: HTMLElement,
  data: { topic: string; color: string; time: string }
): HTMLElement {
  const container = createElement(
    "div",
    "wrapper-highlighter-highlight-hover-container"
  );
  const topic = createElement(
    "div",
    "wrapper-highlighter-highlight-hover-topic"
  );
  topic.innerText = data.topic;

  const time = createElement("div", "wrapper-highlighter-highlight-hover-time");
  time.textContent = data.time;

  const color = createElement(
    "div",
    "wrapper-highlighter-highlight-hover-color"
  );
  color.style.background = data.color;

  const bottomWrapper = createElement(
    "div",
    "wrapper-highlighter-highlight-hover-bottom-wrapper"
  );

  bottomWrapper.append(time, color);
  container.append(topic, bottomWrapper);

  return container;
}

function createElement(type: string, className: string): HTMLElement {
  const elem = document.createElement(type);
  elem.classList.add(className);
  return elem;
}
