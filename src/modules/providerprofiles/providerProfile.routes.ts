import express, { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";

const router = express.Router();

router.post("/", providerProfileController.createProviderProfile);

export const providerProfileRouters: Router = router;
