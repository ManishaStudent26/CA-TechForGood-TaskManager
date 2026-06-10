import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Typography, CircularProgress } from '@mui/material';

export function NewsComponent(){
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:5000/api/get-news');
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={fetchNews}>
        Get News
      </Button>

      {loading && <CircularProgress sx={{ display: 'block', mt: 2 }} />}

      <List>
        {articles.map((article, index) => (
          <ListItem key={index} button component="a" href={article.url} target="_blank">
            <ListItemText 
              primary={article.title} 
              secondary={article.source.name} 
            />
          </ListItem>
        ))}
      </List>
    </div>
  );
};