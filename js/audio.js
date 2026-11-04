/* ==========================================================================
   蔚蓝共生计划 - Web Audio API 音效与环境声音合成器
   无需任何外部音频文件，使用浏览器底层声学合成器生成纯净海洋氛围与交互音效
   ========================================================================== */

class BlueSymbiosisAudio {
  constructor() {
    this.ctx = null;
    this.isMuted = false;
    this.ambientGain = null;
    this.ambientRunning = false;
    this.ambientUnlockBound = false;
    this.ambientUnlockHandler = null;
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
      this.ctx.resume().catch((error) => {
        console.warn('Unable to resume audio context:', error);
      });
    }
    return this.ctx.state !== 'closed';
  }

  startDefaultAmbient() {
    if (this.isMuted || !this.init()) return;

    this.startOceanAmbient();
    if (this.ctx.state === 'running') return;

    this.bindAmbientUnlock();
  }

  bindAmbientUnlock() {
    if (this.ambientUnlockBound) return;

    this.ambientUnlockBound = true;
    this.ambientUnlockHandler = () => {
      if (!this.ctx || this.ctx.state === 'closed') return;

      this.ctx.resume().then(() => {
        if (this.ctx.state === 'running') {
          this.unbindAmbientUnlock();
        }
      }).catch((error) => {
        // Keep listening: a browser may reject one gesture while allowing a later one.
        console.warn('Unable to resume default ambient audio:', error);
      });
    };

    // Listen on the document so any first interaction can unlock audio, not only
    // a specific control. The listeners are removed once the context is running.
    const options = { capture: true, passive: true };
    document.addEventListener('pointerdown', this.ambientUnlockHandler, options);
    document.addEventListener('touchstart', this.ambientUnlockHandler, options);
    document.addEventListener('mousedown', this.ambientUnlockHandler, options);
    document.addEventListener('keydown', this.ambientUnlockHandler, options);
  }

  unbindAmbientUnlock() {
    if (!this.ambientUnlockBound || !this.ambientUnlockHandler) return;

    const options = { capture: true };
    document.removeEventListener('pointerdown', this.ambientUnlockHandler, options);
    document.removeEventListener('touchstart', this.ambientUnlockHandler, options);
    document.removeEventListener('mousedown', this.ambientUnlockHandler, options);
    document.removeEventListener('keydown', this.ambientUnlockHandler, options);
    this.ambientUnlockBound = false;
    this.ambientUnlockHandler = null;
  }

  // 切换全局静音/海浪声
  toggleMute() {
    if (!this.init()) return false;
    this.isMuted = !this.isMuted;
    if (!this.isMuted) {
      this.startOceanAmbient();
      this.playTapSound();
    } else {
      this.stopOceanAmbient();
    }
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
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime); // 约8秒一次海浪
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(220, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.75, this.ctx.currentTime);

      this.noiseSource.connect(filter);
      filter.connect(this.ambientGain);
      this.ambientGain.connect(this.ctx.destination);

      this.noiseSource.start();
      lfo.start();
      this.ambientRunning = true;
    } catch (e) {
      console.warn("Ambient audio init error:", e);
    }
  }

  stopOceanAmbient() {
    if (this.ambientGain && this.ctx) {
      this.ambientGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      setTimeout(() => {
        if (this.noiseSource) {
          try { this.noiseSource.stop(); } catch(e){}
        }
        this.ambientRunning = false;
      }, 400);
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
}

window.blueAudio = new BlueSymbiosisAudio();
window.BlueSymbiosisAudio = BlueSymbiosisAudio;
