import dotenv from "dotenv";
import { Connection } from "./db/index.js";
import { app } from "./app.js";
dotenv.config({
  path: "./env",
});

const port = process.env.PORT || 3000;

Connection()
  .then(() => {
    app.listen(port, () => {
      console.log("Connected to port " + port);
    });
    app.on("error", (err) => {
      console.log("Error: " + err);
      throw err;
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection error: " + err);
  });
