import { ProviderProfiles } from "../../../prisma/generated/prisma/client";
import { ProviderProfilesWhereInput } from "../../../prisma/generated/prisma/models";
import { prisma } from "../../lib/prisma";

const createProviderProfile = async (
  userId: string,
  data: Omit<ProviderProfiles, "id" | "createdAt" | "userId">,
): Promise<ProviderProfiles> => {
  const exists = await prisma.providerProfiles.findUnique({
    where: { userId },
  });

  if (exists) {
    throw new Error("Provider profile already exists");
  }

  const result = await prisma.providerProfiles.create({
    data: {
      ...data,
      userId,
    },
  });

  return result;
};

const getAllProvider = async ({
  search,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}: {
  search?: string | undefined;
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}) => {
  const skip = (page - 1) * limit;

  const andCondition: ProviderProfilesWhereInput[] = [];

  if (search) {
    andCondition.push({
      restaurantName: { contains: search, mode: "insensitive" },
    });
  }

  const providers = await prisma.providerProfiles.findMany({
    where: { AND: andCondition, isOpen: true },
    skip,
    take: limit,
    orderBy: { [sortBy]: sortOrder },
    include: {
      user: { select: { name: true, email: true, image: true, role: true } },
      meals: true,
      _count: { select: { meals: true } },
    },
  });

  const total = await prisma.providerProfiles.count({
    where: { AND: andCondition, isOpen: true },
  });

  return {
    data: providers,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getProviderById = async (providerId: string) => {
  const result = await prisma.$transaction(async (tx) => {
    const providerData = await tx.providerProfiles.findUnique({
      where: {
        id: providerId,
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            image: true,
            role: true,
          },
        },
        meals: true,
        _count: {
          select: {
            meals: true,
          },
        },
      },
    });

    return providerData;
  });
  return result;
};

const getMyProvider = async (userId: string) => {
  const provider = await prisma.providerProfiles.findUnique({
    where: {
      userId,
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          image: true,
        },
      },
      _count: {
        select: {
          meals: true,
        },
      },
    },
  });
  if (!provider) {
    throw new Error("Provider profile not found");
  }
  return provider;
};



export default {
  createProviderProfile,
  getAllProvider,
  getProviderById,
  getMyProvider,
};
