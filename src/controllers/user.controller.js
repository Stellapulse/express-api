const userService = require('../services/user.service');
const asyncHandler = require('../utils/asyncHandler');

//register controller 
const register =asyncHandler(async (req,res,next) =>{

    const user = await userService.register(req.body);

    return res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: user
    });
        
});
//Login controller
const login = asyncHandler(async(req,res, next) => {
    
    const user = await userService.login(req.body);
    
    return res.status(200).json({
        success: true,
        message: "User logged in successfully",
        data:user
    });

});


module.exports = {
    register,
    login
};