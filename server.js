const translate = require('./translate')
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json())

app.get('/', (req, res) => {
  res.send('Hello World!');
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
