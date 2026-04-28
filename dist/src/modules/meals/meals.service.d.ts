import { Meals } from "../../../prisma/generated/prisma/client";
type CreateMealInput = Omit<Meals, "id" | "createdAt" | "providerId">;
declare const _default: {
    createMeal: (userId: string, data: CreateMealInput) => Promise<Meals>;
    getAllMeals: ({ search, categoryId, minPrice, maxPrice, page, limit, sortBy, sortOrder, }: {
        search?: string | undefined;
        categoryId?: string;
        minPrice?: number;
        maxPrice?: number;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }) => Promise<{
        data: ({
            provider: {
                restaurantName: string;
            };
        } & {
            id: string;
            name: string;
            createdAt: Date;
            providerId: string;
            categoryId: string | null;
            description: string | null;
            price: number;
            imageUrl: string | null;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getMealById: (mealId: string) => Promise<{
        _count: {
            reviews: number;
        };
        provider: {
            restaurantName: string;
            isOpen: boolean;
        };
        category: {
            name: string;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        providerId: string;
        categoryId: string | null;
        description: string | null;
        price: number;
        imageUrl: string | null;
    }>;
    getMyMeal: (userId: string) => Promise<({
        _count: {
            reviews: number;
        };
        provider: {
            restaurantName: string;
            isOpen: boolean;
        };
        category: {
            name: string;
        } | null;
    } & {
        id: string;
        name: string;
        createdAt: Date;
        providerId: string;
        categoryId: string | null;
        description: string | null;
        price: number;
        imageUrl: string | null;
    })[]>;
    updateMeal: (userId: string, mealId: string, data: Partial<CreateMealInput>) => Promise<{
        id: string;
        name: string;
        createdAt: Date;
        providerId: string;
        categoryId: string | null;
        description: string | null;
        price: number;
        imageUrl: string | null;
    }>;
    deleteMeal: (userId: string, mealId: string) => Promise<void>;
};
export default _default;
//# sourceMappingURL=meals.service.d.ts.map