const express = require('express');
const { Auth, isSellerOrAdmin, isAdmin } = require('../Middlewares/Auth');
const { createCategory, viewCategory } = require('../Controllers/Category');
const { viewCoupon } = require('../Controllers/User');
const categoryRouter = express.Router();


categoryRouter.post('/create', Auth, isAdmin, createCategory);
categoryRouter.post('/view-coupons', Auth, isAdmin, viewCoupon);
categoryRouter.get('/read',Auth, isSellerOrAdmin, viewCategory);


module.exports = categoryRouter; 