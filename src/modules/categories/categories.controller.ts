import { Request, Response } from "express";
import categoriesService from "./categories.service";

const createCategory = async (req: Request, res: Response) => {
  try {
    const result = await categoriesService.createCategory(req.body);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const result = await categoriesService.getAllCategories();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error instanceof Error ? error.message : "Something went wrong",
    });
  }
};

export default { createCategory, getAllCategories };
