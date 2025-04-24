exports.functiongenerateCategoryRoutes(app, data); {
  Object.keys(data).forEach((category) => {
    app.get(`/${category}`, (req, res) => res.json(data[category]));

    app.post(`/${category}`, (req, res) => {
      const newItem = { id: Date.now(), ...req.body };
      data[category].push(newItem);
      res.json(data[category]);
    });
  });

    app.put(`/${category}/:id`, (req, res) => {
      const id = parseInt(req.params.id);
      const index = data[category].findIndex(item => item.id === id);
      if (index === -1) return res.status(404).json({ error: "Item not found" });
  
      data[category][index] = { ...data[category][index], ...req.body };
      res.json(data[category]);
    });
  
    app.delete(`/data/:dataId`, (req, res) => {
      const id = parseInt(req.params.id);
      data[category] = data[category].filter(item => item.id !== id);
      res.json(data[category]);
    });
  }