import { Router } from "express";
import auth, { UserRole } from "../../middlewhares/auth";
import adminUsersController from "./admin.controller";
import adminController from "./admin.controller";

const router = Router();

// Only Admin can access
router.get("/users", auth(UserRole.ADMIN), adminUsersController.getAllUsers);
router.patch("/:userId/status", auth(UserRole.ADMIN), adminUsersController.updateUserStatus);
router.get("/orders", auth(UserRole.ADMIN), adminController.getAllOrders);

export const adminUsersRouter = router;
