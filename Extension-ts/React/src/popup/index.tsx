import Popup from "./popup";

import { createRoot } from "react-dom/client";

function init() {
  const appContainer = document.createElement("div");
  if (!appContainer) {
    throw new Error("Counldnot find the popup app container");
  }
  const root = createRoot(appContainer);
  root.render(<Popup />);
}

init();
