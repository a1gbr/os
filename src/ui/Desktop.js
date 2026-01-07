/**
 * Desktop Manager - Handles desktop icons and background
 */
import { events, EVENTS } from '../core/events.js';
import { storage, STORAGE_KEYS } from '../core/storage.js';

class Desktop {
  constructor() {
    this.container = null;
    this.iconsContainer = null;
    this.icons = [];
    this.selectedIcon = null;
    this.gridSize = 75;
  }

  /**
   * Initialize the desktop
   */
  init() {
    this.container = document.getElementById('desktop');
    
    // Create icons container
    this.iconsContainer = document.createElement('div');
    this.iconsContainer.className = 'desktop-icons';
    this.container.appendChild(this.iconsContainer);

    // Setup event listeners
    this.setupEvents();
  }

  /**
   * Setup event listeners
   */
  setupEvents() {
    // Click on desktop to deselect icons
    this.container.addEventListener('click', (e) => {
      if (e.target === this.container || e.target === this.iconsContainer) {
        this.deselectAll();
        events.emit(EVENTS.DESKTOP_CLICK);
      }
    });

    // Right-click context menu
    this.container.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      // Could show context menu here
    });
  }

  /**
   * Register a desktop icon
   * @param {Object} config - Icon configuration
   */
  addIcon(config) {
    const { id, title, icon, onOpen, position } = config;

    // Create icon element
    const iconEl = document.createElement('div');
    iconEl.className = 'desktop-icon';
    iconEl.dataset.id = id;
    iconEl.tabIndex = 0;

    iconEl.innerHTML = `
      <img class="desktop-icon-image" src="${icon}" alt="${title}" draggable="false">
      <span class="desktop-icon-label">${title}</span>
    `;

    // Single click to select
    iconEl.addEventListener('click', (e) => {
      e.stopPropagation();
      this.selectIcon(id);
    });

    // Double click to open
    iconEl.addEventListener('dblclick', (e) => {
      e.stopPropagation();
      if (onOpen) {
        onOpen();
      }
      events.emit(EVENTS.DESKTOP_DBLCLICK, { id });
    });

    // Keyboard support
    iconEl.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && onOpen) {
        onOpen();
      }
    });

    // Store icon data
    this.icons.push({
      id,
      element: iconEl,
      config
    });

    // Add to container
    this.iconsContainer.appendChild(iconEl);
  }

  /**
   * Select an icon
   */
  selectIcon(id) {
    this.deselectAll();
    
    const icon = this.icons.find(i => i.id === id);
    if (icon) {
      icon.element.classList.add('selected');
      this.selectedIcon = id;
      events.emit(EVENTS.ICON_SELECT, { id });
    }
  }

  /**
   * Deselect all icons
   */
  deselectAll() {
    this.icons.forEach(icon => {
      icon.element.classList.remove('selected');
    });
    this.selectedIcon = null;
    events.emit(EVENTS.ICON_DESELECT);
  }

  /**
   * Set wallpaper class
   */
  setWallpaper(className) {
    this.container.className = '';
    if (className) {
      this.container.classList.add(className);
    }
  }

  /**
   * Get selected icon
   */
  getSelectedIcon() {
    return this.selectedIcon;
  }
}

// Singleton instance
export const desktop = new Desktop();

export default desktop;
