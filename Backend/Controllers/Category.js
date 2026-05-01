const { success } = require("zod");
const categoryModel = require("../Models/Category");
const couponModel = require("../Models/Coupon");

async function createCategory(req, res) {
    try {
        const { name, parentId } = req.body;

        // Basic validation
        if (!name) {
            return res.status(400).json({ mes: "Category name is required" });
        }

        // check duplicate
        const existing = await categoryModel.findOne({ name });
        if (existing) {
            return res.status(409).json({ mes: "Category already exists" });
        }

        const category = await categoryModel.create({
            name,
            parentCategory: parentId || null,
        });

        res.status(201).json({
            success: true,
            data: category,
        });
    } catch (error) {
        console.error("Create Category Error:", error);
        res.status(500).json({
            success: false,
            mes: "Internal server error",
        });
    }
}

async function viewCategory(req, res) {
    try {
        const categories = await categoryModel
            .find()
            .populate('parentCategory')
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: categories.length,
            categories
        });

    } catch (error) {
        console.error(error.message);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

async function viewCoupon(req, res) {
    try {
        const now = new Date();

        const coupons = await couponModel.find({
            isActive: true,
            expiryDate: { $gte: now }
        }).sort({ expiryDate: 1 });

        return res.status(200).json({
            success: true,
            count: coupons.length,
            data: coupons
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

async function createCoupon(req, res) {
    try {
        const { code, discountValue, expiryDate, isActive, discountType } = req.body;

        const coupon = await couponModel.create({
            code,
            discountValue,
            discountType,
            isActive,
            expiryDate: expiryDate ? new Date(expiryDate) : null, // safer handling
        });

        return res.status(201).json({
            success: true,
            message: "Coupon created successfully",
            data: coupon
        });

    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}


module.exports = {
    createCategory, viewCategory, viewCoupon
}