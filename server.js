const translate = require('./translate')
const db = require('./database')
const express = require('express');
const createDatabase = require('./createDatabase')
const app = express();
const port = process.env.PORT || 3000;

//const executeDatabase = require('./database.js')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/database', async (req, res) => {
  try {
      await createDatabase.createTables()
      res.send("Accessed database and created tables")
  } catch (error) {
      console.log("Error accessing database route: ", error)
      res.status(500).send("Error accessing database route")
    }
})

app.get('/new-route', (req, res) => {
  res.send('This is the new route!');
});

// This logic should be moved to a different file
app.post('/', async (req, res) => {
    const uuid = req.headers['x-uuid']
    const data = req.body[0]
    const targetLanguageCode = req.body[1]
    const responseData = []

    db.addUserToDatabase(uuid)
    //db.addActivityToDatabase(uuid, req.body[0].length)

    // Lets add the logic for caching words here - we can make some MONEY off this baby too freaking easy

    const processedWord = await translate.translateText(data, targetLanguageCode)
    responseData.push(processedWord)

/* 
    for (const word in data) {
        console.log("Requesting translation for: ", word)
        //console.log("Word: ", data[word])
        //const processedWord = data[word]
        // Uncomment this and everything should work correctly


        const processedWord = await translate.translateText(data[word], targetLanguageCode)
        responseData.push(processedWord)
    } */
    //res.body = JSON.stringify(responseData)
    res.json(responseData)

    res.status(200)
    //console.log("Server - response data: ", res.body)
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
