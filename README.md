# Grey Edition

Tampermonkey dark themes by **expDARE**, hosted in [ExtraPotions/super-octo-parakeet](https://github.com/ExtraPotions/super-octo-parakeet).

Shared helpers live in [`grey-edition-common.js`](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/grey-edition-common.js) (palette, `GM_*` settings storage, Tampermonkey menu toggles, document flags). Each userscript `@require`s that file — install any script and Tampermonkey will fetch the common module automatically.

## Install

| Script | Version | Install |
| --- | --- | --- |
| **ManaPool Grey Edition** | 1.6.1 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/manapool-grey-edition.user.js) |
| **Scryfall Grey Edition** | 1.6.1 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/scryfall-grey-edition.user.js) |
| **SteamGifts Grey Edition** | 1.7.1 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/steamgifts-grey-edition.user.js) |
| Grey Edition common (auto via `@require`) | 1.7.1 | [raw](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/grey-edition-common.js) |

Tampermonkey checks `@updateURL` on these raw files for updates.

## Versions

Current release: **1.6.0** (ManaPool/Scryfall/common); SteamGifts **1.7.0** (full SG Dark Grey restore).

## Changelog — 1.7.1

- **Shared FAB**: floating Grey Edition settings button at **bottom-right** on all sites; collapsed state shows the site favicon; expands into intensity / brighter links / hide ads / denser grid (ManaPool). Lives in `grey-edition-common.js`.
- ManaPool / Scryfall `1.6.1`, SteamGifts `1.7.1` (theme CSS unchanged from 1.7.0 restore).

## Changelog — 1.7.0

- **SteamGifts**: restored the full proven [SG Dark Grey](https://github.com/SquishedPotatoe/SG-Dark-Grey) CSS (SquishedPotatoe, CC-BY-SA-4.0) as SteamGifts Grey Edition. Lean 1.6.x rewrite retired — ESGST + SteamGifts compatibility matches the original again. Grey Edition `@require` menus still attach without altering that CSS.

## Changelog — 1.6.2

- **SteamGifts**: solid charcoal on `.page__outer-wrap` / inner wrap (fixes light `#f0f2f5` bleed from transparent wrappers). Stronger Enter/quick-entry green paint; locked inserts stay visible grey. Faded rows no longer use parent `opacity` (was washing Enter icons).

## Changelog — 1.6.1

- **SteamGifts**: Enter/quick-entry (`giveaway__quick-entry-btn--insert`) forced green again; remove = yellow, description = blue. Layout fixes — stop painting `.widget-container`, keep overflow visible on giveaway rows/quick-entry, drop hover `filter` that caused overlap/hidden UI.

## Changelog — 1.6.0

- **Shared `grey-edition-common.js`**: palette constants, `get`/`set` (`GM_getValue`/`GM_setValue` with `localStorage` `ge-` fallback), `applyDocumentFlags`, `registerMenus`, `rootCss` for soft intensity / brighter links / hide ads / dense grid.
- **ManaPool**: portal/sheet/drawer/toast theming; section scroll restore (`mpge-section-scroll-v1`); dense grid + hide-ads + soft intensity flags; keeps collapsible sections + collapse-all by avatar.
- **Scryfall**: durable CSS for tippy/tooltips, autocomplete, print galleries, card grids, reference blocks; honors brighter-links / intensity / hide-ads; darken pass kept as safety net.
- **SteamGifts**: lean CSS-only rewrite (~21KB, was ~309KB). Themes header/nav, featured/pinned, giveaway rows, sidebar, pagination, popups/lightbox, footer, deals/discussions, soft-themed `.hpsgck`/`.fanatical_container` (hideable). ESGST-safe dark panels; preserves enter green/yellow/red affordances. Matches steamgifts.com, steamtrades.com, sgtools.info.

## Notes

- Open Tampermonkey → script → “Grey Edition: …” menu commands to toggle intensity, brighter links, hide ads, and (ManaPool) denser grid.
- **SteamGifts Grey Edition** `1.7.0+` ships the full SG Dark Grey stylesheet (ESGST-tested). It coexists with [ESGST / A-ESGST](https://github.com/JustArchi/ESGST).
- SteamGifts theme is derived from / inspired by [SG Dark Grey](https://github.com/SquishedPotatoe/SG-Dark-Grey) by SquishedPotatoe, licensed [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/).
