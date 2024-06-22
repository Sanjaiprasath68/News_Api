const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();
app.use(cors());

const NEWS_API_KEY = process.env.NEWS_API_KEY; // Your News API key
const NEWS_API_URL = 'https://newsapi.org/v2/everything';

app.get('/api/news', async (req, res) => {
  const { q, from, sortBy } = req.query;

  try {
    const response = await axios.get(NEWS_API_URL, {
      params: {
        q,
        from,
        sortBy,
        apiKey: NEWS_API_KEY
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error);
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

// Serve static files (optional)
app.use(express.static('public'));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
