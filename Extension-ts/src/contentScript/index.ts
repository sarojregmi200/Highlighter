import { createSearch, createSearchResultsUI } from "../components";
import { createHoverElement, initializePen } from "./pen";

document.addEventListener("mouseup", () => {
  browser.runtime.sendMessage({ msg: "getGlobalState" }).then(({ state }) => {
    if (!state.authStatus) return;

    initializePen();
    loadPreviousHighlights();
  });
});

// loading the highlights on page load
browser.runtime.sendMessage({ msg: "getGlobalState" }).then(({ state }) => {
  if (!state.authStatus) return;

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

      // Get the initial position of the target element
      const targetPosition = (element as HTMLElement).getBoundingClientRect()
        .top;

      // Define the duration of the scroll animation (in milliseconds)
      const duration = 1000;

      // Calculate the starting timestamp
      const startTime = performance.now();

      // Define the animation function
      function smoothScroll(timestamp) {
        const currentTime = timestamp - startTime;

        // Calculate the new scroll position using easing function (e.g., easeInOutQuad)
        const easeInOutQuad = (t) =>
          t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
        const scrollToPosition =
          easeInOutQuad(Math.min(currentTime / duration, 1)) * targetPosition;

        // Perform the scroll
        window.scrollTo(0, scrollToPosition);

        if (currentTime < duration) {
          // Continue the animation
          requestAnimationFrame(smoothScroll);
        }
      }

      // Start the animation
      requestAnimationFrame(smoothScroll);
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
  console.log(highlightedMarkup, id);
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
  `http://localhost:5173`,
  `https://main.d2a7w27zjiogab.amplifyapp.com`,
];

const sendCookies = () => {
  const cookie = document.cookie;
  chrome.runtime.sendMessage({ msg: "extractCookie", cookie: cookie });
};

for (let i in siteUrl) {
  const site = siteUrl[i];

  if (window.location.href.includes(site)) {
    sendCookies();
    break;
  }
}
