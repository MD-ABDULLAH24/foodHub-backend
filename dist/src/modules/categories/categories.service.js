import { prisma } from "../../lib/prisma";
const createCategory = async (data) => {
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
//# sourceMappingURL=categories.service.js.map