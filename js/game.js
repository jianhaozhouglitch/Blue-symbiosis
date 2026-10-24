/* ==========================================================================
   蔚蓝共生计划 - AI打捞船声波护渔小游戏 (AI Salvage Boat & Sonar Simulator)
   手绘简笔画风格交互式 Canvas 模拟
   ========================================================================== */

class SalvageGame {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    
    this.boat = {
      x: 150,
      y: 190,
      width: 70,
      height: 38,
      speed: 4,
      targetX: 150,
      targetY: 190,
      vx: 0,
      vy: 0,
      radarAngle: 0
    };

    this.sonarWaves = [];
    this.plastics = [];
    this.fishes = [];
    this.particles = [];
    this.floatingTexts = [];
    
    this.scorePlastics = 0; // 克数
    this.scoreFishProtected = 0; // 护鱼数
    
    this.isRunning = false;
    this.animId = null;
    this.lastSpawnTime = 0;
    this.wavePhase = 0;

    this.initEvents();
    this.resizeCanvas();
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  resizeCanvas() {
    if (!this.canvas) return;
    const rect = this.canvas.getBoundingClientRect();
    this.canvas.width = rect.width * (window.devicePixelRatio || 1);
    this.canvas.height = rect.height * (window.devicePixelRatio || 1);
    this.scale = window.devicePixelRatio || 1;
    this.width = rect.width;
    this.height = rect.height;
    if (this.boat.x > this.width) this.boat.x = this.width / 2;
    if (this.boat.y > this.height) this.boat.y = this.height / 2;
  }

  initEvents() {
    // 键盘控制
    window.addEventListener('keydown', (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) this.boat.vy = -this.boat.speed;
      if (['ArrowDown', 'KeyS'].includes(e.code)) this.boat.vy = this.boat.speed;
      if (['ArrowLeft', 'KeyA'].includes(e.code)) this.boat.vx = -this.boat.speed;
      if (['ArrowRight', 'KeyD'].includes(e.code)) this.boat.vx = this.boat.speed;
      if (e.code === 'Space') {
        e.preventDefault();
        this.emitSonar();
      }
    });

    window.addEventListener('keyup', (e) => {
      if (['ArrowUp', 'KeyW', 'ArrowDown', 'KeyS'].includes(e.code)) this.boat.vy = 0;
      if (['ArrowLeft', 'KeyA', 'ArrowRight', 'KeyD'].includes(e.code)) this.boat.vx = 0;
    });

    // 鼠标/触控拖拽移动船只
    const handlePointerMove = (e) => {
      const rect = this.canvas.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      if (clientX !== undefined && clientY !== undefined) {
        this.boat.targetX = clientX - rect.left;
        this.boat.targetY = clientY - rect.top;
      }
    };

    this.canvas.addEventListener('mousemove', handlePointerMove);
    this.canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    this.canvas.addEventListener('click', () => this.emitSonar());

    // 移动端辅助按钮
    const btnLeft = document.getElementById('btnGameLeft');
    const btnRight = document.getElementById('btnGameRight');
    const btnSonar = document.getElementById('btnGameSonar');

    if (btnLeft) {
      btnLeft.addEventListener('touchstart', (e) => { e.preventDefault(); this.boat.vx = -this.boat.speed * 1.2; });
      btnLeft.addEventListener('touchend', () => { this.boat.vx = 0; });
    }
    if (btnRight) {
      btnRight.addEventListener('touchstart', (e) => { e.preventDefault(); this.boat.vx = this.boat.speed * 1.2; });
      btnRight.addEventListener('touchend', () => { this.boat.vx = 0; });
    }
    if (btnSonar) {
      btnSonar.addEventListener('click', () => this.emitSonar());
      btnSonar.addEventListener('touchstart', (e) => { e.preventDefault(); this.emitSonar(); });
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
    if (this.animId) cancelAnimationFrame(this.animId);
  }

  // 发射 45kHz 特征声波
  emitSonar() {
    window.blueAudio && window.blueAudio.playSonarSound();
    this.sonarWaves.push({
      x: this.boat.x + this.boat.width / 2,
      y: this.boat.y + this.boat.height / 2,
      radius: 10,
      maxRadius: 140,
      alpha: 1
    });

    // 检查驱赶附近的鱼类
    this.fishes.forEach(f => {
      const dx = f.x - (this.boat.x + this.boat.width / 2);
      const dy = f.y - (this.boat.y + this.boat.height / 2);
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150 && !f.protected) {
        f.protected = true;
        f.vx = (dx > 0 ? 1 : -1) * (3.5 + Math.random() * 2);
        f.vy = (Math.random() - 0.5) * 3;
        this.scoreFishProtected += 1;
        this.updateScoreUI();
        this.addFloatingText(f.x, f.y - 10, "🐬 声波护鱼 +1", "#10b981");
      }
    });
  }

  addFloatingText(x, y, text, color) {
    this.floatingTexts.push({ x, y, text, color, alpha: 1, vy: -1.2 });
  }

  updateScoreUI() {
    const elPlastics = document.getElementById('gamePlasticsVal');
    const elFish = document.getElementById('gameFishVal');
    if (elPlastics) elPlastics.textContent = `${this.scorePlastics}g`;
    if (elFish) elFish.textContent = `${this.scoreFishProtected}尾`;
  }

  spawnEntities() {
    const now = Date.now();
    if (now - this.lastSpawnTime > 1300) {
      this.lastSpawnTime = now;
      // 生成塑料废弃物
      if (this.plastics.length < 8) {
        const types = ['pet_bottle', 'micro_cluster', 'ghost_net', 'hdpe_cap'];
        const type = types[Math.floor(Math.random() * types.length)];
        this.plastics.push({
          x: this.width + 30,
          y: 40 + Math.random() * (this.height - 80),
          type: type,
          size: type === 'ghost_net' ? 32 : (type === 'micro_cluster' ? 18 : 24),
          vx: -(1.2 + Math.random() * 1.5),
          vy: Math.sin(now) * 0.4,
          weight: type === 'ghost_net' ? 45 : (type === 'micro_cluster' ? 20 : 35),
          angle: Math.random() * Math.PI * 2
        });
      }

      // 生成小鱼群
      if (this.fishes.length < 5) {
        this.fishes.push({
          x: this.width + 30,
          y: 60 + Math.random() * (this.height - 100),
          vx: -(1.5 + Math.random() * 1.8),
          vy: (Math.random() - 0.5) * 0.8,
          size: 16 + Math.random() * 8,
          color: Math.random() > 0.5 ? '#38bdf8' : '#7dd3fc',
          protected: false
        });
      }
    }
  }

  update() {
    // 船只移动 (键盘 + 鼠标缓动跟随)
    if (this.boat.targetX) {
      this.boat.x += (this.boat.targetX - this.boat.x - this.boat.width / 2) * 0.08;
      this.boat.y += (this.boat.targetY - this.boat.y - this.boat.height / 2) * 0.08;
    }
    this.boat.x += this.boat.vx;
    this.boat.y += this.boat.vy;

    // 限制在屏幕内
    this.boat.x = Math.max(10, Math.min(this.width - this.boat.width - 10, this.boat.x));
    this.boat.y = Math.max(20, Math.min(this.height - this.boat.height - 20, this.boat.y));
    this.boat.radarAngle += 0.06;
    this.wavePhase += 0.04;

    this.spawnEntities();

    // 更新声波
    for (let i = this.sonarWaves.length - 1; i >= 0; i--) {
      const w = this.sonarWaves[i];
      w.radius += 3.5;
      w.alpha = 1 - (w.radius / w.maxRadius);
      if (w.radius >= w.maxRadius) {
        this.sonarWaves.splice(i, 1);
      }
    }

    // 更新塑料废弃物与碰撞检测
    const boatCenterX = this.boat.x + this.boat.width / 2;
    const boatCenterY = this.boat.y + this.boat.height / 2;

    for (let i = this.plastics.length - 1; i >= 0; i--) {
      const p = this.plastics[i];
      p.x += p.vx;
      p.y += p.vy;
      p.angle += 0.02;

      // 与船体打捞网碰撞
      const dist = Math.hypot(boatCenterX - p.x, boatCenterY - p.y);
      if (dist < 42) {
        this.scorePlastics += p.weight;
        this.updateScoreUI();
        window.blueAudio && window.blueAudio.playCatchSound();
        this.addFloatingText(p.x, p.y - 12, `+${p.weight}g 净海`, "#38bdf8");
        
        // 飞溅微气泡粒子
        for (let k = 0; k < 6; k++) {
          this.particles.push({
            x: p.x,
            y: p.y,
            vx: (Math.random() - 0.5) * 3,
            vy: (Math.random() - 0.5) * 3,
            size: 2 + Math.random() * 3,
            alpha: 1
          });
        }

        this.plastics.splice(i, 1);
        continue;
      }

      if (p.x < -40) {
        this.plastics.splice(i, 1);
      }
    }

    // 更新鱼类移动
    for (let i = this.fishes.length - 1; i >= 0; i--) {
      const f = this.fishes[i];
      f.x += f.vx;
      f.y += f.vy;

      if (f.x < -50 || f.x > this.width + 80) {
        this.fishes.splice(i, 1);
      }
    }

    // 更新粒子
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const pt = this.particles[i];
      pt.x += pt.vx;
      pt.y += pt.vy;
      pt.alpha -= 0.04;
      if (pt.alpha <= 0) this.particles.splice(i, 1);
    }

    // 更新飘字
    for (let i = this.floatingTexts.length - 1; i >= 0; i--) {
      const ft = this.floatingTexts[i];
      ft.y += ft.vy;
      ft.alpha -= 0.025;
      if (ft.alpha <= 0) this.floatingTexts.splice(i, 1);
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.scale(this.scale, this.scale);
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 绘制深浅蓝色水体渐变与简笔画起伏波浪
    const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
    grad.addColorStop(0, '#0a2540');
    grad.addColorStop(0.5, '#0f3a60');
    grad.addColorStop(1, '#061727');
    this.ctx.fillStyle = grad;
    this.ctx.fillRect(0, 0, this.width, this.height);

    // 绘制简笔画波浪线条
    this.ctx.strokeStyle = 'rgba(56, 189, 248, 0.25)';
    this.ctx.lineWidth = 1.5;
    for (let j = 0; j < 3; j++) {
      this.ctx.beginPath();
      const waveY = 80 + j * 90;
      for (let x = 0; x <= this.width; x += 20) {
        const y = waveY + Math.sin(x * 0.02 + this.wavePhase + j) * 8;
        if (x === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.stroke();
    }

    // 绘制声波光环
    this.sonarWaves.forEach(w => {
      this.ctx.beginPath();
      this.ctx.arc(w.x, w.y, w.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = `rgba(6, 182, 212, ${w.alpha})`;
      this.ctx.lineWidth = 2.5;
      this.ctx.setLineDash([6, 4]);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    });

    // 绘制塑料废弃物 (手绘简笔画图标)
    this.plastics.forEach(p => {
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.angle);
      
      this.ctx.strokeStyle = '#e0f2fe';
      this.ctx.fillStyle = 'rgba(186, 230, 253, 0.85)';
      this.ctx.lineWidth = 2;

      if (p.type === 'pet_bottle') {
        // 简笔画塑料瓶
        this.ctx.strokeRect(-6, -12, 12, 24);
        this.ctx.fillRect(-6, -12, 12, 24);
        this.ctx.strokeRect(-3, -16, 6, 4); // 瓶盖
      } else if (p.type === 'ghost_net') {
        // 简笔画渔网团
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 14, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.beginPath();
        this.ctx.moveTo(-10, -10); this.ctx.lineTo(10, 10);
        this.ctx.moveTo(10, -10); this.ctx.lineTo(-10, 10);
        this.ctx.moveTo(0, -14); this.ctx.lineTo(0, 14);
        this.ctx.stroke();
      } else {
        // 沉水微塑料颗粒团
        for (let k = 0; k < 5; k++) {
          this.ctx.beginPath();
          const ox = Math.cos(k * 1.25) * 8;
          const oy = Math.sin(k * 1.25) * 8;
          this.ctx.arc(ox, oy, 3.5, 0, Math.PI * 2);
          this.ctx.fillStyle = '#38bdf8';
          this.ctx.fill();
          this.ctx.stroke();
        }
      }
      this.ctx.restore();
    });

    // 绘制小鱼群 (可爱简笔画小鱼)
    this.fishes.forEach(f => {
      this.ctx.save();
      this.ctx.translate(f.x, f.y);
      this.ctx.fillStyle = f.protected ? '#34d399' : f.color;
      this.ctx.strokeStyle = '#ffffff';
      this.ctx.lineWidth = 1.5;

      // 鱼身
      this.ctx.beginPath();
      this.ctx.ellipse(0, 0, f.size, f.size * 0.55, 0, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // 鱼尾
      this.ctx.beginPath();
      this.ctx.moveTo(f.size * 0.8, 0);
      this.ctx.lineTo(f.size * 1.4, -f.size * 0.5);
      this.ctx.lineTo(f.size * 1.4, f.size * 0.5);
      this.ctx.closePath();
      this.ctx.fill();
      this.ctx.stroke();

      // 小鱼眼睛
      this.ctx.fillStyle = '#091e3a';
      this.ctx.beginPath();
      this.ctx.arc(-f.size * 0.5, -f.size * 0.15, 2, 0, Math.PI * 2);
      this.ctx.fill();

      // 保护状态光环
      if (f.protected) {
        this.ctx.strokeStyle = 'rgba(52, 211, 153, 0.8)';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, f.size * 1.5, 0, Math.PI * 2);
        this.ctx.stroke();
      }
      this.ctx.restore();
    });

    // 绘制 AI 视觉无人打捞船 (简笔画风格)
    this.ctx.save();
    this.ctx.translate(this.boat.x, this.boat.y);

    // 船体白底黑/深蓝线条
    this.ctx.fillStyle = '#ffffff';
    this.ctx.strokeStyle = '#38bdf8';
    this.ctx.lineWidth = 2.5;

    // 船底弧线
    this.ctx.beginPath();
    this.ctx.moveTo(0, 18);
    this.ctx.lineTo(10, 34);
    this.ctx.lineTo(58, 34);
    this.ctx.lineTo(68, 18);
    this.ctx.closePath();
    this.ctx.fill();
    this.ctx.stroke();

    // 船舱圆顶
    this.ctx.fillStyle = '#bae6fd';
    this.ctx.beginPath();
    this.ctx.arc(34, 18, 16, Math.PI, 0);
    this.ctx.fill();
    this.ctx.stroke();

    // 雷达天线与扫描波
    this.ctx.strokeStyle = '#ffffff';
    this.ctx.beginPath();
    this.ctx.moveTo(34, 2);
    this.ctx.lineTo(34, -8);
    this.ctx.stroke();

    this.ctx.beginPath();
    this.ctx.arc(34, -8, 5, 0, Math.PI * 2);
    this.ctx.fillStyle = '#38bdf8';
    this.ctx.fill();

    // 前端 AI 摄像头指示灯
    this.ctx.fillStyle = '#10b981';
    this.ctx.beginPath();
    this.ctx.arc(62, 22, 3, 0, Math.PI * 2);
    this.ctx.fill();

    // 船侧字样 "AI-01"
    this.ctx.fillStyle = '#091e3a';
    this.ctx.font = 'bold 9px sans-serif';
    this.ctx.fillText("AI-ORCA", 16, 28);

    // 打捞网兜手绘线
    this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
    this.ctx.lineWidth = 1.5;
    this.ctx.beginPath();
    this.ctx.moveTo(68, 22);
    this.ctx.lineTo(84, 30);
    this.ctx.lineTo(76, 40);
    this.ctx.stroke();

    this.ctx.restore();

    // 绘制粒子
    this.particles.forEach(pt => {
      this.ctx.fillStyle = `rgba(56, 189, 248, ${pt.alpha})`;
      this.ctx.beginPath();
      this.ctx.arc(pt.x, pt.y, pt.size, 0, Math.PI * 2);
      this.ctx.fill();
    });

    // 绘制漂浮提示文本
    this.floatingTexts.forEach(ft => {
      this.ctx.save();
      this.ctx.fillStyle = ft.color;
      this.ctx.globalAlpha = ft.alpha;
      this.ctx.font = 'bold 13px sans-serif';
      this.ctx.fillText(ft.text, ft.x, ft.y);
      this.ctx.restore();
    });

    this.ctx.restore();
  }

  loop() {
    if (!this.isRunning) return;
    this.update();
    this.draw();
    this.animId = requestAnimationFrame(() => this.loop());
  }
}

window.SalvageGame = SalvageGame;
