const mysql = require('mysql');

const connection = mysql.createConnection({
  password: '',
  user: 'root',
  database: 'news',
  host: 'localhost',
  port: '3306',
});

connection.connect();

let newsdb = {};

newsdb.getAll = () => {};

newsdb.addNews = () => {};

module.exports = newsdb;
