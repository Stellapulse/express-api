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

const profile = asyncHandler(async (req,res,next) => {
    console.log(req.user.user_id);
    const user = await userService.profile(req.user.user_id);

    return res.status(200).json({
        success: true,
        message :" Profile fetched Successfully",
        data:user
    })
})

module.exports = {
    register,
    login,
    profile
};