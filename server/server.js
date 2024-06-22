const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
// const NEWS_API_KEY = "fcbbcb7727e54c4b8ebee1005f653881";

app.get('/', async (req, res) => {
    try {
        res.send("Welcome")
    } catch (error) {
        console.error('Error fetching news:', error.message); // Log the error message
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
});

app.get('/news', async (req, res) => {
    try {
        const response = await axios.get('https://newsapi.org/v2/everything?q=apple&from=2024-06-21&to=2024-06-21&sortBy=popularity&apiKey=fcbbcb7727e54c4b8ebee1005f653881');
        console.log('News API Response:', response.data.articles.length); // Log the number of articles received
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching news:', error.message); // Log the error message
        res.status(500).json({ error: 'Failed to fetch news data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

console.log(process.env); // Log all environment variables
