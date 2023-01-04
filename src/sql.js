const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sql123123!',
    database: 'books'
})

// Connect to the MySQL server
connection.connect(function(err) {
    if (err) throw err;
    console.log('Connected to the MySQL server.');
  });

module.exports = {connection}
