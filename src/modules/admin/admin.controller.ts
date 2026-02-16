import { Request, Response, NextFunction } from "express";
import adminUsersService from "./admin.service";
import adminService from "./admin.service";

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminUsersService.getAllUsers();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

const updateUserStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!status) throw new Error("Status is required");

    const updatedUser = await adminUsersService.updateUserStatus(userId as string, status);
    res.status(200).json({ success: true, data: updatedUser });
  } catch (error) {
    next(error);
  }
};

const getAllOrders = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const orders = await adminService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (err) {
    next(err);
  }
};

export default {
  getAllUsers,
  updateUserStatus,
  getAllOrders
};
