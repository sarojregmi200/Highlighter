export function initializePen() {
  chrome.runtime.sendMessage({ msg: "getGlobalState" }).then(({ state }) => {
    const globalState = state;
    // the pen is not on
    if (!globalState.penState) return;

    const highlightedData = getHighlitedText();
    if (highlightedData.empty) return; // if nothings is highlited

    processHighlitedText(
      globalState.activeColor,
      globalState.activeTopic,
      {
        text: highlightedData.text,
        location: highlightedData.location,
      },
      highlightedData.range,
      {
        backgroundState: globalState.backgroundState,
        underlineState: globalState.underlineState,
      }
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
  const selectionRange = selection.getRangeAt(0);
  setTimeout(() => {
    selection.removeAllRanges();
    window.getSelection().removeAllRanges;
  }, 10);
  if (!selection || !selectionRange) return;

  const selectedText = selectionRange.toString().trim();

  if (
    (selection.isCollapsed && selection.rangeCount <= 0) ||
    !selection ||
    !selectedText
  )
    return { empty: true };

  const xpath = "will be added";
  if (!xpath) return { empty: true };

  return {
    text: selectedText,
    location: xpath,
    empty: false,
    range: selectionRange,
  };
}

function processHighlitedText(
  color: string,
  topic: string,
  highlightedData: { text: string; location: string },
  range: Range,
  globalState: { backgroundState: boolean; underlineState: boolean }
) {
  const domain = window.location.origin + window.location.pathname;
  const textContainer = range.commonAncestorContainer;

  let htmlMarkup = "";
  if (hasInnerHTML(textContainer)) {
    htmlMarkup = (textContainer as HTMLElement).innerHTML;
  } else {
    htmlMarkup = highlightedData.text;
  }
  const date = new Date();

  // july 31st mon 2023, 10:11
  const timeNow = formatDate(date);
  const newHighlightedData = {
    color,
    topic,
    ...highlightedData,
    domain,
    time: timeNow,
    htmlMarkup,
  };

  chrome.runtime
    .sendMessage({
      msg: "addNewHighlightedData",
      ...newHighlightedData,
    })
    .then((res) => {
      const id = res.id;
      const oramaId = res.oramaId;
      styleHighlightedData(id, range, color, topic, timeNow, globalState);

      const xpath = getXpath(id);

      chrome.runtime.sendMessage({
        msg: "updateXpath",
        id,
        xpath,
        oramaId,
        data: newHighlightedData,
      });
    });
}

function formatDate(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const month = months[date.getMonth()];
  const day = date.getDate();
  const dayOfWeek = daysOfWeek[date.getDay()];
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  let daySuffix = "th";
  if (day === 1 || day === 21 || day === 31) {
    daySuffix = "st";
  } else if (day === 2 || day === 22) {
    daySuffix = "nd";
  } else if (day === 3 || day === 23) {
    daySuffix = "rd";
  }

  return `${month} ${day}${daySuffix} ${dayOfWeek} ${year}, ${hours}:${minutes}`;
}

function getXpath(id: string): string {
  const item = document.querySelector(`[insertionid="${id}"]`).parentElement;
  let xpath = calculateXpath(item);

  return xpath.toLowerCase();
}
function calculateXpath(item: Element): string {
  const current = item;
  const parent = item.parentElement;

  if (current.tagName.toLowerCase() === document.body.tagName.toLowerCase())
    return "";

  const siblings = Array.from(parent.children).filter(
    (child) => child.tagName === current.tagName
  );

  if (siblings.length === 0)
    return `${calculateXpath(parent)}//${current.tagName}`;
  return `${calculateXpath(parent)}//${current.tagName}[${
    siblings.indexOf(current) + 1
  }]`;
}

function styleHighlightedData(
  id: string,
  range: Range,
  color: string,
  topic: string,
  time: string,
  globalState: { backgroundState: boolean; underlineState: boolean }
) {
  const selectedText = range.toString();
  if (selectedText.trim() === "") return;

  const textContainer = range.commonAncestorContainer;

  // creating a wrapper
  const span = document.createElement("span");
  span.classList.add(`wrapper-highlighter-highlight`);
  span.setAttribute("insertionId", id);
  if (hasInnerHTML(textContainer)) {
    span.innerHTML = (textContainer as HTMLElement).innerHTML;
  } else {
    span.innerHTML = selectedText;
  }
  if (globalState.underlineState) {
    span.style.textDecorationColor = color;
  } else {
    span.style.textDecoration = "none";
  }

  // creating a temp div to apply color
  const temp = document.createElement("div");
  temp.style.background = color;
  document.body.appendChild(temp);
  // generating the light version of the selected color
  const colorInRGB = window
    .getComputedStyle(temp)
    .getPropertyValue("background");
  const rgbArr = colorInRGB.match(/\d+/g).map(Number);
  if (globalState.backgroundState) {
    span.style.background = `rgba(${rgbArr[0]},${rgbArr[1]},${rgbArr[2]},0.2)`;
  }

  const hoverEffectChild = createHoverElement({ topic, color, time });
  hoverEffectChild.style.opacity = "0";
  span.addEventListener(
    "mouseenter",
    () => (hoverEffectChild.style.opacity = "1")
  );
  span.addEventListener("mousemove", (e) => {
    hoverEffectChild.style.left = e.pageX + "px";
    hoverEffectChild.style.top = e.pageY + "px";
  });
  span.addEventListener(
    "mouseleave",
    () => (hoverEffectChild.style.opacity = "0")
  );
  span.appendChild(hoverEffectChild);

  // removing the content of the range
  range.deleteContents();

  // inserting back with the wrapper
  range.insertNode(span);
}

function hasInnerHTML(node: Node): node is HTMLElement {
  return node instanceof HTMLElement;
}

export function createHoverElement(data: {
  topic: string;
  color: string;
  time: string;
}): HTMLElement {
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
