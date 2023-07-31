import { colorDb, globalState, highlightedDataDb, topicDb } from "./DataStore";
import { insert, remove, search } from "./orama";

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
      const type = request.type;
      const searchDb = type === "colors" ? colorDb : topicDb;
      search(searchDb, {
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

    case "searchHighlightedData":
      search(highlightedDataDb, {
        term: request.searchTerm,
        properties: "*",
        tolerance: 5,
        threshold: 0,
      }).then((res) =>
        response({
          items: res.hits.map((item) => {
            return item.document;
          }),
        })
      );
      return true;
      break;

    case "addNewHighlightedData":
      insert(highlightedDataDb, {
        xpath: request.location,
        data: request.text,
        color: request.color,
        domain: request.domain,
        time: request.time,
        topic: request.topic,
      }).then((res) => response({ id: res }));

      return true;
      break;

    case "updateXpath":
      const { id, xpath } = request;
      const { text, color, domain, time, topic } = request.data;

      remove(highlightedDataDb, id).then((res) => {
        insert(highlightedDataDb, {
          data: text,
          xpath,
          color,
          domain,
          time,
          topic,
        });
      });

      break;

    case "locateHighlightedData":
      const requesterTab = request.currentTab;
      chrome.tabs.query({}).then((tabs) => {
        tabs.forEach((tab) => {
          console.log(tab.id, tab.title);
          if (tab.id == requesterTab) {
            return;
          }
          const data = request.data;
          chrome.tabs.sendMessage(tab.id, {
            msg: "highlightGivenData",
            data,
          });
        });
      });
      break;

    case "getActiveTabId":
      browser.tabs.query({ active: true, currentWindow: true }).then((tabs) => {
        response({ id: tabs[0].id });
      });
      return true;

      break;
  }
}
