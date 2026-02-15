import { Meals, Prisma } from "../../../prisma/generated/prisma/client";
import  {prisma}  from "../../lib/prisma";

type CreateMealInput = Omit<Meals, "id" | "createdAt" | "providerId">;

const createMeal = async (
  userId: string,
  data: CreateMealInput,
): Promise<Meals> => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      userId,
    },
  });
  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }
  const meal = await prisma.meals.create({
    data: {
      ...data,
      providerId: providerProfile.id,
    },
  });
  return meal;
};

const getAllMeals = async ({
  search,
  categoryId,
  minPrice,
  maxPrice,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}: {
  search?: string | undefined;
  categoryId?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const skip = (page - 1) * limit;
  const andConditions: Prisma.MealsWhereInput[] = [];

  if (search) {
    andConditions.push({
      OR: [
        {
          name: { contains: search, mode: "insensitive" },
        },
        {
          category: {
            name: { contains: search, mode: "insensitive" },
          },
        },
      ],
    });
  }
  if (categoryId) {
    andConditions.push({ categoryId });
  }

  if (minPrice !== undefined || maxPrice !== undefined) {
    const priceFilter: Prisma.FloatFilter = {};
    if (minPrice !== undefined) priceFilter.gte = minPrice;
    if (maxPrice !== undefined) priceFilter.lte = maxPrice;

    andConditions.push({
      price: priceFilter,
    });
  }
  const meals = await prisma.meals.findMany({
    where: {
      AND: andConditions,
      provider: {
        isOpen: true,
      },
    },
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
    include: {
      provider: {
        select: {
          restaurantName: true,
        },
      },
    },
  });
  const total = await prisma.meals.count({
    where: {
      AND: andConditions,
      provider: {
        isOpen: true,
      },
    },
  });
  return {
    data: meals,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getMealById = async (mealId: string) => {
  const meal = await prisma.meals.findUnique({
    where: { id: mealId },
    include: {
      provider: {
        select: {
          restaurantName: true,
          isOpen: true,
        },
      },
      category: {
        select: {
          name: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },
  });
  if (!meal) {
    throw new Error("Meal not found");
  }
  return meal;
};

const getMyMeal = async (userId: string) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      userId,
    },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  const meals = await prisma.meals.findMany({
    where: {
      providerId: providerProfile.id,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
      provider: {
        select: {
          restaurantName: true,
          isOpen: true,
        },
      },
      _count: {
        select: {
          reviews: true,
        },
      },
    },

    orderBy: {
      createdAt: "desc",
    },
  });

  return meals;
};

const updateMeal = async (
  userId: string,
  mealId: string,
  data: Partial<CreateMealInput>,
) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      userId,
    },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  const meal = await prisma.meals.findFirst({
    where: { id: mealId, providerId: providerProfile.id },
  });
  if (!meal) throw new Error("Unauthorized or meal not found");

  return prisma.meals.update({
    where: { id: mealId },
    data,
  });
};

const deleteMeal = async (userId: string, mealId: string) => {
  const providerProfile = await prisma.providerProfiles.findUnique({
    where: {
      userId,
    },
  });

  if (!providerProfile) {
    throw new Error("Provider profile not found");
  }

  const meal = await prisma.meals.findFirst({
    where: { id: mealId, providerId: providerProfile.id },
  });
  if (!meal) throw new Error("Unauthorized or meal not found");

  await prisma.meals.delete({ where: { id: mealId } });
};

export default {
  createMeal,
  getAllMeals,
  getMealById,
  getMyMeal,
  updateMeal,
  deleteMeal,
};
