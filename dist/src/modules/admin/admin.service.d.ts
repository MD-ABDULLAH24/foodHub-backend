declare const _default: {
    getAllUsers: () => Promise<{
        id: string;
        name: string;
        role: string | null;
        createdAt: Date;
        email: string;
        status: string | null;
    }[]>;
    updateUserStatus: (userId: string, status: string) => Promise<{
        id: string;
        name: string;
        role: string | null;
        email: string;
        status: string | null;
    }>;
    getAllOrders: () => Promise<{
        user: {
            name: string;
            email: string;
        } | null;
        items: ({
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
            price: number;
            mealId: string;
            quantity: number;
            orderId: string;
        })[];
        id: string;
        createdAt: Date;
        userId: string;
        address: string;
        status: import("../../../prisma/generated/prisma/enums").OrderStatus;
        totalPrice: number;
    }[]>;
};
export default _default;
//# sourceMappingURL=admin.service.d.ts.map