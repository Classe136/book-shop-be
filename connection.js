import mysql from "mysql2";

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to MySQL Database!");
});

export default connection;
// Example query
// connection.query('SELECT * FROM users', (err, results, fields) => {
//     if (err) throw err;
//     console.log('Connected to MySql !');
//   });

// Close the connection
//   connection.end();
