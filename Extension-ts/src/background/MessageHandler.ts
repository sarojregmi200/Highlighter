import { colorDb, globalState } from "./DataStore";
import { insert, search } from "./orama";

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

    case "addNewColor":
      insert(colorDb, {
        color: request.color,
      });
      globalState.activeColor = request.color;
      break;

    case "getAllColors":
      search(colorDb, { term: "", properties: ["color"] }).then((res) => {
        const allColors = res.hits.map((item) => {
          return item.document.color;
        });
        response({ colors: allColors });
      });
      return true;
      break;

    case "getSearchResults":
      if (request.type === "colors") {
        search(colorDb, {
          term: request.searchTerm,
          properties: "*",
        }).then((res) =>
          response({
            items: res.hits.map((item) => {
              return item.document;
            }),
          })
        );
        return true;
      }

      break;
  }
}
