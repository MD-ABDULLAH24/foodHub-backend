import { prisma } from "../../lib/prisma";
import { OrderStatus } from "../../../generated/prisma/client";

type OrderItemInput = {
  mealId: string;
  quantity: number;
};

type CreateOrderInput = {
  address: string;
  items: OrderItemInput[];
};

const createOrder = async (userId: string, data: CreateOrderInput) => {
  let totalPrice = 0;

  const mealsData = await Promise.all(
    data.items.map(async (item) => {
      const meal = await prisma.meals.findUnique({
        where: { id: item.mealId },
      });

      if (!meal) {
        throw new Error(`Meal with ID ${item.mealId} not found`);
      }

      totalPrice += meal.price * item.quantity;

      return {
        mealId: item.mealId,
        quantity: item.quantity,
        price: meal.price,
      };
    }),
  );

  const order = await prisma.order.create({
    data: {
      userId,
      totalPrice,
      address: data.address,
      items: {
        create: mealsData.map((item) => ({
          mealId: item.mealId,
          quantity: item.quantity,
          price: item.price,
        })),
      },
    },
    include: {
      items: {
        include: {
          meal: {
            select: {
              id: true,
              name: true,
              price: true,
              imageUrl: true,
            },
          },
        },
      },
    },
  });

  return order;
};

const getMyOrders = async (userId: string) => {
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          meal: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  // Consolidate duplicate meals
  const consolidatedOrders = orders.map((order) => {
    const consolidatedItems = order.items.reduce((acc: any[], item) => {
      const existing = acc.find((i) => i.mealId === item.mealId);
      if (existing) {
        existing.quantity += item.quantity;
        existing.price += item.price;
      } else {
        acc.push({ ...item });
      }
      return acc;
    }, []);

    return {
      ...order,
      items: consolidatedItems,
    };
  });

  return consolidatedOrders;
};

const updateOrderStatus = async (orderId: string, status: OrderStatus) => {
  const order = await prisma.order.update({
    where: { id: orderId },
    data: { status },
    include: { items: true },
  });

  return order;
};

export default {
  createOrder,
  getMyOrders,
  updateOrderStatus,
};
