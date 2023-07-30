import { create, insert, insertMultiple, search } from "./orama";

// creating a default value of the state
export const globalState = {
  activeColor: "#E9FF32",
  popupMode: "hidden",
  activeTopic: "Global",
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
  { color: "wheat" },
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

export const highlightedDataDb = await create({
  schema: {
    xpath: "string",
    data: "string",
    color: "string",
    domain: "string",
    time: "string",
    topic: "string",
  },
});
