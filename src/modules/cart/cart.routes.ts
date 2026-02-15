import express, { Router } from "express";
import * as controller from "./cart.controller";
import auth from "../../middlewhares/auth";

const router = express.Router();

router.post("/add", auth(), controller.addToCart);
router.get("/", auth(), controller.getCart);
router.patch("/update", auth(), controller.updateQuantity);
router.delete("/:cartId", auth(), controller.removeItem);
router.delete("/clear/all", auth(), controller.clearCart);

export const cartRouter: Router = router;
