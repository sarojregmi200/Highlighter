import Express from "express";
import env from "dotenv";

// establishes the database connection
import establishDBConnection from "./config/db.config.js";
import highlighterRoute from "./routes/highlighter.route.js";

const app = Express();

env.config({
  path: "./config/.env",
});

establishDBConnection();

const PORT = process.env.PORT || 6000;

app.listen(PORT, () => {
  console.log(`The app is running in the port ${PORT}`);
});

app.use(highlighterRoute);
