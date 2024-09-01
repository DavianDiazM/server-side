import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParse from "body-parser";
import routes from "./routes/routes";

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(bodyParse.json());
app.use(bodyParse.urlencoded({ extended: true }));
app.use(routes);

app
  .listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
  })
  .on("error", (error) => {
    throw new Error(error.message);
  });
