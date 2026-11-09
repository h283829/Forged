/**
 * playerLevel.js - compact level and XP progress indicator for the top bar.
 * Display only: it reads state.player and re-renders on "state:changed".
 * Levelling logic belongs to a later stage (progressionSystem).
 */
import { state } from '../core/state.js';
import { subscribe } from '../core/eventBus.js';
import { clamp, formatNumber } from '../core/utils.js';
import { icon } from './icons.js';

let bound = false;

export function renderPlayerLevel() {
  return `
    <div class="level-hud" id="level-hud">
      <span class="level-hud__badge" aria-hidden="true">${icon('star', 'sm')}</span>
      <div class="level-hud__info">
        <div class="level-hud__row">
          <span class="level-hud__level text-tabular"></span>
          <span class="level-hud__xp text-tabular"></span>
        </div>
        <div class="progress" role="progressbar" aria-label="XP progress" aria-valuemin="0">
          <div class="progress__bar"></div>
        </div>
      </div>
    </div>`;
}

export function updatePlayerLevel() {
  const hud = document.getElementById('level-hud');
  if (!hud) return;
  const { level, xp, xpToNextLevel } = state.player;
  const percent = xpToNextLevel > 0 ? clamp((xp / xpToNextLevel) * 100, 0, 100) : 0;

  hud.querySelector('.level-hud__level').textContent = `LVL ${formatNumber(level)}`;
  hud.querySelector('.level-hud__xp').textContent = `${formatNumber(xp)} / ${formatNumber(xpToNextLevel)} XP`;

  const progress = hud.querySelector('.progress');
  progress.setAttribute('aria-valuemax', String(xpToNextLevel));
  progress.setAttribute('aria-valuenow', String(xp));
  progress.style.setProperty('--progress', percent);
}

export function initPlayerLevel() {
  if (bound) return;
  bound = true;
  subscribe('state:changed', updatePlayerLevel);
  updatePlayerLevel();
}
