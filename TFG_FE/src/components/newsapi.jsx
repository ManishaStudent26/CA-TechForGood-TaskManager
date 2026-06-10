import React, { useState } from 'react';
import { Button, List, ListItem, ListItemText, Typography, CircularProgress, Dialog } from '@mui/material';

export function NewsComponent(){
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const fetchNews = async () => {
    setLoading(true);
    setOpen(true);
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
    <>
      <Button color="inherit" onClick={fetchNews}>
        Latest News
      </Button>

      {/* The Dialog (Hidden until clicked) */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Latest Technology News</DialogTitle>
        <DialogContent dividers>
          {loading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
              <CircularProgress />
            </div>
          ) : (
            <List>
              {articles.map((article, index) => (
                <ListItem key={index} component="a" href={article.url} target="_blank" button>
                  <ListItemText primary={article.title} secondary={article.source.name} />
                </ListItem>
              ))}
            </List>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};