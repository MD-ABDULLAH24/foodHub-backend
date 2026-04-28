import express from "express";
import { providerProfileController } from "./providerProfile.controller";
import { Role } from "../../lib/enum";
import auth from "../../middlewhares/auth";
const router = express.Router();
router.get("/", providerProfileController.getAllProvider);
router.get("/my-provider", auth(Role.PROVIDER), providerProfileController.getMyProvider);
router.get("/:providerId", providerProfileController.getProviderById);
router.post("/", auth(Role.PROVIDER), providerProfileController.createProviderProfile);
export const providerProfileRouters = router;
//# sourceMappingURL=providerProfile.routes.js.map