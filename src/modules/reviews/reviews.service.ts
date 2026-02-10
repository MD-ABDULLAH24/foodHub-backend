import { prisma } from "../../lib/prisma";

type CreateReviewInput = {
  mealId: string;
  rating: number;
  comment?: string;
};

const createReview = async (userId: string, data: CreateReviewInput) => {
  return await prisma.reviews.create({
    data: {
      authUserId: userId,
      mealId: data.mealId,
      rating: data.rating,
      ...(data.comment && { comment: data.comment }),
    },
  });
};

const getReviewsByMeal = async (mealId: string) => {
  return await prisma.reviews.findMany({
    where: { mealId },
    orderBy: { createdAt: "desc" },
  });
};

export default {
  createReview,
  getReviewsByMeal,
};
