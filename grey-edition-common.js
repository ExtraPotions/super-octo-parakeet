/**
 * Grey Edition common helpers (Tampermonkey @require)
 * Version: 1.6.0
 * Author: expDARE
 * Homepage: https://github.com/ExtraPotions/super-octo-parakeet
 *
 * Shared palette + settings for ManaPool / Scryfall / SteamGifts Grey Edition.
 * Not a userscript — load via // @require from each Grey Edition script.
 */
(function (global) {
  'use strict';

  var PREFIX = 'ge-';

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

  function applyDocumentFlags(site) {
    var root = document.documentElement;
    if (!root) return;
    var intensity = get('intensity', 'normal');
    if (intensity !== 'soft') intensity = 'normal';
    root.setAttribute('data-ge-site', site || '');
    root.setAttribute('data-ge-intensity', intensity);
    root.setAttribute('data-ge-brighter-links', bool01(get('brighterLinks', false)));
    root.setAttribute('data-ge-hide-ads', bool01(get('hideAds', false)));
    root.setAttribute('data-ge-dense', bool01(get('dense', false)));
  }

  function toggleBool(key, labelOn, labelOff) {
    var next = !get(key, false);
    set(key, next);
    applyDocumentFlags(document.documentElement.getAttribute('data-ge-site') || '');
    try {
      if (typeof location !== 'undefined' && location.reload) location.reload();
    } catch (e) {}
    return next ? labelOn : labelOff;
  }

  function registerMenus(site) {
    applyDocumentFlags(site);
    if (typeof GM_registerMenuCommand !== 'function') return;

    var intensity = get('intensity', 'normal');
    GM_registerMenuCommand(
      intensity === 'soft' ? 'Grey Edition: Intensity → Normal' : 'Grey Edition: Intensity → Soft',
      function () {
        set('intensity', get('intensity', 'normal') === 'soft' ? 'normal' : 'soft');
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
      '/* Grey Edition common root flags CSS v1.6.0 */',
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

  var api = {
    version: '1.6.0',
    palette: palette,
    get: get,
    set: set,
    applyDocumentFlags: applyDocumentFlags,
    registerMenus: registerMenus,
    rootCss: rootCss
  };

  global.GreyEdition = api;
  if (typeof globalThis !== 'undefined') globalThis.GreyEdition = api;
})(typeof window !== 'undefined' ? window : globalThis);
