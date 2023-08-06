import { data } from "autoprefixer";
import { colorDb, globalState, highlightedDataDb, topicDb } from "./DataStore";
import {
  addSettings,
  createHighlight,
  updateActiveState,
  updateHighlight,
} from "./graphQL";
import { insert, remove, search } from "./orama";
import { refreshSecrets, secrets } from "./secrets";
import { activateApp, checkAuthStatus } from ".";

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
      updateActiveState("color", request.color);
      globalState.activeColor = request.color;
      break;

    case "addNewColor":
      insert(colorDb, {
        color: request.color,
      }).then(() => {
        search(colorDb, { term: "", properties: "*" }).then((res) => {
          const colors = res.hits.map((hit) => hit.document.color);
          addSettings("colors", JSON.stringify(colors));
        });
      });
      globalState.activeColor = request.color;
      updateActiveState("color", request.color);
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
      updateActiveState("topic", request.topic);
      globalState.activeTopic = request.topic;
      break;

    case "addNewTopic":
      insert(topicDb, {
        topic: request.topic,
      }).then(() => {
        search(topicDb, { term: "", properties: "*" }).then((res) => {
          const topics = res.hits.map((hit) => hit.document.topic);
          addSettings("topics", JSON.stringify(topics));
        });
      });
      globalState.activeTopic = request.topic;
      updateActiveState("topic", request.topic);
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
            return { ...item.document, id: item.id };
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
        htmlMarkup: request.htmlMarkup,
      }).then((res) => {
        createHighlight({
          xpath: request.location,
          data: request.text,
          color: request.color,
          domain: request.domain,
          time: request.time,
          topic: request.topic,
          htmlMarkup: request.htmlMarkup,
        }).then((dbres) => {
          if (!dbres || typeof dbres === "boolean") return;

          response({ id: dbres.id, oramaId: res });
        });
      });

      return true;
      break;

    case "updateXpath":
      const {
        oramaId,
        id,
        xpath,
      }: {
        id: string;
        xpath: string;
        oramaId: string;
      } = request;
      const { text, color, domain, time, topic, htmlMarkup } = request.data;

      remove(highlightedDataDb, oramaId).then((res) => {
        insert(highlightedDataDb, {
          data: text,
          xpath,
          color,
          domain,
          time,
          topic,
          htmlMarkup,
        }).then(() => {
          updateHighlight({ id, xpath });
        });
      });

      break;

    case "locateHighlightedData":
      const _url = request.data.domain;
      chrome.tabs.query({ url: _url }).then((tabs) => {
        tabs.forEach((tab) => {
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

    case "getCurrentSitesHighlight":
      const site = request.domain;
      search(highlightedDataDb, {
        term: site,
        properties: ["domain"],
        threshold: 0,
        exact: true,
      }).then((res) => {
        response({
          items: res.hits.map((item) => {
            return { ...item.document, id: item.id };
          }),
        });
      });
      return true;
      break;

    case "changePenState":
      updateActiveState("pen", request.state);
      globalState.penState = request.state;
      break;

    case "changeBackgroundState":
      updateActiveState("background", request.state);
      globalState.backgroundState = request.state;
      break;

    case "changeUnderlineState":
      updateActiveState("underline", request.state);
      globalState.underlineState = request.state;
      break;

    case "extractCookie":
      const cookies = request.cookie as string;
      storeCookiesIntoStorage(cookies);
      refreshSecrets().then((res) => {
        response("Welcome user!!");
      });
      return true;
      break;

    case "checkAuthStatus":
      checkAuthStatus().then((res) => {
        response(res);
      });
      return true;
      break;
  }
}

async function storeCookiesIntoStorage(cookies: string) {
  if (!cookies.trim()) {
    browser.storage.local
      .set({
        activeId: "",
        authToken: "",
        settingsId: "",
        userId: "",
      })
      .then(() => console.log("logging out"));
    return;
  }

  // activating the app
  activateApp();
  const cookiesArr = cookies.split(";");
  cookiesArr.forEach((cookie) => {
    if (cookie.includes("activeId=")) {
      return browser.storage.local.set({
        activeId: cookie.replace("activeId=", ""),
      });
    }
    if (cookie.includes("authToken=")) {
      return browser.storage.local.set({
        authToken: cookie.replace("authToken=", ""),
      });
    }
    if (cookie.includes("settingsId=")) {
      return browser.storage.local.set({
        settingsId: cookie.replace("settingsId=", ""),
      });
    }
    if (cookie.includes("userId=")) {
      return browser.storage.local.set({
        userId: cookie.replace("userId=", ""),
      });
    }
  });

  return "Done";
}
