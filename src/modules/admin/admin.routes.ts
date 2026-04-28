import { Router } from "express";
import auth from "../../middlewhares/auth";
import { Role } from "../../lib/enum";

import adminUsersController from "./admin.controller";

const router = Router();

// Only Admin can access
router.get(
  "/users",
  auth(Role.ADMIN),
  adminUsersController.getAllUsers
);

router.patch(
  "/:userId/status",
  auth(Role.ADMIN),
  adminUsersController.updateUserStatus
);

router.get(
  "/orders",
  auth(Role.ADMIN),
  adminUsersController.getAllOrders
);

export const adminUsersRouter = router;