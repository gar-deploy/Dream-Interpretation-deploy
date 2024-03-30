import express from "express";
import env from "dotenv";
import dbConnection from "./db/dbConnection.js";
import dreamRouter from "./router/dreamRouter.js";

env.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.use("/dream", dreamRouter);
app.use("/*", (req, res) => {
  res.status(400).json({Error: "Oopss! Seems link entered wrong URL. Please check the URL again."})
})

app.listen(port, () => {
  dbConnection();
  console.log(`Server is conected with port ${port}`);
});
