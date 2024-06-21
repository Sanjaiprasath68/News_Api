const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint to fetch news articles
app.get('/articles', async (req, res) => {
  const { category } = req.query;
  try {
    const response = await axios.get(`https://newsapi.org/v2/everything?q=${category}&from=2024-05-21&sortBy=publishedAt&apiKey=${process.env.API_KEY}`);
    res.json(response.data.articles);
  } catch (error) {
    console.error('Error fetching data: ', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
