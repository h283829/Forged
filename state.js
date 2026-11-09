/**
 * state.js - central location for player state.
 * Only the initial structure lives here; game logic belongs in js/systems/.
 */
import { CONFIG } from '../config.js';
import { CURRENCIES } from '../data/currencies.js';
import { emit } from './eventBus.js';

/** Create a fresh player state object (used for new games and resets). */
export function createInitialState() {
  return {
    saveVersion: CONFIG.saveVersion,
    player: {
      createdAt: Date.now(),
      level: 1,
      xp: 0,
      xpToNextLevel: 100,
    },
    currencies: Object.fromEntries(CURRENCIES.map(({ id, initial }) => [id, initial])),
    inventory: [],
    statistics: {},
    settings: {},
    ui: {
      currentRoute: 'home',
      sidebarCollapsed: false,
    },
  };
}

/** The live player state. */
export const state = createInitialState();

/**
 * Change the live state and notify the UI. Game systems should mutate state through this
 * so listeners (e.g. the HUD) re-render. Emits "state:changed".
 * @param {(state: object) => void} mutator
 */
export function updateState(mutator) {
  mutator(state);
  emit('state:changed', { state });
}
