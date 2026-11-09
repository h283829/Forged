/**
 * utils.js - small reusable helpers shared across modules.
 */

/** Clamp a number between min and max. */
export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/** Deep clone plain data (objects, arrays, primitives). */
export function deepClone(value) {
  return structuredClone(value);
}

const numberFormatter = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });

/** Format a number with thousands separators: 1000000 -> "1,000,000". */
export function formatNumber(value) {
  return numberFormatter.format(Number.isFinite(value) ? value : 0);
}
