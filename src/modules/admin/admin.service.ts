import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
};

const updateUserStatus = async (userId: string, status: string) => {
  return prisma.user.update({
    where: { id: userId },
    data: { status },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
    },
  });
};


const getAllOrders = async () => {
  const orders = await prisma.order.findMany({
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


  const ordersWithUser = await Promise.all(
    orders.map(async (order) => {
      const user = await prisma.user.findUnique({
        where: { id: order.userId },
        select: { name: true, email: true },
      });
      return {
        ...order,
        user,
      };
    })
  );

  return ordersWithUser;
};

export default {
  getAllUsers,
  updateUserStatus,
  getAllOrders
};
