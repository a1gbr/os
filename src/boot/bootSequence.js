/**
 * Boot Sequence - Mimics Windows 98 startup experience
 */
import { sounds, SOUNDS } from '../core/sounds.js';

class BootSequence {
  constructor() {
    this.container = null;
    this.stages = ['bios', 'logo'];
    this.currentStage = 0;

    // Flag animation configuration
    this.flagConfig = {
      width: 400,
      height: 220,
      // Trail colors - Win98 palette (Red, Green, Blue, Yellow cycle - no purple)
      trailColors: ['#F36A23', '#7FBA00', '#00A4EF', '#FFB900'],
      trailWidth: 180,
      minPixelSize: 2,
      maxPixelSize: 8,
      // Main Flag (Right) configuration - Win98 Colors
      flagX: 180,
      flagSize: 120,
      flagColors: {
        tl: '#F36A23', // Red-Orange
        tr: '#7FBA00', // Green
        bl: '#00A4EF', // Blue
        br: '#FFB900'  // Yellow
      },
      // Wave settings
      waveAmplitude: 10,
      waveFrequency: 0.09,
      waveSpeed: 0.12,
      // Pixel/texture settings
      basePixelSize: 6,
      pixelGap: 1,
      phase: 0,
      animationId: null
    };
  }

  /**
   * Initialize boot sequence elements
   */
  init() {
    this.container = document.getElementById('boot');
    this.render();
  }

  /**
   * Render boot screens
   */
  render() {
    this.container.innerHTML = `
      <!-- BIOS Screen -->
      <div class="boot-bios" id="boot-bios">
        <div class="boot-bios-text" id="bios-text"></div>
      </div>

      <!-- Logo Screen with Waving Flag -->
      <div class="boot-logo" id="boot-logo">
        <canvas id="boot-flag" width="400" height="220"></canvas>
        <div class="boot-progress-container">
          <div class="boot-progress-bar" id="boot-progress"></div>
        </div>
      </div>
    `;
  }

  /**
   * Run the boot sequence
   * @returns {Promise} Resolves when boot is complete
   */
  async run() {
    this.container.classList.add('active');
    
    // Stage 1: BIOS
    await this.showBios();
    
    // Stage 2: Windows Logo
    await this.showLogo();
    
    // Complete
    this.container.classList.remove('active');
    
    // Play startup sound
    sounds.play(SOUNDS.STARTUP);
  }

  /**
   * Show BIOS screen
   */
  async showBios() {
    const bios = document.getElementById('boot-bios');
    const text = document.getElementById('bios-text');
    
    bios.classList.add('active');

    const lines = [
      'a1gbr BIOS v1.0.0',
      'Copyright (C) 2024 a1gbr Systems',
      '',
      'CPU: Creative Brain @ 3.7GHz',
      'Memory Test: 640K OK',
      '',
      'Detecting IDE drives...',
      '  Primary Master: Portfolio HDD',
      '',
      'Starting a1gbr98...',
      ''
    ];

    for (const line of lines) {
      text.innerHTML += line + '\n';
      await this.delay(50);
    }

    await this.delay(300);
    bios.classList.remove('active');
  }

  /**
   * Show logo screen with waving flag
   */
  async showLogo() {
    const logo = document.getElementById('boot-logo');
    const progress = document.getElementById('boot-progress');

    logo.classList.add('active');

    // Start flag animation
    this.startFlagAnimation();

    // Animate progress bar with mini-squares
    const blocks = 10;
    for (let i = 0; i < blocks; i++) {
      const block = document.createElement('div');
      block.className = 'boot-progress-block';
      // Create 6 mini-squares (2x3 grid)
      for (let j = 0; j < 6; j++) {
        const square = document.createElement('div');
        square.className = 'boot-progress-square';
        block.appendChild(square);
      }
      progress.appendChild(block);
      await this.delay(150);
    }

    await this.delay(500);

    // Stop flag animation before hiding
    this.stopFlagAnimation();
    logo.classList.remove('active');
  }

  /**
   * Start the waving flag animation
   */
  startFlagAnimation() {
    const canvas = document.getElementById('boot-flag');
    const ctx = canvas.getContext('2d');

    const animate = () => {
      this.drawWavingFlag(ctx);
      this.flagConfig.phase += this.flagConfig.waveSpeed;
      this.flagConfig.animationId = requestAnimationFrame(animate);
    };
    animate();
  }

  /**
   * Draw the waving flag with unified opacity gradient (5% left -> 100% right)
   */
  drawWavingFlag(ctx) {
    const {
      width, height, trailColors, trailWidth,
      minPixelSize, maxPixelSize,
      flagX, flagSize, flagColors,
      waveAmplitude, waveFrequency, phase,
      basePixelSize, pixelGap
    } = this.flagConfig;

    ctx.clearRect(0, 0, width, height + 40);

    // Calculate total flag width for global opacity gradient
    const totalFlagWidth = trailWidth + flagSize;
    const flagStartX = flagX - trailWidth; // Leftmost edge of entire flag
    const flagEndX = flagX + flagSize;     // Rightmost edge
    
    // Center offset to position flag in middle of canvas
    const centerOffsetX = (width - totalFlagWidth) / 2;
    const centerOffsetY = 15; // Vertical centering adjustment

    // Global opacity function: 5% at left edge, 100% at right edge
    const getGlobalOpacity = (x) => {
      const normalizedX = (x - flagStartX - centerOffsetX) / totalFlagWidth;
      return 0.05 + 0.95 * Math.max(0, Math.min(1, normalizedX));
    };

    // Wave function for cloth effect
    const getWaveY = (x, y) => {
      const rowPhase = y * 0.018;
      const wave = Math.sin((x * waveFrequency) + phase + rowPhase) * waveAmplitude;
      return y + wave;
    };

    // Vertical bounds (centered)
    const baseY = (height - flagSize) / 2 + centerOffsetY;

    // --- 1. Draw TRAIL (Left Side) ---
    const numColumns = 28;
    const colStep = trailWidth / numColumns;

    for (let c = 0; c < numColumns; c++) {
      const cx = centerOffsetX + c * colStep;
      const t = (c + 1) / numColumns;
      
      // Size: Small at left, Big at right
      const size = minPixelSize + (maxPixelSize - minPixelSize) * t;
      
      // Global opacity based on X position
      const opacity = getGlobalOpacity(cx);
      
      // Select color cyclically from W98 palette
      const colorHex = trailColors[c % trailColors.length];
      
      const yStep = size + pixelGap;

      for (let y = baseY; y <= baseY + flagSize; y += yStep) {
        const renderY = getWaveY(cx, y);
        ctx.fillStyle = this.adjustColorWithOpacity(colorHex, 1, opacity);
        ctx.fillRect(cx, renderY, size, size);
      }
    }

    // --- 2. Draw MAIN FLAG (Right Side) ---
    const flagStep = basePixelSize;
    const flagRenderX = centerOffsetX + trailWidth - flagStep; // Overlap slightly
    
    const isChecker = (x, y) => (Math.floor(x / flagStep) + Math.floor(y / flagStep)) % 2 === 0;

    for (let fx = 0; fx < flagSize; fx += flagStep) {
      for (let fy = 0; fy < flagSize; fy += flagStep) {
        
        // Determine quadrant color (Win98 style)
        const isRight = fx >= flagSize / 2;
        const isBottom = fy >= flagSize / 2;
        
        let hex;
        if (!isRight && !isBottom) hex = flagColors.tl; // Red
        if (isRight && !isBottom) hex = flagColors.tr;  // Green
        if (!isRight && isBottom) hex = flagColors.bl;  // Blue
        if (isRight && isBottom) hex = flagColors.br;   // Yellow
        
        const brightness = isChecker(fx, fy) ? 1.0 : 0.88;
        
        const absoluteX = flagRenderX + fx;
        const absoluteY = baseY + fy;
        
        // Global opacity gradient
        const opacity = getGlobalOpacity(absoluteX);
        
        const renderY = getWaveY(absoluteX, absoluteY);
        ctx.fillStyle = this.adjustColorWithOpacity(hex, brightness, opacity);
        ctx.fillRect(absoluteX, renderY, flagStep, flagStep);
      }
    }
  }

  /**
   * Adjust color brightness and opacity
   */
  adjustColorWithOpacity(hex, brightness, opacity) {
    const r = Math.min(255, Math.floor(parseInt(hex.slice(1, 3), 16) * brightness));
    const g = Math.min(255, Math.floor(parseInt(hex.slice(3, 5), 16) * brightness));
    const b = Math.min(255, Math.floor(parseInt(hex.slice(5, 7), 16) * brightness));
    return `rgba(${r},${g},${b},${opacity})`;
  }

  /**
   * Stop the flag animation
   */
  stopFlagAnimation() {
    if (this.flagConfig.animationId) {
      cancelAnimationFrame(this.flagConfig.animationId);
      this.flagConfig.animationId = null;
    }
    this.flagConfig.phase = 0;
  }

  /**
   * Utility delay function
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// Singleton instance
export const bootSequence = new BootSequence();

export default bootSequence;
