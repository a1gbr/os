/**
 * Boot Sequence - Mimics Windows 98 startup experience
 */
import { sounds, SOUNDS } from '../core/sounds.js';

class BootSequence {
  constructor() {
    this.container = null;
    this.stages = ['bios', 'logo'];
    this.currentStage = 0;
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

      <!-- Windows Logo Screen -->
      <div class="boot-logo" id="boot-logo">
        <svg class="boot-windows-logo" viewBox="0 0 88 88" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="red-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FF6B6B"/>
              <stop offset="100%" style="stop-color:#EE0000"/>
            </linearGradient>
            <linearGradient id="green-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#69FF69"/>
              <stop offset="100%" style="stop-color:#00CC00"/>
            </linearGradient>
            <linearGradient id="blue-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#6B6BFF"/>
              <stop offset="100%" style="stop-color:#0000EE"/>
            </linearGradient>
            <linearGradient id="yellow-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#FFFF6B"/>
              <stop offset="100%" style="stop-color:#DDDD00"/>
            </linearGradient>
          </defs>
          <g transform="rotate(-10 44 44)">
            <rect x="4" y="4" width="36" height="36" rx="2" fill="url(#red-grad)"/>
            <rect x="48" y="4" width="36" height="36" rx="2" fill="url(#green-grad)"/>
            <rect x="4" y="48" width="36" height="36" rx="2" fill="url(#blue-grad)"/>
            <rect x="48" y="48" width="36" height="36" rx="2" fill="url(#yellow-grad)"/>
          </g>
        </svg>
        <div class="boot-windows-text">a1gbr98</div>
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
   * Show Windows logo screen
   */
  async showLogo() {
    const logo = document.getElementById('boot-logo');
    const progress = document.getElementById('boot-progress');
    
    logo.classList.add('active');

    // Animate progress bar
    const blocks = 10;
    for (let i = 0; i < blocks; i++) {
      const block = document.createElement('div');
      block.className = 'boot-progress-block';
      progress.appendChild(block);
      await this.delay(150);
    }

    await this.delay(500);
    logo.classList.remove('active');
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
