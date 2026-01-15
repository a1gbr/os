/**
 * Window Manager - Handles window creation, dragging, resizing, and z-index management
 */
import { events, EVENTS } from '../core/events.js';
import { sounds, SOUNDS } from '../core/sounds.js';

class WindowManager {
  constructor() {
    this.windows = new Map();
    this.container = null;
    this.highestZIndex = 100;
    this.activeWindowId = null;
    this.dragState = null;
    this.resizeState = null;

    // Bind event handlers
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);
  }

  /**
   * Initialize the window manager
   */
  init() {
    this.container = document.getElementById('window-container');
    
    // Global pointer events for dragging/resizing (supports mouse + touch)
    document.addEventListener('pointermove', this.handlePointerMove);
    document.addEventListener('pointerup', this.handlePointerUp);
    document.addEventListener('pointercancel', this.handlePointerUp);

    // Listen for app launch events
    events.on(EVENTS.APP_LAUNCH, ({ id, config }) => {
      this.createWindow(id, config);
    });
  }

  /**
   * Create a new window
   * @param {string} id - Unique window identifier
   * @param {Object} config - Window configuration
   * @returns {HTMLElement} Window element
   */
  createWindow(id, config) {
    // If window already exists, focus it
    if (this.windows.has(id)) {
      this.focusWindow(id);
      return this.windows.get(id).element;
    }

    const {
      title = 'Window',
      icon = null,
      content = '',
      width = 400,
      height = 300,
      x = null,
      y = null,
      resizable = true,
      minimizable = true,
      maximizable = true,
      menubar = null,
      statusbar = null
    } = config;

    // Calculate position
    const posX = x ?? 50 + (this.windows.size * 30) % 200;
    const posY = y ?? 50 + (this.windows.size * 30) % 150;

    // Create window element
    const win = document.createElement('div');
    win.className = 'window';
    win.id = `window-${id}`;
    win.style.cssText = `
      width: ${width}px;
      height: ${height}px;
      left: ${posX}px;
      top: ${posY}px;
      z-index: ${++this.highestZIndex};
    `;

    // Build window HTML
    win.innerHTML = `
      <div class="window-titlebar">
        ${icon ? `<img class="window-icon" src="${icon}" alt="">` : ''}
        <span class="window-title">${title}</span>
        <div class="window-controls">
          ${minimizable ? '<button class="window-btn window-btn-minimize" title="Minimize"></button>' : ''}
          ${maximizable ? '<button class="window-btn window-btn-maximize" title="Maximize"></button>' : ''}
          <button class="window-btn window-btn-close" title="Close"></button>
        </div>
      </div>
      <div class="window-content">
        ${menubar ? this.buildMenubar(menubar) : ''}
        <div class="window-body">${typeof content === 'string' ? content : ''}</div>
        ${statusbar ? `<div class="window-statusbar">${statusbar}</div>` : ''}
      </div>
      ${resizable ? this.buildResizeHandles() : ''}
    `;

    // If content is a DOM element, append it
    if (typeof content !== 'string' && content instanceof HTMLElement) {
      win.querySelector('.window-body').appendChild(content);
    }

    // Add to container
    this.container.appendChild(win);

    // Store window state
    const windowState = {
      id,
      element: win,
      config,
      minimized: false,
      maximized: false,
      prevBounds: null
    };
    this.windows.set(id, windowState);

    // Set up event listeners
    this.setupWindowEvents(id, win);

    // Focus the new window
    this.focusWindow(id);

    // Call onInit callback if provided
    if (config.onInit && typeof config.onInit === 'function') {
      config.onInit(win.querySelector('.window-body'));
    }

    // Emit event
    events.emit(EVENTS.WINDOW_OPEN, { id, title, icon });

    // Play sound
    sounds.play(SOUNDS.CLICK);

    return win;
  }

  /**
   * Build menubar HTML
   */
  buildMenubar(items) {
    const menuItems = items.map(item => 
      `<span class="window-menu-item">${item}</span>`
    ).join('');
    return `<div class="window-menubar">${menuItems}</div>`;
  }

  /**
   * Build resize handles
   */
  buildResizeHandles() {
    return `
      <div class="resize-handle resize-handle-n"></div>
      <div class="resize-handle resize-handle-s"></div>
      <div class="resize-handle resize-handle-e"></div>
      <div class="resize-handle resize-handle-w"></div>
      <div class="resize-handle resize-handle-nw"></div>
      <div class="resize-handle resize-handle-ne"></div>
      <div class="resize-handle resize-handle-sw"></div>
      <div class="resize-handle resize-handle-se"></div>
    `;
  }

  /**
   * Set up event listeners for a window
   */
  setupWindowEvents(id, win) {
    const titlebar = win.querySelector('.window-titlebar');
    const btnClose = win.querySelector('.window-btn-close');
    const btnMinimize = win.querySelector('.window-btn-minimize');
    const btnMaximize = win.querySelector('.window-btn-maximize');

    // Focus on click
    win.addEventListener('pointerdown', () => this.focusWindow(id));

    // Dragging - use document-level capture for Safari compatibility
    titlebar.addEventListener('pointerdown', (e) => {
      // Only handle primary pointer (first finger/mouse button)
      if (!e.isPrimary) return;
      if (e.target.closest('.window-controls')) return;
      if (this.windows.get(id).maximized) return;

      // Prevent default touch behaviors (scrolling, zooming)
      e.preventDefault();
      e.stopPropagation();

      // Safari fix: Use document-level pointer capture instead of element-level
      // This ensures pointer events are captured even with Safari's strict touch handling
      try {
        document.body.setPointerCapture(e.pointerId);
      } catch (err) {
        // Fallback: some browsers may not support setPointerCapture on body
        try {
          titlebar.setPointerCapture(e.pointerId);
        } catch (err2) {
          // Continue without pointer capture - drag will still work but may be less reliable
        }
      }

      // Add visual feedback during drag
      win.classList.add('dragging');

      this.dragState = {
        id,
        pointerId: e.pointerId,
        startX: e.clientX,
        startY: e.clientY,
        startLeft: win.offsetLeft,
        startTop: win.offsetTop,
        element: titlebar
      };
    });

    // Double-click titlebar to maximize/restore
    titlebar.addEventListener('dblclick', (e) => {
      if (e.target.closest('.window-controls')) return;
      this.toggleMaximize(id);
    });

    // Control buttons
    btnClose?.addEventListener('click', () => this.closeWindow(id));
    btnMinimize?.addEventListener('click', () => this.minimizeWindow(id));
    btnMaximize?.addEventListener('click', () => this.toggleMaximize(id));

    // Resize handles
    const handles = win.querySelectorAll('.resize-handle');
    handles.forEach(handle => {
      handle.addEventListener('pointerdown', (e) => {
        // Only handle primary pointer
        if (!e.isPrimary) return;
        e.stopPropagation();
        e.preventDefault();

        // Capture pointer for reliable event delivery
        handle.setPointerCapture(e.pointerId);

        const direction = handle.className.split('resize-handle-')[1];
        this.startResize(id, direction, e);
      });
    });
  }

  /**
   * Start resizing
   */
  startResize(id, direction, e) {
    const win = this.windows.get(id).element;
    this.resizeState = {
      id,
      pointerId: e.pointerId,
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: win.offsetWidth,
      startHeight: win.offsetHeight,
      startLeft: win.offsetLeft,
      startTop: win.offsetTop
    };
  }

  /**
   * Handle pointer move (dragging/resizing)
   */
  handlePointerMove(e) {
    if (this.dragState) {
      // Verify pointer ID matches to handle multi-touch correctly
      if (this.dragState.pointerId !== e.pointerId) return;

      const { id, startX, startY, startLeft, startTop } = this.dragState;
      const win = this.windows.get(id).element;

      const newLeft = startLeft + (e.clientX - startX);
      const newTop = startTop + (e.clientY - startY);

      win.style.left = `${Math.max(0, newLeft)}px`;
      win.style.top = `${Math.max(0, newTop)}px`;
    }

    if (this.resizeState) {
      // Verify pointer ID matches to handle multi-touch correctly
      if (this.resizeState.pointerId !== e.pointerId) return;

      const { id, direction, startX, startY, startWidth, startHeight, startLeft, startTop } = this.resizeState;
      const win = this.windows.get(id).element;

      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      const minWidth = 200;
      const minHeight = 100;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      // Handle each direction
      if (direction.includes('e')) {
        newWidth = Math.max(minWidth, startWidth + dx);
      }
      if (direction.includes('w')) {
        const possibleWidth = startWidth - dx;
        if (possibleWidth >= minWidth) {
          newWidth = possibleWidth;
          newLeft = startLeft + dx;
        }
      }
      if (direction.includes('s')) {
        newHeight = Math.max(minHeight, startHeight + dy);
      }
      if (direction.includes('n')) {
        const possibleHeight = startHeight - dy;
        if (possibleHeight >= minHeight) {
          newHeight = possibleHeight;
          newTop = startTop + dy;
        }
      }

      win.style.width = `${newWidth}px`;
      win.style.height = `${newHeight}px`;
      win.style.left = `${newLeft}px`;
      win.style.top = `${newTop}px`;
    }
  }

  /**
   * Handle pointer up (stop dragging/resizing)
   */
  handlePointerUp(e) {
    // Only clear state if the correct pointer was released
    if (this.dragState && this.dragState.pointerId === e.pointerId) {
      this.dragState = null;
    }
    if (this.resizeState && this.resizeState.pointerId === e.pointerId) {
      this.resizeState = null;
    }
  }

  /**
   * Focus a window
   */
  focusWindow(id) {
    if (!this.windows.has(id)) return;

    const state = this.windows.get(id);
    
    // If minimized, restore first
    if (state.minimized) {
      this.restoreWindow(id);
      return;
    }

    // Deactivate previous active window
    if (this.activeWindowId && this.activeWindowId !== id) {
      const prevWin = this.windows.get(this.activeWindowId)?.element;
      if (prevWin) {
        prevWin.classList.add('inactive');
        events.emit(EVENTS.WINDOW_BLUR, { id: this.activeWindowId });
      }
    }

    // Activate this window
    state.element.classList.remove('inactive');
    state.element.style.zIndex = ++this.highestZIndex;
    this.activeWindowId = id;

    events.emit(EVENTS.WINDOW_FOCUS, { id });
  }

  /**
   * Close a window
   */
  closeWindow(id) {
    if (!this.windows.has(id)) return;

    const state = this.windows.get(id);
    const win = state.element;

    // Animate close
    win.classList.add('closing');
    
    setTimeout(() => {
      win.remove();
      this.windows.delete(id);

      // Focus next window
      if (this.activeWindowId === id) {
        this.activeWindowId = null;
        const remaining = Array.from(this.windows.values());
        if (remaining.length > 0) {
          // Focus the topmost window
          const topWindow = remaining.reduce((top, w) => {
            const zIndex = parseInt(w.element.style.zIndex) || 0;
            const topZ = parseInt(top.element.style.zIndex) || 0;
            return zIndex > topZ ? w : top;
          });
          this.focusWindow(topWindow.id);
        }
      }

      events.emit(EVENTS.WINDOW_CLOSE, { id });
      sounds.play(SOUNDS.CLICK);
    }, 100);
  }

  /**
   * Minimize a window
   */
  minimizeWindow(id) {
    if (!this.windows.has(id)) return;

    const state = this.windows.get(id);
    state.minimized = true;
    state.element.classList.add('minimizing');

    setTimeout(() => {
      state.element.style.display = 'none';
      state.element.classList.remove('minimizing');
    }, 200);

    // Focus next window
    if (this.activeWindowId === id) {
      this.activeWindowId = null;
      const remaining = Array.from(this.windows.values()).filter(w => !w.minimized);
      if (remaining.length > 0) {
        const topWindow = remaining.reduce((top, w) => {
          const zIndex = parseInt(w.element.style.zIndex) || 0;
          const topZ = parseInt(top.element.style.zIndex) || 0;
          return zIndex > topZ ? w : top;
        });
        this.focusWindow(topWindow.id);
      }
    }

    events.emit(EVENTS.WINDOW_MINIMIZE, { id });
  }

  /**
   * Restore a minimized window
   */
  restoreWindow(id) {
    if (!this.windows.has(id)) return;

    const state = this.windows.get(id);
    if (!state.minimized) return;

    state.minimized = false;
    state.element.style.display = '';
    state.element.classList.add('restoring');

    setTimeout(() => {
      state.element.classList.remove('restoring');
    }, 200);

    this.focusWindow(id);
    events.emit(EVENTS.WINDOW_RESTORE, { id });
  }

  /**
   * Toggle maximize state
   */
  toggleMaximize(id) {
    if (!this.windows.has(id)) return;

    const state = this.windows.get(id);
    const win = state.element;

    if (state.maximized) {
      // Restore
      if (state.prevBounds) {
        win.style.width = state.prevBounds.width;
        win.style.height = state.prevBounds.height;
        win.style.left = state.prevBounds.left;
        win.style.top = state.prevBounds.top;
      }
      win.classList.remove('maximized');
      state.maximized = false;
      events.emit(EVENTS.WINDOW_RESTORE, { id });
    } else {
      // Maximize
      state.prevBounds = {
        width: win.style.width,
        height: win.style.height,
        left: win.style.left,
        top: win.style.top
      };
      win.classList.add('maximized');
      state.maximized = true;
      events.emit(EVENTS.WINDOW_MAXIMIZE, { id });
    }
  }

  /**
   * Get a window by ID
   */
  getWindow(id) {
    return this.windows.get(id);
  }

  /**
   * Get all windows
   */
  getAllWindows() {
    return Array.from(this.windows.values());
  }

  /**
   * Get the active window
   */
  getActiveWindow() {
    return this.activeWindowId ? this.windows.get(this.activeWindowId) : null;
  }

  /**
   * Check if a window is open
   */
  isOpen(id) {
    return this.windows.has(id);
  }
}

// Singleton instance
export const windowManager = new WindowManager();

export default windowManager;
