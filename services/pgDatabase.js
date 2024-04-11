//all information needed to connect to the database that is stored on my local computer
const Pool = require('pg').Pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

//function to connect to the database
async function connectToDatabase() {
  try {
    await pool.connect();
    console.log('Connected to PostgreSQL database, pets');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

//calling the function
connectToDatabase();

module.exports = pool;