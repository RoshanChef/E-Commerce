const express = require('express');
const { createProduct, updateProduct, deleteProduct, getProductByCat, getAllProducts, getAllOrders, getAllSellerProducts } = require('../Controllers/Product');
const { Auth, isSeller } = require('../Middlewares/Auth');
const { createReview, getProductReviews } = require('../Controllers/Review');
const productRouter = express.Router();

productRouter.get('/getCategory/:catId', getProductByCat);
productRouter.get('/getAllProducts', getAllProducts);

// Seller-only routes

// POST   /api/products/
// PATCH  /api/products/:id
// DELETE /api/products/:id
productRouter.use(Auth);
productRouter.get('/getAllSellerProducts', getAllSellerProducts);
productRouter.get('/getAllOrders', getAllOrders);
productRouter.post('/create/', isSeller, createProduct);
productRouter.patch('/update/:productId', isSeller, updateProduct);
productRouter.delete('/delete/:productId', isSeller, deleteProduct);

// Review orders
productRouter.post('/create/Review', createReview);
productRouter.post('/getReview', getProductReviews);

module.exports = productRouter;