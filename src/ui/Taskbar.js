/**
 * Taskbar - Windows 98 style taskbar with start button, window buttons, and system tray
 */
import { events, EVENTS } from '../core/events.js';
import { startLogo } from '../icons/win98Icons.js';

class Taskbar {
  constructor() {
    this.container = null;
    this.windowsContainer = null;
    this.clockElement = null;
    this.startButton = null;
    this.windowButtons = new Map();
    this.clockInterval = null;
  }

  /**
   * Initialize the taskbar
   */
  init() {
    this.container = document.getElementById('taskbar');
    this.render();
    this.setupEvents();
    this.startClock();
  }

  /**
   * Render taskbar HTML
   */
  render() {
    this.container.innerHTML = `
      <button class="start-button" id="start-btn">
        <div class="start-button-logo">
          <img src="${startLogo}" alt="" width="16" height="16">
        </div>
        <span>Start</span>
      </button>
      
      <div class="taskbar-divider"></div>
      
      <div class="taskbar-windows" id="taskbar-windows"></div>
      
      <div class="system-tray">
        <span class="tray-clock" id="tray-clock"></span>
      </div>
    `;

    this.startButton = document.getElementById('start-btn');
    this.windowsContainer = document.getElementById('taskbar-windows');
    this.clockElement = document.getElementById('tray-clock');
  }

  /**
   * Setup event listeners
   */
  setupEvents() {
    // Start button
    this.startButton.addEventListener('click', () => {
      this.startButton.classList.toggle('active');
      events.emit(EVENTS.STARTMENU_TOGGLE);
    });

    // Listen for window events
    events.on(EVENTS.WINDOW_OPEN, ({ id, title, icon }) => {
      this.addWindowButton(id, title, icon);
    });

    events.on(EVENTS.WINDOW_CLOSE, ({ id }) => {
      this.removeWindowButton(id);
    });

    events.on(EVENTS.WINDOW_FOCUS, ({ id }) => {
      this.setActiveButton(id);
    });

    events.on(EVENTS.WINDOW_MINIMIZE, ({ id }) => {
      this.setButtonMinimized(id);
    });

    events.on(EVENTS.WINDOW_RESTORE, ({ id }) => {
      this.setActiveButton(id);
    });

    // Close start menu when clicking elsewhere
    events.on(EVENTS.STARTMENU_CLOSE, () => {
      this.startButton.classList.remove('active');
    });
  }

  /**
   * Add a window button to the taskbar
   */
  addWindowButton(id, title, icon) {
    const btn = document.createElement('button');
    btn.className = 'taskbar-window-btn active';
    btn.dataset.windowId = id;

    btn.innerHTML = `
      ${icon ? `<img class="taskbar-window-btn-icon" src="${icon}" alt="">` : ''}
      <span class="taskbar-window-btn-title">${title}</span>
    `;

    btn.addEventListener('click', () => {
      events.emit(EVENTS.WINDOW_FOCUS, { id });
    });

    this.windowsContainer.appendChild(btn);
    this.windowButtons.set(id, btn);

    // Deactivate other buttons
    this.setActiveButton(id);
  }

  /**
   * Remove a window button
   */
  removeWindowButton(id) {
    const btn = this.windowButtons.get(id);
    if (btn) {
      btn.remove();
      this.windowButtons.delete(id);
    }
  }

  /**
   * Set a button as active
   */
  setActiveButton(id) {
    this.windowButtons.forEach((btn, btnId) => {
      if (btnId === id) {
        btn.classList.add('active');
        btn.classList.remove('minimized');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  /**
   * Set a button as minimized
   */
  setButtonMinimized(id) {
    const btn = this.windowButtons.get(id);
    if (btn) {
      btn.classList.remove('active');
      btn.classList.add('minimized');
    }
  }

  /**
   * Start the clock
   */
  startClock() {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      this.clockElement.textContent = `${hours}:${minutes} ${ampm}`;
    };

    updateClock();
    this.clockInterval = setInterval(updateClock, 1000);
  }

  /**
   * Stop the clock
   */
  stopClock() {
    if (this.clockInterval) {
      clearInterval(this.clockInterval);
    }
  }
}

// Singleton instance
export const taskbar = new Taskbar();

export default taskbar;
