import { Request, Response } from "express";
import cartService from "./cart.service";

const addToCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const { mealId, quantity } = req.body;

    const result = await cartService.addToCart(userId, mealId, quantity);

    res.status(200).json({
      success: true,
      message: "Added to cart",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

const getCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const cart = await cartService.getCart(userId);

    res.json({
      success: true,
      data: cart,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateQuantity = async (req: Request, res: Response) => {
   try {
    const { cartId, quantity } = req.body;

    if (!cartId) {
      return res.status(400).json({ success: false, message: "cartId is required" });
    }

    if (quantity === undefined || quantity < 1) {
      return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
    }

    const result = await cartService.updateQuantity(cartId, quantity);

    res.status(200).json({
      success: true,
      message: "Quantity updated",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
};

const removeItem = async (req: Request, res: Response) => {
  try {
    const { cartId } = req.params;

    await cartService.removeItem(cartId as string);

    res.json({
      success: true,
      message: "Item removed",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const clearCart = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    await cartService.clearCart(userId);

    res.json({
      success: true,
      message: "Cart cleared",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export {
  addToCart,
  getCart,
  updateQuantity,
  removeItem,
  clearCart,
};
