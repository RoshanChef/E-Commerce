const categoryModel = require("../Models/Category");

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
        const category = await categoryModel.find().populate('parentCategory');
        res.status(200).json(category);
    }
    catch (err) {
        res.status(500).json(err);
    }
}

module.exports = {
    createCategory, viewCategory
}