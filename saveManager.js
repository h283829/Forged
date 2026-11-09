/**
 * saveManager.js - central save manager (LocalStorage).
 * Defines the save structure; migration and full save/load logic come in a later stage.
 */
import { CONFIG } from '../config.js';

/** Wrap state in a versioned save envelope. */
export function createSaveData(state) {
  return {
    saveVersion: CONFIG.saveVersion,
    savedAt: Date.now(),
    state,
  };
}

/** Write state to LocalStorage. Returns true on success. */
export function save(state) {
  try {
    localStorage.setItem(CONFIG.saveKey, JSON.stringify(createSaveData(state)));
    return true;
  } catch (error) {
    console.error('[saveManager] Failed to save:', error);
    return false;
  }
}

/** Read the save envelope from LocalStorage, or null if none/invalid. */
export function load() {
  try {
    const raw = localStorage.getItem(CONFIG.saveKey);
    return raw ? JSON.parse(raw) : null;
  } catch (error) {
    console.error('[saveManager] Failed to load:', error);
    return null;
  }
}
