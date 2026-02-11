import { NextFunction, Request, Response } from "express";
import categoriesService from "./categories.service";

const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoriesService.createCategory(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error)
  }
};

const getAllCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await categoriesService.getAllCategories();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error)
  }
};

export default { createCategory, getAllCategories };
