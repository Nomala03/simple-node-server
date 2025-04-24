const express = require('express');
const app = express();

const generateCategoryRoutes = require('./file-manager');
generateCategoryRoutes(app, data);
const port = 3002;

app.use(express.json());

const data = {
  movies: [
      { id: 1, title: 'The Great Wall', year: 2017, genre: 'Fantasy', director: 'Zhang Yimou' },
      { id: 2, title: 'Transformers: The Last Knight', year: 2017, genre: 'Action', director: 'Michael Bay' },
    ],
  series: [
      { id: 1, title: 'YOU', seasons: 4, genre: 'Psychological Thriller', platform: 'Netflix' },
      { id: 2, title: 'Adulting', seasons: 3, genre: 'Drama', platform: 'Showmax' },
    ],
  songs: [
      { id: 1, title: 'Girls Need Love', artist: 'Summer Walker', year: 2018, genre: 'R&B' },
      { id: 2, title: 'Mutt', artist: 'Leon Thomas', year: 2024, genre: 'R&B/Soul' },
    ],
};



app.use((req, res) => {
   res.status(404).json({ error: 'Route not found' });
});


createFile()

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});