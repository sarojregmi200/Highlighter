import { initializeShortcuts } from "./CommandHandler";
import {
  globalState,
  highlightedDataDb,
  loadDbSettings,
  loadHighlights,
} from "./DataStore";
import { initMessages } from "./MessageHandler";
import { getUser, getHighlights, deleteAllHighlights } from "./graphQL";
import { refreshSecrets } from "./secrets";

//  listining to the incomming messages
initMessages();

// listening for shortcuts
initializeShortcuts();

export async function activateApp() {
  const storedUser = await refreshSecrets();
  if (!storedUser) return;

  const user = await getUser();
  if (!user) return;

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
  try {
    const user = await getUser();
    if (!user) {
      globalState.authStatus = false;
      return false;
    }
    globalState.authStatus = true;
    return true;
  } catch (e) {
    console.log("Error while checking the auth", e);
  }
}

activateApp();
