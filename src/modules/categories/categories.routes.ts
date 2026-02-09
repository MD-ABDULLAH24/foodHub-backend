import express, { Router } from "express";
import categoriesController from "./categories.controller";
import auth, { UserRole } from "../../middlewhares/auth";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), categoriesController.createCategory);

router.get("/", categoriesController.getAllCategories);


export const categoryRouter: Router = router;
