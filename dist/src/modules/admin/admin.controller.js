import adminUsersService from "./admin.service";
import adminService from "./admin.service";
const getAllUsers = async (req, res, next) => {
    try {
        const users = await adminUsersService.getAllUsers();
        res.status(200).json({ success: true, data: users });
    }
    catch (error) {
        next(error);
    }
};
const updateUserStatus = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const { status } = req.body;
        if (!status)
            throw new Error("Status is required");
        const updatedUser = await adminUsersService.updateUserStatus(userId, status);
        res.status(200).json({ success: true, data: updatedUser });
    }
    catch (error) {
        next(error);
    }
};
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await adminService.getAllOrders();
        res.status(200).json({ success: true, data: orders });
    }
    catch (err) {
        next(err);
    }
};
export default {
    getAllUsers,
    updateUserStatus,
    getAllOrders
};
//# sourceMappingURL=admin.controller.js.map