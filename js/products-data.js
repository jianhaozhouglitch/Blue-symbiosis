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
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=d89b5d68-f274-4911-b7ec-ab326755dfb8',
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
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=fbdcb464-b014-4023-84b8-b1bee3902398',
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
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=55a82dfb-73a2-4b21-ac80-8b7b83e32851',
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
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=fee5a17a-d2c8-4c7c-bf61-bca6810d9d7d',
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
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=e1f2d9df-bdc9-45fa-943d-238dfd1ee351',
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
  },
  {
    id: 'prod-keycap',
    slug: 'keycap',
    dedicatedFile: 'product-keycap.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=dacee290-dfa9-4184-8b43-7770ff70a9be',
    name: '「深渊之晶」透光树脂定制键帽',
    englishName: 'CRYSTAL OF ABYSS · TRANSLUCENT RESIN KEYCAP',
    shortName: '深渊之晶键帽',
    plasticName: 'MICRO (微塑料微粒) + 环氧树脂',
    resinCode: 7,
    codeSymbol: '♹ MICRO',
    nfcChipId: 'CHIP-NFC-6618-KEYCAP',
    degradeYears: '人类时间尺度内不可自然降解',
    colorTheme: '#6366f1',
    tagBg: '#e0e7ff',
    originLocation: '东海北部冷水洋流带 (AI船高密纳米滤网捕集彩斑微粒)',
    salvageCoordinates: '31°20\'45"N, 123°15\'30"E',
    salvageSeaArea: '中国东海北部 · 大陆架外缘冷涡区 06 监测海域',
    salvageVessel: 'AI-Ray 03 号纳米声学深滤勘测艇',
    sourceForm: '色彩斑斓的风化微塑料颗粒（破碎硬胶碎屑与彩色发泡胶微珠）',
    processFlow: '微气泡声学悬浮聚拢 ➔ 级联微米离心筛分 ➔ 航天级高透环氧树脂真空脱泡灌封 ➔ 嵌入微型抗电磁 NFC 芯片',
    tokenHash: '0x6618e9a25b3f11c874ad',
    certDate: '2026.10.18',
    passId: 'BS-PASS-661807',
    rescueIndex: '永久封存 65,000+ 颗微塑料，切断浮游生物链中毒链条',
    carbonSaved: '1.85 kg CO₂e',
    cleanArea: '180 m² 深海滤水面积',
    dimensions: '标准 OEM / 原厂高度 R4 (ESC/F区) · 净重约 8.5g · 兼容十字轴体',
    composition: '海洋回收微塑料微粒 + 航天级高透环氧树脂 + 纳米抗黄变涂层',
    safetyCert: 'RoHS 欧盟电气环保标准 · REACH 高分子无毒认证 · SGS 防刮抗黄变认证',
    chipType: 'NTAG213 超微型圆形抗金属抗电磁芯片 (直径 9mm，悬浮于键帽十字柱顶端)',
    tagline: '每一次指尖敲击，都是来自深海 4000 米深渊的幽蓝回响。',
    designStory: '在深海中，有机碎屑沉降被称为“海洋雪”，而微塑料颗粒的混入打破了自然的平衡。我们将捕集的彩斑微塑料封存于晶莹剔透的高透树脂键帽中，保留其受海浪拍击打磨的原始断面。透过键盘的背光，微塑料宛如星河在键上流淌，内置 NFC 芯片一碰即直达打捞水域原声与数字孪生凭证。',
    features: [
      { title: '深海海洋雪透光特效', desc: 'RGB 轴体灯光透过微塑料悬浮阵列，折射出波光粼粼的幽蓝深海漫反射光效。' },
      { title: '微型抗干扰 NFC 嵌合', desc: '采用特制超小抗金属抗电磁线圈芯片，即便置于机械键盘金属定位板上也能敏锐感应。' },
      { title: '永久隔绝微塑料危害', desc: '生物基高透树脂全密封无缝包裹，微塑料与人体、水体永久物理隔离。' }
    ],
    microDanger: '微塑料微粒在日光紫外线与海水盐雾长年侵蚀下形成微孔孔隙，极易吸附海水中富集的多环芳烃（PAHs）与多氯联苯（PCBs），随食物链不断向上蓄积。',
    microscopeType: 'micro',
    fundRatio: '20%',
    fundContribution: '42.00 元定向拨付至深海声学微气泡滤网运维专项基金',
    mapIndex: 5
  },
  {
    id: 'prod-coastline',
    slug: 'coastline',
    dedicatedFile: 'product-coastline.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=ce9538ce-a5d5-4abb-b223-db6e4878aa41',
    name: '「重塑海岸线」模块化肌理扩香石/装饰板',
    englishName: 'RECLAIMED COASTLINE · MODULAR AROMA STONE & PANEL',
    shortName: '重塑海岸线扩香石',
    plasticName: '混合再生塑料 (rPET/PP) + 生态水泥/石膏',
    resinCode: 3,
    codeSymbol: '♳♵ HYBRID',
    nfcChipId: 'CHIP-NFC-4421-COAST',
    degradeYears: '自然降解约 400 年',
    colorTheme: '#059669',
    tagBg: '#d1fae5',
    originLocation: '南海三亚近岸珊瑚暗礁带 (废弃聚酯饮料瓶与外卖PP餐盒混合物)',
    salvageCoordinates: '18°12\'30"N, 109°31\'15"E',
    salvageSeaArea: '中国南海 · 亚龙湾外缘近岸水域 04 治理区',
    salvageVessel: 'AI-Diver 05 号近海清淤巡航艇',
    sourceForm: '近岸撕裂沉底的 rPET 瓶片与硬质 PP 打包盒残体',
    processFlow: '多级超声除盐去藻 ➔ 低温机械撕碎成 2~5mm 粗骨料 ➔ 结合超细生态水泥真空浇筑 ➔ CNC 数控雕刻等高线微流道 ➔ 嵌合 NFC 感应模块',
    tokenHash: '0x4421b8f031c59918ad4e',
    certDate: '2026.10.22',
    passId: 'BS-PASS-442103',
    rescueIndex: '消减近海 850g 塑料硬质沉积物，解救 45 只底栖贝类生境',
    carbonSaved: '3.20 kg CO₂e',
    cleanArea: '160 m² 珊瑚海滩净化',
    dimensions: '单块 120mm × 120mm × 22mm · 净重约 320g · 支持磁吸/无痕胶壁挂',
    composition: '40% 海洋回收塑料骨料 (rPET/PP) + 55% 生态矿物石膏/低碳硅酸盐水泥 + 5% 天然矿物颜料',
    safetyCert: '十环认证绿色建材标准 · GB 18580 室内装饰无有害释放 · 不含苯系挥发物与甲醛',
    chipType: 'NTAG213 耐潮湿硅胶封装 NFC 芯片 (埋设于等高线“原点”标记下方)',
    tagline: '让深海的等高起伏在空间呼吸，精油流淌的每一道微海沟都在讲述重生的故事。',
    designStory: '海洋中的废弃塑料碎片在波浪与沙石冲刷下，会呈现类似风化岩石的钝角质感。我们将这一特征转化为空间设计的结构语言，以海洋等高线为母题，将 rPET 与 PP 碎屑融于生态水泥中。精油滴入宛如海水潮汐涌入峡谷，在室内空间营造视觉、嗅觉与数字触碰三重沉浸体验。',
    features: [
      { title: '微海沟毛细导流挥发', desc: '精准数控微等高线沟槽，利用表面张力与微孔毛细结构让香氛精油缓慢流淌并自然散香。' },
      { title: '模块化无限空间拼贴', desc: '几何边缘互锁卡扣结构，既可作为单件桌面扩香器，亦可拼装拼接为大型环保肌理艺术背景墙。' },
      { title: '环保水泥与塑料共生', desc: '回收塑料作为轻质骨料替代天然砂石开采，减重 35% 的同时固化锁闭塑料废弃物。' }
    ],
    microDanger: '混合塑料碎片在水下沉积物中与海砂混合，阻止底栖附着生物固着，并在长波紫外线与波浪摩擦下持续脱落次生微米颗粒。',
    microscopeType: 'pp',
    fundRatio: '20%',
    fundContribution: '52.00 元定向拨付至南海近岸珊瑚礁与滩涂生态修护',
    mapIndex: 6
  },
  {
    id: 'prod-paracord',
    slug: 'paracord',
    dedicatedFile: 'product-paracord.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=bb7235c1-c4d0-4d14-bfc7-e88924e5af9c',
    name: '「洋流轨迹」机能风伞绳/相机背带',
    englishName: 'OCEAN CURRENT TRACE · TECHNICAL PARACORD STRAP',
    shortName: '洋流轨迹伞绳背带',
    plasticName: 'Recycled Nylon (废弃渔网/深海拖网)',
    resinCode: 7,
    codeSymbol: '♹ PA-NYLON',
    nfcChipId: 'CHIP-NFC-3389-NYLON',
    degradeYears: '自然降解约 600 年',
    colorTheme: '#0284c7',
    tagBg: '#e0f2fe',
    originLocation: '东海北部济州海峡渔场 (沉底绝户网与深海风化尼龙拖网)',
    salvageCoordinates: '32°45\'10"N, 126°10\'20"E',
    salvageSeaArea: '东海与黄海交界洋流区 · 07 号废弃幽灵渔网打捞点',
    salvageVessel: 'AI-NetBreaker 01 号重型拖网拦截回收船',
    sourceForm: '沉没海床的破损高强度尼龙渔网、缆绳与防浪网结',
    processFlow: '高压淡水除盐脱藻 ➔ 机械分级破丝 ➔ 深度脱聚再生PA6切片 ➔ 纳米抗老化复配拉丝 ➔ 7芯求生伞绳手工编织 ➔ 金属机能扣装配',
    tokenHash: '0x3389ff7142ea802bc519',
    certDate: '2026.10.25',
    passId: 'BS-PASS-338907',
    rescueIndex: '消减 1.2kg 高危缠绕尼龙拖网，解除对 12 只海豹与海豚幼体的致命威胁',
    carbonSaved: '5.60 kg CO₂e',
    cleanArea: '380 m² 幽灵渔网清理区',
    dimensions: '总长 115cm~145cm 可调节 · 绳径 10mm (双股编织) · 净重约 165g',
    composition: '100% 海洋回收再生尼龙 (Econyl/PA6) 伞绳 + 航空级高强度铝锌合金快拆扣',
    safetyCert: 'OEKO-TEX 生态纺织认证 · GRS 全球回收标准认证 · 国家纺织品安全技术规范 A类',
    chipType: 'NTAG213 超薄柔性热压防水织唛芯片 (植入于背带皮质连接处的保护封套内)',
    tagline: '斩断幽灵渔网的无声杀戮，编织成挂载于你肩头的坚不可摧之索。',
    designStory: '散落大洋的“幽灵渔网”是海龟、海豹和鲸豚最为致命的梦魇，数百年不会腐烂。我们将这些充满破坏力的深海尼龙拖网回收并重新拉丝成坚不可摧的 7 芯机能伞绳，搭配工业感十足的重工金属扣具。它不仅是一条强韧的相机背带，更是将海洋中致命的禁锢解构成年轻机能生活方式的宣言。',
    features: [
      { title: '极致拉力与军工级耐磨', desc: '单根伞绳静载承重超 250kg，无惧雨水、汗液与海水盐雾侵蚀，经久耐磨不松散。' },
      { title: '求生编织工艺与快拆机能', desc: '经典眼镜蛇/金刚结编织，配备重工锌合金快拆卡扣与三点定位防晃绳，快拆换装一秒搞定。' },
      { title: '一绳多用潮流互联模块', desc: '既能作为专业单反相机背带，也可拆卸为随身手机斜挎绳，或挂载于「涌浪之间」机能挎包作为强化负重带。' }
    ],
    microDanger: '尼龙拖网在海流长期拉扯下断裂为数以万计的尼龙超细单丝与纳米微纤维，缠绕海洋鱼鳃并进入生物消化道，造成不可逆的内脏器官划伤。',
    microscopeType: 'pet',
    fundRatio: '20%',
    fundContribution: '62.00 元定向拨付至东海幽灵渔网清网专项基金',
    mapIndex: 7
  },
  {
    id: 'prod-core',
    slug: 'core',
    dedicatedFile: 'product-core.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=4e230077-af28-4653-83ce-3fe6f3856312',
    name: '「深蓝档案」海洋沉积物微缩柱体标本',
    englishName: 'DEEP BLUE ARCHIVE · OCEAN SEDIMENT CORE SPECIMEN',
    shortName: '深蓝档案微缩标本',
    plasticName: '全品类混合废弃物 (LDPE/PP/HDPE/MICRO)',
    resinCode: 7,
    codeSymbol: '♳-♹ ALL-PLASTIC',
    nfcChipId: 'CHIP-NFC-1092-CORE',
    degradeYears: '分层递进 100~500+ 年',
    colorTheme: '#0f3a60',
    tagBg: '#e0f2fe',
    originLocation: '西太平洋马里亚纳海沟周边水域 (从海面漂浮层至沉降层立体取样)',
    salvageCoordinates: '11°21\'00"N, 142°12\'00"E',
    salvageSeaArea: '西太平洋盆地边缘 · 08 号深海立体取样监测井',
    salvageVessel: 'AI-Challenger 01 号全海深沉积物巡航勘探艇',
    sourceForm: '表层漂浮 LDPE 撕裂薄膜 + 中层悬浮 PP/HDPE 破损硬质碎块 + 底层高密沉水级微塑料微粒',
    processFlow: '立体多深层分选打捞 ➔ 表面脱毒无害化清洗 ➔ 按密度与沉积动力学梯度精准分层 ➔ 航天级高纯亚克力柱真空惰性气体封注 ➔ 底座嵌入 NFC 交互芯片',
    tokenHash: '0x1092a7c499e03d528b7a',
    certDate: '2026.10.28',
    passId: 'BS-PASS-109207',
    rescueIndex: '采样封存 210,000+ 粒全深度塑料残骸，为海洋科研提供完整标本档案',
    carbonSaved: '4.50 kg CO₂e',
    cleanArea: '450 m² 立体水体勘测区',
    dimensions: '高 240mm × 柱体直径 50mm · 铝合金底座 75mm × 75mm · 净重约 580g',
    composition: '真实海洋全层位回收塑料样本 + 99.5% 高透抗紫外亚克力密封柱 + 航空级喷砂氧化铝底座',
    safetyCert: '全密封物理隔离认证 · RoHS 环保检测 · 阻燃抗跌落实验室安全标准',
    chipType: 'NTAG215 大容量高频 NFC 芯片 (嵌于铝合金底座中央聚合物射频透窗)',
    tagline: '这不是一件普通的标本，而是一部切开深海、封存人类文明碳基痕迹的立体地质史书。',
    designStory: '地质学家通过冰芯与岩芯洞察百万年地球气候，而未来的地质学家将通过“塑料岩层”定义人类纪。我们将不同密度的回收海洋塑料依据沉降物理学在亚克力柱中层层固化——表层是漂浮数十年的阳光暴晒 LDPE 残片，中层是悬浮的 PP 与 HDPE 碎裂齿痕，底层则是沉入海渊的超细微塑料。触碰基座，向每个人直观呈现海洋真实的沉重。',
    features: [
      { title: '全海深地质柱状取芯设计', desc: '采用科研级地质勘探柱规制，精准还原表层漂浮物、中层中性悬浮物与深海沉积物的三维分布。' },
      { title: '工业风桌面科普数据模型', desc: '极具未来科幻实验室美感的桌面摆件，柱身激光雕刻深度刻度与年代降解推演标尺。' },
      { title: 'NFC 触碰解锁沉浸式数字大屏', desc: '手机碰击亚克力柱基座，即刻唤醒全三维水体污染演进模拟器与打捞全景纪录。' }
    ],
    microDanger: '海洋微塑料不仅存在于表层，随着生物絮团（海洋雪）沉降，微塑料正向数千米乃至万米海底全面渗透，成为永久性人类地质沉积层的一部分。',
    microscopeType: 'micro',
    fundRatio: '20%',
    fundContribution: '78.00 元定向拨付至西太平洋全海深微塑料环境监测项目',
    mapIndex: 8
  },
  {
    id: 'prod-conch',
    slug: 'conch',
    dedicatedFile: 'product-conch.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=5a1e10bc-c6a9-41bf-8bbb-4488139f1a75',
    name: '「共振海螺」无源声学手机扩音底座',
    englishName: 'RESONANT CONCH · PASSIVE ACOUSTIC PHONE DOCK',
    shortName: '共振海螺扩音座',
    plasticName: 'HDPE (高密度聚乙烯)',
    resinCode: 2,
    codeSymbol: '♴ HDPE',
    nfcChipId: 'CHIP-NFC-5188-CONCH',
    degradeYears: '自然降解约 500 年',
    colorTheme: '#0284c7',
    tagBg: '#e0f2fe',
    originLocation: '东海北部海岛暗礁冲刷带 (废弃硬质浮筒与耐压渔箱)',
    salvageCoordinates: '29°40\'15"N, 122°28\'35"E',
    salvageSeaArea: '中国东海中北部 · 韭山列岛海鸟自然保护区近岸',
    salvageVessel: 'AI-Orca 08 号近海清塑巡航艇',
    sourceForm: '风化破损的高韧性工业浮箱与抗撞击硬质托盘',
    processFlow: '高能无损超声去藻 ➔ 破碎并保留天然色彩大理石流纹 ➔ 高精度 3D 打印流线型螺旋声学腔体 ➔ 表面手工打磨抛光 ➔ 底部注模内嵌 NFC',
    tokenHash: '0x5188d3e904bc12693fa7',
    certDate: '2026.11.01',
    passId: 'BS-PASS-518802',
    rescueIndex: '清剿 1.5kg 硬质塑料残片，消除 25 巢海鸟幼雏被缠绕误食危机',
    carbonSaved: '2.95 kg CO₂e',
    cleanArea: '140 m² 海鸟保护区水域',
    dimensions: '长 150mm × 宽 110mm × 高 95mm · 净重约 310g · 手机槽宽 88mm 深度 14mm',
    composition: '100% 海洋打捞回收高密度聚乙烯 (HDPE) + 防滑硅胶脚垫',
    safetyCert: '无重金属析出 · 欧盟 RoHS 环保认证 · 食品接触级安全原料纯化标准',
    chipType: 'NTAG213 触控快速感应芯片 (封装于手机插槽底部减震胶垫正下方)',
    tagline: '无需一度电，以来自大海的号角，重新放大浪潮击石的纯粹回响。',
    designStory: '海洋软体动物历经亿万年演化出的螺旋海螺壳，是自然界最完美的无源声学扩音腔。而人类倾倒在海里的 HDPE 工业塑料因其高密度和优异的声波反射率，恰好是绝佳的声学材料。我们将打捞的 HDPE 重新熔融，以仿生参数化 3D 建模打印成双螺旋海螺。把手机放入槽位，手机扬声器的声音被放大延展，仿佛在耳边捧起了一整片喧腾的海。',
    features: [
      { title: '仿生海螺双螺旋无源声学腔', desc: '依据声学号角方程计算流线腔体，无需电源即可实现物理扩音 +12dB，声音饱满自然。' },
      { title: '中低频自然共鸣声学优化', desc: '针对 120Hz~500Hz 海浪与人声频段进行物理共振阻抗匹配，音质温润醇厚。' },
      { title: '手机插入即触碰 NFC 联动', desc: '手机插槽底端内置 NFC 感应标签，插入即刻弹窗启动“蔚蓝深海潮汐原声电台”。' }
    ],
    microDanger: '废弃 HDPE 硬质塑料在海岛礁石冲撞下持续脱落厘米至毫米级硬质尖锐碎屑，容易堵塞海鸟和海龟咽喉，阻碍消化吸收。',
    microscopeType: 'hdpe',
    fundRatio: '20%',
    fundContribution: '46.50 元定向拨付至东海韭山列岛海鸟栖息地保护项目',
    mapIndex: 9
  },
  {
    id: 'prod-buckle-reef',
    slug: 'buckle-reef',
    dedicatedFile: 'product-buckle-reef.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=4becfee9-9795-4381-9e56-25ddb9d2db5a',
    name: '「潮汐扣」再生海洋塑料行李箱扣',
    englishName: 'TIDAL BUCKLE · RECYCLED OCEAN PLASTIC LUGGAGE CLASP',
    shortName: '潮汐扣行李箱扣',
    plasticName: 'rHDPE (再生高密度聚乙烯)',
    resinCode: 2,
    codeSymbol: '♴ HDPE',
    nfcChipId: 'CHIP-NFC-7342-BUCKLE',
    degradeYears: '自然降解约 500 年',
    colorTheme: '#0284c7',
    tagBg: '#e0f2fe',
    originLocation: '东海舟山外海废弃浮标回收带 (耐候浮筒与行李箱外壳)',
    salvageCoordinates: '30°08\'42"N, 122°16\'20"E',
    salvageSeaArea: '中国东海 · 舟山群岛外缘近岸回收区',
    salvageVessel: 'AI-Orca 09 号近海清塑巡航艇',
    sourceForm: '海水浸泡风化的硬质浮标与废旧箱体扣件',
    processFlow: '智能分拣 ➔ 超声除盐去藻 ➔ 低温造粒 ➔ 精密注塑成型 ➔ 防腐弹簧组装',
    tokenHash: '0x7342b8a10e5c4d9912f6',
    certDate: '2026.11.08',
    passId: 'BS-PASS-734202',
    rescueIndex: '减少 180g 海洋硬质塑料残片进入近岸礁区',
    carbonSaved: '1.86 kg CO₂e',
    cleanArea: '72 m² 近岸礁区净化',
    dimensions: '长 78mm × 宽 42mm × 厚 18mm · 净重约 38g · 适配 20~25mm 箱带',
    composition: '70% 海洋回收 rHDPE + 30% 生物基增强填料 + 不锈钢弹簧',
    safetyCert: '无重金属析出 · RoHS 环保认证 · 通过箱包五金耐久测试',
    chipType: 'NTAG213 柔性芯片 (嵌入扣体内侧隐藏槽)',
    tagline: '把漂流海面的坚韧塑料，扣紧每一次出发，也扣紧一片更清澈的海。',
    designStory: '潮汐扣的圆润外形取自海浪反复冲刷后的礁石。我们将东海回收的耐候硬质塑料重新纯化，制成轻巧可靠的行李箱扣，让旅途中的每一次扣合都成为海洋循环材料重新进入日常生活的证据。',
    features: [
      { title: '轻量高强抗冲击', desc: '高韧性再生 rHDPE 扣体可承受频繁开合与行李搬运冲击，适合长途旅行。' },
      { title: '一键快拆稳固锁止', desc: '宽带槽与圆角导向结构兼顾快速安装和稳定扣合，适配常见行李箱束带。' },
      { title: '隐藏式数字身份芯片', desc: '扣体内侧保留数字档案识别位，记录每件再生材料的海洋回收来源。' }
    ],
    microDanger: '废弃硬质塑料扣件在海岸带长期磨蚀后会形成尖锐碎片，可能被海鸟误食或嵌入潮间带生物栖息地。',
    microscopeType: 'hdpe',
    fundRatio: '20%',
    fundContribution: '32.00 元定向支持舟山群岛近岸塑料拦截与海鸟保护',
    mapIndex: 10
  },
  {
    id: 'prod-buckle-current',
    slug: 'buckle-current',
    dedicatedFile: 'product-buckle-current.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=49d7baf4-1b95-4813-b13c-a20d93ff9cfc',
    name: '「洋流环」机能旅行行李箱扣',
    englishName: 'CURRENT LOOP · TECHNICAL TRAVEL LUGGAGE CLASP',
    shortName: '洋流环行李箱扣',
    plasticName: 'rPET + 再生尼龙复合材料',
    resinCode: 7,
    codeSymbol: '♹ HYBRID',
    nfcChipId: 'CHIP-NFC-8461-BUCKLE',
    degradeYears: '自然降解约 600 年',
    colorTheme: '#0ea5e9',
    tagBg: '#e0f2fe',
    originLocation: '北太平洋漂浮垃圾带 (废弃渔网与饮料瓶复合回收物)',
    salvageCoordinates: '31°12\'08"N, 153°40\'26"W',
    salvageSeaArea: '北太平洋亚热带环流区 · 04 号拦截阵列',
    salvageVessel: 'Ocean-Cleaner 05 号远洋拦截母舰',
    sourceForm: '海上废弃渔网、瓶盖与箱包塑料配件复合残片',
    processFlow: '远洋拦截 ➔ 光谱分选 ➔ 纤维增强改性 ➔ 精密注塑 ➔ 低摩擦扣轴装配',
    tokenHash: '0x8461d4e72a0c9f188b35',
    certDate: '2026.11.10',
    passId: 'BS-PASS-846105',
    rescueIndex: '拦截 260g 渔网复合塑料，降低海龟误食与缠绕风险',
    carbonSaved: '2.24 kg CO₂e',
    cleanArea: '96 m² 远洋漂浮带净化',
    dimensions: '长 82mm × 宽 46mm × 厚 20mm · 净重约 44g · 适配 25~30mm 箱带',
    composition: '55% 海洋回收 rPET + 30% 再生尼龙 + 15% 生物基增韧剂',
    safetyCert: '无卤阻燃 · RoHS / REACH 环保认证 · 通过 10,000 次开合耐久测试',
    chipType: 'NTAG213 防潮芯片 (隐藏于扣环底部复合层)',
    tagline: '让穿越洋流的渔网与瓶盖，成为下一段旅程可靠的连接点。',
    designStory: '洋流环以远洋拦截的渔网轨迹为结构灵感，将高强度再生尼龙与回收 rPET 复合，打造适合旅行装备的轻量扣具。扣环的每一次开启与锁止，都是海洋废弃物完成一次循环再生的微小回声。',
    features: [
      { title: '纤维增强耐拉扯', desc: '再生尼龙复合结构提升抗拉和抗疲劳性能，适合登机、托运和户外旅行场景。' },
      { title: '低摩擦顺滑扣合', desc: '优化扣轴与导向面，单手即可完成扣合，减少箱带扭结和误脱风险。' },
      { title: '模块化可替换设计', desc: '扣体与箱带分离，便于维护和更换，延长旅行用品的使用周期。' }
    ],
    microDanger: '废弃渔网与复合塑料在海洋中会持续缠绕海龟、海鸟和鱼类，并在磨损后释放难以回收的微塑料纤维。',
    microscopeType: 'micro',
    fundRatio: '20%',
    fundContribution: '36.00 元定向支持北太平洋幽灵渔网清理与海龟救助',
    mapIndex: 11
  },
  {
    id: 'prod-turtle-bookmark',
    slug: 'turtle-bookmark',
    dedicatedFile: 'product-turtle-bookmark.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=2cfc0bf9-b0d3-49ec-82f4-1213d3ad3d00',
    name: '废塑再生好运龟背书叶子挂饰',
    englishName: 'LUCKY TURTLE LEAF CHARM · RECYCLED PLASTIC BOOKMARK',
    shortName: '好运龟背叶子挂饰',
    plasticName: 'rPET (再生聚对苯二甲酸乙二醇酯)',
    resinCode: 1,
    codeSymbol: '♳ PET',
    nfcChipId: 'CHIP-NFC-5738-TURTLE',
    degradeYears: '自然降解约 450 年',
    colorTheme: '#10b981',
    tagBg: '#d1fae5',
    originLocation: '南海北部近岸漂浮垃圾回收带 (废弃饮料瓶与透明包装片)',
    salvageCoordinates: '21°28\'16"N, 112°44\'09"E',
    salvageSeaArea: '中国南海 · 珠江口近岸清塑区',
    salvageVessel: 'Blue-Turtle 03 号海岸清塑巡航艇',
    sourceForm: '海水浸泡褪色的饮料瓶片与薄型包装塑料',
    processFlow: '近岸打捞 ➔ 光谱分选 ➔ 超声除盐 ➔ 低温压片 ➔ 龟背纹理热压成型',
    tokenHash: '0x5738a2c91e0b4f7d2c61',
    certDate: '2026.11.14',
    passId: 'BS-PASS-573804',
    rescueIndex: '减少 42g 海洋塑料碎片进入海龟觅食水域',
    carbonSaved: '0.86 kg CO₂e',
    cleanArea: '38 m² 近岸海草区净化',
    dimensions: '长 95mm × 宽 42mm × 厚 5mm · 净重约 12g',
    composition: '85% 海洋回收 rPET + 15% 生物基柔韧增强剂',
    safetyCert: '无重金属析出 · RoHS 环保认证 · 圆角无锐边设计',
    chipType: 'NTAG213 超薄芯片 (封装于叶片挂饰夹层)',
    tagline: '把海龟背上的好运，夹进每一次阅读，也带进每一段旅程。',
    designStory: '好运龟背书叶子挂饰将海龟背甲的六边形纹理与叶片舒展的轮廓结合。回收的海洋饮料瓶片经过清洁、压片与热压塑形，成为可以夹在书页或挂在包上的轻巧纪念物，让被海浪带走的塑料重新守护每一次阅读与出发。',
    features: [
      { title: '龟背纹理轻巧耐用', desc: '六边形龟甲纹理提升片材抗弯性能，轻薄不易折裂，适合长期夹在书页之间。' },
      { title: '书签与挂饰二合一', desc: '叶片造型兼容书签孔与挂绳连接，可在阅读、旅行和日常收纳场景间自由切换。' },
      { title: '每件都有海洋档案', desc: '内置数字身份芯片，记录回收来源与再生批次，让好运挂饰也成为海洋治理的可追溯见证。' }
    ],
    microDanger: '废弃饮料瓶片在海岸带风化后会破碎成细小塑料颗粒，容易被海龟和海鸟误食，并长期滞留在近岸食物链中。',
    microscopeType: 'pet',
    fundRatio: '20%',
    fundContribution: '18.00 元定向支持珠江口海龟巡护与海草床修复',
    mapIndex: 12
  },
  {
    id: 'prod-recycled-luggage-tag',
    slug: 'recycled-luggage-tag',
    dedicatedFile: 'product-recycled-luggage-tag.html',
    model3dIframeUrl: 'https://3d.hunyuan.tencent.com/share?shareId=70cd09b6-d87d-454b-8d73-6cc3d1bd54c0',
    name: '塑料再生环保胸卡套行李牌',
    englishName: 'RECYCLED ID & LUGGAGE TAG · OCEAN PLASTIC ACCESSORY',
    shortName: '环保胸卡套行李牌',
    plasticName: 'rHDPE + rPET (混合再生塑料)',
    resinCode: 7,
    codeSymbol: '♹ HYBRID',
    nfcChipId: 'CHIP-NFC-6824-TAG',
    degradeYears: '自然降解约 500 年',
    colorTheme: '#0f766e',
    tagBg: '#ccfbf1',
    originLocation: '东海与黄海交汇漂浮垃圾治理带 (废弃包装片与箱包塑料)',
    salvageCoordinates: '32°06\'31"N, 122°58\'44"E',
    salvageSeaArea: '中国东海 · 黄海交汇漂浮垃圾拦截区',
    salvageVessel: 'Tide-Loop 06 号海洋塑料回收船',
    sourceForm: '风化包装片、废旧箱包塑料片与瓶盖混合回收料',
    processFlow: '漂浮物拦截 ➔ 材质分选 ➔ 脱盐清洗 ➔ 再生板材压制 ➔ 激光标识与扣件装配',
    tokenHash: '0x6824c7e15a0d93b8f441',
    certDate: '2026.11.16',
    passId: 'BS-PASS-682406',
    rescueIndex: '拦截 68g 混合塑料残片，减少海鸟误食与缠绕风险',
    carbonSaved: '1.42 kg CO₂e',
    cleanArea: '61 m² 远岸漂浮带净化',
    dimensions: '长 105mm × 宽 68mm × 厚 4mm · 净重约 24g · 挂带宽度 15mm',
    composition: '50% 海洋回收 rHDPE + 35% 回收 rPET + 15% 再生尼龙挂带',
    safetyCert: '无重金属析出 · RoHS / REACH 环保认证 · 边缘圆角防刮设计',
    chipType: 'NTAG213 防潮芯片 (封装于卡套背面夹层)',
    tagline: '一张胸卡，一件行李，也可以成为海洋塑料重获新生的证明。',
    designStory: '环保胸卡套行李牌以可替换的信息窗口连接工作、出行与循环再生。我们将海上回收的硬质塑料压制成耐磨牌体，并配合再生尼龙挂带，让一块被遗忘的包装残片重新承担身份识别与行李标记的日常功能。',
    features: [
      { title: '双场景识别设计', desc: '可作为胸卡套或行李牌使用，透明信息窗口方便更换证件与联系方式。' },
      { title: '耐磨防泼水牌体', desc: '再生复合板材具有稳定的抗弯与耐磨性能，适合通勤、差旅和户外活动。' },
      { title: '可替换结构延长寿命', desc: '牌体、窗口和挂带均可拆换维护，减少一次性配件消耗并延长整体使用周期。' }
    ],
    microDanger: '混合包装塑料和箱包塑料在海上长期磨损后会释放微塑料颗粒，并可能缠绕海鸟、海龟等海洋生物。',
    microscopeType: 'micro',
    fundRatio: '20%',
    fundContribution: '24.00 元定向支持东海漂浮垃圾拦截与海鸟救助',
    mapIndex: 13
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
function getProductDoodleSvgCode(resinCode, slugOrId) {
  const key = (slugOrId || '').toLowerCase();

  // 1. 优先按产品特征匹配独有专属图标
  if (key.includes('turtle')) {
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <path d="M 40,20 C 51,20 60,29 60,41 C 60,54 50,62 40,62 C 30,62 20,54 20,41 C 20,29 29,20 40,20 Z" fill="#bbf7d0" stroke="#091e3a" stroke-width="2.5" />
        <path d="M 40,24 L 40,58 M 24,40 L 56,40 M 29,29 L 51,51 M 51,29 L 29,51" fill="none" stroke="#059669" stroke-width="1.8" />
        <circle cx="40" cy="12" r="7" fill="#d1fae5" stroke="#091e3a" stroke-width="2" />
        <path d="M 27,27 L 18,21 M 53,27 L 62,21 M 27,53 L 18,59 M 53,53 L 62,59" stroke="#091e3a" stroke-width="3" stroke-linecap="round" />
        <path d="M 40,62 L 40,70" stroke="#091e3a" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `;
  } else if (key.includes('luggage-tag')) {
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <path d="M 25,22 L 52,22 L 62,32 L 62,62 L 25,62 Z" fill="#ccfbf1" stroke="#091e3a" stroke-width="2.5" />
        <path d="M 52,22 L 52,32 L 62,32" fill="#99f6e4" stroke="#091e3a" stroke-width="2" />
        <circle cx="34" cy="32" r="3" fill="#ffffff" stroke="#0f766e" stroke-width="1.5" />
        <rect x="33" y="42" width="21" height="3" rx="1.5" fill="#0f766e" />
        <rect x="33" y="49" width="15" height="3" rx="1.5" fill="#5eead4" />
        <path d="M 25,26 C 16,18 10,25 15,33" fill="none" stroke="#091e3a" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `;
  } else if (key.includes('conch')) {
    // 共振海螺无源扩音座
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <path d="M 24,56 C 18,44 26,28 42,24 C 58,20 66,34 62,48 C 58,60 44,62 34,60 C 26,58 24,56 24,56 Z" fill="#bae6fd" stroke="#091e3a" stroke-width="2.5" />
        <path d="M 34,34 C 42,30 52,34 50,44 C 48,52 38,54 34,50" fill="none" stroke="#0284c7" stroke-width="2" />
        <rect x="28" y="16" width="24" height="20" rx="3" fill="#ffffff" stroke="#091e3a" stroke-width="2" />
        <line x1="36" y1="32" x2="44" y2="32" stroke="#091e3a" stroke-width="2" stroke-linecap="round" />
        <path d="M 64,36 Q 70,42 66,48" fill="none" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <path d="M 68,32 Q 76,42 70,52" fill="none" stroke="#091e3a" stroke-width="2" stroke-linecap="round" />
      </svg>
    `;
  } else if (key.includes('keycap')) {
    // 深渊之晶透光树脂定制键帽
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <polygon points="26,30 54,30 62,58 18,58" fill="#e0e7ff" stroke="#091e3a" stroke-width="2.5" />
        <polygon points="30,34 50,34 56,54 24,54" fill="#ffffff" stroke="#6366f1" stroke-width="1.5" />
        <circle cx="34" cy="42" r="2.5" fill="#ef4444" />
        <circle cx="46" cy="40" r="2" fill="#3b82f6" />
        <circle cx="40" cy="48" r="3" fill="#10b981" />
        <circle cx="48" cy="47" r="1.5" fill="#f59e0b" />
        <path d="M 36,22 Q 40,18 44,22" fill="none" stroke="#6366f1" stroke-width="2" stroke-linecap="round" />
        <path d="M 32,18 Q 40,12 48,18" fill="none" stroke="#091e3a" stroke-width="2" stroke-linecap="round" />
      </svg>
    `;
  } else if (key.includes('coastline')) {
    // 重塑海岸线模块化扩香石/装饰板
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <rect x="20" y="24" width="40" height="40" rx="6" fill="#f1f5f9" stroke="#091e3a" stroke-width="2.5" />
        <path d="M 24,36 Q 34,30 44,38 T 60,34" fill="none" stroke="#10b981" stroke-width="2" />
        <path d="M 20,46 Q 32,42 42,48 T 60,44" fill="none" stroke="#0284c7" stroke-width="2.5" />
        <path d="M 24,56 Q 36,52 48,56 T 58,54" fill="none" stroke="#091e3a" stroke-width="1.5" />
        <path d="M 42,20 C 42,20 46,26 46,28 A 4,4 0 0,1 38,28 C 38,26 42,20 42,20 Z" fill="#059669" stroke="#091e3a" stroke-width="1.5" />
      </svg>
    `;
  } else if (key.includes('paracord')) {
    // 洋流轨迹机能风伞绳相机背带
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <path d="M 24,20 Q 40,14 56,20 L 52,48 Q 40,56 28,48 Z" fill="#bae6fd" stroke="#091e3a" stroke-width="2.5" />
        <line x1="28" y1="26" x2="48" y2="40" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="48" y1="26" x2="28" y2="40" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="30" y1="36" x2="50" y2="50" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <line x1="50" y1="36" x2="30" y2="50" stroke="#0284c7" stroke-width="2" stroke-linecap="round" />
        <rect x="32" y="52" width="16" height="18" rx="3" fill="#334155" stroke="#091e3a" stroke-width="2" />
        <circle cx="40" cy="61" r="3" fill="#ffffff" />
      </svg>
    `;
  } else if (key.includes('core')) {
    // 深蓝档案海洋沉积物柱体标本
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <rect x="30" y="16" width="20" height="48" rx="4" fill="#ffffff" stroke="#091e3a" stroke-width="2.5" />
        <rect x="32" y="18" width="16" height="10" fill="#bae6fd" />
        <line x1="30" y1="28" x2="50" y2="28" stroke="#091e3a" stroke-width="1" stroke-dasharray="2 2" />
        <rect x="32" y="28" width="16" height="16" fill="#38bdf8" />
        <circle cx="37" cy="36" r="1.5" fill="#091e3a" />
        <circle cx="43" cy="38" r="1.5" fill="#091e3a" />
        <line x1="30" y1="44" x2="50" y2="44" stroke="#091e3a" stroke-width="1" stroke-dasharray="2 2" />
        <rect x="32" y="44" width="16" height="18" fill="#0f3a60" />
        <circle cx="36" cy="50" r="1" fill="#ef4444" />
        <circle cx="44" cy="53" r="1" fill="#f59e0b" />
        <circle cx="38" cy="58" r="1" fill="#10b981" />
        <rect x="22" y="64" width="36" height="6" rx="2" fill="#cbd5e1" stroke="#091e3a" stroke-width="2" />
      </svg>
    `;
  } else if (key.includes('buckle')) {
    const isCurrent = key.includes('current');
    return `
      <svg class="product-icon-doodle" viewBox="0 0 80 80">
        <rect x="22" y="24" width="36" height="32" rx="8" fill="${isCurrent ? '#bae6fd' : '#e0f2fe'}" stroke="#091e3a" stroke-width="2.5" />
        <rect x="30" y="31" width="20" height="18" rx="4" fill="#ffffff" stroke="${isCurrent ? '#0284c7' : '#0f3a60'}" stroke-width="2" />
        <path d="M 40,18 L 40,25 M 40,55 L 40,64" stroke="#091e3a" stroke-width="3" stroke-linecap="round" />
        <path d="M 34,40 L 46,40" stroke="#0284c7" stroke-width="2.5" stroke-linecap="round" />
      </svg>
    `;
  }

  // 2. 经典 5 款按 resinCode 回退
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
