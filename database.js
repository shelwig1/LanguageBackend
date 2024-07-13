const { Pool } = require('pg')

const pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
})

import * as query from './database/queries.js'

async function sendQuery(query, values, useTransaction = false) {
    const client = await pool.connect()
    try {
        const result = await client.query(query, values)
        console.log("Successfully sent query: ", query)
        return result
    } catch (err) {
        console.log("Error with query: ", err)
    } finally {
        client.release()
    }
}

async function addUserToDatabase(uuid) {
    try {
        const result = await sendQuery(query.addUser, [uuid])
        return result
    } catch (err) {
        console.error("Error adding user:", err)
        throw err
    }
}

async function addActivityToDatabase(uuid, request_characters) {
    try {
        const activityResult = await sendQuery(query.addActivity, [uuid , request_characters])
        return activityResult

    } catch (err) {
        console.error("Error - unable to add activity entry: ", err)
        throw err
    }
}

// get translation -> used for does it exist and retrieve it
async function getTranslation(word, targetLanguageCode) {
  // query the database
    const query = `
      SELECT translation
      FROM translations as t
      JOIN words AS w ON t.word_id = w.id
      JOIN languages AS l ON l.id = t.language_id
      WHERE w.word = $1 AND l.language_code = $2
    `
    const values = [word, targetLanguageCode]

    const client = await pool.connect()
    try {
        const result = await client.query(query, values)
        console.log("Successfully got translation")

        return result
    } catch (err) {
        console.log("Error getting translation: ", err)
    } finally {
        client.release()
    }
}

// add translation
async function addTranslation(word, targetLanguageCode, translation) {
    const query = `
    `

    const values = []
}
// 
async function getWord(word) {
    const query = `
      SELECT id
      FROM words
      WHERE word = $1
    `
    const values = [word]

    
}

async function addWord(word) {
    const query = `
    INSERT INTO words (word)
    VALUES $1
    `
    const values = [word]

    const client = await pool.connect()
    try {
        await client.query(query, values)

        console.log("Successfully added word to words: ", word)
    } catch (err) {
        console.log("Error adding word ", word, " to words: ", error)
    } finally {
        client.release()
    }
}

/*
Worker function and query constants
-more modular, easier to change query execution logic in one place - get the 
query execution right once, then you don't have to fuck it up again

dbQueries.js to store all the query constants
dbWorker.js to handle the execution of the queries

vs 

Individual functions for each query 


*/
module.exports = {addUserToDatabase, addActivityToDatabase} 
