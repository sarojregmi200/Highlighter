import { ColorCache, globalState } from "./DataStore";

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
  }
}
