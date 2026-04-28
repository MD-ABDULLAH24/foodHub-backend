type CreateReviewInput = {
    mealId: string;
    rating: number;
    comment?: string;
};
declare const _default: {
    createReview: (userId: string, data: CreateReviewInput) => Promise<{
        id: string;
        createdAt: Date;
        mealId: string;
        authUserId: string;
        rating: number;
        comment: string | null;
    }>;
    getReviewsByMeal: (mealId: string) => Promise<{
        id: string;
        createdAt: Date;
        mealId: string;
        authUserId: string;
        rating: number;
        comment: string | null;
    }[]>;
};
export default _default;
//# sourceMappingURL=reviews.service.d.ts.map