const { incrementScanCount } = require('../server.js');

export default function handler(req, res) {
  const updatedScanCount = incrementScanCount(100);
  console.log(`Scan count is now ${updatedScanCount}`);
  res.send('Scanned');
}