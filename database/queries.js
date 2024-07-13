export const addUser = `
    INSERT INTO users (username)
    VALUES ($1)
    ON CONFLICT (username) DO NOTHING;
    `

export const addActivity = `
    INSERT INTO user_activity (user_id, request_characters)
    SELECT id, $2
    FROM users
    WHERE username = $1;
`

export const getWord = `
    SELECT 1
    FROM words
    WHERE word = $1
`
// Assumes the word is already in the database
export const getTranslation = `
    SELECT translation
    FROM translations
    WHERE word_id = (SELECT id FROM words WHERE word = $1) 
    AND language_id = (SELECT id FROM languages WHERE language_code = $2)
`

// HAS NOT BEEN TESTED
export const addTranslation = `
    INSERT INTO translations (word_id, language_id, translation)
    SELECT w.id, l.id, $3
    FROM words AS w
    JOIN languages AS l ON l.language_code = $2
    WHERE w.word = $1;
`