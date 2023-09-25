const mysql = require("mysql");
const db = mysql.createConnection({
  host: 'localhost',
  database: 'taptap',
  user: 'root',
  password: ''
});


// const db = mysql.createConnection({
//     host: 'localhost:3306',
//     database: 'fasttype',
//     user: 'otgoo1994',
//     password: 'Password1994@'
//   });
  

module.exports = db;