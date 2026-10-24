const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/css/style.css',
  'http://localhost:3000/js/app.js',
  'http://localhost:3000/js/audio.js',
  'http://localhost:3000/js/game.js',
  'http://localhost:3000/js/map.js',
  'http://localhost:3000/assets/images/hero_sketch.jpg'
];

async function checkUrl(url) {
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let len = 0;
      res.on('data', chunk => len += chunk.length);
      res.on('end', () => {
        console.log(`[${res.statusCode}] ${url} (${len} bytes)`);
        resolve(res.statusCode === 200);
      });
    }).on('error', (err) => {
      console.error(`[ERR] ${url}:`, err.message);
      resolve(false);
    });
  });
}

(async () => {
  console.log('Testing server endpoints...');
  for (const url of urls) {
    await checkUrl(url);
  }
  process.exit(0);
})();
