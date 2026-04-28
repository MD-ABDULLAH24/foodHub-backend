declare const _default: {
    addToCart: (userId: string, mealId: string, quantity: number) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        quantity: number;
    }>;
    getCart: (userId: string) => Promise<({
        meal: {
            id: string;
            name: string;
            createdAt: Date;
            providerId: string;
            categoryId: string | null;
            description: string | null;
            price: number;
            imageUrl: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        quantity: number;
    })[]>;
    updateQuantity: (cartId: string, quantity: number) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        quantity: number;
    }>;
    removeItem: (cartId: string) => Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        mealId: string;
        quantity: number;
    }>;
    clearCart: (userId: string) => Promise<import("../../../prisma/generated/prisma/internal/prismaNamespace").BatchPayload>;
};
export default _default;
//# sourceMappingURL=cart.service.d.ts.map