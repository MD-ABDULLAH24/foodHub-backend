import ordersService from "./orders.service";
const createOrder = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const result = await ordersService.createOrder(userId, req.body);
        res.status(201).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const getMyOrders = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        const result = await ordersService.getMyOrders(userId);
        res.status(200).json({
            success: true,
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
const updateOrderStatus = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const { status } = req.body;
        if (!status)
            throw new Error("Status is required");
        const updatedOrder = await ordersService.updateOrderStatus(orderId, status);
        res.status(200).json({
            success: true,
            data: updatedOrder,
        });
    }
    catch (error) {
        next(error);
    }
};
export default {
    createOrder,
    getMyOrders,
    updateOrderStatus,
};
//# sourceMappingURL=orders.controller.js.map