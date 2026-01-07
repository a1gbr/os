/**
 * App Registry - Central registry for all applications
 */
import { events, EVENTS } from '../core/events.js';
import { windowManager } from '../ui/WindowManager.js';

class AppRegistry {
  constructor() {
    this.apps = new Map();
  }

  /**
   * Register an application
   * @param {string} id - Unique app identifier
   * @param {Object} app - App configuration
   */
  register(id, app) {
    this.apps.set(id, app);
  }

  /**
   * Launch an application
   * @param {string} id - App identifier
   * @param {Object} params - Optional launch parameters
   */
  launch(id, params = {}) {
    const app = this.apps.get(id);
    if (!app) {
      console.warn(`App "${id}" not found`);
      return;
    }

    // Get window config from app
    const config = typeof app.getConfig === 'function' 
      ? app.getConfig(params) 
      : app;

    // Create window
    windowManager.createWindow(id, config);
  }

  /**
   * Get an app by ID
   */
  get(id) {
    return this.apps.get(id);
  }

  /**
   * Get all registered apps
   */
  getAll() {
    return Array.from(this.apps.entries()).map(([id, app]) => ({
      id,
      ...app
    }));
  }

  /**
   * Check if app is registered
   */
  has(id) {
    return this.apps.has(id);
  }
}

// Singleton instance
export const appRegistry = new AppRegistry();

export default appRegistry;
