import express from "express";

import { getAllHighlits } from "../controllers/_highlighter.js";
// route that contains the operation realated to highlights
const highlighterRoute = express.Router();

highlighterRoute.get("/:id", getAllHighlits);

export default highlighterRoute;
