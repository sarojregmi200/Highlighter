import express from "express";

import { getAllHighlits } from "../controllers/_highliter.js";
// route that contains the operation realated to highlights
const highliterRoute = express.Router();

highliterRoute.get("/:id", getAllHighlits);

export default highliterRoute;
