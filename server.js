const express = require('express');
const path = require('path');
const app = express();

let scanCount = 0;

app.use(express.static(path.join(__dirname, 'public')));

// Route to handle QR scans
app.get('/scan', (req, res) => {
  scanCount += 1;
  res.redirect('/index.html') //Send the updated content back to the client
});

app.get('/count', (req, res) => {
  res.json({ scanCount });
});

// app.get('/events', (req, res) => {
//   res.setHeader('Content-Type', 'text/event-stream');
//   res.setHeader('Cache-Control', 'no-cache');
//   res.setHeader('Connection', 'keep-alive');
//   res.flushHeaders();

//   res.write(`data: ${scanCount}\n\n`);

//   const intervalId = setInterval(() => {
//     res.write(`data: ${scanCount}\n\n`)
//   }, 1000);

//   req.on('close', () => {
//     clearInterval(intervalId);
//     res.end();
//   })
// })

// server 
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});