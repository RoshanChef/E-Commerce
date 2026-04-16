const couponModel = require("../Models/Coupon");
const userModel = require("../Models/User");

async function addToCart(req, res) {
    try {
        const { id: productId } = req.body;
        const userId = req.userId;

        // validate productId
        if (!productId) {
            return res.status(400).json({ mes: "Product ID is required" });
        }

        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ mes: "User not found" });
        }

        // find product in cart (correct ObjectId compare)
        const index = user.cart.findIndex(
            (item) => item.product.toString() === productId
        );

        if (index !== -1) {
            user.cart[index].quantity += 1;
        } else {
            user.cart.push({
                product: productId,
                quantity: 1,
            });
        }

        await user.save();

        return res.status(200).json({
            mes: "Product added to cart",
            cart: user.cart,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mes: "Internal Server error",
        });
    }
}

async function removeFromCart(req, res) {
    try {
        const { id: productId } = req.params;
        const userId = req.userId;
        let user = await userModel.findByIdAndUpdate(userId, {
            $pull: { cart: { product: productId } }
        },
            { new: true }
        );

        res.status(200).json({ user })
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({
            mes: "Internal Server error"
        });
    }
}

async function viewCart(req, res) {
    try {
        const userId = req.userId;
        const user = await userModel.findById(userId)
            .populate({
                path: "cart.product"
            });

        if (!user) return res.status(404).json({ mes: "User not found" });
        res.status(200).json({
            data: user.cart
        })

    } catch (error) {
        console.log(err.message);
        return res.status(500).json({
            mes: "Internal Server error"
        });
    }
}

async function updateCart(req, res) {
    try {
        const { id: productId, mark } = req.params;
        const user = await userModel.findById(req.userId);

        const item = user.cart.find(
            i => i.product.toString() === productId
        );

        if (!item) {
            return res.status(404).json({ mes: "Product not in cart" });
        }

        item.quantity += Number(mark);

        // Remove if quantity <= 0
        user.cart = user.cart.filter(i => i.quantity > 0);

        await user.save();

        res.status(200).json({
            mes: "Cart updated successfully",
            user
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({ mes: "Internal Server error" });
    }
}

async function viewCoupon(req, res) {
    try {
        const coupons = await couponModel.find({
            isActive: true,
            expiryDate: { $gte: new Date() }
        });

        return res.status(200).json({ coupons });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


module.exports = {
    addToCart, removeFromCart,
    viewCart, updateCart,
    viewCoupon
};