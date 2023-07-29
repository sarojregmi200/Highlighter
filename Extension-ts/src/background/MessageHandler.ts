import { colorDb, globalState, topicDb } from "./DataStore";
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
      return true;
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
      switch (request.type) {
        case "colors":
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
          break;
        case "topic":
          search(topicDb, {
            term: request.searchTerm,
            properties: ["topic"],
          }).then((res) =>
            response({
              items: res.hits.map((item) => {
                return item.document;
              }),
            })
          );
          break;
      }
      return true;
      break;

    case "getAllTopics":
      search(topicDb, {
        term: "",
        properties: ["topic"],
      }).then((res) => {
        const allTopics = res.hits.map((item) => {
          return item.document.topic;
        });
        response({ topics: allTopics });
      });
      return true;
      break;

    case "changeActiveTopic":
      globalState.activeTopic = request.topic;
      break;

    case "addNewTopic":
      insert(topicDb, {
        topic: request.topic,
      });

      globalState.activeTopic = request.topic;
      break;
  }
}
