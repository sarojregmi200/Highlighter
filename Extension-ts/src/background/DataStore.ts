import { create, insertMultiple, removeMultiple, search } from "./orama";

// creating a default value of the state
export const globalState = {
  activeColor: "#FF9C35",
  activeTopic: "Global",
  penState: true,
  backgroundState: true,
  underlineState: true,
  authStatus: false,
};

export const colorDb = await create({
  schema: {
    color: "string",
  },
});

const defaultColors = [
  { color: "#8CFF32" },
  { color: "#E9FF32" },
  { color: "#FF9C35" },
  { color: "#AEE2FF" },
];

await insertMultiple(colorDb, defaultColors);

export const topicDb = await create({
  schema: {
    topic: "string",
  },
});
const defaultTopics = [
  { topic: "Research" },
  { topic: "Global" },
  { topic: "School Project" },
];

await insertMultiple(topicDb, defaultTopics);

export async function loadDbSettings(
  topics: { topic: string }[],
  colors: { color: string }[]
) {
  const allTopics = await search(topicDb, { term: "", properties: "*" });
  const topicIds = allTopics.hits.map((item) => item.id);
  const allColors = await search(colorDb, { term: "", properties: "*" });
  const colorsIds = allColors.hits.map((item) => item.id);

  removeMultiple(topicDb, topicIds).then(() => {
    insertMultiple(topicDb, topics);
  });

  removeMultiple(colorDb, colorsIds).then((res) => {
    insertMultiple(colorDb, colors);
  });
}

export async function loadHighlights(
  highlights: {
    xpath: string;
    data: string;
    color: string;
    domain: string;
    time: string;
    topic: string;
    htmlMarkup: string;
  }[]
) {
  const allHighlights = await search(highlightedDataDb, {
    term: "",
    properties: "*",
  });
  const highlightsIds = allHighlights.hits.map((item) => item.id);
  removeMultiple(highlightedDataDb, highlightsIds).then(() => {
    insertMultiple(highlightedDataDb, highlights);
  });
}

export const highlightedDataDb = await create({
  schema: {
    xpath: "string",
    data: "string",
    color: "string",
    domain: "string",
    time: "string",
    topic: "string",
    htmlMarkup: "string",
  },
});
