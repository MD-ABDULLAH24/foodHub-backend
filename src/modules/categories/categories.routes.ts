import express from "express";
import categoriesController from "./categories.controller";
import auth from "../../middlewhares/auth";
import { Role } from "../../lib/enum";

const router = express.Router();

// Create category (Admin only)
router.post(
  "/",
  auth(Role.ADMIN),
  categoriesController.createCategory
);

// Get all categories (public)
router.get("/", categoriesController.getAllCategories);

export const categoryRouter = router;