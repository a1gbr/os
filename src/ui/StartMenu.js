/**
 * Start Menu - Windows 98 style start menu
 */
import { events, EVENTS } from '../core/events.js';

class StartMenu {
  constructor() {
    this.container = null;
    this.isOpen = false;
    this.items = [];
  }

  /**
   * Initialize the start menu
   */
  init() {
    this.container = document.getElementById('start-menu');
    this.render();
    this.setupEvents();
  }

  /**
   * Register a menu item
   */
  addItem(item) {
    this.items.push(item);
  }

  /**
   * Render the start menu
   */
  render() {
    this.container.innerHTML = `
      <div class="start-menu">
        <div class="start-menu-banner">
          <span class="start-menu-banner-text">a1gbr<span style="font-weight:normal">98</span></span>
        </div>
        <div class="start-menu-items" id="start-menu-items">
          <!-- Items will be inserted here -->
        </div>
      </div>
    `;

    this.itemsContainer = document.getElementById('start-menu-items');
  }

  /**
   * Build menu items from registered items
   */
  buildMenu() {
    this.itemsContainer.innerHTML = '';

    this.items.forEach((item, index) => {
      if (item.separator) {
        const sep = document.createElement('div');
        sep.className = 'start-menu-separator';
        this.itemsContainer.appendChild(sep);
        return;
      }

      const menuItem = document.createElement('div');
      menuItem.className = 'start-menu-item';
      
      const iconSize = item.largeIcon ? '' : 'small';
      
      menuItem.innerHTML = `
        <img class="start-menu-item-icon ${iconSize}" src="${item.icon}" alt="">
        <div class="start-menu-item-label">
          <span class="start-menu-item-title">${item.title}</span>
          ${item.subtitle ? `<span class="start-menu-item-subtitle">${item.subtitle}</span>` : ''}
        </div>
        ${item.submenu ? '<span class="start-menu-arrow">▶</span>' : ''}
      `;

      if (item.onClick) {
        menuItem.addEventListener('click', () => {
          item.onClick();
          this.close();
        });
      }

      // Handle submenu
      if (item.submenu) {
        const submenu = document.createElement('div');
        submenu.className = 'start-submenu';
        
        item.submenu.forEach(subItem => {
          const subMenuItem = document.createElement('div');
          subMenuItem.className = 'start-submenu-item';
          subMenuItem.innerHTML = `
            <img class="start-submenu-item-icon" src="${subItem.icon}" alt="">
            <span>${subItem.title}</span>
          `;
          
          if (subItem.onClick) {
            subMenuItem.addEventListener('click', (e) => {
              e.stopPropagation();
              subItem.onClick();
              this.close();
            });
          }
          
          submenu.appendChild(subMenuItem);
        });
        
        menuItem.appendChild(submenu);
      }

      this.itemsContainer.appendChild(menuItem);
    });
  }

  /**
   * Setup event listeners
   */
  setupEvents() {
    // Toggle on start menu event
    events.on(EVENTS.STARTMENU_TOGGLE, () => {
      this.toggle();
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
      if (this.isOpen && !this.container.contains(e.target) && !e.target.closest('.start-button')) {
        this.close();
      }
    });

    // Close on window open
    events.on(EVENTS.WINDOW_OPEN, () => {
      this.close();
    });
  }

  /**
   * Toggle menu open/closed
   */
  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  /**
   * Open the menu
   */
  open() {
    this.buildMenu();
    this.container.classList.add('open');
    this.isOpen = true;
    events.emit(EVENTS.STARTMENU_OPEN);
  }

  /**
   * Close the menu
   */
  close() {
    this.container.classList.remove('open');
    this.isOpen = false;
    events.emit(EVENTS.STARTMENU_CLOSE);
  }
}

// Singleton instance
export const startMenu = new StartMenu();

export default startMenu;
