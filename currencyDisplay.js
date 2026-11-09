/**
 * currencyDisplay.js - live currency balance display in the UI.
 * Renders one entry per definition in data/currencies.js and re-reads state.currencies
 * whenever "state:changed" is emitted. No currency values live in the markup.
 */
import { state } from '../core/state.js';
import { subscribe } from '../core/eventBus.js';
import { formatNumber } from '../core/utils.js';
import { CURRENCIES } from '../data/currencies.js';
import { icon } from './icons.js';

let bound = false;

function formatAmount({ prefix }, amount) {
  return `${prefix}${formatNumber(amount)}`;
}

/** Markup for the currency list. Values are filled in by updateCurrencyDisplay(). */
export function renderCurrencyDisplay() {
  const items = CURRENCIES.map(({ id, label, icon: iconName }) => `
    <li class="currency currency--${id}" data-currency="${id}" title="${label}">
      ${icon(iconName, 'md')}
      <span class="currency__value text-tabular"></span>
    </li>`).join('');
  return `<ul class="currency-list" aria-label="Currencies">${items}</ul>`;
}

/** Sync the displayed balances with the central state. */
export function updateCurrencyDisplay() {
  CURRENCIES.forEach((currency) => {
    const el = document.querySelector(`.currency[data-currency="${currency.id}"]`);
    if (!el) return;
    const text = formatAmount(currency, state.currencies[currency.id] ?? 0);
    el.querySelector('.currency__value').textContent = text;
    el.setAttribute('aria-label', `${currency.label}: ${text}`);
  });
}

/** Start keeping the display in sync with state. Safe to call once. */
export function initCurrencyDisplay() {
  if (bound) return;
  bound = true;
  subscribe('state:changed', updateCurrencyDisplay);
  updateCurrencyDisplay();
}
