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

const highlightedDataDb = await create({
  schema: {
    xpath: "string",
    data: "string",
    color: "string",
    domain: "string",
    time: "string",
  },
});

const sampleData = [
  {
    xpath: "/html/body/div/div/div[2]/article/main/ul[8]",
    data: "Another highlited data",
    color: "black",
    domain: "chorbazar.in",
    time: "12pm yesterday",
  },
  {
    xpath: "/html/body/div/div/div[2]/article/main/ul[8]",
    data: "This is a important data",
    color: "red",
    domain: "google.com",
    time: "11pm today",
  },
  {
    xpath: "/html/body/div/div/div[2]/article/main/ul[8]",
    data: "For the testing purpose",
    color: "red",
    domain: "hero.com.np",
    time: "10pm today",
  },
];

await insertMultiple(highlightedDataDb, sampleData);
