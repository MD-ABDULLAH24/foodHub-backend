import express, { Router } from "express";
import { providerProfileController } from "./providerProfile.controller";
import auth, { UserRole } from "../../middlewhares/auth";

const router = express.Router();

router.get("/", providerProfileController.getAllProvider);

router.get("/my-provider", auth(UserRole.PROVIDER), providerProfileController.getMyProvider);

router.get("/:providerId", providerProfileController.getProviderById);

router.post(
  "/",
  auth(UserRole.PROVIDER),
  providerProfileController.createProviderProfile,
);

export const providerProfileRouters: Router = router;
