/**
 * navigation.js - sidebar navigation: markup, active state, collapse/expand and tooltips.
 * Navigation items are plain links (#/route); the router reacts to location changes and
 * emits "route:changed", which updates the active item here. Real pages need no sidebar changes.
 */
import { state } from '../core/state.js';
import { subscribe, emit } from '../core/eventBus.js';
import { ROUTES } from '../router.js';
import { icon } from './icons.js';

/** Sidebar structure. Labels come from ROUTES so they are defined once. */
export const NAV_GROUPS = Object.freeze([
  { id: 'main', title: 'Main', items: [
    { route: 'home', icon: 'home' },
    { route: 'cases', icon: 'package' },
    { route: 'inventory', icon: 'grid' },
    { route: 'upgrader', icon: 'upgrade' },
  ] },
  { id: 'progression', title: 'Progression', items: [
    { route: 'skill-tree', icon: 'branch' },
    { route: 'achievements', icon: 'trophy' },
    { route: 'missions', icon: 'target' },
    { route: 'collections', icon: 'layers' },
  ] },
  { id: 'other', title: 'Other', items: [
    { route: 'events', icon: 'calendar' },
    { route: 'statistics', icon: 'chart' },
    { route: 'settings', icon: 'sliders' },
  ] },
]);

/** Title of the navigation group a route belongs to (e.g. "Progression"), or "". */
export function getNavGroupTitle(routeId) {
  return NAV_GROUPS.find((group) => group.items.some((item) => item.route === routeId))?.title ?? '';
}

const TOOLTIP_OFFSET = 8;

let bound = false;
let sidebarEl = null;
let toggleEl = null;
let tooltipEl = null;

function renderNavItem({ route, icon: iconName }) {
  const { label } = ROUTES[route];
  return `
    <li>
      <a class="nav-item" href="#/${route}" data-route="${route}" data-tooltip="${label}">
        ${icon(iconName, 'md')}
        <span class="nav-item__label">${label}</span>
      </a>
    </li>`;
}

function renderNavGroup({ id, title, items }) {
  return `
    <section class="nav-group" aria-labelledby="nav-group-${id}">
      <h2 class="nav-group__title text-label" id="nav-group-${id}">${title}</h2>
      <ul class="nav-group__list">${items.map(renderNavItem).join('')}</ul>
    </section>`;
}

/** Sidebar markup (header, navigation, footer). */
export function renderSidebar() {
  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar__header">
        <a class="sidebar__brand" href="#/home" aria-label="FORGED - Home">
          <span class="sidebar__logo" aria-hidden="true">
            <svg class="icon icon--md" viewBox="0 0 24 24"><path d="M17 6H8v12"/><path d="M8 12h7"/></svg>
          </span>
          <span class="sidebar__brand-name">FORGED</span>
        </a>
        <button class="btn btn--ghost btn--icon btn--sm sidebar__toggle" type="button"
                aria-controls="sidebar" aria-expanded="true" aria-label="Collapse sidebar"></button>
      </div>

      <nav class="sidebar__nav" aria-label="Main navigation">
        ${NAV_GROUPS.map(renderNavGroup).join('')}
      </nav>

      <div class="sidebar__footer">
        <div class="profile" data-tooltip="Player">
          <span class="profile__avatar" aria-hidden="true">${icon('user', 'sm')}</span>
          <span class="profile__name">Player</span>
          <span class="profile__action" aria-hidden="true">${icon('ellipsis', 'md')}</span>
        </div>
      </div>
    </aside>`;
}

function setActiveItem(routeId) {
  sidebarEl.querySelectorAll('.nav-item').forEach((item) => {
    if (item.dataset.route === routeId) item.setAttribute('aria-current', 'page');
    else item.removeAttribute('aria-current');
  });
}

function showTooltip(target) {
  if (!state.ui.sidebarCollapsed || !target.dataset.tooltip) return;
  const sidebarRect = sidebarEl.getBoundingClientRect();
  const targetRect = target.getBoundingClientRect();
  tooltipEl.textContent = target.dataset.tooltip;
  tooltipEl.style.left = `${sidebarRect.right + TOOLTIP_OFFSET}px`;
  tooltipEl.style.top = `${targetRect.top + targetRect.height / 2}px`;
  tooltipEl.classList.add('tooltip--visible');
}

function hideTooltip() {
  tooltipEl.classList.remove('tooltip--visible');
}

function applyCollapsedState() {
  const collapsed = state.ui.sidebarCollapsed;
  sidebarEl.classList.toggle('sidebar--collapsed', collapsed);
  toggleEl.setAttribute('aria-expanded', String(!collapsed));
  toggleEl.setAttribute('aria-label', collapsed ? 'Expand sidebar' : 'Collapse sidebar');
  toggleEl.dataset.tooltip = collapsed ? 'Expand sidebar' : '';
  toggleEl.innerHTML = icon(collapsed ? 'panel-left-open' : 'panel-left-close', 'md');
  hideTooltip();
}

/** Collapse or expand the sidebar. */
export function setSidebarCollapsed(collapsed) {
  state.ui.sidebarCollapsed = Boolean(collapsed);
  applyCollapsedState();
  emit('sidebar:toggled', { collapsed: state.ui.sidebarCollapsed });
}

/** Attach behaviour to the rendered sidebar. Listeners are bound once, via delegation. */
export function initSidebar() {
  if (bound) return;
  bound = true;

  sidebarEl = document.getElementById('sidebar');
  toggleEl = sidebarEl.querySelector('.sidebar__toggle');
  tooltipEl = document.createElement('div');
  tooltipEl.className = 'tooltip';
  tooltipEl.setAttribute('role', 'tooltip');
  document.body.appendChild(tooltipEl);

  toggleEl.addEventListener('click', () => setSidebarCollapsed(!state.ui.sidebarCollapsed));

  sidebarEl.addEventListener('mouseover', (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target) showTooltip(target);
    else hideTooltip();
  });
  sidebarEl.addEventListener('mouseleave', hideTooltip);
  sidebarEl.addEventListener('focusin', (event) => {
    const target = event.target.closest('[data-tooltip]');
    if (target?.matches(':focus-visible')) showTooltip(target);
  });
  sidebarEl.addEventListener('focusout', hideTooltip);
  sidebarEl.querySelector('.sidebar__nav').addEventListener('scroll', hideTooltip);

  subscribe('route:changed', ({ routeId }) => setActiveItem(routeId));

  applyCollapsedState();
  setActiveItem(state.ui.currentRoute);
}
