const mysql = require("mysql");

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "market_mysql"
})

connection.connect((err) => {
    if(err) throw err;
    console.log("DB CONNECTED");
})

module.exports = connection;