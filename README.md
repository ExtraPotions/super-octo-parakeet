# Grey Edition

Tampermonkey dark themes by **expDARE**, hosted in [ExtraPotions/super-octo-parakeet](https://github.com/ExtraPotions/super-octo-parakeet).

Shared helpers live in [`grey-edition-common.js`](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/grey-edition-common.js) (palette, `GM_*` settings storage, Tampermonkey menu toggles, document flags). Each userscript `@require`s that file — install any script and Tampermonkey will fetch the common module automatically.

## Install

| Script | Version | Install |
| --- | --- | --- |
| **ManaPool Grey Edition** | 1.7.0 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/manapool-grey-edition.user.js) |
| **Scryfall Grey Edition** | 1.7.0 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/scryfall-grey-edition.user.js) |
| **SteamGifts Grey Edition** | 1.8.0 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/steamgifts-grey-edition.user.js) |
| Grey Edition common (auto via `@require`) | 1.10.0 | [raw](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/grey-edition-common.js) |
| **Amazon Dark Pattern Blocker** | 0.1.18 | [raw install](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/amazon-dark-pattern-blocker.user.js) |

Tampermonkey checks `@updateURL` on these raw files for updates.

## Versions

Current release: ManaPool/Scryfall **1.7.0**, SteamGifts **1.8.0**, common **1.10.0**, Amazon Dark Pattern Blocker **0.1.18**.

## Changelog — amazon-dpb 0.1.15

- **Fix**: homepage persistent cart rail (EWC) blank column — homepage no longer runs the full prime/clutter remover; CSS hide rules exclude `#nav-flyout-ewc` / attach / checkout rails and their descendants.

## Changelog — amazon-dpb 0.1.14

- **Fix**: drop `display: revert !important` cart “force-show” (it kept Amazon’s cart/ewc rail hidden). Expand DOM-remove guards for `/cart` right column (`#proceed-to-checkout-desktop-container`, `#sc-buy-box-panel`). Stop touching `#sc-primeupsell-widget` in that rail.

## Changelog — amazon-dpb 0.1.13

- **Fix**: right-side cart rail — stop broad protection-plan selectors and `#sw-maple` hides; force-show ewc / smart-wagon / sc-buy-box / attach cart containers; never DOM-remove nodes inside those rails.

## Changelog — amazon-dpb 0.1.12

- **Fix**: keep the right-side cart / “Added to Cart” flyout — no longer hide `#attach-desktop-sideSheet` (that was bundled under protection plans).

## Changelog — amazon-dpb 0.1.11

- **Fix**: homepage no longer wiped — removed `#desktop-banner` and `#gwm-window-layout` / `gwm-Deck` removals; “Remove homepage clutter” defaults off and is force-reset once for existing installs.

## Changelog — amazon-dpb 0.1.10

- Added **Amazon Dark Pattern Blocker** fork (`0.1.10`) from August4067 MIT Greasy Fork script; `amazon.com` only; raw install from this repo.

## Changelog — 1.10.0

- **Theme palettes**: choose **Original** (site default), **Light gray**, **Dark gray** (default Grey Edition charcoal), **Navy**, or **Black** from the floating settings button or Violentmonkey menu. Shared across ManaPool / Scryfall / SteamGifts via `grey-edition-common.js`.
- ManaPool / Scryfall `1.7.0`, SteamGifts `1.8.0`, common `1.10.0`.

## Changelog — 1.9.2

- **Floating favicon button**: settings control is a free-floating circle (bottom-right), not a full-height side rail — matches FL Tools dock-show. Panel opens above the button.
- ManaPool / Scryfall `1.6.4`, SteamGifts `1.7.4`, common `1.9.2`, Amazon DPB `0.1.18`.

## Changelog — 1.9.1

- **Settings rail theming**: button/rail/panel match each site’s dark chrome + favicon accent (ManaPool NM blue, Scryfall link blue, SteamGifts nav blue, Amazon navy/orange) — same idea as the FL Tools dock.
- ManaPool / Scryfall `1.6.3`, SteamGifts `1.7.3`, common `1.9.1`, Amazon DPB `0.1.17`.

## Changelog — 1.9.0

- **Settings rail**: all Grey Edition sites use a **right-edge vertical rail** with the site favicon; click to open settings (replaces bottom-right FAB). Works in Violentmonkey and Tampermonkey.
- ManaPool / Scryfall `1.6.2`, SteamGifts `1.7.2`, common `1.9.0`.
- **Amazon Dark Pattern Blocker** `0.1.16`: same right-edge favicon settings rail for its toggles.

## Changelog — 1.8.1

- **Removed** Amazon, eBay, and SoFi Grey Edition (themes weren’t holding up on those sites). ManaPool / Scryfall / SteamGifts unchanged. Common `1.8.1` drops their FAB site entries.

## Changelog — 1.5.1 (Amazon / eBay) — withdrawn

- **Amazon / eBay**: harder chrome pass — header/nav, My Garage / light hero strips, card wrappers, watch-heart circles; broader near-white surface darken. Opaque product JPEG white plates cannot be made transparent.
- Versions: Amazon & eBay `1.5.1` (SoFi still `1.5.0`).

## Changelog — 1.8.0

- Briefly added Amazon / eBay / SoFi Grey Edition (later withdrawn in `1.8.1`).

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

- Use the **floating bottom-right favicon settings button**, or Violentmonkey/Tampermonkey → script menu, to toggle Grey Edition options (intensity, brighter links, hide ads, ManaPool denser grid) and Amazon Dark Pattern Blocker toggles.
- **SteamGifts Grey Edition** `1.7.0+` ships the full SG Dark Grey stylesheet (ESGST-tested). It coexists with [ESGST / A-ESGST](https://github.com/JustArchi/ESGST).
- SteamGifts theme is derived from / inspired by [SG Dark Grey](https://github.com/SquishedPotatoe/SG-Dark-Grey) by SquishedPotatoe, licensed [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/).

## Amazon Dark Pattern Blocker

Fork of [Amazon Dark Pattern Blocker](https://greasyfork.org/en/scripts/563061-amazon-dark-pattern-blocker) by **August4067** (MIT). Hosted here under **expDARE** with `@match` limited to `amazon.com` / `www.amazon.com`.

Original copyright and MIT license are retained in the script file. Tampermonkey menu toggles (Prime upsells, urgency, Subscribe & Save, sponsored, credit cards, Rufus, Music promos) work the same as upstream `0.1.10-alpha`.
