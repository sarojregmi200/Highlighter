import { ColorCache, colorDb, globalState } from "./DataStore";
import { search } from "./orama";

export function initMessages() {
  chrome.runtime.onMessage.addListener(handleMessage);
}

export function handleMessage(request, sender, response) {
  switch (request.msg) {
    case "getGlobalState":
      response({
        state: globalState,
      });
      break;

    case "changeActiveColor":
      globalState.activeColor = request.color;
      break;

    case "getAllColors":
      response({ colors: ColorCache });
      break;

    case "getSearchResults":
      if (request.type === "colors") {
        search(colorDb, {
          term: request.searchTerm,
          properties: "*",
        }).then((res) => response(res));
      }

      break;
  }
}
