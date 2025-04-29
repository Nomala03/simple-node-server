const express = require('express');
const path = require('path');
const app = express();
const data = require('./data.json')
const generateCategoryRoutes = require('./data-requests');
const { createFile } = require('./file-manager'); 
const port = 3002;
//const filePath = path.join(__dirname, './index.html');

app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

generateCategoryRoutes(app, data);


app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});


//createFile(filePath, { movies: [], songs: [], series: [] })
//createFile()
//app.use(express.json());


