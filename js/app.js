/* ==========================================================================
   蔚蓝共生计划 (Blue Symbiosis) - 主控逻辑
   包括 NFC 切换模拟、材质深度解析、显微镜、3D护照翻转、预约系统与海报生成
   ========================================================================== */

const PRODUCTS_DATA = [
  {
    id: 'prod-hdpe',
    name: '「深海漫游者」机能潮玩公仔',
    shortName: '深海漫游者潮玩',
    plasticName: 'HDPE (高密度聚乙烯)',
    resinCode: 2,
    codeSymbol: '♴ HDPE',
    nfcChipId: 'CHIP-NFC-8849-HDPE',
    degradeYears: '自然降解约 500 年',
    originLocation: '东海舟山渔场近海捕捞 (废弃浮标与耐候塑料容器)',
    sourceForm: '近海风化撕裂的化工桶与深海浮漂硬质残片',
    processFlow: '40kHz 超声波表面微藻洗涤 ➔ 240℃ 低温惰性造粒 ➔ 模块化高精密注塑',
    features: [
      { title: '超高韧性与抗摔', desc: '结晶度高达 85% 以上，耐磨抗摔抗海水酸碱腐蚀，质感温润细腻。' },
      { title: '无毒环保再造', desc: '通过无害化高温纯化，摆脱传统一次性塑料的有害重金属析出。' }
    ],
    microDanger: '在波浪撞击与紫外线暴晒下破碎成 100~500μm 粗糙颗粒，极易吸附海洋持久性有机污染物（POPs），并被底层甲壳类动物误食。',
    rescueIndex: '保护 38 尾幼龟与底栖石斑鱼免受塑料碎片割伤',
    carbonSaved: '2.45 kg CO₂e',
    cleanArea: '120 m² 滩涂净化',
    tokenHash: '0x8849...B10A',
    certDate: '2026.09.18',
    mapIndex: 0,
    colorTheme: '#0284c7'
  },
  {
    id: 'prod-pet',
    name: '「涌浪之间」轻量机能潮流挎包',
    shortName: '涌浪机能挎包',
    plasticName: 'rPET (再生聚对苯二甲酸乙二醇酯)',
    resinCode: 1,
    codeSymbol: '♳ PET',
    nfcChipId: 'CHIP-NFC-7215-rPET',
    degradeYears: '自然降解约 450 年',
    originLocation: '太平洋环流治理区漂浮垃圾带 (废弃饮料瓶与矿泉水瓶)',
    sourceForm: '远洋漂浮成团的塑料饮料瓶与瓶盖复合体',
    processFlow: '光谱智能色选 ➔ 超声波切片除菌 ➔ 高纯度熔融拉丝 ➔ 织造为 600D 蔚蓝抗撕裂防泼水面料',
    features: [
      { title: '高强抗撕裂防水', desc: '纳米级紧密编织结构，轻量透气且防暴雨飞溅，触感如丝般顺滑。' },
      { title: '碳足迹减少 75%', desc: '相比原生石化涤纶纤维，能耗降低 60%，碳排放直降 75% 以上。' }
    ],
    microDanger: 'PET 在海洋中光氧化降解为微米级纳米纤维（Microfibers），极易被浮游动物（如水蚤）大量吸入，造成消化道阻塞致死。',
    rescueIndex: '减少约 420g 潜在微纤维释放，拯救 85 只浮游生物幼体',
    carbonSaved: '4.82 kg CO₂e',
    cleanArea: '260 m² 环流表层净水',
    tokenHash: '0x7215...99F2',
    certDate: '2026.10.05',
    mapIndex: 1,
    colorTheme: '#0ea5e9'
  },
  {
    id: 'prod-pp',
    name: '「浮游之光」双层真空随行杯',
    shortName: '浮游随行杯',
    plasticName: 'PP (食品级再生聚丙烯)',
    resinCode: 5,
    codeSymbol: '♵ PP',
    nfcChipId: 'CHIP-NFC-3914-PP',
    degradeYears: '自然降解约 300 年',
    originLocation: '南海西沙群岛航段深水区 (沉底外卖包装与吸管重塑)',
    sourceForm: '沉入海底暗礁的外卖餐盒、打包盒与高韧性塑料吸管',
    processFlow: '深潜无人机机械爪打捞 ➔ 真空高温脱脂除盐 ➔ 均聚物理重组 ➔ 打造食品级耐热杯体',
    features: [
      { title: '耐 120℃ 沸水无析出', desc: '微波级热稳定性，不含双酚A与塑化剂，耐酸碱咖啡与果汁浸泡。' },
      { title: '轻盈抗冲击', desc: '密度小于水（0.91g/cm³），落水即浮，具有高抗摔回弹性。' }
    ],
    microDanger: '沉于海底厌氧环境下极难分解，会持续数百年缓慢释放增塑剂化学物质，抑制珊瑚礁共生虫黄藻的光合作用。',
    rescueIndex: '消除珊瑚礁覆盖危机，维护 60+ 珊瑚微生态健康',
    carbonSaved: '1.62 kg CO₂e',
    cleanArea: '85 m² 珊瑚海域',
    tokenHash: '0x3914...C4A1',
    certDate: '2026.08.22',
    mapIndex: 2,
    colorTheme: '#38bdf8'
  },
  {
    id: 'prod-ldpe',
    name: '「海风褶皱」艺术肌理云朵灯',
    shortName: '海风云朵氛围灯',
    plasticName: 'LDPE (低密度聚乙烯)',
    resinCode: 4,
    codeSymbol: '♴ LDPE',
    nfcChipId: 'CHIP-NFC-5502-LDPE',
    degradeYears: '自然降解约 400 年',
    originLocation: '黄海南部洋流汇集区 (缠绕海草床的超薄薄膜与购物袋)',
    sourceForm: '破损超薄塑料袋、缠绕水草与农用棚膜碎片',
    processFlow: '气浮低阻收集 ➔ 蒸汽除杂去附着生物 ➔ 多层温控热压复合 ➔ 形成梦幻海洋肌理透光面板',
    features: [
      { title: '天然水波艺术透光', desc: '热压纹理保留了海洋波浪的天然褶皱，折射光线温柔如梦境。' },
      { title: '极佳柔韧延展度', desc: '分子支链丰富，柔韧不易折断，绝缘耐水湿。' }
    ],
    microDanger: '超薄薄膜极易在近岸波浪冲刷下撕裂为数亿枚纳米薄片，像幽灵般遮蔽海草床日光，阻断近岸海洋固碳（蓝碳）能力。',
    rescueIndex: '解救近海海草床缠绕危机，保护 15 只水母安全繁殖',
    carbonSaved: '1.18 kg CO₂e',
    cleanArea: '95 m² 滩涂海草区',
    tokenHash: '0x5502...D733',
    certDate: '2026.09.29',
    mapIndex: 3,
    colorTheme: '#7dd3fc'
  },
  {
    id: 'prod-micro',
    name: '「星海信使」微塑料树脂科技吊坠',
    shortName: '微塑料信使吊坠',
    plasticName: '沉水级海洋微塑料微粒 (<5mm)',
    resinCode: 7,
    codeSymbol: '♹ MICRO',
    nfcChipId: 'CHIP-NFC-9900-MICRO',
    degradeYears: '人类时间尺度内不可自然降解',
    originLocation: '台湾海峡与东海交汇断裂带 (AI船纳米高密滤网捕集微粒)',
    sourceForm: '五颜六色风化微塑料微粒（碎片、发泡胶颗粒、微纤维）',
    processFlow: '声学纳米气浮微气泡聚集 ➔ 纳米滤网分选 ➔ 生物基高透树脂永久封存 ➔ 嵌合 NFC 芯片',
    features: [
      { title: '深海灾难的艺术封存', desc: '每一颗微塑料标本都是真实的海洋警示录，凝固时间的永恒见证。' },
      { title: '纳米晶透封印工艺', desc: '物理隔绝微塑料与外界生物链，转化为永不释放毒素的先锋配饰。' }
    ],
    microDanger: '微塑料与浮游动物（如磷虾）尺寸极其相近，一旦进入食物链顶端，将在海洋生物肝脏与肌肉组织中累积富集，直抵人类餐桌。',
    rescueIndex: '永久封存 180,000+ 颗微塑料，切断其进入食物链路径',
    carbonSaved: '3.10 kg CO₂e',
    cleanArea: '320 m² 深海滤水面积',
    tokenHash: '0x9900...E882',
    certDate: '2026.10.12',
    mapIndex: 4,
    colorTheme: '#0284c7'
  }
];

class AppManager {
  constructor() {
    this.currentProductIndex = 0;
    this.zoomLevel = 1;
    this.isPassportFlipped = false;
    this.oceanMap = null;
    this.salvageGame = null;
  }

  init() {
    this.renderProductsList();
    this.bindGlobalEvents();
    this.initMicroscope();
    this.initMap();
    this.initGame();
    this.initFundCalculator();
    this.updateProductView(0);
  }

  // 渲染 5 种文创产品列表
  renderProductsList() {
    const container = document.getElementById('productsScrollGrid');
    if (!container) return;

    container.innerHTML = PRODUCTS_DATA.map((item, idx) => `
      <div class="product-item-card ${idx === 0 ? 'active' : ''}" data-idx="${idx}" id="prodCard-${idx}">
        <div class="product-thumb-box">
          ${this.getProductDoodleSvg(item.resinCode)}
          <div class="plastic-code-sticker">${item.codeSymbol}</div>
        </div>
        <div class="product-name">${item.name}</div>
        <div class="product-plastic-type">
          <span>●</span> ${item.plasticName.split('(')[0]}
        </div>
        <div class="product-origin-source">${item.originLocation.slice(0, 22)}...</div>
      </div>
    `).join('');

    // 绑定点击切换
    const cards = container.querySelectorAll('.product-item-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-idx'));
        this.selectProduct(idx);
      });
    });
  }

  // 手绘简笔画文创产品图标 SVG
  getProductDoodleSvg(resinCode) {
    if (resinCode === 2) {
      // 潮玩公仔 (HDPE)
      return `
        <svg class="product-icon-doodle" viewBox="0 0 80 80">
          <circle cx="40" cy="28" r="14" fill="#ffffff" stroke="#091e3a" stroke-width="2.5" />
          <circle cx="35" cy="26" r="2" fill="#091e3a" />
          <circle cx="45" cy="26" r="2" fill="#091e3a" />
          <path d="M 36,34 Q 40,38 44,34" stroke="#091e3a" stroke-width="2" fill="none" />
          <path d="M 28,42 L 52,42 L 48,64 L 32,64 Z" fill="#bae6fd" stroke="#091e3a" stroke-width="2.5" />
          <circle cx="40" cy="50" r="5" fill="#ffffff" stroke="#091e3a" stroke-width="1.5" />
          <path d="M 28,44 L 20,54 M 52,44 L 60,54" stroke="#091e3a" stroke-width="2.5" />
        </svg>
      `;
    } else if (resinCode === 1) {
      // 潮流挎包 (rPET)
      return `
        <svg class="product-icon-doodle" viewBox="0 0 80 80">
          <path d="M 25,32 L 55,32 L 52,65 L 28,65 Z" fill="#7dd3fc" stroke="#091e3a" stroke-width="2.5" />
          <path d="M 33,32 Q 40,16 47,32" fill="none" stroke="#091e3a" stroke-width="2.5" />
          <path d="M 28,46 Q 40,54 52,46" fill="none" stroke="#ffffff" stroke-width="2" />
          <circle cx="40" cy="40" r="3" fill="#091e3a" />
        </svg>
      `;
    } else if (resinCode === 5) {
      // 双层保温随行杯 (PP)
      return `
        <svg class="product-icon-doodle" viewBox="0 0 80 80">
          <rect x="28" y="24" width="24" height="6" rx="2" fill="#0284c7" stroke="#091e3a" stroke-width="2" />
          <path d="M 30,30 L 50,30 L 46,65 L 34,65 Z" fill="#ffffff" stroke="#091e3a" stroke-width="2.5" />
          <path d="M 32,40 L 48,40" stroke="#bae6fd" stroke-width="8" stroke-linecap="round" />
          <path d="M 40,18 L 40,24" stroke="#091e3a" stroke-width="2.5" />
        </svg>
      `;
    } else if (resinCode === 4) {
      // 云朵艺术灯 (LDPE)
      return `
        <svg class="product-icon-doodle" viewBox="0 0 80 80">
          <path d="M 24,48 Q 20,38 30,34 Q 34,24 46,26 Q 56,22 60,34 Q 68,38 64,48 Q 66,58 54,58 L 28,58 Q 18,58 24,48 Z" 
                fill="#ffffff" stroke="#091e3a" stroke-width="2.5" />
          <circle cx="42" cy="44" r="6" fill="#fde047" opacity="0.8" />
          <path d="M 32,42 L 34,42 M 50,42 L 52,42" stroke="#091e3a" stroke-width="2" />
        </svg>
      `;
    } else {
      // 微塑料晶体吊坠 (MICRO)
      return `
        <svg class="product-icon-doodle" viewBox="0 0 80 80">
          <path d="M 40,18 L 40,32" stroke="#091e3a" stroke-width="2" />
          <polygon points="40,32 54,44 48,64 32,64 26,44" fill="#bae6fd" stroke="#091e3a" stroke-width="2.5" />
          <circle cx="36" cy="48" r="2" fill="#ef4444" />
          <circle cx="44" cy="52" r="2.5" fill="#3b82f6" />
          <circle cx="38" cy="56" r="1.5" fill="#10b981" />
        </svg>
      `;
    }
  }

  // 选中特定产品并更新所有模块
  selectProduct(idx) {
    if (idx < 0 || idx >= PRODUCTS_DATA.length) return;
    this.currentProductIndex = idx;
    
    // 触发 NFC 扫描音效
    window.blueAudio && window.blueAudio.playNfcScanSound();

    // 更新产品卡片的高亮
    const cards = document.querySelectorAll('.product-item-card');
    cards.forEach((card, i) => {
      if (i === idx) card.classList.add('active');
      else card.classList.remove('active');
    });

    this.updateProductView(idx);

    // 同步地图定位
    if (this.oceanMap) {
      this.oceanMap.selectByProductIndex(idx);
    }
  }

  // 更新整个页面的所有数据视图
  updateProductView(idx) {
    const prod = PRODUCTS_DATA[idx];
    if (!prod) return;

    // 1. 顶部悬浮栏 NFC 芯片 ID
    const elChipId = document.getElementById('currentNfcChipId');
    if (elChipId) elChipId.textContent = prod.nfcChipId;

    // 2. 材质档案卡片
    const elBadgeNum = document.getElementById('plasticBadgeNum');
    const elBadgeSymbol = document.getElementById('plasticBadgeSymbol');
    const elPlasticTitle = document.getElementById('plasticTitle');
    const elDegradeYears = document.getElementById('plasticDegradeYears');
    const elSourceForm = document.getElementById('sourceFormDesc');
    const elProcessFlow = document.getElementById('processFlowDesc');
    const elFinalProduct = document.getElementById('finalProductDesc');
    const elFeatureContainer = document.getElementById('plasticFeatureList');
    const elDangerDesc = document.getElementById('plasticDangerDesc');

    if (elBadgeNum) elBadgeNum.textContent = prod.resinCode;
    if (elBadgeSymbol) elBadgeSymbol.textContent = prod.codeSymbol.split(' ')[1] || 'RESIN';
    if (elPlasticTitle) elPlasticTitle.textContent = prod.plasticName;
    if (elDegradeYears) elDegradeYears.textContent = prod.degradeYears;
    if (elSourceForm) elSourceForm.textContent = prod.sourceForm;
    if (elProcessFlow) elProcessFlow.textContent = prod.processFlow;
    if (elFinalProduct) elFinalProduct.textContent = `${prod.name} (内嵌 ${prod.nfcChipId})`;

    if (elFeatureContainer) {
      elFeatureContainer.innerHTML = prod.features.map(f => `
        <div class="feature-box">
          <h5><span style="color:#0284c7">✦</span> ${f.title}</h5>
          <p>${f.desc}</p>
        </div>
      `).join('');
    }

    if (elDangerDesc) elDangerDesc.textContent = prod.microDanger;

    // 3. 更新 3D 护照内容
    const elPassportProd = document.getElementById('passportProdTitle');
    const elPassportHash = document.getElementById('passportTokenHash');
    const elPassportRescue = document.getElementById('passportRescueNum');
    const elPassportCarbon = document.getElementById('passportCarbonNum');
    const elPassportDate = document.getElementById('passportCertDate');
    const elPassportPlastic = document.getElementById('passportPlasticBadge');

    if (elPassportProd) elPassportProd.textContent = prod.name;
    if (elPassportHash) elPassportHash.textContent = prod.tokenHash;
    if (elPassportRescue) elPassportRescue.textContent = prod.rescueIndex.split('，')[0].replace('保护', '').replace('减少约', '').replace('消除', '').replace('永久封存', '');
    if (elPassportCarbon) elPassportCarbon.textContent = prod.carbonSaved;
    if (elPassportDate) elPassportDate.textContent = prod.certDate;
    if (elPassportPlastic) elPassportPlastic.textContent = prod.codeSymbol;

    // 4. 重绘微观显微镜
    this.drawMicroscope();
  }

  // 初始化微观显微镜 Canvas
  initMicroscope() {
    this.microCanvas = document.getElementById('microscopeCanvas');
    if (!this.microCanvas) return;
    this.microCtx = this.microCanvas.getContext('2d');
    
    const slider = document.getElementById('microZoomSlider');
    if (slider) {
      slider.addEventListener('input', (e) => {
        this.zoomLevel = parseFloat(e.target.value);
        const elZoomVal = document.getElementById('microZoomVal');
        if (elZoomVal) elZoomVal.textContent = `${Math.round(this.zoomLevel * 100)}x`;
        this.drawMicroscope();
      });
    }

    // 触摸/鼠标交互聚焦
    this.microCanvas.addEventListener('mousemove', (e) => {
      this.drawMicroscope(e.offsetX, e.offsetY);
    });

    this.drawMicroscope();
  }

  // 绘制微观显微镜画面 (显示海洋微塑料降解裂纹与重塑分子链)
  drawMicroscope(focusX, focusY) {
    if (!this.microCtx || !this.microCanvas) return;
    const w = this.microCanvas.width = 380;
    const h = this.microCanvas.height = 220;
    const ctx = this.microCtx;
    const prod = PRODUCTS_DATA[this.currentProductIndex];

    ctx.clearRect(0, 0, w, h);

    // 显微深邃蓝光背景
    const bgGrad = ctx.createRadialGradient(w/2, h/2, 20, w/2, h/2, 180);
    bgGrad.addColorStop(0, '#0f3a60');
    bgGrad.addColorStop(1, '#061727');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    // 显微镜标尺网格
    ctx.strokeStyle = 'rgba(56, 189, 248, 0.15)';
    ctx.lineWidth = 1;
    for (let x = 0; x < w; x += 25) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += 25) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // 绘制微塑料高分子链球点 (简笔画风格高分子聚合物模型)
    ctx.save();
    ctx.translate(w/2, h/2);
    ctx.scale(this.zoomLevel, this.zoomLevel);
    ctx.translate(-w/2, -h/2);

    const time = Date.now() * 0.001;
    const pointsCount = 36;
    ctx.lineWidth = 2;

    for (let i = 0; i < pointsCount; i++) {
      const angle = (i / pointsCount) * Math.PI * 4;
      const r = 30 + (i % 6) * 18 + Math.sin(time + i) * 4;
      const px = w/2 + Math.cos(angle) * r;
      const py = h/2 + Math.sin(angle) * r * 0.7;

      // 聚合物连接键线
      if (i > 0) {
        ctx.strokeStyle = i % 2 === 0 ? '#38bdf8' : '#7dd3fc';
        ctx.beginPath();
        const prevAngle = ((i - 1) / pointsCount) * Math.PI * 4;
        const prevR = 30 + ((i - 1) % 6) * 18;
        ctx.moveTo(w/2 + Math.cos(prevAngle) * prevR, h/2 + Math.sin(prevAngle) * prevR * 0.7);
        ctx.lineTo(px, py);
        ctx.stroke();
      }

      // 高分子单体球
      ctx.fillStyle = (i % 3 === 0) ? '#0284c7' : ((i % 3 === 1) ? '#e0f2fe' : '#38bdf8');
      ctx.beginPath();
      ctx.arc(px, py, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // 如果是未重构的海洋风化区域，绘制裂隙简笔画
    ctx.strokeStyle = 'rgba(239, 68, 68, 0.4)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(w/2 - 70, h/2 - 40);
    ctx.lineTo(w/2 - 20, h/2 - 10);
    ctx.lineTo(w/2 - 50, h/2 + 35);
    ctx.stroke();

    ctx.restore();

    // 显微镜水滴波纹与纳米标签
    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText(`MATERIAL_DNA: ${prod.codeSymbol}`, 15, 20);
    ctx.fillText(`MAGNIFICATION: ${(this.zoomLevel * 100).toFixed(0)}x (ISO-14021)`, 15, 35);
    ctx.fillText(`PURITY: 99.4% ACOUSTIC-CLEANSED`, 15, h - 15);
  }

  // 初始化地图
  initMap() {
    this.oceanMap = new OceanTraceMap('oceanTraceMapContainer', (pt) => {
      // 地图点击点与产品联动
      const foundIdx = PRODUCTS_DATA.findIndex(p => p.mapIndex === this.oceanMap.points.findIndex(op => op.id === pt.id));
      if (foundIdx !== -1 && foundIdx !== this.currentProductIndex) {
        this.selectProduct(foundIdx);
      }
    });
  }

  // 初始化打捞游戏
  initGame() {
    this.salvageGame = new SalvageGame('salvageCanvas');
    const btnStart = document.getElementById('btnStartGame');
    if (btnStart) {
      btnStart.addEventListener('click', () => {
        if (!this.salvageGame.isRunning) {
          this.salvageGame.start();
          btnStart.innerHTML = '<span>⏸ 暂停模拟巡航</span>';
        } else {
          this.salvageGame.stop();
          btnStart.innerHTML = '<span>▶ 启动 AI 巡航打捞</span>';
        }
      });
    }
  }

  // 绑定全局点击、弹窗与 NFC 模拟
  bindGlobalEvents() {
    // 1. NFC 碰一碰模拟按钮
    const btnSimulateNfc = document.getElementById('btnSimulateNfc');
    if (btnSimulateNfc) {
      btnSimulateNfc.addEventListener('click', () => {
        // 随机或下一个产品模拟碰一碰
        const nextIdx = (this.currentProductIndex + 1) % PRODUCTS_DATA.length;
        this.selectProduct(nextIdx);
        this.showNfcToast(PRODUCTS_DATA[nextIdx]);
      });
    }

    // 2. 音频切换按钮
    const btnAudioToggle = document.getElementById('btnAudioToggle');
    if (btnAudioToggle) {
      btnAudioToggle.addEventListener('click', () => {
        const isPlaying = window.blueAudio.toggleMute();
        btnAudioToggle.innerHTML = isPlaying ? '<span>🔊 海浪原声</span>' : '<span>🔇 静音模式</span>';
      });
    }

    // 3. 手机框架模式切换按钮
    const btnMobileModeToggle = document.getElementById('btnMobileModeToggle');
    if (btnMobileModeToggle) {
      btnMobileModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('mobile-frame-mode');
        const isMobile = document.body.classList.contains('mobile-frame-mode');
        btnMobileModeToggle.innerHTML = isMobile ? '<span>💻 宽屏视图</span>' : '<span>📱 手机模拟</span>';
      });
    }

    // 4. 3D 护照翻转
    const passportCard = document.getElementById('passportCardInner');
    const btnFlipPassport = document.getElementById('btnFlipPassport');
    if (passportCard) {
      passportCard.addEventListener('click', () => {
        passportCard.classList.toggle('flipped');
        window.blueAudio && window.blueAudio.playTapSound();
      });
    }
    if (btnFlipPassport) {
      btnFlipPassport.addEventListener('click', () => {
        if (passportCard) {
          passportCard.classList.toggle('flipped');
          window.blueAudio && window.blueAudio.playTapSound();
        }
      });
    }

    // 5. 生成朋友圈打卡海报
    const btnSharePoster = document.getElementById('btnSharePoster');
    const modalPoster = document.getElementById('modalSharePoster');
    if (btnSharePoster && modalPoster) {
      btnSharePoster.addEventListener('click', () => {
        this.openSharePosterModal();
      });
    }

    // 6. 特权预约模态框
    const btnBookExhibition = document.getElementById('btnBookExhibition');
    const btnBookLab = document.getElementById('btnBookLab');
    const modalBooking = document.getElementById('modalBooking');

    if (btnBookExhibition) {
      btnBookExhibition.addEventListener('click', () => {
        this.openBookingModal('线下多感官艺术展 · 泥土芬芳与治愈地球');
      });
    }
    if (btnBookLab) {
      btnBookLab.addEventListener('click', () => {
        this.openBookingModal('高校联合微塑料降解材料实验室探访');
      });
    }

    // 模态框通用关闭按钮
    const closeButtons = document.querySelectorAll('.btn-close-modal, .btn-modal-close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.modal-overlay').forEach(m => m.classList.remove('active'));
      });
    });

    // 预约表单提交
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const eventName = document.getElementById('bookingEventName').value;
        const userName = document.getElementById('bookingUserName').value || '蔚蓝共生者';
        alert(`🎉 预约成功！\n\n【${userName}】您的专属通行凭证已生成。\n凭证号：BS-PASS-${Math.floor(100000 + Math.random() * 900000)}\n请携带含有 NFC 芯片的文创产品前往现场碰一碰核验入场！`);
        modalBooking.classList.remove('active');
      });
    }
  }

  // 弹出轻提示：NFC 碰一碰识别
  showNfcToast(prod) {
    const toast = document.createElement('div');
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: #091e3a;
      color: #ffffff;
      border: 2px solid #38bdf8;
      box-shadow: 4px 4px 0px #0284c7;
      padding: 12px 24px;
      border-radius: 30px;
      z-index: 3000;
      font-weight: 800;
      font-size: 0.95rem;
      display: flex;
      align-items: center;
      gap: 10px;
      animation: modalFadeIn 0.3s ease;
    `;
    toast.innerHTML = `<span>📱 NFC碰一碰成功：已加载【${prod.name}】材质溯源档案！</span>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  // 打开海报分享弹窗
  openSharePosterModal() {
    const modal = document.getElementById('modalSharePoster');
    const prod = PRODUCTS_DATA[this.currentProductIndex];
    if (!modal || !prod) return;

    const elName = document.getElementById('posterProdName');
    const elCode = document.getElementById('posterResinCode');
    const elOrigin = document.getElementById('posterOrigin');
    const elRescue = document.getElementById('posterRescue');
    const elHash = document.getElementById('posterTokenHash');

    if (elName) elName.textContent = prod.name;
    if (elCode) elCode.textContent = prod.codeSymbol;
    if (elOrigin) elOrigin.textContent = prod.originLocation;
    if (elRescue) elRescue.textContent = prod.rescueIndex;
    if (elHash) elHash.textContent = prod.tokenHash;

    modal.classList.add('active');
    window.blueAudio && window.blueAudio.playTapSound();
  }

  // 打开预约弹窗
  openBookingModal(title) {
    const modal = document.getElementById('modalBooking');
    const elTitle = document.getElementById('bookingModalTitle');
    const elHiddenInput = document.getElementById('bookingEventName');
    if (elTitle) elTitle.textContent = title;
    if (elHiddenInput) elHiddenInput.value = title;
    if (modal) {
      modal.classList.add('active');
      window.blueAudio && window.blueAudio.playTapSound();
    }
  }

  // 生态反哺计算器
  initFundCalculator() {
    const slider = document.getElementById('fundItemsSlider');
    const elCount = document.getElementById('fundItemsCount');
    const elDonation = document.getElementById('fundTotalDonation');
    const elPlasticCleaned = document.getElementById('fundTotalPlastic');
    const elHours = document.getElementById('fundBoatHours');

    if (!slider) return;

    slider.addEventListener('input', (e) => {
      const val = parseInt(e.target.value);
      if (elCount) elCount.textContent = `${val} 件`;
      if (elDonation) elDonation.textContent = `¥${val * 68}`;
      if (elPlasticCleaned) elPlasticCleaned.textContent = `${(val * 0.42).toFixed(2)} kg`;
      if (elHours) elHours.textContent = `${(val * 1.5).toFixed(1)} 小时`;
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.appManager = new AppManager();
  window.appManager.init();
});
