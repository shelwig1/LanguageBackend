const {TranslationServiceClient} = require('@google-cloud/translate');

const credentialsBase64 = process.env.GOOGLE_AUTH;
const credentialsJSON = JSON.parse(Buffer.from(credentialsBase64, 'base64').toString('ascii'));

// Instantiates a client
const translationClient = new TranslationServiceClient({
    credentials : credentialsJSON
});

const projectId = 'virtual-cubist-399422';
const location = 'global';

// inputs: (text, lang) -> we can get the lang sent in from background, we don't need any real pain in the ass stuff here
async function translateText(text, targetLanguage) {
    // Construct request


    const request = {
        parent: `projects/${projectId}/locations/${location}`,
        contents: [text],
        mimeType: 'text/plain', // mime types: text/plain, text/html
        sourceLanguageCode: 'en',
        targetLanguageCode: targetLanguage,
    };

    // Run request
    const [response] = await translationClient.translateText(request);


    for (const translation of response.translations) {
        console.log(`Translation: ${translation.translatedText}`);
        return(translation.translatedText)
    }
}


module.exports = {translateText} 