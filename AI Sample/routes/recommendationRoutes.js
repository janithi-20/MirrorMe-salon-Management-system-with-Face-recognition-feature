import express from "express";
import {
  getRecommendation,
  createRecommendation,
  listRecommendations,
} from "../controllers/recommendationController.js";

const router = express.Router();

router.get("/", listRecommendations);               
router.get("/:shape", getRecommendation);           
router.post("/", createRecommendation);             

export default router;
