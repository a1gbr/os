/**
 * Storage - LocalStorage wrapper with JSON support and namespacing
 */
class Storage {
  constructor(prefix = 'a1gbr_') {
    this.prefix = prefix;
    this.available = this.checkAvailability();
  }

  /**
   * Check if localStorage is available
   */
  checkAvailability() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage not available, using memory fallback');
      return false;
    }
  }

  /**
   * Get prefixed key
   */
  getKey(key) {
    return this.prefix + key;
  }

  /**
   * Get a value from storage
   * @param {string} key - Storage key
   * @param {*} defaultValue - Default value if not found
   * @returns {*} Stored value or default
   */
  get(key, defaultValue = null) {
    if (!this.available) return defaultValue;

    try {
      const item = localStorage.getItem(this.getKey(key));
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (e) {
      console.warn(`Error reading "${key}" from storage:`, e);
      return defaultValue;
    }
  }

  /**
   * Set a value in storage
   * @param {string} key - Storage key
   * @param {*} value - Value to store (will be JSON stringified)
   * @returns {boolean} Success status
   */
  set(key, value) {
    if (!this.available) return false;

    try {
      localStorage.setItem(this.getKey(key), JSON.stringify(value));
      return true;
    } catch (e) {
      console.warn(`Error writing "${key}" to storage:`, e);
      return false;
    }
  }

  /**
   * Remove a value from storage
   * @param {string} key - Storage key
   */
  remove(key) {
    if (!this.available) return;
    localStorage.removeItem(this.getKey(key));
  }

  /**
   * Check if a key exists
   * @param {string} key - Storage key
   * @returns {boolean}
   */
  has(key) {
    if (!this.available) return false;
    return localStorage.getItem(this.getKey(key)) !== null;
  }

  /**
   * Get all keys with this prefix
   * @returns {string[]} Array of keys (without prefix)
   */
  keys() {
    if (!this.available) return [];

    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith(this.prefix)) {
        keys.push(key.slice(this.prefix.length));
      }
    }
    return keys;
  }

  /**
   * Clear all storage with this prefix
   */
  clear() {
    if (!this.available) return;

    this.keys().forEach(key => this.remove(key));
  }
}

// Singleton instance
export const storage = new Storage();

// Storage keys constants
export const STORAGE_KEYS = {
  ICON_POSITIONS: 'icon_positions',
  WINDOW_STATES: 'window_states',
  PREFERENCES: 'preferences',
  VISITED: 'visited'
};

export default storage;
