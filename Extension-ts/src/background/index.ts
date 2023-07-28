import { initMessages } from "./MessageHandler";

// creating a default value of the state
let globalState = {
  activeColor: "#8CFF32",
  popupMode: "hidden",
  activeTopic: "Global",
};

// listining to the incomming messages
initMessages();
