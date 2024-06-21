import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Assuming you have a separate CSS file for styling

const App = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState('business'); // Default category

  const categories = ['business', 'entertainment', 'politics', 'sports', 'cartoon'];

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`http://localhost:5000/articles?category=${category}`); // Fetch from your backend
        setArticles(response.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchArticles();
  }, [category]);

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);
  };

  return (
    <div className="App">
      <h1>Latest News</h1>
      <nav>
        <ul>
          {categories.map((cat, index) => (
            <li key={index}>
              <button onClick={() => handleCategoryChange(cat)} className={cat === category ? 'active' : ''}>{cat}</button>
            </li>
          ))}
        </ul>
      </nav>
      <div className="news-container">
        {loading && <div>Loading...</div>}
        {!loading && articles.length === 0 && <p>No articles found.</p>}
        {!loading && articles.map((article, index) => (
          <div key={index} className='news-details'>
            {article.urlToImage && <img src={article.urlToImage} alt={article.title} />}
            <p>{article.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
