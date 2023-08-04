import { initializeShortcuts } from "./CommandHandler";
import { globalState, loadDbSettings, loadHighlights } from "./DataStore";
import { initMessages } from "./MessageHandler";
import { getUser, getHighlights, deleteAllHighlights } from "./graphQL";

// // listining to the incomming messages
initMessages();

// listening for shortcuts
initializeShortcuts();

// refreshes the secrets and initializes the app
async function activateApp() {
  const user = await getUser();
  if (!user) {
    // turn off the app or print error
    return;
  }

  const {
    topic,
    color,
    pen,
    background,
    underline,
    colors,
    topics,
  }: {
    topic: string;
    color: string;
    pen: boolean;
    background: boolean;
    underline: boolean;
    colors: [string];
    topics: [string];
  } = user;

  // setting the global states
  globalState.activeColor = color;
  globalState.penState = pen;
  globalState.backgroundState = background;
  globalState.underlineState = underline;
  globalState.activeTopic = topic;

  const formattedTopics = topics.map((topic) => ({ topic: topic }));
  const formattedColors = colors.map((color) => ({ color: color }));
  // setting the settings
  loadDbSettings(formattedTopics, formattedColors);

  const highlights = await getHighlights();

  if (!highlights) return;

  loadHighlights(highlights);
}

activateApp();
