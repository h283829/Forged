/**
 * router.js - lightweight hash-based router (#/cases).
 * Owns the list of sections, tracks the current one in state.ui.currentRoute and
 * emits "route:changed" ({ routeId, route }) on the event bus. Rendering is done by
 * subscribers, so real pages can be attached later without touching the router.
 */
import { state } from './core/state.js';
import { emit } from './core/eventBus.js';

export const ROUTES = Object.freeze({
  home: { label: 'Home' },
  cases: { label: 'Cases' },
  inventory: { label: 'Inventory' },
  upgrader: { label: 'Upgrader' },
  'skill-tree': { label: 'Skill Tree' },
  achievements: { label: 'Achievements' },
  missions: { label: 'Missions' },
  collections: { label: 'Collections' },
  events: { label: 'Events' },
  statistics: { label: 'Statistics' },
  settings: { label: 'Settings' },
});

export const DEFAULT_ROUTE = 'home';

let initialised = false;
let currentRouteId = null;

function readRouteFromHash() {
  const id = window.location.hash.replace(/^#\/?/, '').split(/[/?]/)[0];
  return Object.hasOwn(ROUTES, id) ? id : null;
}

function syncWithLocation() {
  let routeId = readRouteFromHash();
  if (!routeId) {
    routeId = DEFAULT_ROUTE;
    window.history.replaceState(null, '', `#/${routeId}`); // normalise without adding history
  }
  if (routeId === currentRouteId) return;

  currentRouteId = routeId;
  state.ui.currentRoute = routeId;
  emit('route:changed', { routeId, route: ROUTES[routeId] });
}

export const router = {
  /** Start listening to location changes and resolve the initial route. Safe to call once. */
  init() {
    if (initialised) return;
    initialised = true;
    window.addEventListener('hashchange', syncWithLocation);
    syncWithLocation();
  },

  /** Navigate programmatically. Unknown ids are ignored. */
  navigate(routeId) {
    if (!Object.hasOwn(ROUTES, routeId)) return;
    window.location.hash = `#/${routeId}`;
  },

  get current() {
    return currentRouteId;
  },
};
