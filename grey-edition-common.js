/**
 * Grey Edition common helpers (Tampermonkey @require)
 * Version: 1.13.0
 * Author: expDARE
 * License: CC-BY-NC-4.0
 * Homepage: https://github.com/ExtraPotions/super-octo-parakeet
 *
 * Shared palette + settings for ManaPool / Scryfall / SteamGifts Grey Edition.
 * 1.9.0: right-edge vertical favicon settings rail (Violentmonkey/Tampermonkey).
 * 1.9.1: rail/button themed to each site (dark chrome + favicon accent).
 * 1.9.2: floating circular favicon button (no full-height rail strip).
 * 1.10.0: theme palette picker — original / light gray / dark gray / navy / black.
 * 1.11.0: vertical-only FAB drag (right edge); ManaPool collapse/expand in panel; harden FAB vs site button CSS.
 * 1.12.0: larger FAB; ManaPool/Scryfall Original skips all theme overrides.
 * 1.13.0: accent picker, export/import/reset, Alt+G, update toast, site feature toggles, theme-colored switches.
 * Not a userscript — load via // @require from each Grey Edition script.
 */
(function (global) {
  'use strict';

  var PREFIX = 'ge-';
  var RAIL_ID = 'grey-edition-settings-rail';
  var FAB_ID = 'grey-edition-fab';
  var siteActions = {};
  var PANEL_ID = 'grey-edition-fab-panel';
  var STYLE_ID = 'grey-edition-fab-style';

  var SITE_ICONS = {
    manapool: 'https://manapool.com/favicon.svg',
    scryfall: 'https://scryfall.com/favicon.ico',
    steamgifts: 'https://cdn.steamgifts.com/img/favicon.ico'
  };

  var SITE_TITLES = {
    manapool: 'ManaPool',
    scryfall: 'Scryfall',
    steamgifts: 'SteamGifts'
  };

  /* Rail chrome matches site dark UI; accent ≈ favicon / brand chip color. */
  var SITE_THEMES = {
    manapool: {
      railBg: 'rgba(28,28,26,0.94)',
      btnBg: '#111111',
      btnBgHover: '#1a1a1a',
      accent: '#5eb0ef',
      accentSoft: 'rgba(94,176,239,0.28)',
      text: 'rgba(204,204,204,0.95)',
      panelBg: '#2a2a28',
      panelBorder: 'rgba(0,0,0,0.75)',
      title: '#8f9fb3',
      muted: '#788087'
    },
    scryfall: {
      railBg: 'rgba(28,28,26,0.94)',
      btnBg: '#111111',
      btnBgHover: '#1a1a1a',
      accent: '#7ec8f0',
      accentSoft: 'rgba(126,200,240,0.28)',
      text: 'rgba(204,204,204,0.95)',
      panelBg: '#2a2a28',
      panelBorder: 'rgba(0,0,0,0.75)',
      title: '#a8b8cc',
      muted: '#788087'
    },
    steamgifts: {
      railBg: 'rgba(33,43,54,0.96)',
      btnBg: '#1c1c1a',
      btnBgHover: '#2e3d4d',
      accent: '#7ec8f0',
      accentSoft: 'rgba(126,200,240,0.25)',
      text: 'rgba(204,204,204,0.95)',
      panelBg: '#2a2a28',
      panelBorder: 'rgba(0,0,0,0.75)',
      title: '#8f9fb3',
      muted: '#788087'
    },
    default: {
      railBg: 'rgba(28,28,26,0.94)',
      btnBg: '#111111',
      btnBgHover: '#1a1a1a',
      accent: '#aeaeae',
      accentSoft: 'rgba(174,174,174,0.25)',
      text: 'rgba(204,204,204,0.95)',
      panelBg: '#2a2a28',
      panelBorder: 'rgba(0,0,0,0.75)',
      title: '#8f9fb3',
      muted: '#788087'
    }
  };

  var palette = {
    body: '#252522',
    bodySoft: '#2c2c29',
    surface: '#2a2a28',
    surfaceSoft: '#32322e',
    header: '#1c1c1a',
    muted: '#333333',
    mutedAlt: '#333',
    text: 'rgba(166,166,166,0.95)',
    textBright: 'rgba(204,204,204,0.95)',
    link: '#7ec8f0',
    linkAlt: '#629fc0',
    linkHover: '#a8dff8',
    nmBlue: '#5eb0ef',
    priceGreen: '#16a34a',
    chipGray: '#aeaeae',
    deepGreen: '#045206',
    secondary: '#788087',
    headings: '#8f9fb3',
    border: 'rgba(0,0,0,0.7)',
    enterGreenBg: 'linear-gradient(#5a7740 0%, #283e18 100%)',
    enterGreenText: 'rgba(201,227,181,0.9)',
    enterYellowBg: 'linear-gradient(#85891a 0%, #575a02 100%)',
    enterYellowText: 'rgba(218,220,163,0.95)',
    enterRedBg: 'linear-gradient(#a54040 0%, #6a1010 100%)',
    enterRedText: '#efa9a9',
    navButtonBg: 'linear-gradient(#39576f 0%, #273d4f 100%)',
    headerFooterBg: 'linear-gradient(#2e3d4d 0%, #212b36 100%)'
  };

  function storageKey(key) {
    return PREFIX + key;
  }

  function get(key, def) {
    try {
      if (typeof GM_getValue === 'function') {
        var v = GM_getValue(key, def);
        return v === undefined ? def : v;
      }
    } catch (e) {}
    try {
      var raw = localStorage.getItem(storageKey(key));
      if (raw === null || raw === undefined) return def;
      try {
        return JSON.parse(raw);
      } catch (e2) {
        return raw;
      }
    } catch (e3) {
      return def;
    }
  }

  function set(key, val) {
    try {
      if (typeof GM_setValue === 'function') {
        GM_setValue(key, val);
        return;
      }
    } catch (e) {}
    try {
      localStorage.setItem(storageKey(key), JSON.stringify(val));
    } catch (e2) {}
  }

  function bool01(v) {
    return v === true || v === 1 || v === '1' ? '1' : '0';
  }


  var ACCENTS = {
    site: { label: 'Site default', color: null },
    blue: { label: 'Blue', color: '#5eb0ef' },
    green: { label: 'Green', color: '#16a34a' },
    amber: { label: 'Amber', color: '#f0c14b' },
    violet: { label: 'Violet', color: '#b57aef' },
    rose: { label: 'Rose', color: '#f5b0c8' }
  };

  function normalizeAccent(a) {
    return (a && ACCENTS[a]) ? a : 'site';
  }

  function resolveAccent(site) {
    var a = normalizeAccent(get('accent', 'site'));
    if (a !== 'site') return ACCENTS[a].color;
    return (SITE_THEMES[site] || SITE_THEMES.default).accent;
  }

  var SETTINGS_DEFAULTS = {
    palette: 'darkGray',
    intensity: 'normal',
    accent: 'site',
    brighterLinks: false,
    hideAds: false,
    dense: false,
    hideSoldOut: false,
    compactPrices: false,
    alwaysChips: false,
    dimWarnings: false,
    hideEntered: false,
    hideEnded: false,
    softHideFeatured: false,
    highContrastEnter: false
  };

  var PALETTES = {
    original: { label: 'Original', body: null, surface: null, header: null },
    lightGray: { label: 'Light gray', body: '#3f3f3c', surface: '#4a4a46', header: '#333330' },
    darkGray: { label: 'Dark gray', body: '#252522', surface: '#2a2a28', header: '#1c1c1a' },
    navy: { label: 'Navy', body: '#1a2332', surface: '#243044', header: '#141c28' },
    black: { label: 'Black', body: '#0a0a0a', surface: '#111111', header: '#050505' }
  };

  function normalizePalette(p) {
    if (p && PALETTES[p]) return p;
    // Migrate old soft intensity → lightGray
    if (get('intensity', 'normal') === 'soft') return 'lightGray';
    return 'darkGray';
  }

  function applyDocumentFlags(site) {
    var root = document.documentElement;
    if (!root) return;
    var intensity = get('intensity', 'normal');
    if (intensity !== 'soft') intensity = 'normal';
    var palette = normalizePalette(get('palette', 'darkGray'));
    var accent = normalizeAccent(get('accent', 'site'));
    root.setAttribute('data-ge-site', site || '');
    root.setAttribute('data-ge-intensity', intensity);
    root.setAttribute('data-ge-palette', palette);
    root.setAttribute('data-ge-accent', accent);
    root.setAttribute('data-ge-brighter-links', bool01(get('brighterLinks', false)));
    root.setAttribute('data-ge-hide-ads', bool01(get('hideAds', false)));
    root.setAttribute('data-ge-dense', bool01(get('dense', false)));
    root.setAttribute('data-ge-hide-sold-out', bool01(get('hideSoldOut', false)));
    root.setAttribute('data-ge-compact-prices', bool01(get('compactPrices', false)));
    root.setAttribute('data-ge-always-chips', bool01(get('alwaysChips', false)));
    root.setAttribute('data-ge-dim-warnings', bool01(get('dimWarnings', false)));
    root.setAttribute('data-ge-hide-entered', bool01(get('hideEntered', false)));
    root.setAttribute('data-ge-hide-ended', bool01(get('hideEnded', false)));
    root.setAttribute('data-ge-soft-hide-featured', bool01(get('softHideFeatured', false)));
    root.setAttribute('data-ge-hc-enter', bool01(get('highContrastEnter', false)));
    var accentColor = resolveAccent(site);
    root.style.setProperty('--ge-accent', accentColor);
  }

  function isThemeEnabled() {
    return normalizePalette(get('palette', 'darkGray')) !== 'original';
  }

  function registerMenus(site) {
    applyDocumentFlags(site);
    if (typeof GM_registerMenuCommand !== 'function') return;

    var order = ['original', 'lightGray', 'darkGray', 'navy', 'black'];
    var cur = normalizePalette(get('palette', 'darkGray'));
    var next = order[(order.indexOf(cur) + 1) % order.length];
    GM_registerMenuCommand(
      'Grey Edition: Palette → ' + (PALETTES[next] && PALETTES[next].label || next),
      function () {
        var order2 = ['original', 'lightGray', 'darkGray', 'navy', 'black'];
        var cur2 = normalizePalette(get('palette', 'darkGray'));
        var next2 = order2[(order2.indexOf(cur2) + 1) % order2.length];
        if (next2 === 'lightGray') set('intensity', 'soft');
        else if (next2 !== 'original') set('intensity', 'normal');
        set('palette', next2);
        applyDocumentFlags(site);
        try { location.reload(); } catch (e) {}
      }
    );

    GM_registerMenuCommand(
      get('brighterLinks', false) ? 'Grey Edition: Brighter links OFF' : 'Grey Edition: Brighter links ON',
      function () {
        set('brighterLinks', !get('brighterLinks', false));
        applyDocumentFlags(site);
        try { location.reload(); } catch (e) {}
      }
    );

    GM_registerMenuCommand(
      get('hideAds', false) ? 'Grey Edition: Hide ads OFF' : 'Grey Edition: Hide ads ON',
      function () {
        set('hideAds', !get('hideAds', false));
        applyDocumentFlags(site);
        try { location.reload(); } catch (e) {}
      }
    );

    if (site === 'manapool') {
      GM_registerMenuCommand(
        get('dense', false) ? 'Grey Edition: Denser grid OFF' : 'Grey Edition: Denser grid ON',
        function () {
          set('dense', !get('dense', false));
          applyDocumentFlags(site);
          try { location.reload(); } catch (e) {}
        }
      );
    }
  }

  function rootCss() {
    return [
      '/* Grey Edition common root flags CSS v1.13.0 */',
      'html[data-ge-intensity="soft"],',
      'html[data-ge-intensity="soft"] body {',
      '  background-color: ' + palette.bodySoft + ' !important;',
      '}',
      'html[data-ge-intensity="soft"] {',
      '  --ge-body: ' + palette.bodySoft + ';',
      '  --ge-surface: ' + palette.surfaceSoft + ';',
      '}',
      'html[data-ge-brighter-links="1"] a,',
      'html[data-ge-brighter-links="1"] a:link {',
      '  color: ' + palette.link + ' !important;',
      '}',
      'html[data-ge-brighter-links="1"] a:hover,',
      'html[data-ge-brighter-links="1"] a:focus {',
      '  color: ' + palette.linkHover + ' !important;',
      '}',
      'html[data-ge-hide-ads="1"] .hpsgck,',
      'html[data-ge-hide-ads="1"] .fanatical_container,',
      'html[data-ge-hide-ads="1"] [class*="ad-"],',
      'html[data-ge-hide-ads="1"] [class*="ads-"],',
      'html[data-ge-hide-ads="1"] [id*="google_ads"],',
      'html[data-ge-hide-ads="1"] .adsbygoogle,',
      'html[data-ge-hide-ads="1"] [data-ad],',
      'html[data-ge-hide-ads="1"] .promo-banner,',
      'html[data-ge-hide-ads="1"] .sponsored,',
      'html[data-ge-hide-ads="1"] .bot-marketing-panel {',
      '  display: none !important;',
      '}',
      'html[data-ge-dense="1"] ul.grid,',
      'html[data-ge-dense="1"] .grid {',
      '  gap: 0.5rem !important;',
      '}',
      'html[data-ge-dense="1"] article.bg-white,',
      'html[data-ge-dense="1"] .group.bg-white,',
      'html[data-ge-dense="1"] li article {',
      '  margin: 0 !important;',
      '}'
    ].join('\n');
  }



  function featureCss() {
    return [
      '/* Grey Edition feature flags v1.13.0 */',
      /* ManaPool */
      'html[data-ge-hide-sold-out="1"] [data-mpge-sold-out="1"] { display: none !important; }',
      'html[data-ge-compact-prices="1"] .text-green-700,',
      'html[data-ge-compact-prices="1"] .text-xl.font-bold { font-size: 0.95rem !important; line-height: 1.2 !important; }',
      'html[data-ge-always-chips="1"] .mt-2.w-full.rounded-b-lg.bg-gray-50,',
      'html[data-ge-always-chips="1"] .rounded-b-lg.bg-gray-50,',
      'html[data-ge-always-chips="1"] .inline-flex.items-center.border { opacity: 1 !important; visibility: visible !important; }',
      /* Scryfall */
      'html[data-ge-dim-warnings="1"] .card-content-warning {',
      '  opacity: 0.4 !important; filter: grayscale(0.55) !important; max-height: 3.5rem !important; overflow: hidden !important;',
      '}',
      'html[data-ge-dim-warnings="1"] .card-content-warning:hover { opacity: 1 !important; filter: none !important; max-height: none !important; }',
      '.print-gallery, .prints, .current-prints, .card-grid, .set, .set-details {',
      '  /* gallery polish when theme on — reinforced charcoal surfaces */',
      '}',
      'html[data-ge-palette]:not([data-ge-palette="original"]) .print-gallery,',
      'html[data-ge-palette]:not([data-ge-palette="original"]) .prints-table,',
      'html[data-ge-palette]:not([data-ge-palette="original"]) .set-details,',
      'html[data-ge-palette]:not([data-ge-palette="original"]) .card-grid-header {',
      '  background-color: var(--ge-surface, #2a2a28) !important;',
      '  border-color: rgba(0,0,0,0.45) !important;',
      '}',
      /* SteamGifts */
      'html[data-ge-hide-entered="1"] .giveaway__row-outer-wrap:has(.giveaway__row-inner-wrap.is-faded),',
      'html[data-ge-hide-entered="1"] .giveaway__row-outer-wrap:has(.esgst-faded),',
      'html[data-ge-hide-entered="1"] .giveaway-gridview .faded { display: none !important; }',
      'html[data-ge-hide-ended="1"] .giveaway__row-outer-wrap:has(.giveaway__column--width-fill span[title*="Ended"]),',
      'html[data-ge-hide-ended="1"] .giveaway__row-outer-wrap:has(.fa-times-circle),',
      'html[data-ge-hide-ended="1"] .giveaway__row-outer-wrap[data-ge-ended="1"] { display: none !important; }',
      'html[data-ge-soft-hide-featured="1"] .featured__container,',
      'html[data-ge-soft-hide-featured="1"] .pinned-giveaways {',
      '  opacity: 0.32 !important; max-height: 52px !important; overflow: hidden !important; transition: opacity .15s ease, max-height .2s ease !important;',
      '}',
      'html[data-ge-soft-hide-featured="1"] .featured__container:hover,',
      'html[data-ge-soft-hide-featured="1"] .featured__container:focus-within,',
      'html[data-ge-soft-hide-featured="1"] .pinned-giveaways:hover {',
      '  opacity: 1 !important; max-height: 2000px !important;',
      '}',
      'html[data-ge-hc-enter="1"] .sidebar__entry-insert,',
      'html[data-ge-hc-enter="1"] .giveaway__quick-entry-btn--insert,',
      'html[data-ge-hc-enter="1"] a.giveaway__quick-entry-btn--insert {',
      '  background: #00c853 !important; background-image: none !important;',
      '  box-shadow: 0 0 0 2px rgba(255,255,255,0.85), 0 0 14px rgba(0,200,83,0.65) !important;',
      '  filter: saturate(1.35) !important;',
      '}',
      /* update toast */
      '#grey-edition-update-toast {',
      '  position: fixed !important; right: 12px !important; bottom: 76px !important; z-index: 2147483002 !important;',
      '  max-width: 280px !important; padding: 10px 12px !important; border-radius: 10px !important;',
      '  background: #1c1c1a !important; color: #e8e8e0 !important; border: 1px solid var(--ge-accent, #aeaeae) !important;',
      '  font: 12px/1.35 system-ui, sans-serif !important; box-shadow: 0 8px 24px rgba(0,0,0,.45) !important;',
      '}'
    ].join('\n');
  }

  function paletteCss() {
    var p = normalizePalette(get('palette', 'darkGray'));
    if (p === 'original') {
      return '/* Grey Edition palette: original (site default — theme CSS suppressed by host script) */';
    }
    var t = PALETTES[p];
    // darkGray matches each script's baked-in charcoal — no remaps needed
    if (p === 'darkGray') {
      return [
        '/* Grey Edition palette: darkGray (default) */',
        'html[data-ge-palette="darkGray"] {',
        '  --ge-body: ' + t.body + ';',
        '  --ge-surface: ' + t.surface + ';',
        '  --ge-header: ' + t.header + ';',
        '}'
      ].join('\n');
    }
    return [
      '/* Grey Edition palette: ' + p + ' */',
      'html[data-ge-palette="' + p + '"] {',
      '  --ge-body: ' + t.body + ';',
      '  --ge-surface: ' + t.surface + ';',
      '  --ge-header: ' + t.header + ';',
      '  --background: 0 0% 10% !important;',
      '  color-scheme: dark !important;',
      '}',
      'html[data-ge-palette="' + p + '"],',
      'html[data-ge-palette="' + p + '"] body,',
      'html[data-ge-palette="' + p + '"] .app,',
      'html[data-ge-palette="' + p + '"] #app,',
      'html[data-ge-palette="' + p + '"] #main,',
      'html[data-ge-palette="' + p + '"] .page__outer,',
      'html[data-ge-palette="' + p + '"] .page__inner {',
      '  background-color: ' + t.body + ' !important;',
      '  background-image: none !important;',
      '}',
      'html[data-ge-palette="' + p + '"] header,',
      'html[data-ge-palette="' + p + '"] .header,',
      'html[data-ge-palette="' + p + '"] #header,',
      'html[data-ge-palette="' + p + '"] nav.header,',
      'html[data-ge-palette="' + p + '"] .nav__header {',
      '  background-color: ' + t.header + ' !important;',
      '  background-image: none !important;',
      '}',
      'html[data-ge-palette="' + p + '"] .bg-white,',
      'html[data-ge-palette="' + p + '"] .bg-gray-50,',
      'html[data-ge-palette="' + p + '"] .bg-gray-100,',
      'html[data-ge-palette="' + p + '"] article,',
      'html[data-ge-palette="' + p + '"] .card,',
      'html[data-ge-palette="' + p + '"] .sidebar,',
      'html[data-ge-palette="' + p + '"] .widget-container,',
      'html[data-ge-palette="' + p + '"] .giveaway__row-outer-wrap,',
      'html[data-ge-palette="' + p + '"] .table__row-outer-wrap,',
      'html[data-ge-palette="' + p + '"] .page__heading,',
      'html[data-ge-palette="' + p + '"] .card-profile,',
      'html[data-ge-palette="' + p + '"] .card-text,',
      'html[data-ge-palette="' + p + '"] .toolbox,',
      'html[data-ge-palette="' + p + '"] .buybox,',
      'html[data-ge-palette="' + p + '"] .prints,',
      'html[data-ge-palette="' + p + '"] [data-popover-content],',
      'html[data-ge-palette="' + p + '"] [role="dialog"],',
      'html[data-ge-palette="' + p + '"] [role="menu"] {',
      '  background-color: ' + t.surface + ' !important;',
      '  background-image: none !important;',
      '}'
    ].join('\n');
  }

  function themeFor(site) {
    var base = SITE_THEMES[site] || SITE_THEMES.default;
    var accent = resolveAccent(site);
    return {
      railBg: base.railBg,
      btnBg: base.btnBg,
      btnBgHover: base.btnBgHover,
      accent: accent,
      accentSoft: 'rgba(0,0,0,0.2)',
      text: base.text,
      panelBg: base.panelBg,
      panelBorder: base.panelBorder,
      title: base.title,
      muted: base.muted
    };
  }

  function fabCss() {
    return [
      '#' + FAB_ID + ', #' + PANEL_ID + ', #' + FAB_ID + ' * { box-sizing: border-box; }',
      'html body button#' + FAB_ID + ',',
      '#' + FAB_ID + ' {',
      '  all: unset !important;',
      '  position: fixed !important;',
      '  right: 12px !important;',
      '  left: auto !important;',
      '  z-index: 2147483000 !important;',
      '  width: 52px !important;',
      '  height: 52px !important;',
      '  min-width: 52px !important;',
      '  min-height: 52px !important;',
      '  max-width: 52px !important;',
      '  max-height: 52px !important;',
      '  border-radius: 999px !important;',
      '  border: 1px solid var(--ge-rail-accent, #aeaeae) !important;',
      '  background: var(--ge-rail-btn-bg, #111111) !important;',
      '  background-image: none !important;',
      '  color: var(--ge-rail-accent, #aeaeae) !important;',
      '  box-shadow: 0 2px 10px rgba(0,0,0,.4), 0 0 0 1px var(--ge-rail-accent-soft, transparent) !important;',
      '  cursor: grab !important;',
      '  padding: 0 !important;',
      '  margin: 0 !important;',
      '  display: inline-flex !important;',
      '  align-items: center !important;',
      '  justify-content: center !important;',
      '  overflow: hidden !important;',
      '  touch-action: none !important;',
      '  user-select: none !important;',
      '  -webkit-user-select: none !important;',
      '  appearance: none !important;',
      '  -webkit-appearance: none !important;',
      '  filter: none !important;',
      '  opacity: 1 !important;',
      '  pointer-events: auto !important;',
      '  transition: background .15s ease, border-color .15s ease !important;',
      '}',
      '#' + FAB_ID + '.ge-dragging { cursor: grabbing !important; }',
      '#' + FAB_ID + ':hover {',
      '  background: var(--ge-rail-btn-hover, #1a1a1a) !important;',
      '  border-color: var(--ge-rail-accent, #aeaeae) !important;',
      '}',
      '#' + FAB_ID + ' img {',
      '  width: 28px !important;',
      '  height: 28px !important;',
      '  object-fit: contain !important;',
      '  display: block !important;',
      '  pointer-events: none !important;',
      '}',
      '#' + PANEL_ID + ', html body #' + PANEL_ID + ' {',
      '  all: unset !important;',
      '  position: fixed !important;',
      '  right: 12px !important;',
      '  left: auto !important;',
      '  bottom: auto !important;',
      '  top: auto !important;',
      '  transform: none !important;',
      '  box-sizing: border-box !important;',
      '  z-index: 2147483001 !important;',
      '  width: 270px !important;',
      '  max-width: calc(100vw - 24px) !important;',
      '  max-height: calc(100vh - 96px) !important;',
      '  overflow: auto !important;',
      '  background: var(--ge-rail-panel-bg, #2a2a28) !important;',
      '  color: var(--ge-rail-text, rgba(204,204,204,0.95)) !important;',
      '  border: 1px solid var(--ge-rail-panel-border, rgba(0,0,0,0.75)) !important;',
      '  border-radius: 12px !important;',
      '  box-shadow: 0 10px 28px rgba(0,0,0,0.5), 0 0 0 1px var(--ge-rail-accent-soft, transparent) !important;',
      '  padding: 12px 12px 10px !important;',
      '  font: 13px/1.35 "Open Sans", system-ui, sans-serif !important;',
      '  display: none !important;',
      '}',
      '#' + PANEL_ID + '.ge-open { display: block !important; }',
      '#' + PANEL_ID + ' .ge-title {',
      '  font-weight: 700 !important;',
      '  font-size: 13px !important;',
      '  margin: 0 0 10px !important;',
      '  color: var(--ge-rail-title, #8f9fb3) !important;',
      '}',
      '#' + PANEL_ID + ' .ge-row {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: space-between !important;',
      '  gap: 10px !important;',
      '  margin: 0 0 8px !important;',
      '}',
      '#' + PANEL_ID + ' label.ge-switch {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: space-between !important;',
      '  gap: 10px !important;',
      '  width: 100% !important;',
      '  margin: 6px 0 !important;',
      '  color: var(--ge-rail-text, rgba(204,204,204,0.95)) !important;',
      '  cursor: pointer !important;',
      '  user-select: none !important;',
      '  flex: none !important;',
      '}',
      '#' + PANEL_ID + ' .ge-switch-text {',
      '  flex: 1 1 auto !important;',
      '  min-width: 0 !important;',
      '  line-height: 1.3 !important;',
      '  color: inherit !important;',
      '}',
      '#' + PANEL_ID + ' .ge-switch-input {',
      '  position: absolute !important;',
      '  opacity: 0 !important;',
      '  width: 0 !important;',
      '  height: 0 !important;',
      '  pointer-events: none !important;',
      '}',
      /* Switch track: 36×18, knob 18; ON uses theme accent */
      '#' + PANEL_ID + ' .ge-toggle {',
      '  position: relative !important;',
      '  flex: none !important;',
      '  width: 36px !important;',
      '  height: 18px !important;',
      '  background: #6b6b6b !important;',
      '  border: 0 !important;',
      '  border-radius: 12px !important;',
      '  cursor: pointer !important;',
      '  box-sizing: border-box !important;',
      '  transition: background .15s ease !important;',
      '  vertical-align: top !important;',
      '}',
      '#' + PANEL_ID + ' .ge-toggle::after {',
      '  content: "" !important;',
      '  position: absolute !important;',
      '  top: 0 !important;',
      '  left: 0 !important;',
      '  width: 18px !important;',
      '  height: 18px !important;',
      '  border-radius: 12px !important;',
      '  background: #d4d4d4 !important;',
      '  box-shadow: 0 1px 2px rgba(0,0,0,.35) !important;',
      '  transition: transform .15s ease, background .15s ease !important;',
      '}',
      '#' + PANEL_ID + ' .ge-switch-input:checked + .ge-toggle {',
      '  background: var(--ge-rail-accent, var(--ge-accent, #5eb0ef)) !important;',
      '}',
      '#' + PANEL_ID + ' .ge-switch-input:checked + .ge-toggle::after {',
      '  transform: translateX(18px) !important;',
      '  background: #e8e8e8 !important;',
      '}',
      '#' + PANEL_ID + ' .ge-switch:hover .ge-toggle::after { background: #cfcfcf !important; }',
      '#' + PANEL_ID + ' .ge-switch-input:checked + .ge-toggle::after,',
      '#' + PANEL_ID + ' .ge-switch:hover .ge-switch-input:checked + .ge-toggle::after {',
      '  background: #e8e8e8 !important;',
      '}',
      '#' + PANEL_ID + ' .ge-switch-input:focus-visible + .ge-toggle {',
      '  outline: 1px dotted currentColor !important;',
      '  outline-offset: 2px !important;',
      '}',
      '#' + PANEL_ID + ' > .ge-row > label:not(.ge-switch) {',
      '  color: var(--ge-rail-text, rgba(204,204,204,0.95)) !important;',
      '  cursor: default !important;',
      '  flex: 1 !important;',
      '}',
      '#' + PANEL_ID + ' select {',
      '  background: #333 !important;',
      '  color: #ccc !important;',
      '  border: 1px solid #000 !important;',
      '  border-radius: 6px !important;',
      '  padding: 4px 6px !important;',
      '}',
      '#' + PANEL_ID + ' .ge-foot {',
      '  margin-top: 8px !important;',
      '  padding-top: 8px !important;',
      '  border-top: 1px solid rgba(0,0,0,0.45) !important;',
      '  font-size: 11px !important;',
      '  color: var(--ge-rail-muted, #788087) !important;',
      '}'
    ].join('\n');
  }

  function ensureFabStyle() {
    var node = document.getElementById(STYLE_ID);
    if (!node) {
      node = document.createElement('style');
      node.id = STYLE_ID;
      (document.documentElement || document.head).appendChild(node);
    }
    node.textContent = fabCss();
  }

  function setSetting(site, key, value) {
    if (key === 'palette') {
      if (value === 'lightGray') set('intensity', 'soft');
      else if (value !== 'original') set('intensity', 'normal');
    }
    set(key, value);
    applyDocumentFlags(site);
    // Soft intensity / denser / ads / links apply via data attrs + CSS; reload for safety on intensity
    if (key === 'intensity' || key === 'palette') {
      try { location.reload(); } catch (e) {}
      return;
    }
    // Re-inject root flag CSS if a style tag exists for common flags
    try {
      var flagStyle = document.getElementById('grey-edition-steamgifts-flags') ||
        document.getElementById('grey-edition-common-flags');
      if (!flagStyle) {
        flagStyle = document.createElement('style');
        flagStyle.id = 'grey-edition-common-flags';
        (document.documentElement || document.head).appendChild(flagStyle);
      }
      flagStyle.textContent = rootCss() + '\n' + featureCss() + '\n' + paletteCss();
    } catch (e2) {}
  }

  function buildPanel(site) {
    var panel = document.createElement('div');
    panel.id = PANEL_ID;
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Grey Edition settings');

    var title = document.createElement('div');
    title.className = 'ge-title';
    title.textContent = 'Grey Edition · ' + (SITE_TITLES[site] || site);
    panel.appendChild(title);

    function addToggle(key, labelText, def) {
      var on = !!get(key, def);
      var lab = document.createElement('label');
      lab.className = 'ge-switch';
      var text = document.createElement('span');
      text.className = 'ge-switch-text';
      text.textContent = labelText;
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.className = 'ge-switch-input';
      cb.setAttribute('role', 'switch');
      cb.checked = on;
      cb.setAttribute('aria-checked', on ? 'true' : 'false');
      var track = document.createElement('span');
      track.className = 'ge-toggle';
      track.setAttribute('aria-hidden', 'true');
      lab.appendChild(text);
      lab.appendChild(cb);
      lab.appendChild(track);
      cb.addEventListener('change', function () {
        cb.setAttribute('aria-checked', cb.checked ? 'true' : 'false');
        setSetting(site, key, !!cb.checked);
      });
      panel.appendChild(lab);
    }

    // Theme palette
    var rowI = document.createElement('div');
    rowI.className = 'ge-row';
    var labI = document.createElement('label');
    labI.textContent = 'Theme';
    var sel = document.createElement('select');
    ['original', 'lightGray', 'darkGray', 'navy', 'black'].forEach(function (key) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = PALETTES[key].label;
      sel.appendChild(opt);
    });
    sel.value = normalizePalette(get('palette', 'darkGray'));
    sel.addEventListener('change', function () {
      setSetting(site, 'palette', sel.value);
    });
    rowI.appendChild(labI);
    rowI.appendChild(sel);
    panel.appendChild(rowI);

    // Accent
    var rowA = document.createElement('div');
    rowA.className = 'ge-row';
    var labA = document.createElement('label');
    labA.textContent = 'Accent';
    var selA = document.createElement('select');
    Object.keys(ACCENTS).forEach(function (key) {
      var opt = document.createElement('option');
      opt.value = key;
      opt.textContent = ACCENTS[key].label;
      selA.appendChild(opt);
    });
    selA.value = normalizeAccent(get('accent', 'site'));
    selA.addEventListener('change', function () {
      set('accent', selA.value);
      applyDocumentFlags(site);
      try {
        var btnEl = document.getElementById(FAB_ID);
        var panEl = document.getElementById(PANEL_ID);
        var th2 = themeFor(site);
        [btnEl, panEl].forEach(function (el) {
          if (!el) return;
          el.style.setProperty('--ge-rail-accent', th2.accent);
          el.style.setProperty('--ge-rail-accent-soft', th2.accentSoft);
          el.style.setProperty('border-color', th2.accent, 'important');
        });
      } catch (eAcc) {}
    });
    rowA.appendChild(labA);
    rowA.appendChild(selA);
    panel.appendChild(rowA);

    addToggle('brighterLinks', 'Brighter links', false);
    addToggle('hideAds', 'Hide ads / promos', false);
    if (site === 'manapool') {
      addToggle('dense', 'Denser card grid', false);
      addToggle('hideSoldOut', 'Hide sold out', false);
      addToggle('compactPrices', 'Compact prices', false);
      addToggle('alwaysChips', 'Always show chips', false);
    }
    if (site === 'scryfall') {
      addToggle('dimWarnings', 'Dim content warnings', false);
    }
    if (site === 'steamgifts') {
      addToggle('hideEntered', 'Hide entered', false);
      addToggle('hideEnded', 'Hide ended', false);
      addToggle('softHideFeatured', 'Soft-hide featured/pinned', false);
      addToggle('highContrastEnter', 'High-contrast Enter', false);
    }

    if (site === 'manapool') {
      var rowC = document.createElement('div');
      rowC.className = 'ge-row';
      var labC = document.createElement('label');
      labC.textContent = 'Home sections';
      var actions = document.createElement('div');
      actions.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;';
      function mkAction(label, fnName) {
        var b = document.createElement('button');
        b.type = 'button';
        b.textContent = label;
        b.style.cssText = 'cursor:pointer;padding:4px 8px;border-radius:6px;border:1px solid var(--ge-rail-panel-border,#444);background:#333;color:inherit;font:12px/1.2 system-ui,sans-serif;';
        b.addEventListener('click', function (e) {
          e.preventDefault();
          e.stopPropagation();
          var act = siteActions.manapool;
          if (act && typeof act[fnName] === 'function') act[fnName]();
        });
        return b;
      }
      actions.appendChild(mkAction('Collapse all', 'collapseAll'));
      actions.appendChild(mkAction('Expand all', 'expandAll'));
      rowC.appendChild(labC);
      rowC.appendChild(actions);
      panel.appendChild(rowC);
    }

    // Tools row: export / import / reset
    var rowT = document.createElement('div');
    rowT.className = 'ge-row';
    rowT.style.flexWrap = 'wrap';
    var labT = document.createElement('label');
    labT.textContent = 'Settings';
    var tools = document.createElement('div');
    tools.style.cssText = 'display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end;';
    function mkTool(label, onClick) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'cursor:pointer;padding:4px 8px;border-radius:6px;border:1px solid var(--ge-rail-panel-border,#444);background:#333;color:inherit;font:12px/1.2 system-ui,sans-serif;';
      b.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        onClick();
      });
      return b;
    }
    tools.appendChild(mkTool('Export', function () {
      var data = { v: 1, greyEdition: true };
      Object.keys(SETTINGS_DEFAULTS).forEach(function (k) {
        data[k] = get(k, SETTINGS_DEFAULTS[k]);
      });
      data.fabTop = get('fabTop', null);
      data.palette = normalizePalette(get('palette', 'darkGray'));
      try {
        var json = JSON.stringify(data, null, 2);
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(json).then(function () {
            alert('Grey Edition settings copied to clipboard.');
          }, function () {
            window.prompt('Copy settings JSON:', json);
          });
        } else {
          window.prompt('Copy settings JSON:', json);
        }
      } catch (eEx) {
        alert('Export failed.');
      }
    }));
    tools.appendChild(mkTool('Import', function () {
      var raw = window.prompt('Paste Grey Edition settings JSON:');
      if (!raw) return;
      try {
        var data = JSON.parse(raw);
        if (!data || typeof data !== 'object') throw new Error('bad');
        Object.keys(SETTINGS_DEFAULTS).forEach(function (k) {
          if (k in data) set(k, data[k]);
        });
        if ('fabTop' in data) set('fabTop', data.fabTop);
        applyDocumentFlags(site);
        try { location.reload(); } catch (eRel) {}
      } catch (eIm) {
        alert('Import failed — invalid JSON.');
      }
    }));
    tools.appendChild(mkTool('Reset', function () {
      if (!window.confirm('Reset Grey Edition settings to defaults?')) return;
      Object.keys(SETTINGS_DEFAULTS).forEach(function (k) {
        set(k, SETTINGS_DEFAULTS[k]);
      });
      set('fabTop', null);
      applyDocumentFlags(site);
      try { location.reload(); } catch (eRs) {}
    }));
    rowT.appendChild(labT);
    rowT.appendChild(tools);
    panel.appendChild(rowT);

    var foot = document.createElement('div');
    foot.className = 'ge-foot';
    foot.textContent = 'Drag up/down · Alt+G opens menu · v' + '1.13.0';
    panel.appendChild(foot);

    return panel;
  }

  function mountSettingsFab(site, iconUrl) {
    site = site || (document.documentElement && document.documentElement.getAttribute('data-ge-site')) || '';
    iconUrl = iconUrl || SITE_ICONS[site] || '';

    function mount() {
      if (!document.body) return false;
      ensureFabStyle();
      applyDocumentFlags(site);

      if (document.getElementById(FAB_ID)) return true;

      // Remove legacy full-height rail if an older common left one behind
      var legacyRail = document.getElementById(RAIL_ID);
      if (legacyRail) legacyRail.remove();

      var panel = buildPanel(site);
      var th = themeFor(site);
      function applyTheme(el) {
        el.style.setProperty('--ge-rail-bg', th.railBg);
        el.style.setProperty('--ge-rail-btn-bg', th.btnBg);
        el.style.setProperty('--ge-rail-btn-hover', th.btnBgHover);
        el.style.setProperty('--ge-rail-accent', th.accent);
        el.style.setProperty('--ge-rail-accent-soft', th.accentSoft);
        el.style.setProperty('--ge-rail-text', th.text);
        el.style.setProperty('--ge-rail-panel-bg', th.panelBg);
        el.style.setProperty('--ge-rail-panel-border', th.panelBorder);
        el.style.setProperty('--ge-rail-title', th.title);
        el.style.setProperty('--ge-rail-muted', th.muted);
      }
      applyTheme(panel);

      var btn = document.createElement('button');
      btn.id = FAB_ID;
      btn.type = 'button';
      btn.title = 'Grey Edition settings';
      btn.setAttribute('aria-label', 'Grey Edition settings');
      btn.setAttribute('aria-expanded', 'false');
      applyTheme(btn);

      if (iconUrl) {
        var img = document.createElement('img');
        img.src = iconUrl;
        img.alt = '';
        img.width = 28;
        img.height = 28;
        btn.appendChild(img);
      } else {
        btn.textContent = 'GE';
        btn.style.color = th.accent;
        btn.style.fontWeight = '700';
        btn.style.fontSize = '11px';
      }

      function clampTop(y) {
        var max = Math.max(8, (window.innerHeight || 600) - 60);
        if (y < 8) return 8;
        if (y > max) return max;
        return y;
      }

      function applyFabTop(topPx) {
        btn.style.setProperty('right', '12px', 'important');
        btn.style.setProperty('left', 'auto', 'important');
        btn.style.setProperty('bottom', 'auto', 'important');
        btn.style.setProperty('top', clampTop(topPx) + 'px', 'important');
      }

      function loadFabTop() {
        var saved = get('fabTop', null);
        if (typeof saved === 'number' && isFinite(saved)) return clampTop(saved);
        return clampTop((window.innerHeight || 600) - 68);
      }

      function placePanel() {
        var br = btn.getBoundingClientRect();
        var ph = panel.offsetHeight || 300;
        var gap = 8;
        var top = br.top - ph - gap;
        if (top < 8) top = br.bottom + gap;
        var maxTop = Math.max(8, (window.innerHeight || 600) - Math.min(ph, (window.innerHeight || 600) - 16) - 8);
        if (top > maxTop) top = maxTop;
        panel.style.setProperty('right', '12px', 'important');
        panel.style.setProperty('left', 'auto', 'important');
        panel.style.setProperty('bottom', 'auto', 'important');
        panel.style.setProperty('top', top + 'px', 'important');
      }

      applyFabTop(loadFabTop());

      var drag = { active: false, moved: false, startY: 0, origTop: 0, pointerId: null };

      btn.addEventListener('pointerdown', function (e) {
        if (e.button != null && e.button !== 0) return;
        drag.active = true;
        drag.moved = false;
        drag.startY = e.clientY;
        drag.origTop = btn.getBoundingClientRect().top;
        drag.pointerId = e.pointerId;
        try { btn.setPointerCapture(e.pointerId); } catch (err) {}
      });

      btn.addEventListener('pointermove', function (e) {
        if (!drag.active) return;
        var dy = e.clientY - drag.startY;
        if (!drag.moved && Math.abs(dy) < 5) return;
        drag.moved = true;
        btn.classList.add('ge-dragging');
        applyFabTop(drag.origTop + dy);
        if (panel.classList.contains('ge-open')) placePanel();
      });

      function endDrag(e) {
        if (!drag.active) return;
        drag.active = false;
        btn.classList.remove('ge-dragging');
        try { if (drag.pointerId != null) btn.releasePointerCapture(drag.pointerId); } catch (err2) {}
        if (drag.moved) {
          set('fabTop', clampTop(btn.getBoundingClientRect().top));
          if (panel.classList.contains('ge-open')) placePanel();
        }
      }
      btn.addEventListener('pointerup', endDrag);
      btn.addEventListener('pointercancel', endDrag);

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (drag.moved) {
          drag.moved = false;
          return;
        }
        var open = panel.classList.toggle('ge-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) placePanel();
      });

      document.addEventListener('click', function (e) {
        if (!panel.classList.contains('ge-open')) return;
        var t = e.target;
        if (t === btn || btn.contains(t) || t === panel || panel.contains(t)) return;
        panel.classList.remove('ge-open');
        btn.setAttribute('aria-expanded', 'false');
      }, true);

      window.addEventListener('resize', function () {
        applyFabTop(loadFabTop());
        if (panel.classList.contains('ge-open')) placePanel();
      });

      document.body.appendChild(panel);
      document.body.appendChild(btn);

      // Alt+G toggles panel
      if (!window.__geShortcutBound) {
        window.__geShortcutBound = true;
        document.addEventListener('keydown', function (e) {
          if (!(e.altKey && !e.ctrlKey && !e.metaKey && (e.key === 'g' || e.key === 'G'))) return;
          var b = document.getElementById(FAB_ID);
          var p = document.getElementById(PANEL_ID);
          if (!b || !p) return;
          e.preventDefault();
          b.click();
        });
      }

      // One-time update toast
      try {
        var seen = get('lastSeenVersion', '');
        if (seen !== '1.13.0') {
          set('lastSeenVersion', '1.13.0');
          if (seen) {
            var toast = document.createElement('div');
            toast.id = 'grey-edition-update-toast';
            toast.textContent = 'Grey Edition updated to 1.13.0 — open the favicon menu for new options.';
            document.body.appendChild(toast);
            setTimeout(function () {
              try { toast.remove(); } catch (eT) {}
            }, 6000);
          }
        }
      } catch (eToast) {}

      return true;
    }

    if (mount()) return;

    var obs = new MutationObserver(function () {
      if (mount()) obs.disconnect();
    });
    obs.observe(document.documentElement, { childList: true, subtree: true });
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function () { mount(); }, { once: true });
    }
  }

  // registerMenus also mounts the FAB
  var _registerMenus = registerMenus;
  registerMenus = function (site, iconUrl) {
    _registerMenus(site);
    mountSettingsFab(site, iconUrl);
  };

  function registerSiteActions(site, actions) {
    if (!site || !actions) return;
    siteActions[site] = actions;
  }

  var api = {
    version: '1.13.0',
    palette: palette,
    palettes: PALETTES,
    get: get,
    set: set,
    applyDocumentFlags: applyDocumentFlags,
    registerMenus: registerMenus,
    mountSettingsFab: mountSettingsFab,
    registerSiteActions: registerSiteActions,
    rootCss: function () { return rootCss() + '\n' + featureCss() + '\n' + paletteCss(); },
    paletteCss: paletteCss,
    isThemeEnabled: isThemeEnabled,
    normalizePalette: normalizePalette,
    normalizeAccent: normalizeAccent,
    featureCss: featureCss,
    accents: ACCENTS,
    defaults: SETTINGS_DEFAULTS,
    siteIcons: SITE_ICONS
  };

  global.GreyEdition = api;
  if (typeof globalThis !== 'undefined') globalThis.GreyEdition = api;
})(typeof window !== 'undefined' ? window : globalThis);
