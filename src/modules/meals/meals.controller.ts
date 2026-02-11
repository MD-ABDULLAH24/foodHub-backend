import { NextFunction, Request, Response } from "express";
import mealsService from "./meals.service";

const createMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const providerId = req.user?.id;
    const meal = await mealsService.createMeal(providerId!, req.body);
    res.status(200).json({ success: true, data: meal });
  } catch (error) {
    next(error);
  }
};

const getAllMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search } = req.query;
    const searchString = typeof search === "string" ? search : undefined;
    const result = await mealsService.getAllMeals({
      search: searchString,
    });
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};

const getMealById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { mealId } = req.params;
    const result = await mealsService.getMealById(mealId as string);
    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Meal not found",
      });
    }

    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
   next(error)
  }
};

const getMyMeals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mealsService.getMyMeal(req.user?.id as string);
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
};

const updateMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await mealsService.updateMeal(
      req.user!.id,
      req.params.mealId as string,
      req.body,
    );
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

const deleteMeal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await mealsService.deleteMeal(req.user!.id, req.params.mealId as string);
    res.status(200).json({
      success: true,
      message: "Meal deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  createMeal,
  getAllMeals,
  getMealById,
  getMyMeals,
  updateMeal,
  deleteMeal,
};
