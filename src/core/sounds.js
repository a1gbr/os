/**
 * Sound Manager - Handle audio playback with graceful fallbacks
 */
import { events, EVENTS } from './events.js';

class SoundManager {
  constructor() {
    this.sounds = new Map();
    this.enabled = true;
    this.volume = 0.5;
    this.audioContext = null;

    // Listen for sound events
    events.on(EVENTS.SOUND_PLAY, (name) => this.play(name));
  }

  /**
   * Initialize AudioContext (must be called after user interaction)
   */
  init() {
    if (!this.audioContext) {
      try {
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        console.warn('AudioContext not available');
      }
    }
  }

  /**
   * Register a sound
   * @param {string} name - Sound identifier
   * @param {string} src - Audio file path
   */
  register(name, src) {
    const audio = new Audio();
    audio.preload = 'auto';
    audio.src = src;
    audio.volume = this.volume;
    this.sounds.set(name, audio);
  }

  /**
   * Play a sound
   * @param {string} name - Sound identifier
   * @returns {Promise<void>}
   */
  async play(name) {
    if (!this.enabled) return;

    // Initialize AudioContext on first play (user gesture required)
    this.init();

    // For now, use simple beep since we don't have actual sound files
    if (!this.sounds.has(name)) {
      await this.beep(name);
      return;
    }

    const audio = this.sounds.get(name);
    
    try {
      audio.currentTime = 0;
      audio.volume = this.volume;
      await audio.play();
    } catch (e) {
      console.warn(`Failed to play sound "${name}":`, e);
    }
  }

  /**
   * Generate a simple beep sound
   * @param {string} type - Type of beep
   */
  async beep(type = 'click') {
    if (!this.audioContext) {
      this.init();
    }

    if (!this.audioContext) return;

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      // Different sounds for different types
      const sounds = {
        click: { freq: 800, duration: 0.05 },
        startup: { freq: 440, duration: 0.3 },
        error: { freq: 200, duration: 0.2 },
        notify: { freq: 600, duration: 0.1 }
      };

      const config = sounds[type] || sounds.click;

      oscillator.frequency.value = config.freq;
      oscillator.type = 'square';
      
      gainNode.gain.value = this.volume * 0.1;
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.audioContext.currentTime + config.duration
      );

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + config.duration);
    } catch (e) {
      // Silently fail
    }
  }

  /**
   * Set master volume
   * @param {number} volume - 0 to 1
   */
  setVolume(volume) {
    this.volume = Math.max(0, Math.min(1, volume));
    this.sounds.forEach(audio => {
      audio.volume = this.volume;
    });
  }

  /**
   * Toggle sound on/off
   */
  toggle() {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  /**
   * Enable sounds
   */
  enable() {
    this.enabled = true;
  }

  /**
   * Disable sounds
   */
  disable() {
    this.enabled = false;
  }
}

// Singleton instance
export const sounds = new SoundManager();

// Sound constants
export const SOUNDS = {
  STARTUP: 'startup',
  CLICK: 'click',
  ERROR: 'error',
  NOTIFY: 'notify',
  CLOSE: 'close'
};

export default sounds;
