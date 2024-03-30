import express from "express";
import generatedDreams from "../controller/dreamController.js";

const router = express.Router();

router.post("/", generatedDreams);

export default router;
