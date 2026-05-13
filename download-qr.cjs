const fs = require('fs');
const https = require('https');
const path = require('path');

const url = 'https://files.aistudio.google.com/resources/e491fa9a5f784d8dbebb2c22998a4ed6.jpg';
const dir = path.join(__dirname, 'public', 'assets');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const file = fs.createWriteStream(path.join(dir, 'qr-code.png'));
https.get(url, function(response) {
  response.pipe(file);
});
