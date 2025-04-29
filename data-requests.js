const express = require('express');
const router = express.Router();
const path = require('path');

function generateCategoryRoutes(app, data) {
  Object.keys(data).forEach(category => { 
     app.get(`/${category}`, (req, res) => {
     res.json(data[category]); 
     //res.sendFile(Path.join(__dirname, '/index.html'));
       });
       
       app.post(`/${category}`, (req, res) => {
         const newItem = req.body;
         newItem.id = data[category].length ? data[category][data[category].length - 1].id + 1 : 1;
         data[category].push(newItem);
         res.status(201).json(newItem);
       });
   
       app.put(`/${category}/:id`, (req, res) => {
         const id = parseInt(req.params.id);
         const index = data[category].findIndex(item => item.id === id);
         if (index === -1) return res.status(404).json({ error: "Item not found" });
     
         data[category][index] = { ...data[category][index], ...req.body };
         res.json(data[category]);
       });
     
       app.delete(`/${category}/:id`, (req, res) => {
         const id = parseInt(req.params.id);
         data[category] = data[category].filter(item => item.id !== id);
         res.json(data[category]);

         //res.json({ message: "Item deleted" });
       });
  });
  app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
  });
}
    //app.use((req, res) => {
    //res.status(404).json({ error: 'Route not found' });
     
module.exports = generateCategoryRoutes;