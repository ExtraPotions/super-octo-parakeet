# Releasing Theme Picker

Keep this boring and consistent.

## Before you tag

1. Bump `@version` on each changed site script and `COMMON_VERSION` / header Version in `theme-picker-common.js` when common changes.
2. Update the version table in `README.md`.
3. Add a short bullet under README “Changelog” for this release (details live on the GitHub Release).
4. `node --check` every changed `.js` file (especially after editing CSS inside quoted strings).

## Tag + assets

Tag format: `theme-picker-X.Y.Z`

Attach **all four** files every time (even unchanged), so `releases/latest/download/…` stays complete:

- `manapool-theme-picker.user.js`
- `scryfall-theme-picker.user.js`
- `steamgifts-theme-picker.user.js`
- `theme-picker-common.js`

Site scripts `@downloadURL` / `@updateURL` / `@require` already point at those latest-release URLs.

## After

Spot-check ManaPool, Scryfall, and SteamGifts: FAB opens, panel lays out normally, one theme toggle works.

Do **not** slim or rewrite the SteamGifts CSS blob unless explicitly requested — past attempts broke the theme.
