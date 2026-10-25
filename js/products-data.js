/* ==========================================================================
   蔚蓝共生计划 (Blue Symbiosis) - 文创产品核心数据体系与 NFC 物联配置
   支持主站与各专有二级页面共享数据源、NFC 链接生成与物理标签写入
   ========================================================================== */

// 全局共享文创数据源
var PRODUCTS_DATA = [
  {
    id: 'prod-hdpe',
    slug: 'hdpe',
    dedicatedFile: 'product-hdpe.html',
    name: '「深海漫游者」机能潮玩公仔',
    englishName: 'DEEP SEA WANDERER · MECHA ART TOY',
    shortName: '深海漫游者潮玩',
    plasticName: 'HDPE (高密度聚乙烯)',
    resinCode: 2,
    codeSymbol: '♴ HDPE',
    nfcChipId: 'CHIP-NFC-8849-HDPE',
    degradeYears: '自然降解约 500 年',
    colorTheme: '#0284c7',
    tagBg: '#e0f2fe',
    originLocation: '东海舟山渔场近海捕捞 (废弃浮标与耐候塑料容器)',
    salvageCoordinates: '30°15\'22"N, 122°48\'10"E',
    salvageSeaArea: '中国东海 · 舟山群岛外海渔场 03 监测区',
    salvageVessel: 'AI-Orca 07 号捕捞巡航艇',
    sourceForm: '近海风化撕裂的化工桶与深海浮漂硬质残片',
    processFlow: '40kHz 超声波表面微藻洗涤 ➔ 240℃ 低温惰性造粒 ➔ 模块化高精密注塑',
    tokenHash: '0x8849c71a39d8820f1b0a',
    certDate: '2026.09.18',
    passId: 'BS-PASS-884902',
    rescueIndex: '保护 38 尾幼龟与底栖石斑鱼免受塑料碎片割伤',
    carbonSaved: '2.45 kg CO₂e',
    cleanArea: '120 m² 滩涂净化',
    dimensions: '高 145mm × 宽 82mm × 厚 68mm · 净重约 180g',
    composition: '85% 海洋回收 HDPE + 15% 生物基矿物调质剂',
    safetyCert: 'ROHS / REACH 欧盟环保认证 · 无重金属析出 · 儿童接触级安全',
    chipType: 'NTAG213 柔性抗金属高频芯片 (13.56MHz · ISO 14443A · NFC Forum Type 2)',
    tagline: '将深海漂浮的工业杀手，重塑为你书桌上永不熄灭的深潜探索者。',
    designStory: '在东海舟山渔场，每年有数以千计破损的风化渔业浮标被洋流撕碎。我们回收这些坚韧耐候的高密度聚乙烯，通过冷流研磨与无损造粒，保留了海洋浪花般的天然云石纹理。机能关节设计灵感源自未来深海空间站潜航服，头部内置发光冷凝舱，胸口嵌合 NFC 确权芯片。',
    features: [
      { title: '超高韧性与抗摔耐候', desc: '结晶度高达 85% 以上，耐磨抗摔抗冲击，抗海水盐雾酸碱腐蚀，手感温润沉稳。' },
      { title: '天然海洋大理石流纹', desc: '低温造粒保留了不同打捞批次浮标的原生色彩交融，每一尊公仔拥有独一无二的纹理。' },
      { title: '零有害物无毒环保再造', desc: '通过无害化超声波微藻纯化与惰性造粒，彻底清除传统废旧塑料的挥发异味与重金属。' }
    ],
    microDanger: 'HDPE 在波浪剧烈拍击与强紫外线暴晒下，会逐步脆化碎裂为 100~500μm 的不规则锋利粗糙颗粒，极易吸附海洋持久性有机污染物（POPs），并被底层甲壳类生物与石斑鱼幼鱼误食。',
    microscopeType: 'hdpe',
    fundRatio: '20%',
    fundContribution: '49.80 元定向拨付至东海声学护鱼设备运维专项',
    mapIndex: 0
  },
  {
    id: 'prod-pet',
    slug: 'pet',
    dedicatedFile: 'product-pet.html',
    name: '「涌浪之间」轻量机能潮流挎包',
    englishName: 'BETWEEN WAVES · TECHNICAL SLING BAG',
    shortName: '涌浪机能挎包',
    plasticName: 'rPET (再生聚对苯二甲酸乙二醇酯)',
    resinCode: 1,
    codeSymbol: '♳ PET',
    nfcChipId: 'CHIP-NFC-7215-rPET',
    degradeYears: '自然降解约 450 年',
    colorTheme: '#0ea5e9',
    tagBg: '#e0f2fe',
    originLocation: '太平洋环流治理区漂浮垃圾带 (废弃饮料瓶与矿泉水瓶)',
    salvageCoordinates: '28°30\'00"N, 155°12\'30"W',
    salvageSeaArea: '北太平洋亚热带环流区 · 01 号集塑阵列带',
    salvageVessel: 'Ocean-Cleaner 03 号远洋拦截母舰',
    sourceForm: '远洋漂浮成团的塑料饮料瓶与瓶盖复合体',
    processFlow: '光谱智能色选 ➔ 超声波切片除菌 ➔ 高纯度熔融拉丝 ➔ 织造为 600D 蔚蓝抗撕裂防泼水面料',
    tokenHash: '0x7215a4b768e99f2c301d',
    certDate: '2026.10.05',
    passId: 'BS-PASS-721501',
    rescueIndex: '减少约 420g 潜在微纤维释放，拯救 85 只浮游生物幼体',
    carbonSaved: '4.82 kg CO₂e',
    cleanArea: '260 m² 环流表层净水',
    dimensions: '长 320mm × 宽 180mm × 厚 90mm · 容量 4.5L · 净重仅 210g',
    composition: '100% 远洋打捞回收 rPET 涤纶面料 + 防水环保 PU 涂层',
    safetyCert: 'OEKO-TEX Standard 100 国际环保纺织认证 · 蓝标 Bluesign 认证',
    chipType: 'NTAG213 超薄柔性防水织唛芯片 (内嵌于挎包前袋暗纹织唛)',
    tagline: '每只挎包源自 18 只漂流大洋的废弃水瓶，随身背负一片重新清澈的海浪。',
    designStory: '在太平洋垃圾带中，矿泉水瓶是最普遍的漂浮污染物。经过近海高能射线消毒和多道精密切粒，我们将其拉丝重塑为超细 600D 机能抗撕裂面料。极简斜挎流线轮廓结合防水压胶拉链，肩带上暗嵌防水 NFC 织唛，触碰即亮起你拯救这片水域的实时数字档案。',
    features: [
      { title: '轻盈防暴雨防撕裂', desc: '纳米级紧密编织结构，轻如羽翼，防泼水等级高达 4 级，无惧户外风浪与阵雨。' },
      { title: '碳足迹断崖式降低 75%', desc: '相比原生石化涤纶纤维生产，整体能耗降低 60%，碳排放直降 75% 以上。' },
      { title: '多隔层人体工学快拆', desc: '配备磁吸快拆肩带扣具与隐藏式防盗仓，兼顾潮流机能穿搭与城市日常通勤。' }
    ],
    microDanger: 'PET 饮料瓶在日光紫外线照射与波浪磨蚀下，极易剥落分解出不可视的微米级纳米纤维（Microfibers），被浮游水蚤与小沙丁鱼误吸入消化系统，引发营养不良与窒息。',
    microscopeType: 'pet',
    fundRatio: '20%',
    fundContribution: '59.60 元定向拨付至太平洋拦截阵列滤网维护',
    mapIndex: 1
  },
  {
    id: 'prod-pp',
    slug: 'pp',
    dedicatedFile: 'product-pp.html',
    name: '「浮游之光」双层真空随行杯',
    englishName: 'PLANKTON GLOW · VACUUM INSULATED TUMBLER',
    shortName: '浮游随行杯',
    plasticName: 'PP (食品级再生聚丙烯)',
    resinCode: 5,
    codeSymbol: '♵ PP',
    nfcChipId: 'CHIP-NFC-3914-PP',
    degradeYears: '自然降解约 300 年',
    colorTheme: '#0284c7',
    tagBg: '#e0f2fe',
    originLocation: '南海西沙群岛航段深水区 (沉底外卖包装与吸管重塑)',
    salvageCoordinates: '16°50\'18"N, 112°20\'45"E',
    salvageSeaArea: '中国南海 · 西沙永兴岛外缘珊瑚暗礁水域',
    salvageVessel: 'AI-Diver 02 号水下深潜清淤机器人',
    sourceForm: '沉入海底暗礁的外卖餐盒、打包盒与高韧性塑料吸管',
    processFlow: '深潜无人机机械爪打捞 ➔ 真空高温脱脂除盐 ➔ 均聚物理重组 ➔ 打造食品级耐热杯体',
    tokenHash: '0x3914c4a17b01ee22f981',
    certDate: '2026.08.22',
    passId: 'BS-PASS-391405',
    rescueIndex: '消除珊瑚礁覆盖危机，维护 60+ 珊瑚微生态健康',
    carbonSaved: '1.62 kg CO₂e',
    cleanArea: '85 m² 珊瑚海域',
    dimensions: '口径 86mm × 底径 65mm × 高 175mm · 容量 480ml · 净重约 260g',
    composition: '内胆食品级 316 不锈钢 + 外壳 100% 海洋再生 PP 聚丙烯',
    safetyCert: 'FDA 食品级接触安全标准 · GB 4806 食品安全国家标准 · 无双酚A (BPA Free)',
    chipType: 'NTAG215 耐温抗金属防潮芯片 (密封封装于杯底防滑硅胶减震层)',
    tagline: '拒绝一次性纸杯塑料盖，以大海带回来的水杯，盛装你每一天的澄澈。',
    designStory: '在南海珊瑚礁区，沉入暗礁的外卖餐盒像裹尸布一样阻断珊瑚虫采光。我们的深潜机器人将其从 40 米深暗礁捞出，高温重组为流线型随行杯外壳。杯身散发柔和渐变的海洋蓝韵，杯底防滑垫内嵌高频 NFC 芯片，在咖啡馆轻轻一碰，即刻记录你的自备杯减塑减碳里程。',
    features: [
      { title: '耐 120℃ 沸水无有害物', desc: '优越的热稳定性，冷热饮双相耐受，绝不析出塑化剂或异味，耐咖啡果酸侵蚀。' },
      { title: '6 小时高效锁温保冷', desc: '双层真空阻隔冷热散失，夏日冰拿铁不化水，冬日热美式暖意持久。' },
      { title: '360° 防漏旋转杯盖', desc: '食品级密封硅胶圈与阻尼卡扣，颠簸摇晃滴水不漏，车载与书包安心存放。' }
    ],
    microDanger: '聚丙烯沉于海底厌氧弱光环境下极难降解，会持续数百年缓慢释放邻苯二甲酸酯等增塑剂化学物质，抑制珊瑚虫黄藻的光合效率并加速珊瑚白化。',
    microscopeType: 'pp',
    fundRatio: '20%',
    fundContribution: '37.80 元定向拨付至西沙珊瑚礁潜水清淤机器人巡检',
    mapIndex: 2
  },
  {
    id: 'prod-ldpe',
    slug: 'ldpe',
    dedicatedFile: 'product-ldpe.html',
    name: '「海风褶皱」艺术肌理云朵灯',
    englishName: 'SEA BREEZE PLEATS · AMBIENT CLOUD LAMP',
    shortName: '海风云朵氛围灯',
    plasticName: 'LDPE (低密度聚乙烯)',
    resinCode: 4,
    codeSymbol: '♴ LDPE',
    nfcChipId: 'CHIP-NFC-5502-LDPE',
    degradeYears: '自然降解约 400 年',
    colorTheme: '#38bdf8',
    tagBg: '#e0f2fe',
    originLocation: '黄海南部洋流汇集区 (缠绕海草床的超薄薄膜与购物袋)',
    salvageCoordinates: '34°10\'40"N, 121°55\'10"E',
    salvageSeaArea: '中国黄海南部 · 盐城近岸蓝碳海草生态保护区',
    salvageVessel: 'AI-Manta 04 号近岸气浮清藻除塑艇',
    sourceForm: '破损超薄塑料袋、缠绕水草与农用棚膜碎片',
    processFlow: '气浮低阻收集 ➔ 蒸汽除杂去附着生物 ➔ 多层温控热压复合 ➔ 形成梦幻海洋肌理透光面板',
    tokenHash: '0x5502d73319fa82110ea4',
    certDate: '2026.09.29',
    passId: 'BS-PASS-550204',
    rescueIndex: '解救近海海草床缠绕危机，保护 15 只水母与近岸底栖生物 safe habitat',
    carbonSaved: '1.18 kg CO₂e',
    cleanArea: '95 m² 滩涂海草区',
    dimensions: '长 210mm × 宽 160mm × 高 135mm · 净重约 340g · Type-C 充电',
    composition: '多层海洋再生低密度聚乙烯 (LDPE) 复合透光罩 + FSC 环保木质基座',
    safetyCert: 'CE / FCC 电子产品安全认证 · 3C 认证 · 蓝光豁免级健康光源',
    chipType: 'NTAG213 触控协同 NFC 感应芯片 (隐藏于木质底座铭牌处)',
    tagline: '将窒息海草床的薄膜残片，化作一盏温柔折射深海微光的呼吸夜灯。',
    designStory: '超薄塑料袋是海草床与水母的致命杀手。我们收集缠绕海草的薄膜残片，以不同温度多段热压层叠，薄膜天然收缩形成了宛如水下光斑折射的有机肌理。灯光穿透时，仿佛把一整片宁静泛光的黄海晨曦凝固在桌前。底座内置触碰调光与 NFC 感应，手机轻触即可变换海洋声光模式。',
    features: [
      { title: '天然水波艺术漫射透光', desc: '热压形成的有机褶皱纹理，将 LED 点光源均匀漫射为如水下光影摇曳的温柔环境光。' },
      { title: '无极触摸调光与呼吸韵律', desc: '轻触底座无极调节亮度，长按进入深海潮汐呼吸模式，助眠安神。' },
      { title: 'Type-C 无线长续航', desc: '内置 2000mAh 环保锂电，充满可持续柔光点亮 14 小时，随心摆放无束缚。' }
    ],
    microDanger: '超薄 LDPE 薄膜极易在近岸波浪剪切冲刷下撕裂为数亿枚薄如蝉翼的微塑料薄片，在水体中形成致密悬浮幕，遮蔽海草床日光，直接摧毁近岸海洋生态系统的固碳蓝碳能力。',
    microscopeType: 'ldpe',
    fundRatio: '20%',
    fundContribution: '45.20 元定向拨付至黄海海草床蓝碳恢复基地',
    mapIndex: 3
  },
  {
    id: 'prod-micro',
    slug: 'micro',
    dedicatedFile: 'product-micro.html',
    name: '「星海信使」微塑料树脂科技吊坠',
    englishName: 'STAR OCEAN MESSENGER · RESIN TECH PENDANT',
    shortName: '微塑料信使吊坠',
    plasticName: '沉水级海洋微塑料微粒 (<5mm)',
    resinCode: 7,
    codeSymbol: '♹ MICRO',
    nfcChipId: 'CHIP-NFC-9900-MICRO',
    degradeYears: '人类时间尺度内不可自然降解',
    colorTheme: '#0f3a60',
    tagBg: '#e0f2fe',
    originLocation: '台湾海峡与东海交汇断裂带 (AI船纳米高密滤网捕集微粒)',
    salvageCoordinates: '25°20\'15"N, 120°45\'30"E',
    salvageSeaArea: '台湾海峡北部深水洋流断裂带 · 05 纳米深滤巡航点',
    salvageVessel: 'AI-Ray 01 号纳米水动力深滤勘测艇',
    sourceForm: '五颜六色风化微塑料微粒（碎片、发泡胶颗粒、微纤维）',
    processFlow: '声学纳米气浮微气泡聚集 ➔ 纳米滤网分选 ➔ 生物基高透树脂永久封存 ➔ 嵌合 NFC 芯片',
    tokenHash: '0x9900e882415d7a0b3c21',
    certDate: '2026.10.12',
    passId: 'BS-PASS-990007',
    rescueIndex: '永久封存 180,000+ 颗微塑料，切断其进入食物链路径',
    carbonSaved: '3.10 kg CO₂e',
    cleanArea: '320 m² 深海滤水面积',
    dimensions: '吊坠主体 38mm × 24mm × 10mm · 链长 60cm · 净重约 28g',
    composition: '真实打捞海洋微塑料标本颗粒 + 99.8% 高透生物基环氧树脂 + 钛钢防过敏扣件',
    safetyCert: 'SGS 树脂全密封封存无毒认证 · 欧盟安全饰品标准 · 永久物理隔绝',
    chipType: 'NTAG213 微型高透超小圆形 NFC 芯片 (直径仅 12mm，悬浮于晶体核心)',
    tagline: '封存深海的警示，凝固时间的琥珀。戴在胸前，做守护蔚蓝的信使。',
    designStory: '小于 5 毫米的微塑料是海洋生态隐形的剧毒幽灵。我们使用特制微气泡声学捕集网截获这些色彩斑斓的残片，用航天级高透生物基树脂进行真空封存，将危机永久物理隔离，并转化为一滴冰封的未来海洋眼泪。中央微型 NFC 芯片悬浮其中，手机触碰即可透视这几百颗微粒的打捞时间与化学成分。',
    features: [
      { title: '深海灾难的真实艺术封存', desc: '每一颗微塑料标本都是真实的海洋警示录，五彩斑斓的微粒凝固为触目惊心的美。' },
      { title: '真空晶透纳米封印工艺', desc: '航天级除气泡高透浇筑，达到 99% 光学透光率，永久隔绝微塑料与外界生物链接触。' },
      { title: '亲肤抗敏钛钢极简挂链', desc: '配以航天钛钢材质项链，耐汗液与海水腐蚀，防敏亲肤，支持日常全天候贴身佩戴。' }
    ],
    microDanger: '微塑料微粒尺寸与海洋浮游生物（如南极磷虾）极其吻合，极易被沙丁鱼、贝类及须鲸吞食，在动物肝脏与生殖系统内累积富集，顺着海洋食物网最终直抵人类餐桌。',
    microscopeType: 'micro',
    fundRatio: '20%',
    fundContribution: '67.00 元定向拨付至深海纳米微塑料滤网研发',
    mapIndex: 4
  }
];

// 辅助方法：按 ID 获取产品
function getProductById(id) {
  if (!id) return PRODUCTS_DATA[0];
  const found = PRODUCTS_DATA.find(p => p.id === id || p.slug === id);
  return found || PRODUCTS_DATA[0];
}

// 辅助方法：生成指定产品的专有二级页面 URL
function getProductNfcUrl(productId, customBaseUrl) {
  const prod = getProductById(productId);
  const base = customBaseUrl ? customBaseUrl.replace(/\/+$/, '') : (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
  // 返回通用参数形式或专有静态文件形式
  return `${base}/product.html?id=${prod.id}`;
}

// 辅助方法：生成各产品手绘简笔画图标 SVG
function getProductDoodleSvgCode(resinCode) {
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

// 导出挂载
if (typeof window !== 'undefined') {
  window.PRODUCTS_DATA = PRODUCTS_DATA;
  window.getProductById = getProductById;
  window.getProductNfcUrl = getProductNfcUrl;
  window.getProductDoodleSvgCode = getProductDoodleSvgCode;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PRODUCTS_DATA,
    getProductById,
    getProductNfcUrl,
    getProductDoodleSvgCode
  };
}
