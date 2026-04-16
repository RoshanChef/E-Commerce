const express = require("express");
const userRouter = express.Router();
const { signUp, verify_otp, login, sendOtp, changePassword } = require('../Controllers/Authenction');
const passport = require("passport");
const { Auth } = require("../Middlewares/Auth");
const { addToCart, removeFromCart, updateCart, viewCart, viewCoupon } = require("../Controllers/User");

// Authentication
userRouter.post('/signUp', signUp);
userRouter.post('/login', login);
userRouter.post('/verify', verify_otp)
userRouter.post('/sendOtp', sendOtp);
userRouter.post('/changePassword', changePassword);


//functionality
userRouter.post('/add', Auth, addToCart);
userRouter.delete('/remove/:id', Auth, removeFromCart);
userRouter.get('/get', Auth, viewCart);
userRouter.put('/update/:id/:mark', Auth, updateCart);

userRouter.get('/coupon', Auth, viewCoupon);


// ************ Google signup ************
userRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

userRouter.get('/google/callback', passport.authenticate('google', {
    failureRedirect: '/',
    successRedirect: 'http://localhost:5173/'
}));


module.exports = userRouter;