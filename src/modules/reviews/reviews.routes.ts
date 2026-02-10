import express, { Router } from "express";
import auth, { UserRole } from "../../middlewhares/auth";
import reviewsController from "./reviews.controller";

const router = express.Router();
// Customer can create review
router.post("/", auth(UserRole.CUSTOMER), reviewsController.createReview);

// Anyone can see reviews of a meal
router.get("/meal/:mealId", reviewsController.getReviewsByMeal);

export const reviewsRouter: Router = router;
