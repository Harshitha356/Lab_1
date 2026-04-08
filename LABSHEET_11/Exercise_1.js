const http = require('http');

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  
  // Set headers
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  
  // Route handling
  if (req.url === '/') {
    res.writeHead(200);
    res.write('<h1 style="color:#007bff;">🚀 Node.js HTTP Server</h1>');
    res.write('<ul><li>✅ http module with require()</li>');
    res.write('<li>✅ createServer() callback</li>');
    res.write('<li>✅ setHeader(), write(), end()</li>');
    res.write('<li>✅ listen(3000)</li></ul>');
    res.end();
  } else if (req.url === '/status') {
    res.writeHead(200);
    res.write('<h2>✅ Server Status: Active</h2>');
    res.write('<p>Test from Exercise_1.html buttons!</p>');
    res.end();
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end(`404 - ${req.url} not found\nTry: / or /status`);
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, 'localhost', () => {
  console.log('🚀 Server running: http://localhost:' + PORT + '/');
  console.log('📱 Test: http://localhost:' + PORT + '/status');
  console.log('⏹️ Stop: Ctrl+C');
});