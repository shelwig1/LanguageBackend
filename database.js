import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

async function createTable() {
    // SQL query to create a table
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(100) UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
  
    try {
      // Connect to the database and execute the query
      const client = await pool.connect();
      try {
        await client.query(createTableQuery);
        console.log('Table created successfully!');
      } finally {
        // Release the client back to the pool
        client.release();
      }
    } catch (err) {
      console.error('Error creating table:', err.stack);
    }
  }
  
  // Run the function to create the table
  //createTable().catch(err => console.error('Error in createTable:', err));


module.exports = { createTable }
