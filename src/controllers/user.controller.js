const userService = require('../services/user.service');

//register controller 
const register =async (req,res,next) =>{

    try{
        const user = await userService.register(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user
        });
    } catch(error) {
        next(error);
    }

        
};
//Login controller
const login = async(req,res, next) => {
    try{
        const user = await userService.login(req.body);
        
        return res.status(200).json({
            success: true,
            message: "User logged in successfully",
            data:user
        });
    } catch(error){
        next(error);
    }
};


module.exports = {
    register,
    login
};