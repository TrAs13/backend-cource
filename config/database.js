import mysql from "mysql2";

// create the connection to database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'lmz0520hq10',
  database: 'course'
});

export default db;