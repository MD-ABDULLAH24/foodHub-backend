import { prisma } from "../../lib/prisma";
const createReview = async (userId, data) => {
    return await prisma.reviews.create({
        data: {
            authUserId: userId,
            mealId: data.mealId,
            rating: data.rating,
            ...(data.comment && { comment: data.comment }),
        },
    });
};
const getReviewsByMeal = async (mealId) => {
    return await prisma.reviews.findMany({
        where: { mealId },
        orderBy: { createdAt: "desc" },
    });
};
export default {
    createReview,
    getReviewsByMeal,
};
//# sourceMappingURL=reviews.service.js.map