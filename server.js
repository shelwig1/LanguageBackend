const translate = require('./translate')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const executeDatabase = require('./database.js')

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/database', async (req, res) => {
  //execute database.js
  res.send("Database code executed")
  executeDatabase()
})

app.get('/new-route', (req, res) => {
  res.send('This is the new route!');
});

app.post('/', async (req, res) => {
    const data = req.body
    const targetLanguageCode = req.body[1]
    console.log("Server - data received:", data)
    const responseData = []
    console.log("Recieved a post request ", data)
    console.log(data.length)
    for (const word in data) {
        //console.log("Word: ", data[word])
        //const processedWord = data[word]
        // Uncomment this and everything should work correctly

        /*
          Who is sending the request?

          Is this word in the database?
            Yes - return the word with the correct language
            No - run translateText and log the information in the database

            Increment the count of the word occuring in the database

            Return everything back over
        */

        const processedWord = await translate.translateText(data[word], targetLanguageCode)
        responseData.push(processedWord)
    }
    //res.body = JSON.stringify(responseData)
    res.json(responseData)

    res.status(200)
    //console.log("Server - response data: ", res.body)
})


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
