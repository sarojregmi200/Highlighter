import { createSearch, createSearchResultsUI } from "../components";
import { createHoverElement, initializePen } from "./pen";

document.addEventListener("mouseup", () => {
  initializePen();
  loadPreviousHighlights();
});

// listing for shortcuts
chrome.runtime.onMessage.addListener((req, sender, res) => {
  const msg = req.msg;
  switch (msg) {
    case "activateSearch":
      const type = req.type;
      // if search is already open closing it
      const search = document.querySelector(".mainContainer-highlighter");
      if (search) {
        document.body.removeChild(search);
      }
      createSearch(type);
      createSearchResultsUI(type);
      break;

    case "highlightGivenData":
      const data = req.data;
      const element = document.evaluate(
        data.xpath,
        document.body,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
      ).singleNodeValue;

      if (!element) return;
      chrome.runtime
        .sendMessage({ msg: "getGlobalState" })
        .then(({ state }) => {
          const globalState = state;

          highlightTrackedData(data, element, {
            backgroundState: globalState.backgroundState,
            underlineState: globalState.underlineState,
          });
        });
      break;
  }
});

function loadPreviousHighlights() {
  const domain = window.location.origin + window.location.pathname;

  browser.runtime
    .sendMessage({ msg: "getCurrentSitesHighlight", domain })
    .then((res) => {
      const items = res.items;

      items.forEach((data) => {
        const element = document.evaluate(
          data.xpath,
          document.body,
          null,
          XPathResult.FIRST_ORDERED_NODE_TYPE,
          null
        ).singleNodeValue;

        if (!element) return;
        chrome.runtime
          .sendMessage({ msg: "getGlobalState" })
          .then(({ state }) => {
            const globalState = state;

            highlightTrackedData(data, element, {
              backgroundState: globalState.backgroundState,
              underlineState: globalState.underlineState,
            });
          });
      });
    });
}

function highlightTrackedData(
  data,
  element: Node,
  globalState: { backgroundState: boolean; underlineState: boolean }
) {
  // if it is previously style then leaving it as it is
  if (
    (element as HTMLElement).querySelector(`.wrapper-highlighter-highlight`)
  ) {
    return;
  }

  const { id, color, topic, time } = data;

  const highlightedMarkup = data.htmlMarkup;
  const currentInnerHtml = (element as HTMLElement).innerHTML;
  const replacementElement = styleHighlightedData(
    {
      id,
      color,
      topic,
      time,
      highlightedMarkup,
    },
    globalState
  );

  const newInnerHtml = currentInnerHtml.replace(
    highlightedMarkup,
    `<span id="id_${id}"></span>`
  );
  (element as HTMLElement).innerHTML = newInnerHtml;

  document.querySelector(`#id_${id}`).appendChild(replacementElement);
}

function styleHighlightedData(
  { id, color, topic, time, highlightedMarkup },
  globalState: { backgroundState: boolean; underlineState: boolean }
) {
  // creating a wrapper
  const span = document.createElement("span");
  span.classList.add(`wrapper-highlighter-highlight`);
  span.setAttribute("insertionId", id);

  if (globalState.underlineState) {
    span.style.textDecorationColor = color;
  } else {
    span.style.textDecoration = "none";
  }

  span.innerHTML = highlightedMarkup;

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
  return span;
}

const siteUrl = [
  `http://localhost:5173/home`,
  `https://main.d2a7w27zjiogab.amplifyapp.com/home`,
  `https://main.d2a7w27zjiogab.amplifyapp.com/home/`,
  `https://localhost:5173/home/`,
];
const cookie = document.cookie;
siteUrl.forEach((site) => {
  if (window.location.href.includes(site))
    chrome.runtime.sendMessage({ msg: "extractCookie", cookie: cookie });
});
