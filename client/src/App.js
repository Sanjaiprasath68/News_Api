import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [news, setNews] = useState([]);

    useEffect(() => {
        async function fetchNews() {
            try {
                const response = await axios.get('https://news-article-api-dusky.vercel.app/news');
                setNews(response.data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        fetchNews();
    }, []);

    // Slice the news array to exclude the first 4 articles
    const filteredNews = news.slice(4);

    return (
        <div className="App">
            <h1>Latest News</h1>
            <div className="news-container">
                {filteredNews.map((article, index) => (
                    <div key={index} className="news-item">
                        <img src={article.urlToImage} alt={article.title} />
                        <h2>{article.title}</h2>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">Read more</a>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
