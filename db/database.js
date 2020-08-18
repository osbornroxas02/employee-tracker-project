const mysql = require('mysql2');


// create the connection to database
const db = mysql.createConnection({
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PW,
});


module.exports = db;