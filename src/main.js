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

// Icons
import { textFile, programsFolder, github, linkedin, shutDown } from './icons/win98Icons.js';

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
      icon: textFile,
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
      icon: programsFolder,
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
      icon: github,
      onClick: () => window.open('https://github.com/a1gbr', '_blank')
    });

    startMenu.addItem({
      title: 'LinkedIn',
      subtitle: 'Connect with me',
      icon: linkedin,
      onClick: () => window.open('https://linkedin.com/in/a1gbr', '_blank')
    });

    // Separator
    startMenu.addItem({ separator: true });

    // Shut Down
    startMenu.addItem({
      title: 'Shut Down...',
      icon: shutDown,
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
