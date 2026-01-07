const mysql = require("mysql2/promise");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Kkkalam@152",
  database: "crud_operations"
});

module.exports = db;
