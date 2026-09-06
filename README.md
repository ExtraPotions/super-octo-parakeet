# Theme Picker

<p align="center">
  Theme palettes and settings for <strong>Mana Pool</strong> and <strong>SteamGifts</strong> (plus a frozen Scryfall build still in the repo).
</p>

<p align="center">
  Palettes, accent color, feature toggles, and a floating favicon settings button (<strong>Alt+G</strong> / <strong>Esc</strong>).
</p>

<p align="center">
  <a href="https://github.com/ExtraPotions/super-octo-parakeet/releases/latest"><img alt="Release" src="https://img.shields.io/github/v/release/ExtraPotions/super-octo-parakeet?style=flat-square&label=release" /></a>
  <a href="https://github.com/ExtraPotions/super-octo-parakeet/releases"><img alt="Downloads" src="https://img.shields.io/github/downloads/ExtraPotions/super-octo-parakeet/total?style=flat-square" /></a>
  <a href="https://github.com/ExtraPotions/super-octo-parakeet/stargazers"><img alt="Stars" src="https://img.shields.io/github/stars/ExtraPotions/super-octo-parakeet?style=flat-square" /></a>
  <a href="https://github.com/ExtraPotions/super-octo-parakeet/network/members"><img alt="Forks" src="https://img.shields.io/github/forks/ExtraPotions/super-octo-parakeet?style=flat-square" /></a>
  <a href="https://github.com/ExtraPotions/super-octo-parakeet/issues"><img alt="Issues" src="https://img.shields.io/github/issues/ExtraPotions/super-octo-parakeet?style=flat-square" /></a>
  <a href="https://creativecommons.org/licenses/by-nc/4.0/"><img alt="License: CC BY-NC 4.0" src="https://img.shields.io/badge/license-CC%20BY--NC%204.0-lightgrey?style=flat-square" /></a>
</p>

**Author:** [expDARE](https://github.com/ExtraPotions) · **Latest:** [theme-picker-2.0.9](https://github.com/ExtraPotions/super-octo-parakeet/releases/tag/theme-picker-2.0.9)

| Stat | Value |
|------|-------|
| Active sites | **Mana Pool**, **SteamGifts** |
| Frozen in repo | **Scryfall** (shipped; not maintained) |
| Shared helper | `theme-picker-common.js` (`@require`) |
| Palettes | Original · Light gray · Dark gray · Navy · Black |
| Shortcuts | **Alt+G** toggle · **Esc** close |
| License | [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) |

## Install

1. Install [Violentmonkey](https://violentmonkey.github.io/) (preferred) or [Tampermonkey](https://www.tampermonkey.net/).
2. Open the [latest release](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest) and download the scripts you need (install from the release so download badges count).
3. Open each `.user.js` (or drag into the extension dashboard) and save.
4. Visit the site — the favicon button appears on the right edge.

| Script | Version (in 2.0.9) | Install |
| --- | --- | --- |
| **ManaPool Theme Picker** | 2.0.7 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/manapool-theme-picker.user.js) |
| **SteamGifts Theme Picker** | 2.0.3 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/steamgifts-theme-picker.user.js) |
| Theme Picker common (`@require`) | 1.14.7 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/theme-picker-common.js) |
| Scryfall Theme Picker (frozen) | 2.0.7 | [download](https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/scryfall-theme-picker.user.js) |

Each site script `@require`s `theme-picker-common.js` from the same latest-release URL. Update **common** whenever you update a site script.

## Features

**Shared**

- Theme palettes + accent color  
- Floating favicon settings button (drag up/down; **Alt+G** / **Esc**)  
- Export / Import / Reset  

**ManaPool**

- Collapse home sections (including extra shelves beyond the hard-coded list)  
- Hide sold out · compact prices · denser grid · hide ads  

**SteamGifts**

- Hide entered / ended  
- Soft-hide featured / pinned  
- High-contrast Enter (ESGST-compatible)  

**Scryfall (frozen)**

- Still available from releases for existing users  
- No further fixes or polish planned  

## License

[CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — attribution to **expDARE** required; non-commercial. Full text in [`LICENSE`](LICENSE).

## Changelog

See [GitHub Releases](https://github.com/ExtraPotions/super-octo-parakeet/releases) for downloadable builds and notes.

Recent tags:

- **theme-picker-2.0.9** — common `1.14.7`: settings FAB **48×48**
- **theme-picker-2.0.8** — common `1.14.6` panel layout hardening; Scryfall `2.0.7`  
- **theme-picker-2.0.7** — Esc closes panel; ManaPool section discovery; README/release checklist  
- **theme-picker-2.0.6** — Scryfall panel select/`all: unset` layout fix  
