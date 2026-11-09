/**
 * topBar.js - persistent top navigation bar: breadcrumb/title, player HUD
 * (level, currencies) and the notification placeholder.
 */
import { subscribe } from '../core/eventBus.js';
import { state } from '../core/state.js';
import { ROUTES } from '../router.js';
import { getNavGroupTitle } from './navigation.js';
import { renderCurrencyDisplay, initCurrencyDisplay } from './currencyDisplay.js';
import { renderPlayerLevel, initPlayerLevel } from './playerLevel.js';
import { icon } from './icons.js';

let bound = false;

export function renderTopBar() {
  return `
    <header class="topbar">
      <div class="topbar__inner">
        <nav class="breadcrumb" aria-label="Breadcrumb">
          <span class="breadcrumb__group" id="topbar-group"></span>
          <span class="breadcrumb__separator" aria-hidden="true">/</span>
          <span class="breadcrumb__title" id="topbar-title" aria-current="page"></span>
        </nav>

        <div class="topbar__hud">
          ${renderPlayerLevel()}
          <span class="topbar__divider" aria-hidden="true"></span>
          ${renderCurrencyDisplay()}
          <span class="topbar__divider" aria-hidden="true"></span>
          <div class="notifications">
            <button class="btn btn--ghost btn--icon notifications__button" id="notifications-button" type="button"
                    aria-label="Notifications" aria-haspopup="dialog" aria-expanded="false" aria-controls="notifications-panel">
              ${icon('bell', 'lg')}
              <span class="notifications__dot" aria-hidden="true"></span>
            </button>
            <div class="popover notifications__panel" id="notifications-panel" role="dialog" aria-label="Notifications" hidden>
              <p class="text-card-heading">Notifications</p>
              <p class="text-secondary">No notifications yet.</p>
            </div>
          </div>
        </div>
      </div>
    </header>`;
}

function updateTitle(routeId) {
  document.getElementById('topbar-title').textContent = ROUTES[routeId].label;
  document.getElementById('topbar-group').textContent = getNavGroupTitle(routeId);
}

/** Attach behaviour to the rendered top bar. Listeners are bound once. */
export function initTopBar() {
  if (bound) return;
  bound = true;

  const button = document.getElementById('notifications-button');
  const panel = document.getElementById('notifications-panel');

  const setPanelOpen = (open) => {
    panel.hidden = !open;
    button.setAttribute('aria-expanded', String(open));
  };

  button.addEventListener('click', () => setPanelOpen(panel.hidden));
  document.addEventListener('click', (event) => {
    if (!panel.hidden && !event.target.closest('.notifications')) setPanelOpen(false);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !panel.hidden) {
      setPanelOpen(false);
      button.focus();
    }
  });

  subscribe('route:changed', ({ routeId }) => {
    updateTitle(routeId);
    setPanelOpen(false);
  });

  initPlayerLevel();
  initCurrencyDisplay();
  updateTitle(state.ui.currentRoute);
}
