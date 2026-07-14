const bcrypt = require('bcrypt');
const { findByEmail , findByContactNumber , createUser , findAuthUserByEmail } = require('../repository/user.repository');
const { generateAccessToken } = require('../utils/jwt');

const register = async({ name, email, password, contact_no }) => {

   const [existingEmail, existingContactNumber] = await Promise.all([
        findByEmail(email),
        findByContactNumber(contact_no)
    ]); 

    if (existingEmail) {
        throw new Error("Email already exists");
    }

    if (existingContactNumber) {
        throw new Error("Contact number already exists");
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
    
    if(!existing) throw new Error('Invalid email or password');
    
    const isMatch = await bcrypt.compare(password,existing.password_hash);
    if(!isMatch){
        throw new Error('Invalid email or password ');
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

module.exports = {
    register,
    login
};