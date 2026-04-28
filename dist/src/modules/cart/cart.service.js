import { prisma } from "../../lib/prisma";
const addToCart = async (userId, mealId, quantity) => {
    const existing = await prisma.cart.findUnique({
        where: {
            userId_mealId: { userId, mealId },
        },
    });
    if (existing) {
        return prisma.cart.update({
            where: { id: existing.id },
            data: { quantity: existing.quantity + quantity },
        });
    }
    return prisma.cart.create({
        data: { userId, mealId, quantity },
    });
};
const getCart = async (userId) => {
    return prisma.cart.findMany({
        where: { userId },
        include: { meal: true },
    });
};
const updateQuantity = async (cartId, quantity) => {
    if (!cartId)
        throw new Error("cartId is required");
    return prisma.cart.update({
        where: { id: cartId },
        data: { quantity },
    });
};
const removeItem = async (cartId) => {
    return prisma.cart.delete({
        where: { id: cartId },
    });
};
const clearCart = async (userId) => {
    return prisma.cart.deleteMany({
        where: { userId },
    });
};
export default {
    addToCart,
    getCart,
    updateQuantity,
    removeItem,
    clearCart,
};
//# sourceMappingURL=cart.service.js.map