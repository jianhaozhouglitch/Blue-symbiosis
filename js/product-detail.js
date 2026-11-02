/* ==========================================================================
   蔚蓝共生计划 (Blue Symbiosis) - 文创专有 2 级页面核心控制器
   处理 NFC 芯片认证、3D护照翻转、显微镜仿真、证书海报生成与 NFC 标签烧录
   ========================================================================== */

class ProductDetailController {
  constructor() {
    this.currentProduct = null;
    this.isPassportFlipped = false;
    this.microZoom = 400; // 100, 400, 1000
    this.audio = null;
    this.customHost = '';
  }

  init() {
    // 1. 初始化音效
    if (window.BlueSymbiosisAudio) {
      this.audio = new window.BlueSymbiosisAudio();
      window.blueAudio = this.audio;
    }

    // 2. 解析 URL 参数或 Hash 获取产品 ID
    const prodId = this.resolveProductId();
    this.loadProduct(prodId);

    // 3. 绑定全局交互事件
    this.bindEvents();

    // 4. 初始化微观显微镜
    this.initMicroscope();

    // 5. 初始化荣誉证书生成器
    this.initCertificateGenerator();

    // 6. 初始化 NFC 链接工具
    this.initNfcTool();

    // 7. 渲染其他文创导航卡片
    this.renderOtherProducts();

    // 8. 触发入场 NFC 感应提示音与动效
    setTimeout(() => {
      this.triggerNfcWelcome();
    }, 600);
  }

  // 解析当前页面应该显示哪件文创产品
  resolveProductId() {
    const params = new URLSearchParams(window.location.search);
    const qId = params.get('id') || params.get('p') || params.get('prod');
    if (qId) return qId;

    // 检查 hash
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      if (hashId) return hashId;
    }

    // 检查是否是从 product-hdpe.html 等直接页面进入
    const path = window.location.pathname.toLowerCase();
    if (path.includes('hdpe')) return 'prod-hdpe';
    if (path.includes('pet')) return 'prod-pet';
    if (path.includes('pp')) return 'prod-pp';
    if (path.includes('ldpe')) return 'prod-ldpe';
    if (path.includes('micro')) return 'prod-micro';
    if (path.includes('keycap')) return 'prod-keycap';
    if (path.includes('coastline')) return 'prod-coastline';
    if (path.includes('paracord')) return 'prod-paracord';
    if (path.includes('core')) return 'prod-core';
    if (path.includes('conch')) return 'prod-conch';

    // 默认展示第一款
    return 'prod-hdpe';
  }

  // 加载产品数据并填充所有视图
  loadProduct(id) {
    const prod = window.getProductById ? window.getProductById(id) : PRODUCTS_DATA[0];
    this.currentProduct = prod;

    // 更新页面标题
    document.title = `${prod.name} · 文创专有物联档案 | 蔚蓝共生计划`;

    // 1. 顶部导航与面包屑
    const elNavTitle = document.getElementById('navCurrentProdName');
    if (elNavTitle) elNavTitle.textContent = prod.shortName;

    // 2. NFC 认证横幅
    const elBannerChip = document.getElementById('bannerNfcChipId');
    const elBannerHash = document.getElementById('bannerTokenHash');
    const elBannerTime = document.getElementById('bannerVerifyTime');
    if (elBannerChip) elBannerChip.textContent = prod.nfcChipId;
    if (elBannerHash) elBannerHash.textContent = prod.tokenHash;
    if (elBannerTime) elBannerTime.textContent = `${prod.certDate} 14:30:25 UTC`;

    // 3. Hero 展示区
    const elResinStamp = document.getElementById('heroResinStamp');
    const elChipBadge = document.getElementById('heroChipBadge');
    const elProdTitle = document.getElementById('heroProdTitle');
    const elProdEn = document.getElementById('heroProdEn');
    const elTagline = document.getElementById('heroTagline');
    const elVisualStage = document.getElementById('heroVisualDoodle');
    const elOriginFloating = document.getElementById('heroOriginFloating');

    if (elResinStamp) elResinStamp.textContent = prod.codeSymbol;
    if (elChipBadge) elChipBadge.textContent = prod.nfcChipId;
    if (elProdTitle) elProdTitle.textContent = prod.name;
    if (elProdEn) elProdEn.textContent = prod.englishName;
    if (elTagline) elTagline.textContent = `“${prod.tagline}”`;
    if (elOriginFloating) elOriginFloating.textContent = `📍 ${prod.originLocation.split('(')[0]}`;

    if (elVisualStage) {
      elVisualStage.innerHTML = window.getProductDoodleSvgCode(prod.resinCode, prod.slug || prod.id);
      const svg = elVisualStage.querySelector('svg');
      if (svg) svg.classList.add('hero-main-doodle');
    }

    // 4. 规格网格
    const elSpecDim = document.getElementById('specDimensions');
    const elSpecMat = document.getElementById('specMaterial');
    const elSpecSafe = document.getElementById('specSafety');
    const elSpecChip = document.getElementById('specChipType');
    if (elSpecDim) elSpecDim.textContent = prod.dimensions;
    if (elSpecMat) elSpecMat.textContent = prod.composition;
    if (elSpecSafe) elSpecSafe.textContent = prod.safetyCert;
    if (elSpecChip) elSpecChip.textContent = prod.chipType;

    // 5. 3D 护照内容
    this.updatePassportView(prod);

    // 6. 蜕变溯源时间轴
    const elTimelineOrigin = document.getElementById('flowStep1Desc');
    const elTimelineDanger = document.getElementById('flowStep2Desc');
    const elTimelineCraft = document.getElementById('flowStep3Desc');
    const elTimelineFinal = document.getElementById('flowStep4Desc');

    if (elTimelineOrigin) elTimelineOrigin.textContent = `${prod.originLocation}。形态特征：${prod.sourceForm}。`;
    if (elTimelineDanger) elTimelineDanger.textContent = prod.microDanger;
    if (elTimelineCraft) elTimelineCraft.textContent = prod.processFlow;
    if (elTimelineFinal) elTimelineFinal.textContent = `${prod.name}，具备高耐候性与无毒纯化指标，${prod.rescueIndex}。`;

    // 7. 设计故事与物性特性列表
    const elDesignStory = document.getElementById('productDesignStoryText');
    if (elDesignStory) elDesignStory.textContent = prod.designStory;

    const elFeaturesWrap = document.getElementById('productFeaturesList');
    if (elFeaturesWrap) {
      elFeaturesWrap.innerHTML = prod.features.map(f => `
        <div class="product-feature-item">
          <h4>✦ ${f.title}</h4>
          <p>${f.desc}</p>
        </div>
      `).join('');
    }

    // 8. 显微镜描述
    const elMicroDesc = document.getElementById('microscopeDesc');
    if (elMicroDesc) {
      elMicroDesc.innerHTML = `<strong>微观形态透视：</strong>当前标本采自【${prod.salvageSeaArea}】打捞批次。在 ${this.microZoom}x 倍光学与偏光显微镜下，清晰可见${prod.plasticName.split('(')[0]}独特的聚合物结晶微区与海洋微生物冷流附着痕迹。`;
    }

    // 9. VIP 展会通行凭证
    const elVipProd = document.getElementById('vipPassProdName');
    const elVipChip = document.getElementById('vipPassChipId');
    const elVipSerial = document.getElementById('vipPassSerial');
    if (elVipProd) elVipProd.textContent = prod.name;
    if (elVipChip) elVipChip.textContent = prod.nfcChipId;
    if (elVipSerial) elVipSerial.textContent = prod.passId;

    // 10. 更新当前选中的导航 Pill
    document.querySelectorAll('.nav-prod-pill').forEach(pill => {
      if (pill.getAttribute('data-id') === prod.id) {
        pill.classList.add('active');
      } else {
        pill.classList.remove('active');
      }
    });

    // 11. 重新绘制显微镜和海报
    this.drawMicroscope();
    this.drawCertificate();
    this.updateNfcUrlInput();
  }

  // 更新 3D 护照正反面
  updatePassportView(prod) {
    // 正面
    const elPProdIcon = document.getElementById('passportDoodleIcon');
    const elPTitle = document.getElementById('passportProdTitle');
    const elPChip = document.getElementById('passportChipUid');
    const elPSaved = document.getElementById('passportStatCarbon');
    const elPClean = document.getElementById('passportStatClean');
    const elPDate = document.getElementById('passportStatDate');

    if (elPProdIcon) elPProdIcon.innerHTML = window.getProductDoodleSvgCode(prod.resinCode, prod.slug || prod.id);
    if (elPTitle) elPTitle.textContent = prod.shortName;
    if (elPChip) elPChip.textContent = `UID: ${prod.nfcChipId}`;
    if (elPSaved) elPSaved.textContent = prod.carbonSaved;
    if (elPClean) elPClean.textContent = prod.cleanArea.replace(' 滩涂净化', '').replace(' 环流表层净水', '').replace(' 珊瑚海域', '').replace(' 滩涂海草区', '').replace(' 深海滤水面积', '');
    if (elPDate) elPDate.textContent = prod.certDate;

    // 反面
    const elBSerial = document.getElementById('backPassSerial');
    const elBHash = document.getElementById('backTokenHash');
    const elBCoord = document.getElementById('backCoordinates');
    const elBVessel = document.getElementById('backSalvageVessel');
    const elBRescue = document.getElementById('backRescueIndex');
    const elBFund = document.getElementById('backFundInfo');

    if (elBSerial) elBSerial.textContent = prod.passId;
    if (elBHash) elBHash.textContent = prod.tokenHash;
    if (elBCoord) elBCoord.textContent = prod.salvageCoordinates;
    if (elBVessel) elBVessel.textContent = prod.salvageVessel;
    if (elBRescue) elBRescue.textContent = prod.rescueIndex;
    if (elBFund) elBFund.textContent = prod.fundContribution;
  }

  // 绑定全局事件
  bindEvents() {
    // 3D 护照点击翻转
    const flipper = document.getElementById('passportFlipper');
    if (flipper) {
      flipper.addEventListener('click', () => {
        this.isPassportFlipped = !this.isPassportFlipped;
        flipper.classList.toggle('is-flipped', this.isPassportFlipped);
        if (this.audio) this.audio.playFlipPassportSound();
      });
    }

    // 翻转按钮
    const btnFlip = document.getElementById('btnFlipPassport');
    if (btnFlip) {
      btnFlip.addEventListener('click', (e) => {
        e.stopPropagation();
        if (flipper) {
          this.isPassportFlipped = !this.isPassportFlipped;
          flipper.classList.toggle('is-flipped', this.isPassportFlipped);
          if (this.audio) this.audio.playFlipPassportSound();
        }
      });
    }

    // 显微镜倍率切换
    const zoomBtns = document.querySelectorAll('.btn-micro-zoom');
    zoomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        zoomBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.microZoom = parseInt(btn.getAttribute('data-zoom')) || 400;
        this.drawMicroscope();
        if (this.audio) this.audio.playTapSound();
      });
    });

    // 证书姓名输入与重新生成
    const btnGenCert = document.getElementById('btnGenCert');
    if (btnGenCert) {
      btnGenCert.addEventListener('click', () => {
        this.drawCertificate();
        this.showToast('✨ 专属守护者证书与海报已刷新！');
        if (this.audio) this.audio.playSuccessChime();
      });
    }

    // 复制当前产品专属 NFC 链接
    const btnCopyUrl = document.getElementById('btnCopyNfcUrl');
    if (btnCopyUrl) {
      btnCopyUrl.addEventListener('click', () => {
        this.copyNfcUrl();
      });
    }

    const btnCopyHeader = document.getElementById('btnHeaderCopyNfc');
    if (btnCopyHeader) {
      btnCopyHeader.addEventListener('click', () => {
        this.copyNfcUrl();
      });
    }

    // 自定义域名/IP 修改
    const customHostInput = document.getElementById('customHostInput');
    if (customHostInput) {
      customHostInput.addEventListener('input', (e) => {
        this.customHost = e.target.value.trim();
        this.updateNfcUrlInput();
      });
    }

    // Web NFC 原生写入 (仅支持 Android Chrome)
    const btnWebNfcWrite = document.getElementById('btnWebNfcWrite');
    if (btnWebNfcWrite) {
      btnWebNfcWrite.addEventListener('click', () => {
        this.handleWebNfcWrite();
      });
    }

    // 顶部音效切换
    const btnAudioToggle = document.getElementById('btnToggleAudio');
    if (btnAudioToggle) {
      btnAudioToggle.addEventListener('click', () => {
        if (this.audio) {
          const isPlaying = this.audio.toggleMute();
          btnAudioToggle.textContent = isPlaying ? '🔊 海浪环境声已开启' : '🔈 开启深海环境音效';
          btnAudioToggle.classList.toggle('btn-nav-primary', isPlaying);
        }
      });
    }
  }

  // 触发手机扫到 NFC 时的欢迎动态反馈
  triggerNfcWelcome() {
    const banner = document.getElementById('nfcVerifiedBanner');
    if (banner) {
      banner.style.animation = 'nfcWavePing 0.8s ease-out';
      setTimeout(() => {
        banner.style.animation = '';
      }, 800);
    }
    if (this.audio) {
      this.audio.playNfcScanSound();
    }
  }

  // 渲染其他 4 款文创卡片列
  renderOtherProducts() {
    const container = document.getElementById('otherProductsGrid');
    if (!container) return;

    const others = PRODUCTS_DATA.filter(p => p.id !== this.currentProduct.id);
    container.innerHTML = others.map(p => `
      <a href="product.html?id=${p.id}" class="other-prod-card" data-id="${p.id}">
        <div class="other-prod-thumb">
          ${window.getProductDoodleSvgCode(p.resinCode, p.slug || p.id)}
        </div>
        <div class="other-prod-name">${p.name}</div>
        <div class="other-prod-resin">${p.codeSymbol} · ${p.degradeYears}</div>
      </a>
    `).join('');
  }

  // ==========================================================================
  // NFC 链接生成与复制
  // ==========================================================================
  getEffectiveNfcUrl() {
    const base = this.customHost ? this.customHost.replace(/\/+$/, '') : window.location.origin;
    // 包含当前选中的产品 ID
    return `${base}/product.html?id=${this.currentProduct.id}`;
  }

  updateNfcUrlInput() {
    const url = this.getEffectiveNfcUrl();
    const input = document.getElementById('nfcTargetUrlInput');
    if (input) input.value = url;

    const preview = document.getElementById('nfcUrlPreviewText');
    if (preview) preview.textContent = url;

    // 更新二维码
    this.drawQrCode(url);
  }

  copyNfcUrl() {
    const url = this.getEffectiveNfcUrl();
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(() => {
        this.showToast(`✅ 已复制专属链接！可在 NFC Tools 中直接写入标签：\n${url}`);
        if (this.audio) this.audio.playSuccessChime();
      }).catch(() => {
        this.fallbackCopy(url);
      });
    } else {
      this.fallbackCopy(url);
    }
  }

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      this.showToast(`✅ 已复制专属链接！可在 NFC Tools 中写入标签：\n${text}`);
      if (this.audio) this.audio.playSuccessChime();
    } catch (e) {
      alert(`请手动复制专属链接：\n${text}`);
    }
    document.body.removeChild(ta);
  }

  // 简易二维码绘制 (用 Canvas 绘制美观的定位点与阵列)
  drawQrCode(text) {
    const canvas = document.getElementById('nfcQrCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const size = 160;
    canvas.width = size;
    canvas.height = size;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // 绘制标准定位图案 (三大角)
    const drawEye = (x, y) => {
      ctx.fillStyle = '#091e3a';
      ctx.fillRect(x, y, 35, 35);
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(x + 5, y + 5, 25, 25);
      ctx.fillStyle = '#0284c7';
      ctx.fillRect(x + 10, y + 10, 15, 15);
    };

    drawEye(10, 10);
    drawEye(size - 45, 10);
    drawEye(10, size - 45);

    // 根据字符串生成确定性伪随机矩阵点
    ctx.fillStyle = '#091e3a';
    let seed = 0;
    for (let i = 0; i < text.length; i++) {
      seed = (seed * 31 + text.charCodeAt(i)) & 0xffffffff;
    }

    const dotSize = 5;
    const cols = (size - 20) / dotSize;
    for (let r = 0; r < cols; r++) {
      for (let c = 0; c < cols; c++) {
        // 避开三个角
        if ((r < 8 && c < 8) || (r < 8 && c >= cols - 8) || (r >= cols - 8 && c < 8)) continue;
        seed = (seed * 16807 + 12345) & 0x7fffffff;
        if ((seed % 100) < 48) {
          ctx.fillRect(10 + c * dotSize, 10 + r * dotSize, dotSize - 1, dotSize - 1);
        }
      }
    }

    // 中心小 NFC 标志
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 9px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('NFC', size / 2, size / 2);
  }

  // 原生 Web NFC 写入
  async handleWebNfcWrite() {
    if (!('NDEFReader' in window)) {
      alert('📱 提示：您的浏览器当前不支持原生 Web NFC 写入（通常需要 Android 版 Chrome）。\n\n建议使用通用的【NFC Tools】免费 App，复制上方专属链接后 3 秒即可完成写入！');
      return;
    }

    try {
      const ndef = new NDEFReader();
      const targetUrl = this.getEffectiveNfcUrl();
      this.showToast('📡 请将手机背部靠近文创产品的 NFC 标签进行烧录...');
      
      await ndef.write({
        records: [{ recordType: 'url', data: targetUrl }]
      });

      this.showToast('🎉 恭喜！专属链接已成功写入文创 NFC 芯片！');
      if (this.audio) this.audio.playSuccessChime();
    } catch (err) {
      console.error(err);
      alert(`NFC 写入未完成：${err.message || '请确保手机已开启 NFC 功能并重新贴近标签。'}`);
    }
  }

  // ==========================================================================
  // 微观显微镜 Canvas 物理仿真渲染
  // ==========================================================================
  initMicroscope() {
    this.drawMicroscope();
  }

  drawMicroscope() {
    const canvas = document.getElementById('microscopeCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.parentElement.clientWidth || 360;
    const height = 260;
    canvas.width = width;
    canvas.height = height;

    const zoom = this.microZoom;
    const type = this.currentProduct.microscopeType;

    // 暗黑深海背景
    ctx.fillStyle = '#030712';
    ctx.fillRect(0, 0, width, height);

    // 偏光光学暗场光斑
    const radGrd = ctx.createRadialGradient(width / 2, height / 2, 20, width / 2, height / 2, width / 1.6);
    radGrd.addColorStop(0, 'rgba(14, 165, 233, 0.18)');
    radGrd.addColorStop(0.6, 'rgba(2, 132, 199, 0.08)');
    radGrd.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = radGrd;
    ctx.fillRect(0, 0, width, height);

    // 模拟偏光干涉颗粒
    const count = zoom === 100 ? 60 : zoom === 400 ? 35 : 18;
    const scale = zoom / 100;

    let seed = 42;
    const rnd = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    if (type === 'hdpe') {
      // HDPE: 棱角分明的半透明结晶薄片与微碎片
      for (let i = 0; i < count; i++) {
        const x = width * 0.15 + rnd() * width * 0.7;
        const y = height * 0.15 + rnd() * height * 0.7;
        const s = (12 + rnd() * 22) * scale * 0.45;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rnd() * Math.PI * 2);

        // 偏光干涉双折射色
        const hue = 180 + rnd() * 60;
        ctx.fillStyle = `hsla(${hue}, 80%, 65%, 0.45)`;
        ctx.strokeStyle = `hsla(${hue}, 90%, 80%, 0.8)`;
        ctx.lineWidth = 1.5;

        ctx.beginPath();
        ctx.moveTo(-s, -s * 0.6);
        ctx.lineTo(s * 0.8, -s * 0.9);
        ctx.lineTo(s * 0.9, s * 0.7);
        ctx.lineTo(-s * 0.5, s * 0.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    } else if (type === 'pet') {
      // rPET: 交织缠绕的纳米涤纶微纤维束
      ctx.lineWidth = 2 * scale * 0.35;
      for (let i = 0; i < count * 1.5; i++) {
        ctx.strokeStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.65)' : 'rgba(255, 255, 255, 0.4)';
        ctx.beginPath();
        const startX = rnd() * width;
        const startY = rnd() * height;
        const cpX = rnd() * width;
        const cpY = rnd() * height;
        const endX = rnd() * width;
        const endY = rnd() * height;
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(cpX, cpY, endX, endY);
        ctx.stroke();
      }
    } else if (type === 'pp') {
      // PP: 球晶颗粒结构与微小球状气泡
      for (let i = 0; i < count; i++) {
        const x = width * 0.2 + rnd() * width * 0.6;
        const y = height * 0.2 + rnd() * height * 0.6;
        const r = (6 + rnd() * 16) * scale * 0.4;

        const pGrd = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 1, x, y, r);
        pGrd.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        pGrd.addColorStop(0.5, 'rgba(14, 165, 233, 0.6)');
        pGrd.addColorStop(1, 'rgba(2, 6, 23, 0.8)');

        ctx.fillStyle = pGrd;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = 'rgba(56, 189, 248, 0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    } else if (type === 'ldpe') {
      // LDPE: 水波折叠膜状纹理
      for (let i = 0; i < 6; i++) {
        ctx.fillStyle = `rgba(125, 211, 252, ${0.12 + i * 0.04})`;
        ctx.beginPath();
        ctx.moveTo(0, height * 0.2 + i * 25);
        for (let x = 0; x <= width; x += 30) {
          const waveY = Math.sin((x / 60) + i) * 20 * scale * 0.35 + (height * 0.25 + i * 30);
          ctx.lineTo(x, waveY);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }
    } else {
      // MICRO: 多色纳米风化微塑料微粒 (<5mm)
      const colors = ['#ef4444', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#06b6d4'];
      for (let i = 0; i < count * 2; i++) {
        const x = rnd() * width;
        const y = rnd() * height;
        const r = (3 + rnd() * 9) * scale * 0.4;
        const c = colors[Math.floor(rnd() * colors.length)];

        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(x - r * 0.3, y - r * 0.3, r * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // 绘制十字校准标尺
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.35)';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(width / 2, 0);
    ctx.lineTo(width / 2, height);
    ctx.moveTo(0, height / 2);
    ctx.lineTo(width, height / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // 标尺文字
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px monospace';
    ctx.fillText(`MAG: ${zoom}X · POLARIZING OPTICS`, 14, 22);
    ctx.fillText(`FIELD: ${(1200 / zoom).toFixed(1)} μm`, 14, height - 14);
  }

  // ==========================================================================
  // 海洋守护者荣誉证书与海报生成器 (Canvas 高清合成)
  // ==========================================================================
  initCertificateGenerator() {
    this.drawCertificate();
  }

  drawCertificate() {
    const canvas = document.getElementById('certCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = 640;
    const height = 420;
    canvas.width = width;
    canvas.height = height;

    const prod = this.currentProduct;
    const userInput = document.getElementById('certUserNameInput');
    const userName = (userInput && userInput.value.trim()) ? userInput.value.trim() : '蔚蓝深潜守护者';

    // 1. 底色：复古环保羊皮纸与蔚蓝渐变
    const bgGrd = ctx.createLinearGradient(0, 0, width, height);
    bgGrd.addColorStop(0, '#f0fdf4');
    bgGrd.addColorStop(0.5, '#ffffff');
    bgGrd.addColorStop(1, '#e0f2fe');
    ctx.fillStyle = bgGrd;
    ctx.fillRect(0, 0, width, height);

    // 2. 双重手绘风格内饰边框
    ctx.strokeStyle = '#091e3a';
    ctx.lineWidth = 3;
    ctx.strokeRect(16, 16, width - 32, height - 32);

    ctx.strokeStyle = '#0284c7';
    ctx.lineWidth = 1.5;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(22, 22, width - 44, height - 44);
    ctx.setLineDash([]);

    // 3. 证书顶部徽标与标题
    ctx.fillStyle = '#0f3a60';
    ctx.font = 'bold 18px "Noto Sans SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ 蔚蓝共生计划 · 海洋微塑料治理荣誉档案 ✦', width / 2, 58);

    ctx.fillStyle = '#0284c7';
    ctx.font = 'bold 12px "Caveat", cursive, sans-serif';
    ctx.fillText('BLUE SYMBIOSIS · OFFICIAL OCEAN GUARDIAN CERTIFICATE', width / 2, 78);

    // 4. 授予正文
    ctx.textAlign = 'left';
    ctx.fillStyle = '#64748b';
    ctx.font = '13px "Noto Sans SC", sans-serif';
    ctx.fillText('特此授予环保共生公民：', 48, 120);

    ctx.fillStyle = '#091e3a';
    ctx.font = '900 24px "Noto Sans SC", sans-serif';
    ctx.fillText(userName, 48, 156);

    ctx.fillStyle = '#334155';
    ctx.font = '13px "Noto Sans SC", sans-serif';
    const line1 = `感谢您通过持有含有专属 NFC 芯片的【${prod.name}】，`;
    const line2 = `成功从海洋中拦截回收了 ${prod.plasticName.split('(')[0]} 材质废弃物。`;
    const line3 = `累计实现减碳贡献 ${prod.carbonSaved}，完成 ${prod.cleanArea}。`;
    ctx.fillText(line1, 48, 195);
    ctx.fillText(line2, 48, 220);
    ctx.fillText(line3, 48, 245);

    // 5. 核心指标数据胶囊
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#091e3a';
    ctx.lineWidth = 2;
    ctx.fillRect(48, 275, 260, 52);
    ctx.strokeRect(48, 275, 260, 52);

    ctx.fillStyle = '#64748b';
    ctx.font = '10px "Noto Sans SC", sans-serif';
    ctx.fillText('NFC 芯片硬件 UID', 60, 294);
    ctx.fillStyle = '#0369a1';
    ctx.font = 'bold 13px monospace';
    ctx.fillText(prod.nfcChipId, 60, 314);

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(324, 275, 268, 52);
    ctx.strokeRect(324, 275, 268, 52);

    ctx.fillStyle = '#64748b';
    ctx.font = '10px "Noto Sans SC", sans-serif';
    ctx.fillText('链上确权哈希 (TOKEN HASH)', 336, 294);
    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 12px monospace';
    ctx.fillText(prod.tokenHash, 336, 314);

    // 6. 底部盖章与签名
    ctx.fillStyle = '#94a3b8';
    ctx.font = '11px monospace';
    ctx.fillText(`CERT DATE: ${prod.certDate} | PASS ID: ${prod.passId}`, 48, 375);

    // 印章
    ctx.save();
    ctx.translate(width - 110, height - 85);
    ctx.rotate(-0.15);

    ctx.strokeStyle = '#e11d48';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.stroke();

    ctx.fillStyle = '#e11d48';
    ctx.font = '900 11px "Noto Sans SC", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('蔚蓝共生计划', 0, -12);
    ctx.font = 'bold 9px monospace';
    ctx.fillText('OFFICIAL SEAL', 0, 4);
    ctx.fillText('★ 确权认证 ★', 0, 20);

    ctx.restore();

    // 更新下载链接
    const btnDownload = document.getElementById('btnDownloadCert');
    if (btnDownload) {
      btnDownload.href = canvas.toDataURL('image/png');
      btnDownload.download = `蔚蓝共生计划_守护者证书_${prod.slug}_${userName}.png`;
    }
  }

  // Toast 提示
  showToast(msg) {
    let toast = document.getElementById('globalToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'globalToast';
      toast.className = 'toast-notice';
      document.body.appendChild(toast);
    }
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }
}

// 页面加载启动
document.addEventListener('DOMContentLoaded', () => {
  window.productController = new ProductDetailController();
  window.productController.init();
});
