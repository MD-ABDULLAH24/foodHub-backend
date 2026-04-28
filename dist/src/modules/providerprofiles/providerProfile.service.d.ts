import { ProviderProfiles } from "../../../prisma/generated/prisma/client";
declare const _default: {
    createProviderProfile: (userId: string, data: Omit<ProviderProfiles, "id" | "createdAt" | "userId">) => Promise<ProviderProfiles>;
    getAllProvider: ({ search, page, limit, sortBy, sortOrder, }: {
        search?: string | undefined;
        page?: number;
        limit?: number;
        sortBy?: string;
        sortOrder?: "asc" | "desc";
    }) => Promise<{
        data: ({
            meals: {
                id: string;
                name: string;
                createdAt: Date;
                providerId: string;
                categoryId: string | null;
                description: string | null;
                price: number;
                imageUrl: string | null;
            }[];
            _count: {
                meals: number;
            };
            user: {
                name: string;
                image: string | null;
                role: string | null;
                email: string;
            };
        } & {
            id: string;
            phone: string;
            createdAt: Date;
            userId: string;
            restaurantName: string;
            address: string;
            isOpen: boolean;
        })[];
        pagination: {
            total: number;
            page: number;
            limit: number;
            totalPages: number;
        };
    }>;
    getProviderById: (providerId: string) => Promise<({
        meals: {
            id: string;
            name: string;
            createdAt: Date;
            providerId: string;
            categoryId: string | null;
            description: string | null;
            price: number;
            imageUrl: string | null;
        }[];
        _count: {
            meals: number;
        };
        user: {
            name: string;
            image: string | null;
            role: string | null;
            email: string;
        };
    } & {
        id: string;
        phone: string;
        createdAt: Date;
        userId: string;
        restaurantName: string;
        address: string;
        isOpen: boolean;
    }) | null>;
    getMyProvider: (userId: string) => Promise<{
        _count: {
            meals: number;
        };
        user: {
            name: string;
            image: string | null;
            email: string;
        };
    } & {
        id: string;
        phone: string;
        createdAt: Date;
        userId: string;
        restaurantName: string;
        address: string;
        isOpen: boolean;
    }>;
};
export default _default;
//# sourceMappingURL=providerProfile.service.d.ts.map