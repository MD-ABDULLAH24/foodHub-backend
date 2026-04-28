import mealsService from "./meals.service";
const createMeal = async (req, res, next) => {
    try {
        const providerId = req.user?.id;
        const meal = await mealsService.createMeal(providerId, req.body);
        res.status(200).json({ success: true, data: meal });
    }
    catch (error) {
        next(error);
    }
};
const getAllMeals = async (req, res, next) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const result = await mealsService.getAllMeals({
            search: searchString,
        });
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
const getMealById = async (req, res, next) => {
    try {
        const { mealId } = req.params;
        const result = await mealsService.getMealById(mealId);
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
    }
    catch (error) {
        next(error);
    }
};
const getMyMeals = async (req, res, next) => {
    try {
        const result = await mealsService.getMyMeal(req.user?.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
const updateMeal = async (req, res, next) => {
    try {
        const result = await mealsService.updateMeal(req.user.id, req.params.mealId, req.body);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
const deleteMeal = async (req, res, next) => {
    try {
        await mealsService.deleteMeal(req.user.id, req.params.mealId);
        res.status(200).json({
            success: true,
            message: "Meal deleted successfully",
        });
    }
    catch (error) {
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
//# sourceMappingURL=meals.controller.js.map