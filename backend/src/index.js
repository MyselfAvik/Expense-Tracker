import { connectDB } from "../db/db.js";
import app from "./app.js";
import dotenv from "dotenv";
dotenv.config({ quiet: true });

const PORT = process.env.PORT;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("server is running on port", PORT);
  });
});
