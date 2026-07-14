const jwt = require('jsonwebtoken');
const secret_key= process.env.JWT_SECRET;

const verifyAccessToken = (token) => {

  const payload = jwt.verify(token,secret_key);
  return payload;
}

const generateAccessToken = (user_id) => {
    const token = jwt.sign({user_id},secret_key,{expiresIn:process.env.JWT_EXPIRES_IN});
    return token;
}

module.exports = {
    verifyAccessToken,
    generateAccessToken

}