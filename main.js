/**
 * main.js - application entry point.
 * Imports core modules, initialises the app and handles startup errors.
 */
import { CONFIG } from './config.js';
import { state } from './core/state.js';
import { load } from './core/saveManager.js';
import { router } from './router.js';
import { mountAppShell } from './ui/appShell.js';

function hideLoading() {
  document.getElementById('app-loading')?.remove();
}

function showStartupError(error) {
  console.error(`[${CONFIG.gameName}] Startup failed:`, error);
  const loading = document.getElementById('app-loading');
  if (!loading) return;
  loading.classList.add('app-loading--error');
  loading.querySelector('.app-loading__text').textContent =
    'FORGED failed to start. Check the console for details.';
}

function init() {
  load(); // Reads any existing save; applying it to state comes in a later step.

  const root = document.getElementById('app');
  if (!root) throw new Error('Missing #app root element');

  mountAppShell(root); // Subscribers must exist before the router emits the first route.
  router.init();
  if (CONFIG.dev.logStartup) {
    console.info(`[${CONFIG.gameName}] v${CONFIG.version} initialised (save v${state.saveVersion})`);
  }
  hideLoading();
}

try {
  init();
} catch (error) {
  showStartupError(error);
}
