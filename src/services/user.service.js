const bcrypt = require('bcrypt');
const { findByEmail , findByContactNumber , createUser , findAuthUserByEmail , fetchProfile } = require('../repository/user.repository');
const { generateAccessToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');

const register = async({ name, email, password, contact_no }) => {

   const [existingEmail, existingContactNumber] = await Promise.all([
        findByEmail(email),
        findByContactNumber(contact_no)
    ]); 

    if (existingEmail) {
        throw new ApiError(409,"Email already exists");
    }

    if (existingContactNumber) {
        throw new ApiError(409,"Contact number already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user =  await createUser({
        name,
        email,
        password:hashedPassword,
        contact_no
    });

    return {
        name:user.name,
        email:user.email
    };
};

//Login Service
const login = async ({ email , password }) => {

    const existing = await findAuthUserByEmail(email);
    
    if(!existing) throw new ApiError(401,'Invalid email or password');
    
    const isMatch = await bcrypt.compare(password,existing.password_hash);
    if(!isMatch){
        throw new ApiError(401,'Invalid email or password ');
    }
    
    const accessToken = generateAccessToken(existing.user_id);
    
    return {
        accessToken,
        user:{
            user_id : existing.user_id,
            email: existing.email
        }
    };
   
};

//Profile Service

const profile = async(user_id) => {
    try {
        const profile = await fetchProfile(user_id);
        return profile;
    } catch(error) {
        throw new ApiError();
    }
}

module.exports = {
    register,
    login,
    profile
};