const mysql = require("mysql");
// const db = mysql.createConnection({
//   host: 'localhost',
//   database: 'taptap',
//   user: 'root',
//   password: ''
// });


const db = mysql.createConnection({
    host: '178.18.242.18',
    port: 3306,
    database: 'ucareer',
    user: 'iwadmin',
    password: '1q2w3e!@'
  });
  

module.exports = db;