/* ==========================================================================
   蔚蓝共生计划 - Web Audio API 音效与环境声音合成器
   无需任何外部音频文件，使用浏览器底层声学合成器生成纯净海洋氛围与交互音效
   支持全自动首屏唤醒、全事件感知解锁（鼠标移动/滚轮/触屏/悬停/键盘任意交互即刻播音）
   ========================================================================== */

class BlueSymbiosisAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientGain = null;
    this.noiseSource = null;
    this.lfo = null;
    this.ambientRunning = false;
    this.ambientUnlockBound = false;
    this.ambientUnlockHandler = null;
    this.registeredEvents = [];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) {
        console.warn('Web Audio API is not supported in this browser.');
        return false;
      }
      this.ctx = new AudioContext();
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().then(() => {
        if (this.ctx.state === 'running') {
          if (!this.ambientRunning && !this.isMuted) {
            this.startOceanAmbient();
          }
          this.unbindAmbientUnlock();
          this.notifyStateChange(true);
        }
      }).catch(() => {
        // 等待首次用户轻量交互唤醒
      });
    }
    return this.ctx.state !== 'closed';
  }

  // 通知前端UI音频播放状态变化
  notifyStateChange(isPlaying) {
    const isActuallyPlaying = Boolean(isPlaying && !this.isMuted && this.ctx && this.ctx.state === 'running');
    try {
      window.dispatchEvent(new CustomEvent('blue-audio-state', {
        detail: {
          isPlaying: isActuallyPlaying,
          isMuted: this.isMuted,
          ctxState: this.ctx ? this.ctx.state : 'uninitialized'
        }
      }));
    } catch (e) {}
  }

  startDefaultAmbient() {
    if (this.isMuted || !this.init()) return;

    this.startOceanAmbient();
    if (this.ctx.state === 'running') {
      this.notifyStateChange(true);
      return;
    }

    // 页面加载完成后多阶段尝试自动唤醒（部分浏览器在文档就绪时放行音频）
    [100, 300, 600, 1200].forEach(delay => {
      setTimeout(() => {
        if (this.ctx && this.ctx.state === 'suspended' && !this.isMuted) {
          this.ctx.resume().then(() => {
            if (this.ctx.state === 'running') {
              if (!this.ambientRunning) this.startOceanAmbient();
              this.unbindAmbientUnlock();
              this.notifyStateChange(true);
            }
          }).catch(() => {});
        }
      }, delay);
    });

    this.bindAmbientUnlock();
  }

  bindAmbientUnlock() {
    if (this.ambientUnlockBound) return;
    this.ambientUnlockBound = true;

    this.ambientUnlockHandler = () => {
      if (!this.ctx || this.ctx.state === 'closed') return;

      this.ctx.resume().then(() => {
        if (this.ctx.state === 'running') {
          if (!this.ambientRunning && !this.isMuted) {
            this.startOceanAmbient();
          }
          this.unbindAmbientUnlock();
          this.notifyStateChange(true);
        }
      }).catch(() => {
        // 浏览器暂未放行，保持监听下一次动作
      });
    };

    // 监听所有可能的用户交互事件（无需特意点击：鼠标移动、滚轮滚动、触控轻滑、键盘轻按均可立即解锁）
    const unlockEvents = [
      'pointermove', 'mousemove', 'wheel', 'scroll',
      'touchstart', 'touchmove', 'touchend',
      'pointerdown', 'mousedown', 'mouseup', 'click',
      'keydown', 'keyup', 'mouseover', 'mouseenter',
      'focus', 'blur', 'visibilitychange'
    ];

    const options = { capture: true, passive: true };
    this.registeredEvents = [];

    unlockEvents.forEach(evt => {
      try {
        window.addEventListener(evt, this.ambientUnlockHandler, options);
        document.addEventListener(evt, this.ambientUnlockHandler, options);
        this.registeredEvents.push(evt);
      } catch (e) {}
    });
  }

  unbindAmbientUnlock() {
    if (!this.ambientUnlockBound || !this.ambientUnlockHandler) return;

    const options = { capture: true };
    if (this.registeredEvents) {
      this.registeredEvents.forEach(evt => {
        try {
          window.removeEventListener(evt, this.ambientUnlockHandler, options);
          document.removeEventListener(evt, this.ambientUnlockHandler, options);
        } catch (e) {}
      });
    }
    this.ambientUnlockBound = false;
    this.ambientUnlockHandler = null;
    this.registeredEvents = [];
  }

  // 切换全局静音/海浪声
  toggleMute() {
    if (!this.init()) return false;

    // 若当前因策略挂起或未启动，用户点击按钮属于“开启声音”意愿，直接唤醒而非反向静音
    if (this.ctx && this.ctx.state === 'suspended') {
      this.isMuted = false;
      this.ctx.resume().then(() => {
        this.startOceanAmbient();
        this.playTapSound();
        this.notifyStateChange(true);
      });
      return true;
    }

    if (!this.ambientRunning) {
      this.isMuted = false;
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startOceanAmbient();
      this.playTapSound();
      this.notifyStateChange(true);
      return true;
    }

    // 已经在正常播放，则在静音与开启之间切换
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
      this.startOceanAmbient();
      this.playTapSound();
    } else {
      this.stopOceanAmbient();
    }
    this.notifyStateChange(!this.isMuted);
    return !this.isMuted;
  }

  // 合成柔和深海环境海浪声 (Pink Noise + Lowpass Modulation)
  startOceanAmbient() {
    if (this.ambientRunning || !this.ctx) return;
    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.035;
        b6 = white * 0.115926;
      }

      this.noiseSource = this.ctx.createBufferSource();
      this.noiseSource.buffer = noiseBuffer;
      this.noiseSource.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, this.ctx.currentTime);

      // 海浪周期起伏调制
      this.lfo = this.ctx.createOscillator();
      this.lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 约8秒一次海浪
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
      this.lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      this.ambientGain = this.ctx.createGain();
      // 平滑淡入（0.001 -> 0.75），声音优雅过渡
      const now = this.ctx.currentTime;
      this.ambientGain.gain.setValueAtTime(0.001, now);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.75, now + 1.2);

      this.noiseSource.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.noiseSource.start();
      this.lfo.start();
      this.ambientRunning = true;
    } catch (e) {
      console.warn("Ambient audio init error:", e);
    }
  }

  stopOceanAmbient() {
    if (this.ambientGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.ambientGain.gain.setTargetAtTime(0.001, now, 0.2);
      setTimeout(() => {
        if (this.noiseSource) {
          try { this.noiseSource.stop(); } catch(e){}
          this.noiseSource = null;
        }
        if (this.lfo) {
          try { this.lfo.stop(); } catch(e){}
          this.lfo = null;
        }
        this.ambientRunning = false;
      }, 300);
    }
  }

  // NFC 碰一碰激活双音调 (Crisp NFC chime)
  playNfcScanSound() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gainNode = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, now); // D5
    osc1.frequency.exponentialRampToValueAtTime(880, now + 0.12); // A5

    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(880, now + 0.1);
    osc2.frequency.exponentialRampToValueAtTime(1174.66, now + 0.25); // D6

    gainNode.gain.setValueAtTime(0.18, now);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gainNode);
    osc2.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    osc1.start(now);
    osc1.stop(now + 0.15);
    osc2.start(now + 0.1);
    osc2.stop(now + 0.35);
  }

  // 发射声波音效 (Sonar Ping)
  playSonarSound() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(1200, now);
    osc.frequency.exponentialRampToValueAtTime(950, now + 0.45);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.5);
  }

  // 塑料打捞捕获音效 (Cute pop)
  playCatchSound() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(640, now + 0.12);

    gain.gain.setValueAtTime(0.15, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.15);
  }

  // 翻转卡片/轻微点击音
  playTapSound() {
    if (this.isMuted) return;
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(440, now);
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start(now);
    osc.stop(now + 0.08);
  }

  // 护照翻页纸张质感轻快音效
  playFlipPassportSound() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const bufferSize = Math.floor(this.ctx.sampleRate * 0.12);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.28));
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1400, now);
      filter.frequency.exponentialRampToValueAtTime(700, now + 0.1);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
    } catch (e) {
      this.playTapSound();
    }
  }

  // 荣誉证书/成就生成清脆和弦铃声 (Sparkle Chime)
  playSuccessChime() {
    if (this.isMuted) return;
    this.init();
    try {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const noteStart = now + idx * 0.08;
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, noteStart);
        gain.gain.setValueAtTime(0.12, noteStart);
        gain.gain.exponentialRampToValueAtTime(0.001, noteStart + 0.38);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(noteStart);
        osc.stop(noteStart + 0.4);
      });
    } catch (e) {
      this.playTapSound();
    }
  }
}

window.blueAudio = new BlueSymbiosisAudio();
window.BlueSymbiosisAudio = BlueSymbiosisAudio;
