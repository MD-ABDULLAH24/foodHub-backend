import express, { Router } from "express";
import auth, { UserRole } from "../../middlewhares/auth";
import ordersController from "./orders.controller";

const router: Router = express.Router();

// Customer can create order & get their orders
router.post("/", auth(UserRole.CUSTOMER), ordersController.createOrder);
router.get("/", auth(UserRole.CUSTOMER), ordersController.getMyOrders);

// Provider/Admin can update order status
router.patch("/:orderId/status", auth(UserRole.PROVIDER, UserRole.ADMIN), ordersController.updateOrderStatus);

export const ordersRouters = router;
