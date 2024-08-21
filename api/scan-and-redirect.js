const { incrementScanCount } = require('../server.js');

export default function handler(req, res) {
  const updatedScanCount = incrementScanCount(100);
  console.log(`QR code scanned. Scan count is now ${updatedScanCount}`);
  res.redirect('/');
}