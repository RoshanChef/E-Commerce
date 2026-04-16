const categoryModel = require("../Models/Category");

async function createCategory(req, res) {
    const { name: categoryName, parentId: parentCategory } = req.body;
    const category = await categoryModel.create({ categoryName, parentCategory });
    res.status(201).json(category);
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