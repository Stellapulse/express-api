const pool = require('../config/db');

const findByEmail = async (email) => {

    const result = await pool.query(
        `Select user_id,email 
         from users 
         where email = $1`,
        [email]
    );

    return result.rows[0] || null;

};

const findByContactNumber = async (contactNumber) => {

    const result = await pool.query(
        `Select user_id,contact_no
         from users
         Where contact_no = $1`,
        [contactNumber]
    );

    return result.rows[0] || null;

};

const findAuthUserByEmail = async (email) => {
    const result = await pool.query(
        `SELECT email,password_hash,user_id
         FROM users
         WHERE email = $1`,
        [email]
    );

    return result.rows[0] || null ;
};

const createUser = async({name,email,password,contact_no}) => {
    
    const result = await pool.query(`
        Insert Into users
            (name, email, password_hash, contact_no)
        Values
            ($1, $2, $3, $4)
        Returning
            name,
            email
        `,
        [name,email,password,contact_no]
    );

    return result.rows[0];

};

module.exports = {
    findByEmail,
    findByContactNumber,
    createUser,
    findAuthUserByEmail
};