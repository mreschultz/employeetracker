const mysql = require("mysql");
const util = require ("util");
require("dotenv").config()

var connection = mysql.createConnection({
	host: "localhost",

	// Your port; if not 3306
	port: 3306,

	// Your username
	user: "root",

	// Your password
	password: process.env.MYSQLPASS,
	database: "department_db",
});

connection.connect(function (err) {
	if (err) {
        console.error("error connecting" + error.stack)
    }
	console.log("connected in " + connection.threadId)
});

connection.query = util.promisify(connection.query)

module.exports = connection;