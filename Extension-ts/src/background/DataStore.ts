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
