//Trace Example
const traceEvents = require('trace_events');
const tracing = traceEvents.createTracing({ categories: ['node', 'v8'] });
tracing.enable();

tracing.disable();

//Unit test example
test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });

//threads example
const { Worker, isMainThread, parentPort } = require('worker_threads');

if (isMainThread) {
  // This code is executed in the main thread
  new Worker(__filename);
} else {
  // This code is executed in the worker thread
  parentPort.postMessage('Hello from worker');
}

//cluster example
const cluster = require('cluster');
const http = require('http');

if (cluster.isMaster) {
  const numCPUs = require('os').cpus().length;
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }
} else {
  http.createServer((req, res) => {
    res.writeHead(200);
    res.end('hello world\n');
  }).listen(8000);
}

//synchronous vs asynchronous example

const fs = require('fs');
fs.readFile('file.txt', 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
});

const data = fs.readFileSync('file.txt', 'utf8');
console.log(data);

//Function for CPU-intensive Task Example
const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

if (isMainThread) {
  module.exports.runFibonacci = function(num) {
    return new Promise((resolve, reject) => {
      const worker = new Worker(__filename, { workerData: num });
      worker.on('message', resolve);
      worker.on('error', reject);
    });
  };
} else {
  parentPort.postMessage(fibonacci(workerData));
}

//WebSocket Server:
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (message) => {
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});

//caching example
const redis = require('redis');
const client = redis.createClient();

client.set('key', 'value', redis.print);
client.get('key', (err, reply) => {
  console.log(reply);
});

//Login API:
const express = require('express');
const app = express();
app.use(express.json());

const users = [{ username: 'user1', password: 'password1' }]; // Example user data

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username && u.password === password);
  if (user) {
    res.status(200).send('Login successful');
  } else {
    res.status(401).send('Invalid credentials');
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

//Unit Tests example
const request = require('supertest');
const app = require('./app'); // Assuming your Express app is exported from app.js

describe('POST /login', () => {
  it('should return 200 for valid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'password1' });
    expect(response.status).toBe(200);
    expect(response.text).toBe('Login successful');
  });

  it('should return 401 for invalid credentials', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1', password: 'wrongpassword' });
    expect(response.status).toBe(401);
    expect(response.text).toBe('Invalid credentials');
  });

  it('should return 400 for missing fields', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'user1' });
    expect(response.status).toBe(400);
    expect(response.text).toBe('Missing fields');
  });
});

//Function to Convert Roman to Integer:
function romanToInt(s) {
    const romanToIntMap = {
      'I': 1,
      'V': 5,
      'X': 10,
      'L': 50,
      'C': 100,
      'D': 500,
      'M': 1000
    };
    let total = 0;
    for (let i = 0; i < s.length; i++) {
      const current = romanToIntMap[s[i]];
      const next = romanToIntMap[s[i + 1]];
      if (next && current < next) {
        total -= current;
      } else {
        total += current;
      }
    }
    return total;
  }
 
  console.log(romanToInt("MCMXCIV"));
  