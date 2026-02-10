import { Request, Response } from "express";
import reviewsService from "./reviews.service";

const createReview = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const result = await reviewsService.createReview(
      userId as string,
      req.body,
    );
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error,
    });
  }
};

const getReviewsByMeal = async (req: Request, res: Response) => {
  try {
    const mealId = req.params.mealId;
    const result = await reviewsService.getReviewsByMeal(mealId as string);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    res
      .status(400)
      .json({
        success: false,
        message: error instanceof Error ? error.message : error,
      });
  }
};

export default {
  createReview,
  getReviewsByMeal,
};
