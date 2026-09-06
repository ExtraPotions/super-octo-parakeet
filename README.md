# Theme Picker

Themes and settings for **Mana Pool**, **Scryfall**, and **SteamGifts** by **expDARE**.

Palettes: Original · Light gray · Dark gray · Navy · Black — plus accent color, feature toggles, and a floating favicon settings button (**Alt+G** / **Esc**).

**License:** [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — attribution to expDARE required; non-commercial.

## Install

Use [Violentmonkey](https://violentmonkey.github.io/) (preferred) or Tampermonkey. Install from the **[latest release](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest)** so updates count toward the download badges.

| Script | Version | Install |
| --- | --- | --- |
| **ManaPool Theme Picker** | 2.0.7 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/manapool-theme-picker.user.js) |
| **Scryfall Theme Picker** | 2.0.7 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/scryfall-theme-picker.user.js) |
| **SteamGifts Theme Picker** | 2.0.3 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/steamgifts-theme-picker.user.js) |
| Theme Picker common (`@require`) | 1.14.6 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/theme-picker-common.js) |

![total downloads](https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/total?label=total%20downloads)

## Features

- Theme palettes + accent color
- Floating favicon settings button (drag up/down; **Alt+G** opens, **Esc** closes)
- Export / Import / Reset
- **ManaPool:** collapse home sections, hide sold out, compact prices, denser grid, hide ads
- **Scryfall:** dim content warnings, gallery polish
- **SteamGifts:** hide entered/ended, soft-hide featured/pinned, high-contrast Enter (ESGST-compatible)

## Changelog

See [GitHub Releases](https://github.com/ExtraPotions/super-octo-parakeet/releases) for full notes.

### 2.0.8

- Common: remove `all: unset` from the settings panel (was still flattening Scryfall); column flex layout
- Scryfall: panel open uses `display: flex` column
- Common `1.14.6` · Scryfall `2.0.7`

### 2.0.7

- Cleaner README + release checklist
- Common: **Esc** closes the settings panel; panel stylesheet always last
- ManaPool: re-assert FAB styles after theme inject; discover extra home sections beyond the hard-coded list
- Common `1.14.5` · ManaPool `2.0.7`

### 2.0.6

- Scryfall panel layout fix (`all: unset` on selects had flattened the menu)
- Common `1.14.4` · Scryfall `2.0.6`
