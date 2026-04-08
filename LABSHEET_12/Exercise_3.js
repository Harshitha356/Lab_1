const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const path = require('path');

const DB_FILE = 'users.json';

async function loadUsers() {
  try {
    const data = await fs.readFile(DB_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeFile(DB_FILE, JSON.stringify(users, null, 2));
}

const server = http.createServer(async (req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;
  
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
  req.on('end', async () => {
    let requestData = {};
    if (body) {
      try { requestData = JSON.parse(body); } catch(e) {}
    }
    
    try {
      const users = await loadUsers();
      let response = { success: false };
      let statusCode = 200;
      
      if (pathname === '/api/users' && method === 'GET') {
        response = { success: true, data: users };
      }
      else if (pathname === '/api/users' && method === 'POST') {
        const { name, email, age } = requestData;
        if (!name || !email) {
          statusCode = 400;
          response = { error: 'Name and email required' };
        } else {
          const newUser = {
            id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
            name, email, age: age || 0,
            created: new Date().toISOString()
          };
          users.push(newUser);
          await saveUsers(users);
          statusCode = 201;
          response = { success: true, data: newUser };
        }
      }
      else if (/^\/api\/users\/(\d+)$/.test(pathname)) {
        const id = parseInt(pathname.match(/\/api\/users\/(\d+)/)[1]);
        
        if (method === 'GET') {
          const user = users.find(u => u.id === id);
          response = user ? { success: true, data: user } : { error: 'User not found' };
          statusCode = user ? 200 : 404;
        }
        else if (method === 'PUT') {
          const userIndex = users.findIndex(u => u.id === id);
          if (userIndex === -1) {
            statusCode = 404;
            response = { error: 'User not found' };
          } else {
            users[userIndex] = { ...users[userIndex], ...requestData };
            await saveUsers(users);
            response = { success: true, data: users[userIndex] };
          }
        }
        else if (method === 'DELETE') {
          const userIndex = users.findIndex(u => u.id === id);
          if (userIndex === -1) {
            statusCode = 404;
            response = { error: 'User not found' };
          } else {
            const deletedUser = users.splice(userIndex, 1)[0];
            await saveUsers(users);
            response = { success: true, data: deletedUser };
          }
        }
      }
      else {
        statusCode = 404;
        response = { error: 'Route not found' };
      }
      
      res.statusCode = statusCode;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(response));
      
    } catch (error) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: error.message }));
    }
  });
});

server.listen(4000, () => {
  console.log('🚀 Exercise 3: MongoDB-style CRUD API');
  console.log('  http://localhost:4000/api/users');
  console.log('  💾 Data saved to users.json');
  console.log('  📱 Test with Exercise_3.html');
});