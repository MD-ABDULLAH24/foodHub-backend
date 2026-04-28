import express from "express";
import { Role } from "../../lib/enum";
import mealsController from "./meals.controller";
import auth from "../../middlewhares/auth";
const router = express.Router();
router.get("/", mealsController.getAllMeals);
router.get("/:mealId", mealsController.getMealById);
router.get("/provider/my-meals", auth(Role.PROVIDER), mealsController.getMyMeals);
router.post("/", auth(Role.PROVIDER), mealsController.createMeal);
router.put("/:mealId", auth(Role.PROVIDER), mealsController.updateMeal);
router.delete("/:mealId", auth(Role.PROVIDER), mealsController.deleteMeal);
export const mealsRouter = router;
//# sourceMappingURL=meals.routes.js.map