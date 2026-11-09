/**
 * eventBus.js - lightweight publish/subscribe system for decoupled module communication.
 */
const listeners = new Map();

/**
 * Subscribe to an event.
 * @param {string} eventName
 * @param {Function} handler
 * @returns {Function} call to unsubscribe
 */
export function subscribe(eventName, handler) {
  if (!listeners.has(eventName)) listeners.set(eventName, new Set());
  listeners.get(eventName).add(handler);
  return () => unsubscribe(eventName, handler);
}

/**
 * Remove a previously registered handler.
 */
export function unsubscribe(eventName, handler) {
  const handlers = listeners.get(eventName);
  if (!handlers) return;
  handlers.delete(handler);
  if (handlers.size === 0) listeners.delete(eventName);
}

/**
 * Emit an event to all subscribers. A failing handler does not stop the others.
 */
export function emit(eventName, payload) {
  const handlers = listeners.get(eventName);
  if (!handlers) return;
  for (const handler of [...handlers]) {
    try {
      handler(payload);
    } catch (error) {
      console.error(`[eventBus] Handler for "${eventName}" failed:`, error);
    }
  }
}
