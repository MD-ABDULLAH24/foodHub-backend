type CreateCategoryInput = {
    name: string;
};
declare const _default: {
    createCategory: (data: CreateCategoryInput) => Promise<{
        id: string;
        name: string;
        image: string | null;
    }>;
    getAllCategories: () => Promise<{
        id: string;
        name: string;
        image: string | null;
    }[]>;
};
export default _default;
//# sourceMappingURL=categories.service.d.ts.map