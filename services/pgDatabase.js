//all information needed to connect to the database that is stored on my local computer
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'pets',
  password: 'Tanner2087',
  port: 5434,
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