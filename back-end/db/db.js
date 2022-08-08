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
let MyPool
try {
  // create the pool
   MyPool =  mysql.createPool(db);
   
} catch (e) {
  console.log('Failed to connect to database')
  console.log(`Error Details: ${e.message}`);
  throw e
}
export default MyPool
