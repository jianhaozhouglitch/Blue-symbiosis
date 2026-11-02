const http = require('http');

const urls = [
  'http://localhost:3000/',
  'http://localhost:3000/css/style.css',
  'http://localhost:3000/css/product.css',
  'http://localhost:3000/js/products-data.js',
  'http://localhost:3000/js/product-detail.js',
  'http://localhost:3000/js/app.js',
  'http://localhost:3000/js/audio.js',
  'http://localhost:3000/js/game.js',
  'http://localhost:3000/js/map.js',
  'http://localhost:3000/product.html',
  'http://localhost:3000/product.html?id=prod-hdpe',
  'http://localhost:3000/product.html?id=prod-pet',
  'http://localhost:3000/product.html?id=prod-pp',
  'http://localhost:3000/product.html?id=prod-ldpe',
  'http://localhost:3000/product.html?id=prod-micro',
  'http://localhost:3000/product.html?id=prod-keycap',
  'http://localhost:3000/product.html?id=prod-coastline',
  'http://localhost:3000/product.html?id=prod-paracord',
  'http://localhost:3000/product.html?id=prod-core',
  'http://localhost:3000/product.html?id=prod-conch',
  'http://localhost:3000/product-hdpe.html',
  'http://localhost:3000/product-pet.html',
  'http://localhost:3000/product-pp.html',
  'http://localhost:3000/product-ldpe.html',
  'http://localhost:3000/product-micro.html',
  'http://localhost:3000/product-keycap.html',
  'http://localhost:3000/product-coastline.html',
  'http://localhost:3000/product-paracord.html',
  'http://localhost:3000/product-core.html',
  'http://localhost:3000/product-conch.html',
  'http://localhost:3000/assets/images/hero_sketch.jpg',
  'http://localhost:3000/assets/images/nfc_flow_sketch.jpg',
  'http://localhost:3000/assets/images/map_passport_sketch.jpg'
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
  console.log('Testing server endpoints for 2nd-level pages and NFC routes...');
  let allOk = true;
  for (const url of urls) {
    const ok = await checkUrl(url);
    if (!ok) allOk = false;
  }
  console.log(allOk ? 'All endpoints OK!' : 'Some endpoints failed!');
  process.exit(allOk ? 0 : 1);
})();
