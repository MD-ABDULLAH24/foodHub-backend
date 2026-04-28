import providerProfileService from "./providerProfile.service";
const createProviderProfile = async (req, res, next) => {
    try {
        const authUserId = req.user?.id;
        if (!authUserId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized",
            });
        }
        const result = await providerProfileService.createProviderProfile(authUserId, req.body);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getAllProvider = async (req, res, next) => {
    try {
        const { search } = req.query;
        const searchString = typeof search === "string" ? search : undefined;
        const result = await providerProfileService.getAllProvider({
            search: searchString,
        });
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
const getProviderById = async (req, res, next) => {
    try {
        const { providerId } = req.params;
        if (!providerId) {
            throw new Error("Provider Id is required");
        }
        const result = await providerProfileService.getProviderById(providerId);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
const getMyProvider = async (req, res, next) => {
    try {
        const user = req.user;
        if (!user) {
            throw new Error("You are unauthorized");
        }
        const result = await providerProfileService.getMyProvider(user?.id);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
};
export const providerProfileController = {
    createProviderProfile,
    getAllProvider,
    getProviderById,
    getMyProvider,
};
//# sourceMappingURL=providerProfile.controller.js.map