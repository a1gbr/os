/**
 * Main Entry Point - Orchestrates the entire system
 */

// Styles
import './styles/boot.css';
import './styles/desktop.css';
import './styles/system.css';
import './styles/taskbar.css';
import './styles/windows.css';

// Core
import { events, EVENTS } from './core/events.js';
import { storage } from './core/storage.js';

// UI
import { desktop } from './ui/Desktop.js';
import { startMenu } from './ui/StartMenu.js';
import { taskbar } from './ui/Taskbar.js';
import { windowManager } from './ui/WindowManager.js';

// Boot
import { bootSequence } from './boot/bootSequence.js';

// Apps
import { AboutMe } from './apps/AboutMe.js';
import { Notepad } from './apps/Notepad.js';
import { Projects } from './apps/Projects.js';
import { appRegistry } from './apps/registry.js';
import { Terminal } from './apps/Terminal.js';

/**
 * System - Main controller
 */
class System {
  constructor() {
    this.ready = false;
  }

  /**
   * Initialize the system
   */
  async init() {
    bootSequence.init();

    // Start immediately (no splash)
    requestAnimationFrame(() => {
      void this.boot();
    });
  }

  /**
   * Boot sequence
   */
  async boot() {
    // Run boot animation
    await bootSequence.run();

    // Initialize system components
    this.initComponents();

    // Register apps
    this.registerApps();

    // Set up desktop icons
    this.setupDesktop();

    // Set up start menu
    this.setupStartMenu();

    // Set up keyboard shortcuts
    this.setupKeyboard();

    // Show system
    document.getElementById('system').classList.add('ready');

    // Mark as ready
    this.ready = true;
    events.emit(EVENTS.SYSTEM_READY);

    // Open welcome window for first-time visitors
    if (!storage.get('visited')) {
      storage.set('visited', true);
      setTimeout(() => {
        appRegistry.launch('about');
      }, 500);
    }
  }

  /**
   * Initialize UI components
   */
  initComponents() {
    windowManager.init();
    desktop.init();
    taskbar.init();
    startMenu.init();
  }

  /**
   * Register all applications
   */
  registerApps() {
    appRegistry.register('about', AboutMe);
    appRegistry.register('projects', Projects);
    appRegistry.register('terminal', Terminal);
    appRegistry.register('notepad', Notepad);
  }

  /**
   * Set up desktop icons
   */
  setupDesktop() {
    // My Computer style icon for About
    desktop.addIcon({
      id: 'about',
      title: 'About Me',
      icon: AboutMe.icon,
      onOpen: () => appRegistry.launch('about')
    });

    // Projects folder
    desktop.addIcon({
      id: 'projects',
      title: 'My Projects',
      icon: Projects.icon,
      onOpen: () => appRegistry.launch('projects')
    });

    // Terminal
    desktop.addIcon({
      id: 'terminal',
      title: 'Terminal',
      icon: Terminal.icon,
      onOpen: () => appRegistry.launch('terminal')
    });

    // Notepad
    desktop.addIcon({
      id: 'notepad',
      title: 'Notepad',
      icon: Notepad.icon,
      onOpen: () => appRegistry.launch('notepad')
    });

    // README
    desktop.addIcon({
      id: 'readme',
      title: 'README.txt',
      icon: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <rect x="4" y="2" width="24" height="28" fill="#ffffff" stroke="#000" stroke-width="1"/>
          <line x1="8" y1="8" x2="24" y2="8" stroke="#808080" stroke-width="1"/>
          <line x1="8" y1="12" x2="24" y2="12" stroke="#808080" stroke-width="1"/>
          <line x1="8" y1="16" x2="18" y2="16" stroke="#808080" stroke-width="1"/>
        </svg>
      `),
      onOpen: () => appRegistry.launch('notepad', { 
        filename: 'README.txt',
        content: `Welcome to a1gbr.com!
========================

Thanks for visiting my portfolio!

This is a Windows 98-inspired portfolio website
built entirely with vanilla JavaScript.

QUICK START:
- Double-click icons to open apps
- Click Start menu for more options
- Try the Terminal for a CLI experience
- Drag windows by their title bars

TIPS:
- Type 'help' in Terminal for commands
- Type 'secret' for a surprise!

Built with ❤️ and nostalgia.

- a1gbr`
      })
    });
  }

  /**
   * Set up start menu items
   */
  setupStartMenu() {
    // Programs submenu
    startMenu.addItem({
      title: 'Programs',
      icon: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
          <rect x="2" y="2" width="28" height="28" fill="#ffcc00" stroke="#000" stroke-width="1"/>
          <rect x="6" y="6" width="20" height="20" fill="#ffdd55"/>
        </svg>
      `),
      largeIcon: true,
      submenu: [
        {
          title: 'Terminal',
          icon: Terminal.icon,
          onClick: () => appRegistry.launch('terminal')
        },
        {
          title: 'Notepad',
          icon: Notepad.icon,
          onClick: () => appRegistry.launch('notepad')
        }
      ]
    });

    // Direct items
    startMenu.addItem({
      title: 'My Projects',
      icon: Projects.icon,
      largeIcon: true,
      onClick: () => appRegistry.launch('projects')
    });

    startMenu.addItem({
      title: 'About Me',
      icon: AboutMe.icon,
      largeIcon: true,
      onClick: () => appRegistry.launch('about')
    });

    // Separator
    startMenu.addItem({ separator: true });

    // Links
    startMenu.addItem({
      title: 'GitHub',
      subtitle: 'View my code',
      icon: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="7" fill="#000"/>
          <path d="M8 1C4.13 1 1 4.13 1 8c0 3.1 2 5.7 4.8 6.6.35.07.48-.15.48-.34v-1.2c-1.95.42-2.36-.94-2.36-.94-.32-.8-.78-1.02-.78-1.02-.64-.44.05-.43.05-.43.7.05 1.07.72 1.07.72.63 1.07 1.65.76 2.05.58.06-.45.25-.76.45-.94-1.56-.18-3.2-.78-3.2-3.46 0-.76.27-1.38.72-1.87-.07-.18-.31-.89.07-1.85 0 0 .59-.19 1.93.72.56-.16 1.16-.24 1.76-.24.6 0 1.2.08 1.76.24 1.34-.9 1.93-.72 1.93-.72.38.96.14 1.67.07 1.85.45.49.72 1.11.72 1.87 0 2.69-1.64 3.28-3.2 3.45.25.22.48.65.48 1.3v1.93c0 .19.13.41.49.34C13 13.7 15 11.1 15 8c0-3.87-3.13-7-7-7z" fill="#fff"/>
        </svg>
      `),
      onClick: () => window.open('https://github.com/a1gbr', '_blank')
    });

    startMenu.addItem({
      title: 'LinkedIn',
      subtitle: 'Connect with me',
      icon: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <rect width="16" height="16" fill="#0077b5"/>
          <path d="M4.5 6H3v6h1.5V6zM3.75 3a.87.87 0 100 1.74.87.87 0 000-1.74zM12 8.5c0-1.1-.9-2-2-2-.74 0-1.38.4-1.73 1V6H6.5v6H8V9.5c0-.55.45-1 1-1s1 .45 1 1V12h1.5V8.5z" fill="#fff"/>
        </svg>
      `),
      onClick: () => window.open('https://linkedin.com/in/a1gbr', '_blank')
    });

    // Separator
    startMenu.addItem({ separator: true });

    // Shut Down
    startMenu.addItem({
      title: 'Shut Down...',
      icon: 'data:image/svg+xml,' + encodeURIComponent(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
          <rect x="2" y="2" width="12" height="12" rx="2" fill="#c0c0c0" stroke="#000" stroke-width="1"/>
          <circle cx="8" cy="8" r="3" fill="#ff0000"/>
        </svg>
      `),
      onClick: () => this.shutdown()
    });
  }

  /**
   * Set up keyboard shortcuts
   */
  setupKeyboard() {
    document.addEventListener('keydown', (e) => {
      // Alt+F4 to close active window
      if (e.altKey && e.key === 'F4') {
        e.preventDefault();
        const activeWindow = windowManager.getActiveWindow();
        if (activeWindow) {
          windowManager.closeWindow(activeWindow.id);
        }
      }

      // Escape to close start menu
      if (e.key === 'Escape') {
        startMenu.close();
      }
    });
  }

  /**
   * Shutdown animation
   */
  shutdown() {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: #000080;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-family: 'MS Sans Serif', sans-serif;
      font-size: 24px;
      z-index: 999999;
      animation: fadeIn 0.5s ease-in;
    `;
    overlay.innerHTML = `
      <div style="text-align: center;">
        <div style="font-size: 48px; margin-bottom: 20px;">👋</div>
        <div>Thanks for visiting!</div>
        <div style="font-size: 14px; margin-top: 20px; opacity: 0.7;">Click anywhere to restart</div>
      </div>
    `;
    
    document.body.appendChild(overlay);
    
    overlay.addEventListener('click', () => {
      location.reload();
    });
  }
}

// Initialize system when DOM is ready
const system = new System();

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => system.init());
} else {
  system.init();
}

// Export for debugging
window.System = system;
window.events = events;
window.windowManager = windowManager;
