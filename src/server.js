const path = require('path');
require("dotenv").config({
    path: path.join(__dirname, '../.env')
});

// console.log({
//     DB_USER: process.env.DB_USER,
//     DB_HOST: process.env.DB_HOST,
//     DB_NAME: process.env.DB_NAME,
//     DB_PASSWORD: process.env.DB_PASSWORD,
//     DB_PORT: process.env.DB_PORT
// });

const express = require('express');
const app = express();
const routes = require("./routes/index")
const errorHandler = require('./middlewares/errorHandler.middleware');

app.use(express.json());
app.use('/api',routes);
app.use(errorHandler);

const pool = require("./config/db");

(async () => {
    try {
        const result = await pool.query("SELECT NOW()");
        console.log("Database connected:", result.rows[0].now);
    } catch (err) {
        console.error(err);
    }
})();

const port = 3000;
app.listen(3000,()=>{
    console.log(`server is listening at http://loacalhost:3000`);
})