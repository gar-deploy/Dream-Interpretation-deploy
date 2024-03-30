import express from "express";
import env from "dotenv";
import dbConnection from "./db/dbConnection.js";
import dreamRouter from "./router/dreamRouter.js";

env.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use("/", dreamRouter);

app.listen(port, () => {
  dbConnection();
  console.log(`Server is conected with port ${port}`);
});
