//user schema /table
const { Pool } = require('pg');

const pool = new Pool({

    user : process.env.DB_USER,
    host : process.env.DB_HOST,
    database : process.env.DB_NAME,
    password : process.env.DB_PASSWORD,
    port : process.env.DB_PORT


});

pool.on('connect',()=>{
    console.log("PostgreSql connected ");
});


pool.on('error',(err) => {
    console.error("Unxpected PostgreSql connection error :",err);

    process.exit(1);

});

module.exports = pool;