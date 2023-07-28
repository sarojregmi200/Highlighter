import { create } from "@orama/orama";

export const stateDb = await create({
  schema: {
    activeColor: "string",
    popupMode: "string",
    activeTopic: "string",
  },
});
