import express, { Router } from "express";
import { Role } from "../../lib/enum";
import ordersController from "./orders.controller";
import auth from "../../middlewhares/auth";

const router: Router = express.Router();

// Customer can create order & get their orders
router.post("/", auth(Role.CUSTOMER), ordersController.createOrder);
router.get("/", auth(Role.CUSTOMER), ordersController.getMyOrders);

// Provider/Admin can update order status
router.patch("/:orderId/status", auth(Role.PROVIDER, Role.ADMIN), ordersController.updateOrderStatus);

export const ordersRouters = router;
