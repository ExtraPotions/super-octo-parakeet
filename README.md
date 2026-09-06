# Theme Picker

Site themes + settings for **Mana Pool**, **Scryfall**, and **SteamGifts** by **expDARE**.

Palettes: Original · Light gray · Dark gray · Navy · Black — plus accent color, feature toggles, and a floating favicon settings button.

**License:** [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — attribution to expDARE required; **non-commercial** (do not profit from this work).

## Install

Works with **Violentmonkey** (preferred), **Tampermonkey**, or any userscript manager you like.

Install from the **latest GitHub Release** (those downloads are counted). `@downloadURL` / `@updateURL` / `@require` also point at release assets, so Violentmonkey/Tampermonkey **update checks count** toward the badges.

| Script | Version | Downloads | Install |
| --- | --- | ---: | --- |
| **ManaPool Theme Picker** | 2.0.3 | ![dl](https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/manapool-theme-picker.user.js/total?label=downloads) | [release](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/manapool-theme-picker.user.js) · [raw](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/manapool-theme-picker.user.js) |
| **Scryfall Theme Picker** | 2.0.6 | ![dl](https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/scryfall-theme-picker.user.js/total?label=downloads) | [release](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/scryfall-theme-picker.user.js) · [raw](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/scryfall-theme-picker.user.js) |
| **SteamGifts Theme Picker** | 2.0.3 | ![dl](https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/steamgifts-theme-picker.user.js/total?label=downloads) | [release](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/steamgifts-theme-picker.user.js) · [raw](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/steamgifts-theme-picker.user.js) |
| Theme Picker common (`@require`) | 1.14.4 | ![dl](https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/theme-picker-common.js/total?label=downloads) | [release](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/theme-picker-common.js) · [raw](https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/theme-picker-common.js) |

**Total release downloads:** ![total](https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/total?label=total%20downloads)

> Download badges count **GitHub Release asset** downloads — including first installs and manager update fetches via `releases/latest/download`. Raw `main` links still work but are **not** counted.


## Features

- **Theme** palettes + **Accent** color
- Floating **favicon button** (drag up/down on the right; **Alt+G** opens the menu)
- Theme-colored **switches** for options
- **Export / Import / Reset** settings
- ManaPool: collapse/expand sections, hide sold out, compact prices, denser grid, hide ads
- Scryfall: dim content warnings, gallery polish
- SteamGifts: hide entered/ended, soft-hide featured/pinned, high-contrast Enter (ESGST-compatible)

## Amazon Dark Pattern Blocker

Lives in **[ExtraPotions/velvet-crane-orbit](https://github.com/ExtraPotions/velvet-crane-orbit)** — [install](https://github.com/ExtraPotions/velvet-crane-orbit/releases/latest/download/amazon-dark-pattern-blocker.user.js).

## Changelog — 2.0.6

- **Scryfall panel**: remove `all: unset` on panel selects/inputs (that flattened the menu into a footer strip); keep FAB hardening; append FAB stylesheet last.
- Common `1.14.4`; Scryfall `2.0.6`.

## Changelog — 2.0.5

- **Scryfall**: fix syntax error in 2.0.4 (FAB protect CSS broke the userscript string).

## Changelog — 2.0.4

- **Scryfall**: harden settings FAB against sitewide `button` CSS; re-apply FAB styles after theme inject; isolate panel controls.
- Common `1.14.3`; Scryfall `2.0.4` (ManaPool/SteamGifts stay `2.0.3`).

## Changelog — 2.0.3

- Common version/toast drift fixed: single `COMMON_VERSION` (`1.14.2`) for API, panel footer, and update toast.
- Rebrand polish: Theme Picker `@description`s (no leftover “Dark charcoal”); CSS banners aligned.

## Changelog — 2.0.2

- `@downloadURL` / `@updateURL` / `@require` → GitHub Release assets (update checks counted).
- Common `1.14.2`; site scripts `2.0.2`.

## Changelog — 2.0.0

- Rebranded from Grey Edition to **Theme Picker** (more than gray palettes).
- README rebuilt; GitHub Release assets + download badges.
- Common `1.14.0`; site scripts `2.0.0`.

## Changelog — 1.9.2

- License set to **CC BY-NC 4.0** (attribution required; non-commercial).

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — Copyright (c) 2025–2026 **expDARE**. Attribution required. **Non-commercial** — do not profit from this work.
