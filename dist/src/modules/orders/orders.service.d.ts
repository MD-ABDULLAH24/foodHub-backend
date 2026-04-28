import { OrderStatus } from "../../../prisma/generated/prisma/client";
type OrderItemInput = {
    mealId: string;
    quantity: number;
};
type CreateOrderInput = {
    address: string;
    items: OrderItemInput[];
};
declare const _default: {
    createOrder: (userId: string, data: CreateOrderInput) => Promise<{
        items: ({
            meal: {
                id: string;
                name: string;
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
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        address: string;
        status: OrderStatus;
        totalPrice: number;
    }>;
    getMyOrders: (userId: string) => Promise<{
        items: any[];
        id: string;
        createdAt: Date;
        userId: string;
        address: string;
        status: OrderStatus;
        totalPrice: number;
    }[]>;
    updateOrderStatus: (orderId: string, status: OrderStatus) => Promise<{
        items: {
            id: string;
            price: number;
            mealId: string;
            quantity: number;
            orderId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        address: string;
        status: OrderStatus;
        totalPrice: number;
    }>;
};
export default _default;
//# sourceMappingURL=orders.service.d.ts.map