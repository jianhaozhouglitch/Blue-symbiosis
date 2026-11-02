/* ==========================================================================
   蔚蓝共生计划 - 海洋塑料踪迹手绘地图 (Interactive Ocean Trace Map)
   结合矢量 SVG 简笔画海图与动态坐标日志
   ========================================================================== */

class OceanTraceMap {
  constructor(containerId, onSelectPoint) {
    this.container = document.getElementById(containerId);
    this.onSelectPoint = onSelectPoint;
    this.activePointId = 'point-1';
    
    this.points = [
      {
        id: 'point-1',
        name: '东海舟山渔场监测点',
        code: 'ZHOU-SHAN-01',
        coord: '30.12° N, 122.35° E',
        targetPlastic: 'HDPE (高密度聚乙烯)',
        product: '「深海漫游者」机能潮玩公仔',
        salvageWeight: '142.8 kg',
        aiVessel: 'AI-Orca 07 号捕捞巡航艇',
        depth: '水深 28 米 (近海浮标与工业包装)',
        sonarEvents: '成功发射声波 24 次，驱散近海海龟与幼鱼群',
        carbonSaved: '2.45 kg CO₂e',
        svgX: 195,
        svgY: 175
      },
      {
        id: 'point-2',
        name: '太平洋环流治理试验航道',
        code: 'PACIFIC-GYRE-09',
        coord: '28.50° N, 145.20° E',
        targetPlastic: 'rPET (再生聚酯纤维)',
        product: '「涌浪之间」轻量机能托特挎包',
        salvageWeight: '386.4 kg',
        aiVessel: 'AI-Albatross 02 号远洋母舰',
        depth: '表层 0~5 米 (漂浮饮料瓶抽丝原料)',
        sonarEvents: '声波驱赶长吻飞旋海豚群 6 次',
        carbonSaved: '4.82 kg CO₂e',
        svgX: 430,
        svgY: 150
      },
      {
        id: 'point-3',
        name: '南海西沙群岛航段',
        code: 'XISHA-REEF-03',
        coord: '16.83° N, 112.33° E',
        targetPlastic: 'PP (食品级聚丙烯)',
        product: '「浮游之光」双层真空随行杯',
        salvageWeight: '94.2 kg',
        aiVessel: 'AI-Manta 04 号潜水打捞艇',
        depth: '水深 45 米 (外卖餐盒与潜水沉降物)',
        sonarEvents: '珊瑚礁低频保护声学巡航 12 小时',
        carbonSaved: '1.62 kg CO₂e',
        svgX: 160,
        svgY: 280
      },
      {
        id: 'point-4',
        name: '黄海南部洋流汇集区',
        code: 'YELLOW-SEA-05',
        coord: '34.25° N, 124.12° E',
        targetPlastic: 'LDPE (低密度聚乙烯)',
        product: '「海风褶皱」艺术肌理云朵灯',
        salvageWeight: '78.5 kg',
        aiVessel: 'AI-Orca 09 号近岸拦截船',
        depth: '表层漂浮 (缠绕海草床的超薄薄膜)',
        sonarEvents: '配合气浮拦截网，无伤保护水母繁殖区',
        carbonSaved: '1.18 kg CO₂e',
        svgX: 230,
        svgY: 110
      },
      {
        id: 'point-5',
        name: '台湾海峡深海断裂带',
        code: 'TAIWAN-STRAIT-08',
        coord: '24.80° N, 119.50° E',
        targetPlastic: '沉水级微塑料微粒 (<5mm)',
        product: '「星海信使」微塑料树脂吊坠',
        salvageWeight: '34.6 kg (约 180,000+ 微粒)',
        aiVessel: 'AI-SpaceStation 海洋空间站纳米过滤阵列',
        depth: '水深 60~120 米 (微米级悬浮微塑料)',
        sonarEvents: '超声微泡聚集分离，浮游动物零误捕',
        carbonSaved: '3.10 kg CO₂e',
        svgX: 180,
        svgY: 220
      },
      {
        id: 'point-6',
        name: '东海大陆架外缘冷涡区',
        code: 'COLD-EDDY-06',
        coord: '31.34° N, 123.25° E',
        targetPlastic: '微塑料微粒 (彩斑硬胶颗粒)',
        product: '「深渊之晶」透光树脂定制键帽',
        salvageWeight: '22.4 kg (约 65,000+ 微粒)',
        aiVessel: 'AI-Ray 03 号纳米声学深滤勘测艇',
        depth: '水深 80 米 (深渊冷水微粒捕集)',
        sonarEvents: '微气泡定向悬浮分选，水生幼体零损伤',
        carbonSaved: '1.85 kg CO₂e',
        svgX: 250,
        svgY: 160
      },
      {
        id: 'point-7',
        name: '南海亚龙湾珊瑚暗礁带',
        code: 'SANYA-REEF-04',
        coord: '18.20° N, 109.52° E',
        targetPlastic: '混合再生塑料 (rPET/PP)',
        product: '「重塑海岸线」模块化肌理扩香石',
        salvageWeight: '115.6 kg',
        aiVessel: 'AI-Diver 05 号近海清淤巡航艇',
        depth: '水深 18 米 (近岸珊瑚礁沉积硬料)',
        sonarEvents: '低频声学驱散热带珊瑚礁鱼群 18 次',
        carbonSaved: '3.20 kg CO₂e',
        svgX: 130,
        svgY: 310
      },
      {
        id: 'point-8',
        name: '济州海峡幽灵拖网拦截区',
        code: 'GHOST-NET-07',
        coord: '32.75° N, 126.17° E',
        targetPlastic: 'Recycled Nylon (废弃渔网/拖网)',
        product: '「洋流轨迹」机能风伞绳相机背带',
        salvageWeight: '240.5 kg',
        aiVessel: 'AI-NetBreaker 01 号重型拖网拦截船',
        depth: '海床底层 50 米 (缠绕绝户拖网缆绳)',
        sonarEvents: '成功探测并避让斑海豹洄游路线',
        carbonSaved: '5.60 kg CO₂e',
        svgX: 280,
        svgY: 130
      },
      {
        id: 'point-9',
        name: '西太平洋马里亚纳立体取样井',
        code: 'MARIANA-CORE-08',
        coord: '11.35° N, 142.20° E',
        targetPlastic: '全品类混合废弃物 (立柱分层)',
        product: '「深蓝档案」海洋沉积物柱体标本',
        salvageWeight: '58.0 kg',
        aiVessel: 'AI-Challenger 01 号全海深沉积物巡航勘探艇',
        depth: '全海深 0~4000 米 (全深度梯度取样)',
        sonarEvents: '深海多波束测深与无损立柱取芯',
        carbonSaved: '4.50 kg CO₂e',
        svgX: 470,
        svgY: 270
      },
      {
        id: 'point-10',
        name: '东海韭山列岛海鸟保护区',
        code: 'JIUSHAN-ISLAND-10',
        coord: '29.67° N, 122.47° E',
        targetPlastic: 'HDPE (耐候硬质浮箱与工业托盘)',
        product: '「共振海螺」无源声学手机扩音底座',
        salvageWeight: '168.2 kg',
        aiVessel: 'AI-Orca 08 号近海清塑巡航艇',
        depth: '水深 12 米 (暗礁冲刷硬塑料残骸)',
        sonarEvents: '高频驱鸟避震声学护航，保护极危中华凤头燕鸥',
        carbonSaved: '2.95 kg CO₂e',
        svgX: 210,
        svgY: 195
      }
    ];

    this.render();
  }

  render() {
    if (!this.container) return;
    
    // 生成手绘简笔画 SVG 交互海图
    const svgHtml = `
      <svg class="map-svg-canvas" viewBox="0 0 540 360" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="seaGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#bae6fd" stroke-width="0.5" opacity="0.6"/>
          </pattern>
        </defs>

        <!-- 海洋背景与网格 -->
        <rect width="100%" height="100%" fill="#e0f2fe" />
        <rect width="100%" height="100%" fill="url(#seaGrid)" />

        <!-- 手绘大陆海岸线轮廓 (简笔画风格) -->
        <path d="M 0,20 Q 80,40 100,80 T 130,130 T 150,170 T 130,230 T 90,290 T 40,360 L 0,360 Z" 
              fill="#f8fafc" stroke="#091e3a" stroke-width="3" stroke-linejoin="round" />
        
        <!-- 大陆内陆手绘山脉小简笔画 -->
        <path d="M 20,80 L 35,60 L 50,80 M 35,60 L 45,70" stroke="#0f3a60" stroke-width="2" fill="none"/>
        <path d="M 45,150 L 60,130 L 75,150" stroke="#0f3a60" stroke-width="2" fill="none"/>
        <text x="35" y="115" font-size="12" font-weight="900" fill="#0f3a60" font-family="'Noto Sans SC', sans-serif">东亚大陆海岸</text>

        <!-- 手绘岛屿轮廓 -->
        <path d="M 170,205 Q 185,210 180,240 Q 165,245 165,220 Z" fill="#ffffff" stroke="#091e3a" stroke-width="2.5" />
        <text x="160" y="260" font-size="10" font-weight="bold" fill="#0f3a60">台湾海峡</text>

        <path d="M 190,165 Q 198,168 195,178 Q 188,180 188,170 Z" fill="#ffffff" stroke="#091e3a" stroke-width="2" />
        <text x="198" y="172" font-size="10" font-weight="bold" fill="#0f3a60">舟山群岛</text>

        <!-- 洋流虚线与箭头 (黑潮与环流路径) -->
        <path d="M 150,330 Q 190,260 220,180 T 320,130 T 430,145" 
              fill="none" stroke="#0284c7" stroke-width="2.5" stroke-dasharray="6,5" />
        <path d="M 430,145 Q 490,170 480,230 T 380,270 T 260,280" 
              fill="none" stroke="#38bdf8" stroke-width="2" stroke-dasharray="5,4" />

        <!-- 洋流文字简笔画 -->
        <text x="260" y="145" font-size="10" fill="#0284c7" font-weight="bold" transform="rotate(-15, 260, 145)">➔ 太平洋暖流通道</text>
        <text x="380" y="210" font-size="11" fill="#0f3a60" font-weight="900">大洋环流治理区</text>

        <!-- 海洋空间站简笔画图标 -->
        <g transform="translate(310, 80)">
          <circle cx="0" cy="0" r="16" fill="#ffffff" stroke="#091e3a" stroke-width="2.5" />
          <path d="M -24,0 L -16,0 M 16,0 L 24,0 M 0,-24 L 0,-16" stroke="#091e3a" stroke-width="2.5" />
          <rect x="-28" y="-6" width="8" height="12" fill="#38bdf8" stroke="#091e3a" stroke-width="1.5" />
          <rect x="20" y="-6" width="8" height="12" fill="#38bdf8" stroke="#091e3a" stroke-width="1.5" />
          <circle cx="0" cy="0" r="5" fill="#38bdf8" />
          <text x="-30" y="28" font-size="9" font-weight="bold" fill="#091e3a">海洋空间站 01</text>
        </g>

        <!-- 手绘 GPS 打捞坐标钉 (点击可切换) -->
        ${this.points.map(pt => `
          <g class="map-pin-group ${pt.id === this.activePointId ? 'active-pin' : ''}" 
             data-id="${pt.id}" 
             transform="translate(${pt.svgX}, ${pt.svgY})" 
             style="cursor: pointer;">
            <!-- 涟漪光圈 -->
            <circle class="pin-ripple" cx="0" cy="0" r="14" fill="none" stroke="#0284c7" stroke-width="2" opacity="0.6">
              <animate attributeName="r" values="8;22;8" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.8;0;0.8" dur="2.4s" repeatCount="indefinite" />
            </circle>

            <!-- 定位针图标 -->
            <path d="M 0,0 C -8,-10 -8,-24 0,-24 C 8,-24 8,-10 0,0 Z" 
                  fill="${pt.id === this.activePointId ? '#0284c7' : '#ffffff'}" 
                  stroke="#091e3a" stroke-width="2.5" />
            
            <circle cx="0" cy="-14" r="4.5" fill="${pt.id === this.activePointId ? '#ffffff' : '#0284c7'}" />

            <!-- 简短标签 -->
            <rect x="-35" y="4" width="70" height="16" rx="4" fill="#ffffff" stroke="#091e3a" stroke-width="1.5" />
            <text x="0" y="15" text-anchor="middle" font-size="8" font-weight="bold" fill="#091e3a">${pt.name.slice(0, 4)}</text>
          </g>
        `).join('')}

        <!-- 装饰性小海豚与纸飞机简笔画 -->
        <path d="M 460,70 Q 475,60 480,75 Q 470,85 460,70 Z" fill="#38bdf8" stroke="#091e3a" stroke-width="1.5" />
        <text x="440" y="340" font-size="10" font-family="'Caveat', cursive" font-weight="bold" fill="#0284c7">✦ Blue Symbiosis GIS v2.4</text>
      </svg>
    `;

    this.container.innerHTML = svgHtml;
    this.bindEvents();
    this.updateInfoPanel();
  }

  bindEvents() {
    const pins = this.container.querySelectorAll('.map-pin-group');
    pins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        const id = pin.getAttribute('data-id');
        this.selectPoint(id);
      });
    });
  }

  selectPoint(id) {
    this.activePointId = id;
    window.blueAudio && window.blueAudio.playTapSound();
    this.render();
    if (this.onSelectPoint) {
      const pt = this.points.find(p => p.id === id);
      this.onSelectPoint(pt);
    }
  }

  selectByProductIndex(idx) {
    if (this.points[idx]) {
      this.selectPoint(this.points[idx].id);
    }
  }

  updateInfoPanel() {
    const pt = this.points.find(p => p.id === this.activePointId);
    if (!pt) return;

    const elTitle = document.getElementById('tracePointTitle');
    const elBoat = document.getElementById('traceBoatBadge');
    const elCoord = document.getElementById('traceCoordVal');
    const elWeight = document.getElementById('traceWeightVal');
    const elDepth = document.getElementById('traceDepthVal');
    const elSonar = document.getElementById('traceSonarVal');
    const elCarbon = document.getElementById('traceCarbonVal');
    const elLog = document.getElementById('traceLogDesc');

    if (elTitle) elTitle.textContent = pt.name;
    if (elBoat) elBoat.textContent = pt.aiVessel;
    if (elCoord) elCoord.textContent = pt.coord;
    if (elWeight) elWeight.textContent = pt.salvageWeight;
    if (elDepth) elDepth.textContent = pt.depth;
    if (elSonar) elSonar.textContent = pt.sonarEvents;
    if (elCarbon) elCarbon.textContent = pt.carbonSaved;
    if (elLog) elLog.textContent = `该批次塑料由【${pt.aiVessel}】在【${pt.name}】精准打捞。该区域洋流交汇密集，系统通过特征声波保护了周边鱼群，所捕捞的【${pt.targetPlastic}】已通过超声清洗与低温造粒，注入您的【${pt.product}】文创之中。`;
  }
}

window.OceanTraceMap = OceanTraceMap;
