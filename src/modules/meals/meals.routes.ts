import express, { Router } from "express";
import auth, { UserRole } from "../../middlewhares/auth";
import mealsController from "./meals.controller";

const router = express.Router();

router.get("/", mealsController.getAllMeals);

router.get("/:mealId", mealsController.getMealById);

router.get(
  "/provider/my-meals",
  auth(UserRole.PROVIDER),
  mealsController.getMyMeals,
);

router.post("/", auth(UserRole.PROVIDER), mealsController.createMeal);

router.put("/:mealId", auth(UserRole.PROVIDER), mealsController.updateMeal);

router.delete("/:mealId", auth(UserRole.PROVIDER), mealsController.deleteMeal);
export const mealsRouter: Router = router;
