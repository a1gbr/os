/**
 * Splash Screen - "Press to Start" landing page
 */
import { sounds } from '../core/sounds.js';

class Splash {
  constructor() {
    this.container = null;
    this.onStart = null;
  }

  /**
   * Initialize splash screen
   */
  init() {
    this.container = document.getElementById('splash');
    this.render();
  }

  /**
   * Render splash content
   */
  render() {
    this.container.innerHTML = `
      <div class="splash-monitor">
        <div class="splash-crt">
          <div class="splash-screen">
            <div class="splash-screen-content">
              <div style="font-size: 24px; margin-bottom: 8px;">a1gbr.com</div>
              <div style="font-size: 12px; opacity: 0.7;">Developer Portfolio</div>
            </div>
          </div>
        </div>
        <div class="splash-monitor-stand"></div>
        <div class="splash-monitor-base"></div>
      </div>
      <button class="splash-start-btn" id="splash-start">Press to Start</button>
    `;

    // Setup click handler
    const startBtn = document.getElementById('splash-start');
    startBtn.addEventListener('click', () => this.start());
    
    // Also allow keyboard
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (!this.container.classList.contains('hidden')) {
          this.start();
        }
      }
    }, { once: true });
  }

  /**
   * Start button clicked
   */
  start() {
    // Initialize audio context (requires user interaction)
    sounds.init();
    
    // Hide splash
    this.container.classList.add('hidden');
    
    // Call callback
    if (this.onStart) {
      this.onStart();
    }
  }

  /**
   * Set callback for when start is clicked
   */
  setOnStart(callback) {
    this.onStart = callback;
  }

  /**
   * Show splash screen
   */
  show() {
    this.container.classList.remove('hidden');
  }

  /**
   * Hide splash screen
   */
  hide() {
    this.container.classList.add('hidden');
  }
}

// Singleton instance
export const splash = new Splash();

export default splash;
