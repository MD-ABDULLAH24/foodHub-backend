import cartService from "./cart.service";
const addToCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { mealId, quantity } = req.body;
        const result = await cartService.addToCart(userId, mealId, quantity);
        res.status(200).json({
            success: true,
            message: "Added to cart",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};
const getCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        const cart = await cartService.getCart(userId);
        res.json({
            success: true,
            data: cart,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const updateQuantity = async (req, res) => {
    try {
        const { cartId, quantity } = req.body;
        if (!cartId) {
            return res.status(400).json({ success: false, message: "cartId is required" });
        }
        if (quantity === undefined || quantity < 1) {
            return res.status(400).json({ success: false, message: "Quantity must be at least 1" });
        }
        const result = await cartService.updateQuantity(cartId, quantity);
        res.status(200).json({
            success: true,
            message: "Quantity updated",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
};
const removeItem = async (req, res) => {
    try {
        const { cartId } = req.params;
        await cartService.removeItem(cartId);
        res.json({
            success: true,
            message: "Item removed",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
const clearCart = async (req, res) => {
    try {
        const userId = req.user?.id;
        await cartService.clearCart(userId);
        res.json({
            success: true,
            message: "Cart cleared",
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
export { addToCart, getCart, updateQuantity, removeItem, clearCart, };
//# sourceMappingURL=cart.controller.js.map