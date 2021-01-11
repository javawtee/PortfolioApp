var mysql = require('mysql');

const host = '127.0.0.1';
const port = 3307;
const user = 'root';

var connection = mysql.createConnection({
  host,
  port,
  user,
  password: 'my_secret_pw',
  database: 'portfolio_app'
});

connection.connect(err => {
  if (err) return console.error(err);
  console.log(`Successfully connected to mySQL database at ${host}:${port}/${user}`);
});

module.exports = connection;