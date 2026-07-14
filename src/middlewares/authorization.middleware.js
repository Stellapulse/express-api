const { verifyAccessToken } = require('../utils/jwt');
const authenticate = (req,res,next) =>{
    try{
        const authHeader = req.headers['authorization'];

        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json(
                {
                    message:" Unauthorized Access!"
                }
            );
        }

        const token = authHeader.split(' ')[1];
    
        const payLoad = verifyAccessToken(token);
        
    
        req.user=payLoad;
    } catch(error) {
        return next(error)
    }




    next();

};

module.exports = authenticate;