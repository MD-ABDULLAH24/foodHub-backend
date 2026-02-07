import { prisma } from "../../lib/prisma";

const createOrder = async (userId: string, payload: any) => {
  const order = await prisma.order.create({
    data: {
      userId,
      totalPrice: payload.totalPrice,
      address: payload.address,
      items: {
        create: payload.items.map((item: any) => ({
          mealId: item.mealId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: true,
    },
  });
  return order;
};

export default {
    createOrder,
}