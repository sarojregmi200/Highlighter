import { globalState } from "./DataStore";

export function initMessages() {
  chrome.runtime.onMessage.addListener(handleMessage);
}

export function handleMessage(request, sender, response) {
  console.log(request);
  switch (request.msg) {
    case "getGlobalState":
      response({
        state: globalState,
      });
      break;

    case "changeActiveColor":
      globalState.activeColor = request.color;
      break;
  }
}
