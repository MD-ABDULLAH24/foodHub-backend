import reviewsService from "./reviews.service";
const createReview = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const result = await reviewsService.createReview(userId, req.body);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getReviewsByMeal = async (req, res, next) => {
    try {
        const mealId = req.params.mealId;
        const result = await reviewsService.getReviewsByMeal(mealId);
        res.status(200).json({ success: true, data: result });
    }
    catch (error) {
        next(error);
    }
};
export default {
    createReview,
    getReviewsByMeal,
};
//# sourceMappingURL=reviews.controller.js.map