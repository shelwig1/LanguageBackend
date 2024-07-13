const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

async function createTables() {
    const client = await pool.connect()
    try {  
/*       await client.query(`
        CREATE TABLE IF NOT EXISTS words (
          id SERIAL PRIMARY KEY,
          word VARCHAR(255) UNIQUE NOT NULL
        )
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS languages (
          id SERIAL PRIMARY KEY,
          language_code VARCHAR(10) UNIQUE NOT NULL,
          language_name VARCHAR(255) NOT NULL
        )
      `);
  
      await client.query(`
        CREATE TABLE IF NOT EXISTS translations (
          word_id INTEGER REFERENCES words(id),
          language_id INTEGER REFERENCES languages(id),
          translation VARCHAR(255),
          count INTEGER,
          PRIMARY KEY (word_id, language_id)
        )
      `);
   */
      /*   await client.query(`
            ALTER TABLE translations
            ADD COLUMN count INTEGER;    
        `) */
        
      console.log('Tables created successfully!');
    } catch (err) {
      console.error('Error creating tables:', err);
    } finally {
        client.release()
    }
  }


module.exports = { createTables }