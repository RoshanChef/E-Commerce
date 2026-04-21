const orderModel = require("../Models/Order");

async function viewOrders(req, res) {
    try {
        const orders = await orderModel
            .find({ user: req.userId })
            .populate('products.product')
            .sort({ createdAt: -1 });

        // Handle case where user has no orders
        if (!orders || orders.length === 0) {
            return res.status(200).send({
                success: true,
                message: "No orders found",
                response: []
            });
        }

        res.status(200).send({
            success: true,
            count: orders.length,
            orders
        });

    } catch (error) {
        console.error("Order Fetch Error:", error.message);
        return res.status(500).send({
            success: false,
            message: 'Internal server error'
        });
    }
}


module.exports = {  viewOrders };