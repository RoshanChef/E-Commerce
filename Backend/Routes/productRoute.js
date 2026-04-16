const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProductByCat, getAllProducts } = require('../Controllers/Product');
const { Auth, isSeller } = require('../Middlewares/Auth');

const productRouter = express.Router();

// anyone can see
productRouter.get('/getAllProducts', getAllProducts);
productRouter.get('/getCategory/:catId', getProductByCat);

// Seller-only routes

// POST   /api/products/
// PATCH  /api/products/:id
// DELETE /api/products/:id
productRouter.use(Auth);
productRouter.post('/create/', isSeller, createProduct);
productRouter.patch('/update/:productId', isSeller, updateProduct);
productRouter.delete('/delete/:productId', isSeller, deleteProduct);



module.exports = productRouter;