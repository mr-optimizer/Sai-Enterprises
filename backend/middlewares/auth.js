const ErrorHandler = require('../utils/errorHandlers');
const User = require('../models/user');
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require('jsonwebtoken');

// Check if user is authenticated or not 
exports.isAuthenticatedUser = catchAsyncErrors( async(req,res,next) => {

    const { token } = req.cookies;

    if(!token){
        return next(new ErrorHandler('Login first to access the resource.'));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
});

// handling the user role ('admin' or 'user')
exports.authorizeRoles = (...roles) => {
    return (req,res,next) => {
        if(!roles.includes(req.user.role)){
           return next(new ErrorHandler(`Role (${req.user.role}) is not allowed to access this resource`, 403));
        }
        next();
    }
}