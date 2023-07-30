import {
  createSearch,
  createSearchResultsUI,
  removeSearch,
} from "../components";
import { initializePen } from "./pen";

createSearch("highlightedData");
createSearchResultsUI("highlightedData");

document.addEventListener("mouseup", initializePen);
