import mysql from 'mysql2/promise'
const db = {
  host: 'localhost',
  user: 'root',
  database: 'dooma_app',
  password: 'petApp12345!',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
}
// create the pool
const MyPool =  mysql.createPool(db);

export default MyPool