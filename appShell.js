/**
 * appShell.js - mounts the application layout (sidebar + top bar + main content area) and renders the
 * temporary placeholder for the current route. Real pages will replace renderPlaceholder later.
 */
import { subscribe } from '../core/eventBus.js';
import { ROUTES, DEFAULT_ROUTE } from '../router.js';
import { renderSidebar, initSidebar } from './navigation.js';
import { renderTopBar, initTopBar } from './topBar.js';

let mounted = false;

function renderPlaceholder(routeId) {
  const main = document.getElementById('main-content');
  const { label } = ROUTES[routeId];
  const isHome = routeId === DEFAULT_ROUTE;
  const title = isHome ? 'Welcome to FORGED' : label;
  const description = isHome
    ? 'This is a temporary placeholder. The home dashboard will be built in a later step.'
    : `The ${label} page has not been built yet. It will appear here in a later step.`;

  main.dataset.route = routeId;
  main.innerHTML = `
    <div class="page page--placeholder">
      <header class="stack stack--tight">
        <p class="text-label">${isHome ? 'FORGED' : 'Current section'}</p>
        <h1 class="text-page-title">${title}</h1>
        <p class="text-secondary">${description}</p>
      </header>
      <section class="content-placeholder" aria-label="Page content placeholder">
        <p class="text-secondary">Future page content will appear here</p>
        <p class="text-meta">#/${routeId}</p>
      </section>
    </div>`;
  main.scrollTop = 0;
}

/** Render the shell into the root element. Call once, before router.init(). */
export function mountAppShell(root) {
  if (mounted) return;
  mounted = true;

  root.insertAdjacentHTML('afterbegin', `
    <div class="app-shell">
      ${renderSidebar()}
      <div class="app-body">
        ${renderTopBar()}
        <main class="app-main" id="main-content" tabindex="-1"></main>
      </div>
    </div>`);

  initSidebar();
  initTopBar();
  subscribe('route:changed', ({ routeId }) => renderPlaceholder(routeId));
}
