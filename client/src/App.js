import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const BASE_URL = 'https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/everything';

const categories = [
  { name: 'Business', query: 'business' },
  { name: 'Entertainment', query: 'entertainment' },
  { name: 'Sports', query: 'sports' },
  { name: 'Political', query: 'political' },
  { name: 'Cartoons', query: 'cartoons' }
];

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    // Fetch default news on component mount
    fetchNews('tesla');
  }, []);

  const fetchNews = async (query) => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          q: query,
          from: '2024-05-22',
          sortBy: 'publishedAt',
          apiKey: API_KEY
        }
      });
      setArticles(response.data.articles.slice(0, 16)); // Limit to 16 articles (4 images per row, 4 rows)
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const handleClick = (query) => {
    fetchNews(query);
  };

  return (
    <div className="App">
      <nav>
        {categories.map((category, index) => (
          <button key={index} onClick={() => handleClick(category.query)}>
            {category.name}
          </button>
        ))}
      </nav>
      <div className="news-list">
        {articles.length > 0 ? (
          articles.map((article, index) => (
            <div key={index} className="article">
              <img src={article.urlToImage} alt={article.title} />
              <h2>{article.title}</h2>
            </div>
          ))
        ) : (
          <p>No articles found</p>
        )}
      </div>
    </div>
  );
};

export default App;
