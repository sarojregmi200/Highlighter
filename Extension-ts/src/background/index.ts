import { initializeShortcuts } from "./CommandHandler";
import { globalState, loadDbSettings, loadHighlights } from "./DataStore";
import { initMessages } from "./MessageHandler";
import { getUser, getHighlights } from "./graphQL";

//  listining to the incomming messages
initMessages();

// listening for shortcuts
initializeShortcuts();

// refreshes the secrets and initializes the app
let interval: boolean | NodeJS.Timeout = false;

export async function activateApp() {
  const user = await getUser();
  if (!user) {
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

// checks and validates the auth tokens and sets a boolean used by popup script to render the different screen
// activates the app if authenticated if not authenticated.
export async function checkAuthStatus(): Promise<boolean> {
  const user = await getUser();
  if (!user) {
    globalState.authStatus = false;
    return false;
  }
  globalState.authStatus = true;
  return true;
}

activateApp();
