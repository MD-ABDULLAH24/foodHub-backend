import { Request, Response } from "express";
import ordersService from "./orders.service";
import { OrderStatus } from "../../../generated/prisma/client";

const createOrder = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const result = await ordersService.createOrder(userId, req.body);

    res.status(201).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const getMyOrders = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id as string;
    const result = await ordersService.getMyOrders(userId);

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};



const updateOrderStatus = async (req: Request, res: Response) => {
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
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export default {
  createOrder,
  getMyOrders,
  updateOrderStatus,
};
