const http = require('http');
const url = require('url');

let requestCount = 0;
const users = ['Alice', 'Bob'];

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url).pathname;
  const method = req.method;
  requestCount++;
  
  console.log(`\n📊 Request #${requestCount} | ${new Date().toLocaleTimeString()} | ${method} ${pathname}`);
  
  // Middleware 1: Request Logger (always runs)
  console.log(`  🆔  MW1: Logger - ID: REQ-${requestCount}`);
  
  // Middleware 2: Request ID assignment
  req.requestId = `REQ-${requestCount}-${Date.now()}`;
  console.log(`  📝  MW2: Assigning ID ${req.requestId}`);
  
  // Simulate JSON parsing
  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    let jsonData = {};
    if (body) {
      try { jsonData = JSON.parse(body); } catch(e) {}
    }
    
    // Middleware 3: API Guard (for /api/*)
    if (pathname.startsWith('/api')) {
      console.log(`  🔒  MW3: API Guard - ${pathname}`);
      
      // Middleware 4: Duration tracking
      console.log(`  ⏱️   MW4: Start timing ${req.requestId}`);
      const start = Date.now();
      
      setImmediate(() => {
        const duration = Date.now() - start;
        console.log(`  ⏱️   MW4: End ${duration}ms - ${req.requestId}`);
        executeRoute(pathname, method, jsonData, res);
      });
    } else {
      // Non-API routes
      console.log(`  🚫  MW3: Skipped (not API route)`);
      executeRoute(pathname, method, jsonData, res);
    }
  });
});

function executeRoute(path, method, data, res) {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  if (path === '/') {
    console.log(`  🎯 Route: Home - Total MW calls: ${requestCount * 3}`);
    res.end(JSON.stringify({
      middleware: 'All layers executed ✅',
      requestId: req.requestId,
      calls: requestCount
    }));
  }
  else if (path === '/public') {
    console.log(`  🌐 Route: Public - Skipped API MW`);
    res.end(JSON.stringify({
      public: true,
      data: 'Direct route',
      id: req.requestId
    }));
  }
  else if (path === '/api/users' && method === 'GET') {
    console.log(`  👥 Route: API Users - Full MW chain`);
    res.end(JSON.stringify({
      success: true,
      users,
      protected: true,
      id: req.requestId
    }));
  }
  else if (path === '/api/login' && method === 'POST') {
    console.log(`  🔑 Route: Login - Data:`, data);
    res.end(JSON.stringify({
      success: true,
      token: 'jwt-token-123',
      user: data.username || 'unknown',
      id: req.requestId
    }));
  }
  else {
    console.log(`  ❌ Route: 404 MW - ${path}`);
    res.statusCode = 404;
    res.end(JSON.stringify({ error: 'Not found', calls: requestCount }));
  }
}

server.listen(4000, () => {
  console.log('\n🚀 Middleware Demo: http://localhost:4000/');
  console.log('Test order: / | /public | /api/users');
  console.log('Watch MW execution flow!\n');
});