import Express from "express";
import env from "dotenv";

const app = Express();
env.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`The app is running in the port ${PORT}`);
});
