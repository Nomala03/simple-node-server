const http = require('http');
const url = require('url');

const data = {
    movies: [
      { id: 1, title: 'The Great Wall', year: 2017, genre: 'Fantasy', director: 'Zhang Yimou' },
      { id: 2, title: 'Transformers: The Last Knight', year: 2017, genre: 'Action', director: 'Michael Bay' }
    ],
    series: [
      { id: 1, title: 'YOU', seasons: 4, genre: 'Psychological Thriller', platform: 'Netflix' },
      { id: 2, title: 'Adulting', seasons: 3, genre: 'Drama', platform: 'Showmax' }
    ],
    songs: [
      { id: 1, title: 'Girls Need Love', artist: 'Summer Walker', year: 2018, genre: 'R&B' },
      { id: 2, title: 'Mutt', artist: 'Leon Thomas', year: 2024, genre: 'R&B/Soul' }
    ]
  };
  
  function sendJSON(res, status, obj) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(obj));
  }
  
  const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const route = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');
    const method = req.method.toUpperCase();
    const query = parsedUrl.query;
  
    if (!data[route]) {
      return sendJSON(res, 404, { error: 'Not Found' });
    }
  
    let body = '';
  
    req.on('data', chunk => {
      body += chunk.toString();
    });
  
    req.on('end', () => {
      let arr = data[route];
  
      if (method === 'GET') {
        return sendJSON(res, 200, arr);
      }

      if (method === 'POST') {
        try {
          const newItem = JSON.parse(body);
          newItem.id = arr.length ? arr[arr.length - 1].id + 1 : 1;
          arr.push(newItem);
          return sendJSON(res, 200, arr);
        } catch {
          return sendJSON(res, 400, { error: 'Invalid JSON' });
        }
      }
  
      if (method === 'PUT') {
        const id = parseInt(query.id);
        const index = arr.findIndex(item => item.id === id);
        if (index === -1) return sendJSON(res, 404, { error: 'Item not found' });
  
        try {
          const updates = JSON.parse(body);
          arr[index] = { ...arr[index], ...updates };
          return sendJSON(res, 200, arr);
        } catch {
          return sendJSON(res, 400, { error: 'Invalid JSON' });
        }
      }
  
      if (method === 'DELETE') {
        const id = parseInt(query.id);
        if (!id) return sendJSON(res, 400, { error: 'Missing or invalid ID' });
  
        data[route] = arr.filter(item => item.id !== id);
        return sendJSON(res, 200, data[route]);
      }
  
      return sendJSON(res, 405, { error: 'Method not allowed' });
    });
  
    req.on('error', () => {
      sendJSON(res, 500, { error: 'Server error' });
    });
  });
  
  server.listen(3000, () => {
    console.log('🚀 Server running at http://localhost:3000');
  });
  
