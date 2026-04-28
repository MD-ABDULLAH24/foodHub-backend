import express, { Router } from "express";
import { Role } from "../../lib/enum";
import reviewsController from "./reviews.controller";
import auth from "../../middlewhares/auth";

const router = express.Router();
// Customer can create review
router.post("/", auth(Role.CUSTOMER), reviewsController.createReview);

// Anyone can see reviews of a meal
router.get("/meal/:mealId", reviewsController.getReviewsByMeal);

export const reviewsRouter: Router = router;
