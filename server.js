let scanCount = 0;

function getScanCount() {
  return scanCount;
}

function incrementScanCount(amount) {
  scanCount += amount;
  return scanCount;
}

module.exports = {
  getScanCount,
  incrementScanCount,
}