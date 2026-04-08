const http = require('http');
const url = require('url');

let users = [
  { id: 1, name: 'Alice', email: 'alice@email.com' },
  { id: 2, name: 'Bob', email: 'bob@email.com' }
];
let nextId = 3;

const server = http.createServer((req, res) => {
  const { pathname } = url.parse(req.url);
  const method = req.method;
  
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }
  
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let data = {};
    if (body) try { data = JSON.parse(body); } catch(e){}
    
    handleRequest(pathname, method, data, res);
  });
});

function handleRequest(path, method, data, res) {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  
  // GET /api/users
  if (path === '/api/users' && method === 'GET') {
    res.writeHead(200);
    res.end(JSON.stringify({ success: true, data: users }));
  }
  // GET /api/users/:id
  else if (/^\/api\/users\/\d+$/.test(path) && method === 'GET') {
    const id = parseInt(path.split('/')[3]);
    const user = users.find(u => u.id === id);
    if (!user) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'User not found' }));
    } else {
      res.end(JSON.stringify({ success: true, data: user }));
    }
  }
  // POST /api/users
  else if (path === '/api/users' && method === 'POST') {
    const { name, email } = data;
    if (!name || !email) {
      res.writeHead(400);
      res.end(JSON.stringify({ error: 'name & email required' }));
    } else {
      const user = { id: nextId++, name, email };
      users.push(user);
      res.writeHead(201);
      res.end(JSON.stringify({ success: true, data: user }));
    }
  }
  // PUT /api/users/:id
  else if (/^\/api\/users\/\d+$/.test(path) && method === 'PUT') {
    const id = parseInt(path.split('/')[3]);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'User not found' }));
    } else {
      users[idx] = { ...users[idx], ...data };
      res.end(JSON.stringify({ success: true, data: users[idx] }));
    }
  }
  // DELETE /api/users/:id
  else if (/^\/api\/users\/\d+$/.test(path) && method === 'DELETE') {
    const id = parseInt(path.split('/')[3]);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) {
      res.writeHead(404);
      res.end(JSON.stringify({ error: 'User not found' }));
    } else {
      const deleted = users.splice(idx, 1)[0];
      res.end(JSON.stringify({ success: true, data: deleted }));
    }
  }
  else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
  }
}

// PORT 4000 - Avoids conflicts
server.listen(4000, () => {
  console.log('🚀 REST API: http://localhost:4000/api/users');
  console.log('✅ Pure Node.js - No dependencies');
});