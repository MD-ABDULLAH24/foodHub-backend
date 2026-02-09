import { prisma } from "../../lib/prisma";

type CreateCategoryInput = {
  name: string;
};

const createCategory = async (data: CreateCategoryInput) => {
  const category = await prisma.categories.create({
    data,
  });
  return category;
};

const getAllCategories = async () => {
  const categories = await prisma.categories.findMany({
    orderBy: { id: "desc" },
  });
  return categories;
};

export default {
  createCategory,
  getAllCategories,
};
