const http = require('http');
const { runFibonacci } = require('./fibonacci');

const server = http.createServer(async (req, res) => {
  if (req.url === '/fibonacci' && req.method === 'GET') {
    const result = await runFibonacci(40); // Example number
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`Fibonacci result: ${result}`);
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not Found');
  }
});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
