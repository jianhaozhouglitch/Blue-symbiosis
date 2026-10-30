const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 3000;
const MIME_TYPES = {
  '.html': 'text/html; charset=UTF-8',
  '.css': 'text/css; charset=UTF-8',
  '.js': 'application/javascript; charset=UTF-8',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  let reqPath = decodeURI(req.url.split('?')[0]);
  if (reqPath === '/' || reqPath === '') reqPath = '/index.html';
  if (reqPath === '/product' || reqPath.startsWith('/product/')) reqPath = '/product.html';

  let filePath = path.join(__dirname, reqPath);

  // 如果请求没有扩展名，尝试加上 .html
  if (!path.extname(filePath) && fs.existsSync(filePath + '.html')) {
    filePath += '.html';
  }

  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain; charset=UTF-8' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// 获取本机局域网 IP (方便手机直接扫描与写入 NFC 标签测试)
function getLocalIps() {
  const interfaces = os.networkInterfaces();
  const ips = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        ips.push(iface.address);
      }
    }
  }
  return ips;
}

server.listen(PORT, () => {
  const localIps = getLocalIps();
  const GITHUB_BASE = 'https://jianhaozhouglitch.github.io/Blue-symbiosis';
  console.log(`\n==================================================`);
  console.log(`🌊 蔚蓝共生计划 (Blue Symbiosis) 本地测试服务已启动`);
  console.log(`> 本地电脑访问: http://localhost:${PORT}/`);
  if (localIps.length > 0) {
    console.log(`> 局域网访问地址 (临时测试):`);
    localIps.forEach(ip => {
      console.log(`  http://${ip}:${PORT}/`);
    });
  }
  console.log(`\n📡 GitHub Pages 外网地址 (NFC标签写入此地址):`);
  console.log(`  首页:       ${GITHUB_BASE}/`);
  console.log(`  产品总览:   ${GITHUB_BASE}/product.html`);
  console.log(`\n🏷️  各产品 NFC 标签专属跳转地址:`);
  console.log(`  [HDPE] 深海漫游者·机能潮玩公仔:`);
  console.log(`         ${GITHUB_BASE}/product-hdpe.html`);
  console.log(`  [PET]  涌浪之间·轻量机能潮流挎包:`);
  console.log(`         ${GITHUB_BASE}/product-pet.html`);
  console.log(`  [PP]   浮游之光·双层真空随行杯:`);
  console.log(`         ${GITHUB_BASE}/product-pp.html`);
  console.log(`  [LDPE] 海风褶皱·艺术肌理云朵灯:`);
  console.log(`         ${GITHUB_BASE}/product-ldpe.html`);
  console.log(`  [MICRO]星海信使·微塑料树脂科技吊坠:`);
  console.log(`         ${GITHUB_BASE}/product-micro.html`);
  console.log(`\n💡 NFC写入步骤: 下载"NFC Tools"App → 写入 → URL类型 → 粘贴对应地址`);
  console.log(`==================================================\n`);
});
