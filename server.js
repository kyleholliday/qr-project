const express = require('express');
const path = require('path');
const app = express();

let scanCount = 0;

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/scan', (req, res) => {
  scanCount += 100;
  console.log(`Scan count: ${scanCount}`);
  // Notify all clients
  sseClients.forEach(client => client.res.write(`data: ${scanCount}\n\n`));
  res.send('Scanned')
});

let sseClients = [];

// SSE Endpoint 
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();

  res.write(`data: ${scanCount}\n\n`);

  sseClients.push({ id: Date.now(), res});

  req.on('close', () => {
    sseClients = sseClients.filter(client => client.res !== res)
  })
});

app.get('/scan-and-redirect', (req, res) => {
  scanCount += 100
  console.log(`QR code scanned. Scan count is now ${scanCount}\n\n`);

  sseClients.forEach(client => client.res.write(`data: ${scanCount}\n\n`));

  res.redirect('/');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})