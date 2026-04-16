const express = require('express');
const { Auth, isSellerOrAdmin } = require('../Middlewares/Auth');
const { createCategory, viewCategory } = require('../Controllers/Category');
const categoryRouter = express.Router();

categoryRouter.use(Auth, isSellerOrAdmin);

categoryRouter.post('/create', createCategory);
categoryRouter.get('/read', viewCategory);


module.exports = categoryRouter; 