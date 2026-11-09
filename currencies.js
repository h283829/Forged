/**
 * currencies.js - currency definitions (names, icons, defaults).
 * Single source of truth: the initial player state and the HUD both derive from this list.
 */
export const CURRENCIES = Object.freeze([
  { id: 'cash', label: 'Cash', icon: 'banknote', prefix: '$', initial: 1000 },
  { id: 'diamonds', label: 'Diamonds', icon: 'gem', prefix: '', initial: 25 },
  { id: 'tokens', label: 'Tokens', icon: 'coins', prefix: '', initial: 0 },
]);
