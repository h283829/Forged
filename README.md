# FORGED

A browser-based weapon collection game. Players open cases, collect weapons of varying rarity, manage an inventory, and progress through upgrades, missions and achievements.

> **Status:** Stage 1, Step 1.4 - foundation, design system, application shell (collapsible sidebar) and top bar with player HUD. No real pages or game mechanics yet.

See [DESIGN_SYSTEM.md](DESIGN_SYSTEM.md) for the visual identity, tokens and component conventions. All future UI must use them.

## Technology Stack

- HTML5
- CSS3 (custom properties, no preprocessors)
- Vanilla JavaScript (ES6+ modules)
- LocalStorage for saves (no backend)
- No frameworks, no build step, no dependencies

## Folder Structure

```
FORGED/
├── index.html            Entry document
├── css/
│   ├── styles.css        CSS entry point (imports the others)
│   ├── variables.css     Design tokens (colours, type, spacing, radius, motion)
│   ├── layout.css        Reset, base, typography, scrollbar, layout helpers
│   ├── components.css    Buttons, forms, cards, badges, rarity system
│   └── pages.css         Page-specific styles
├── js/
│   ├── main.js           Application entry point
│   ├── config.js         Central configuration
│   ├── router.js         Future SPA router
│   ├── core/             state, saveManager, eventBus, utils
│   ├── data/             Static game data (weapons, cases, rarities, currencies, achievements)
│   ├── systems/          Game logic (one module per system)
│   └── ui/               UI behaviour (appShell, navigation, icons, notifications, modal, currencyDisplay)
├── assets/               weapons, cases, icons, backgrounds, sounds, branding
├── DESIGN_SYSTEM.md      Visual identity and design tokens reference
└── README.md
```

## Running Locally

FORGED uses ES modules. Browsers block module loading over `file://`, so opening `index.html` directly will not work. Use a local server from the project folder:

```bash
# Python 3
python3 -m http.server 8000

# or Node.js
npx serve .
```

Then open <http://localhost:8000>. The VS Code "Live Server" extension also works.

## Main JavaScript Modules

- **main.js** - entry point; loads the save, initialises the router, handles startup errors.
- **config.js** - game name, version, save version/key and dev settings.
- **router.js** - hash-based router (`#/cases`). Owns the `ROUTES` list, stores the current route in `state.ui.currentRoute` and emits `route:changed`.
- **ui/appShell.js** - mounts the sidebar + main content layout and renders the temporary placeholder for the current route. Replace `renderPlaceholder` when real pages arrive.
- **ui/navigation.js** - sidebar markup (`NAV_GROUPS`), active item, collapse/expand and tooltips. Emits `sidebar:toggled`.
- **ui/topBar.js** - top bar: breadcrumb/title, HUD and the notification placeholder.
- **ui/playerLevel.js** and **ui/currencyDisplay.js** - HUD components. They only read state and re-render on `state:changed`.
- **ui/icons.js** - small inline Lucide icon set; add icons here as needed.
- **core/state.js** - the initial player state (level, XP, currencies, ui) and the live state object. Change it with `updateState(mutator)` so the UI refreshes.
- **core/saveManager.js** - versioned LocalStorage save/load structure.
- **core/eventBus.js** - `subscribe`, `unsubscribe`, `emit` for decoupled communication.
- **core/utils.js** - small shared helpers, including `formatNumber` (thousands separators).
- **data/** - static definitions only, no logic.
- **systems/** - gameplay logic; systems change state and talk to each other through the event bus.
- **ui/** - rendering and DOM behaviour; reacts to events and state.

Placeholder files in `data/`, `systems/` and `ui/` currently contain only a comment describing their future role.

## Future Development

Later stages build on this foundation incrementally: the application shell and navigation (UI), then data definitions, then game systems (cases, inventory, currencies, progression), then meta systems (upgrader, skill tree, missions, achievements, daily rewards, offline progress), and finally polish and balancing. Data stays in `data/`, logic in `systems/`, and presentation in `ui/`.


## Event Bus Events

- `route:changed` - `{ routeId, route }`, emitted by the router.
- `state:changed` - `{ state }`, emitted by `updateState()`; the HUD listens to it.
- `sidebar:toggled` - `{ collapsed }`, emitted by the sidebar.

## Adding a Section or Page

Add the route to `ROUTES` in `router.js`, then add `{ route, icon }` to a group in `NAV_GROUPS` in `ui/navigation.js` (and the icon to `ui/icons.js` if new). The sidebar needs no other changes.

## Adding a Currency

Add it to `CURRENCIES` in `data/currencies.js` (and its icon to `ui/icons.js`). The initial state and the HUD pick it up automatically.
