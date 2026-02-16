import { NextFunction, Request, Response } from "express";
import ordersService from "./orders.service";
import { OrderStatus } from "../../../prisma/generated/prisma/client";

const createOrder = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as string;
    const result = await ordersService.createOrder(userId, req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const getMyOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userId = req.user?.id as string;
    const result = await ordersService.getMyOrders(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    next(error)
  }
};

const updateOrderStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body as { status: OrderStatus };

    if (!status) throw new Error("Status is required");

    const updatedOrder = await ordersService.updateOrderStatus(orderId as string, status);

    res.status(200).json({
      success: true,
      data: updatedOrder,
    });
  } catch (error) {
   next(error)
  }
};

export default {
  createOrder,
  getMyOrders,
  updateOrderStatus,
};
