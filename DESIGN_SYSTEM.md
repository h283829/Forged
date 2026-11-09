# FORGED Design System

The single reference for FORGED's visual identity. All tokens live in `css/variables.css`; **never hard-code colours, sizes, radii or timings elsewhere.**

## 1. Brand Identity

FORGED is minimalist, professional, premium, modern, industrial and confident. The interface is dark, restrained and readable: surfaces and thin borders create structure, orange is rare and meaningful, and decoration is kept to a minimum.

**Avoid:** heavy gradients, neon glows, large shadows, over-rounded cards, emoji as icons, and random off-palette colours.

## 2. Colour Palette

| Token | Hex | Use |
|---|---|---|
| `--color-background` | `#0B0D10` | App background. Should dominate. |
| `--color-sidebar` | `#101318` | Sidebar, header, input wells, secondary areas. |
| `--color-surface` | `#171B21` | Cards and panels. |
| `--color-surface-elevated` | `#1D222A` | Hover surfaces, dropdowns, modals. |
| `--color-border` | `#282E37` | Standard borders (inputs, buttons, interactive cards). |
| `--color-border-subtle` | `#20252C` | Dividers and quiet card borders. |
| `--color-border-strong` | `#3A424D` | Hover/emphasis borders. |
| `--color-text-primary` | `#F1F3F5` | Headings, body, values. |
| `--color-text-secondary` | `#929AA5` | Descriptions, labels. |
| `--color-text-muted` | `#68717D` | Metadata, placeholders, disabled text. |
| `--color-text-on-accent` | `#14100A` | Text on orange fills. |
| `--color-accent` | `#E69A36` | Primary actions, selected states, key highlights. Use sparingly. |
| `--color-accent-hover` | `#F0AC50` | Accent hover. |
| `--color-accent-pressed` | `#C98229` | Accent pressed. |
| `--color-success` | `#42B883` | Success, confirmations. |
| `--color-warning` | `#E5B44B` | Warnings, caution. |
| `--color-error` | `#E05D5D` | Errors, destructive actions. |
| `--color-info` | `#55A6DC` | Informational messages. |

**Transparent variants:** `--color-accent-soft`, `--color-accent-border`, `--color-success-soft`, `--color-warning-soft`, `--color-error-soft`, `--color-error-border`, `--color-info-soft` (tinted backgrounds/borders), `--color-overlay` (modal backdrop), `--color-hover-tint` / `--color-active-tint` (neutral hover and press feedback).

**Rules:** background dominates; orange is for important actions and selection only; state colours always carry meaning; do not use every colour on one screen.

## 3. Rarity Colours

| Rarity | Token | Hex |
|---|---|---|
| Common | `--rarity-common` | `#929AA5` |
| Uncommon | `--rarity-uncommon` | `#42B883` |
| Rare | `--rarity-rare` | `#38A8E8` |
| Epic | `--rarity-epic` | `#A77BE8` |
| Legendary | `--rarity-legendary` | `#E69A36` |
| Mythic | `--rarity-mythic` | `#E45C5C` |
| Exotic | `--rarity-exotic` | `#E879C5` |

Apply a modifier class (`rarity--common` ... `rarity--exotic`) to an element. It sets `--rarity-color`, `--rarity-soft` (12% tint) and `--rarity-border` (45% tint), which these classes then use:

- `.rarity-text` - rarity-coloured text.
- `.rarity-border` - rarity-tinted border.
- `.rarity-bg` - soft rarity background.
- `.badge.badge--rarity` - uppercase badge with tinted background and border.
- `.weapon-card` - 2px rarity bar on the top edge; border tints on hover. Legendary, Mythic and Exotic add a faint top wash, and Mythic/Exotic have a 3px bar. No glows.

```html
<article class="weapon-card rarity--epic">
  <span class="badge badge--rarity">Epic</span>
</article>
```

Always take rarity colours from these tokens. Never redefine them per page.

## 4. Typography

Font: **Inter** (loaded in `index.html`), falling back to `system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif`.

| Class | Size | Weight | Use |
|---|---|---|---|
| `.text-page-title` | 32px | 700 | Page titles |
| `.text-section-heading` | 24px | 600 | Section headings |
| `.text-card-heading` | 18px | 600 | Card headings |
| `.text-body` | 15px | 400 | Body text |
| `.text-secondary` | 13px | 400 | Descriptions (secondary colour) |
| `.text-meta` | 12px | 400 | Small metadata (muted) |
| `.text-label` | 12px | 600 | Uppercase labels |
| `.text-currency` / `.text-currency-sm` | 24px / 15px | 700 / 600 | Currency values (tabular numbers) |
| `.text-xp` | 12px | 600 | XP and level indicators (tabular numbers) |
| Buttons | 13px | 600 | `.btn` |

Weights: 400 normal, 500 medium emphasis, 600 headings and labels, 700 major titles. Use `.text-tabular` (or the currency/XP classes) wherever numbers must align. Colour helpers: `.text-accent`, `.text-success`, `.text-warning`, `.text-error`, `.text-info`.

## 5. Spacing

Scale: `--space-1` 4px, `-2` 8px, `-3` 12px, `-4` 16px, `-5` 20px, `-6` 24px, `-7` 32px, `-8` 40px, `-9` 48px, `-10` 64px.

Role tokens (prefer these in components and pages):

| Token | Value | Use |
|---|---|---|
| `--page-padding` | 32px (16px under 720px wide) | Page content padding |
| `--section-gap` | 40px | Between page sections |
| `--component-gap` | 16px | Between components |
| `--card-padding` | 20px | Card padding (`--card-padding-compact` 16px) |
| `--sidebar-padding` | 16px | Sidebar padding |
| `--text-gap` | 8px | Between related text lines |

Buttons: height 40px (`--sm` 32px, `--lg` 48px), horizontal padding 16px (12px / 24px). Layout helpers: `.page`, `.section`, `.stack`, `.stack--tight`, `.cluster`.

## 6. Radius and Borders

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 4px | Badges, checkboxes |
| `--radius-md` | 6px | Buttons, inputs |
| `--radius-lg` | 10px | Cards, panels |
| `--radius-xl` | 14px | Modals, large containers |
| `--radius-full` | 9999px | Toggles, scrollbar thumb |

Borders are 1px (`--border-width`). Containers use `--color-border-subtle`; interactive cards, buttons and inputs use `--color-border`, moving to `--color-border-strong` on hover; selected elements use `--color-accent-border`; dividers use `.divider`.

## 7. Shadows

`--shadow-sm`, `--shadow-md`, `--shadow-dropdown`, `--shadow-modal`, with helpers `.elevation-sm|md|dropdown|modal`. Use shadows only for layering (dropdowns, modals). Separate everything else with surface colour and borders.

## 8. Buttons

Base `.btn` plus one variant. Each has default, hover, active, keyboard focus (`:focus-visible` ring) and disabled states.

| Class | Appearance |
|---|---|
| `.btn--primary` | Orange fill, dark text. One per view where possible. |
| `.btn--secondary` | Surface fill, subtle border. |
| `.btn--ghost` | Transparent, tint on hover. |
| `.btn--danger` | Red-tinted; fills red on hover. Destructive actions only. |
| `:disabled` / `aria-disabled="true"` | Flat, muted, `not-allowed` cursor. |

Sizes: `.btn--sm`, `.btn--lg`. Icon-only: `.btn--icon` (add an `aria-label`).

## 9. Form Elements

| Element | Class |
|---|---|
| Text input | `.input` |
| Search field | `.search-field` wrapping an `svg.icon` and `.input` |
| Select | `.select` |
| Checkbox | `input.checkbox` |
| Toggle | `input.toggle` (`type="checkbox" role="switch"`) |
| Range | `input.range` |
| Label/hint/error | `.field`, `.field__label`, `.field__hint`, `.field__error` |
| Checkbox/toggle row | `.check-row` |

All have hover, focus (accent border and soft ring, or the global focus ring), and disabled states. Always pair controls with a visible label.

## 10. Icons

Use [Lucide](https://lucide.dev) icons as inline SVG only for icons actually used. Do not add the full library. Never use emoji as interface icons.

| Class | Size | Use |
|---|---|---|
| `.icon--sm` | 16px | Small/inline |
| `.icon--md` (default) | 18px | Standard |
| `.icon--lg` | 20px | Prominent |
| `.icon--xl` | 24px | Large |

`.icon` sets `stroke: currentColor`, no fill, 1.75 stroke width and round caps, so icons inherit text colour. Provide `aria-hidden="true"` on decorative icons and an `aria-label` on icon-only buttons.

## 11. Motion

| Token | Value | Use |
|---|---|---|
| `--duration-fast` | 120ms | Press feedback, links |
| `--duration-normal` | 180ms | Hover, colour, border changes |
| `--duration-slow` | 250ms | Larger movements |

Combined tokens: `--transition-fast`, `--transition-normal`, `--transition-slow`, `--transition-colors` (colour/background/border/shadow) and `--transition-move` (transform/shadow/border). Keep motion subtle. `prefers-reduced-motion: reduce` effectively disables transitions and animations globally. Gameplay and case-opening animations are out of scope for this step.

## 12. Scrollbar

Thin, dark track, thumb in `--color-border`, lighter (`--color-border-strong`) on hover. Defined once in `layout.css` (standard `scrollbar-width`/`scrollbar-color` plus WebKit pseudo-elements).

## 13. CSS File Responsibilities

| File | Responsibility |
|---|---|
| `variables.css` | All design tokens. The only place raw values live. |
| `styles.css` | Entry point; imports in order: variables, layout, components, pages. |
| `layout.css` | Reset, base styles, typography classes, layout helpers, focus, scrollbar, reduced motion. |
| `components.css` | Reusable components: rarity system, cards, badges, icons, buttons, form controls, elevation, loading state. |
| `pages.css` | Page-specific styles, scoped under a page root class (`.page--home`). No new tokens or reusable components. |

**Conventions:** BEM-style names (`block__element--modifier`), tokens only, no `!important`, add new reusable patterns to `components.css` and new tokens to `variables.css`.

## 14. Application Layout (Step 1.3)

- Tokens: `--sidebar-width` 240px, `--sidebar-width-collapsed` 72px, `--page-max-width` 1440px, `--nav-item-height` 40px, `--z-tooltip`.
- `.app-shell` is a full-viewport flex row. `.sidebar` stays fixed in place and `.app-main` scrolls (`min-width: 0`, no horizontal overflow).
- Sidebar uses `--color-sidebar` with a subtle right border; the main area uses `--color-background`.
- Navigation: `.nav-group`, `.nav-item` (hover tint; active item gets `aria-current="page"`, a surface background, an accent icon and a 2px accent bar). Icons keep a fixed position when collapsing.
- Collapsed state is the `.sidebar--collapsed` class. Tooltips (`.tooltip`) come from `data-tooltip` and show only when collapsed.
- `.profile` is a visual placeholder only.

## 15. Top Bar and HUD (Step 1.4)

- `.topbar` (64px, `--topbar-height`) sits above the scrolling `.app-main`, with a subtle bottom border; `.topbar__inner` shares the page max width and padding so it lines up with page content.
- Breadcrumb: muted group name, then the current page in `--font-size-lg` semibold.
- HUD order: level, divider, currencies, divider, notifications. Numbers use tabular figures.
- `.progress` / `.progress__bar`: reusable progress bar; set `--progress` (0-100) on `.progress`. Orange is used only for the XP fill, the level badge and the notification dot.
- Currency icons: cash `--color-success`, diamonds `--color-info`, tokens `--color-text-secondary`.
- `.popover`: dropdown panel (elevated surface, `--shadow-dropdown`).
- Responsiveness uses container queries on the top bar, so it adapts to the main area width (900 / 720 / 520 / 400px), including when the sidebar is collapsed.
