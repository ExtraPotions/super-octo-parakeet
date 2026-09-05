/**
 * Grey Edition common helpers (Tampermonkey @require)
 * Version: 1.8.1
 * Author: expDARE
 * Homepage: https://github.com/ExtraPotions/super-octo-parakeet
 *
 * Shared palette + settings for ManaPool / Scryfall / SteamGifts Grey Edition.
 * Not a userscript — load via // @require from each Grey Edition script.
 */
(function (global) {
  'use strict';

  var PREFIX = 'ge-';
  var FAB_ID = 'grey-edition-fab';
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
      '/* Grey Edition common root flags CSS v1.8.1 */',
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

  function fabCss() {
    return [
      '#' + FAB_ID + ', #' + PANEL_ID + ', #' + FAB_ID + ' * { box-sizing: border-box; }',
      '#' + FAB_ID + ' {',
      '  position: fixed !important;',
      '  right: 18px !important;',
      '  bottom: 18px !important;',
      '  z-index: 2147483000 !important;',
      '  width: 48px !important;',
      '  height: 48px !important;',
      '  border-radius: 50% !important;',
      '  border: 1px solid rgba(0,0,0,0.75) !important;',
      '  background: #2a2a28 !important;',
      '  box-shadow: 0 6px 18px rgba(0,0,0,0.45) !important;',
      '  cursor: pointer !important;',
      '  padding: 0 !important;',
      '  margin: 0 !important;',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: center !important;',
      '  overflow: hidden !important;',
      '}',
      '#' + FAB_ID + ':hover { filter: brightness(1.12); }',
      '#' + FAB_ID + ' img {',
      '  width: 28px !important;',
      '  height: 28px !important;',
      '  object-fit: contain !important;',
      '  display: block !important;',
      '  pointer-events: none !important;',
      '}',
      '#' + PANEL_ID + ' {',
      '  position: fixed !important;',
      '  right: 18px !important;',
      '  bottom: 76px !important;',
      '  z-index: 2147483001 !important;',
      '  width: 260px !important;',
      '  max-width: calc(100vw - 36px) !important;',
      '  background: #2a2a28 !important;',
      '  color: rgba(204,204,204,0.95) !important;',
      '  border: 1px solid rgba(0,0,0,0.75) !important;',
      '  border-radius: 12px !important;',
      '  box-shadow: 0 10px 28px rgba(0,0,0,0.5) !important;',
      '  padding: 12px 12px 10px !important;',
      '  font: 13px/1.35 "Open Sans", system-ui, sans-serif !important;',
      '  display: none !important;',
      '}',
      '#' + PANEL_ID + '.ge-open { display: block !important; }',
      '#' + PANEL_ID + ' .ge-title {',
      '  font-weight: 700 !important;',
      '  font-size: 13px !important;',
      '  margin: 0 0 10px !important;',
      '  color: #8f9fb3 !important;',
      '}',
      '#' + PANEL_ID + ' .ge-row {',
      '  display: flex !important;',
      '  align-items: center !important;',
      '  justify-content: space-between !important;',
      '  gap: 10px !important;',
      '  margin: 0 0 8px !important;',
      '}',
      '#' + PANEL_ID + ' label {',
      '  color: rgba(204,204,204,0.95) !important;',
      '  cursor: pointer !important;',
      '  flex: 1 !important;',
      '}',
      '#' + PANEL_ID + ' input[type="checkbox"] {',
      '  width: 16px !important;',
      '  height: 16px !important;',
      '  accent-color: #5eb0ef !important;',
      '  cursor: pointer !important;',
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
      '  color: #788087 !important;',
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
    set(key, value);
    applyDocumentFlags(site);
    // Soft intensity / denser / ads / links apply via data attrs + CSS; reload for safety on intensity
    if (key === 'intensity') {
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
      flagStyle.textContent = rootCss();
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
      var row = document.createElement('div');
      row.className = 'ge-row';
      var lab = document.createElement('label');
      var cb = document.createElement('input');
      cb.type = 'checkbox';
      cb.checked = !!get(key, def);
      lab.appendChild(document.createTextNode(labelText));
      row.appendChild(lab);
      row.appendChild(cb);
      cb.addEventListener('change', function () {
        setSetting(site, key, !!cb.checked);
      });
      panel.appendChild(row);
    }

    // Intensity select
    var rowI = document.createElement('div');
    rowI.className = 'ge-row';
    var labI = document.createElement('label');
    labI.textContent = 'Intensity';
    var sel = document.createElement('select');
    var o1 = document.createElement('option'); o1.value = 'normal'; o1.textContent = 'Normal';
    var o2 = document.createElement('option'); o2.value = 'soft'; o2.textContent = 'Soft';
    sel.appendChild(o1); sel.appendChild(o2);
    sel.value = get('intensity', 'normal') === 'soft' ? 'soft' : 'normal';
    sel.addEventListener('change', function () {
      setSetting(site, 'intensity', sel.value);
    });
    rowI.appendChild(labI);
    rowI.appendChild(sel);
    panel.appendChild(rowI);

    addToggle('brighterLinks', 'Brighter links', false);
    addToggle('hideAds', 'Hide ads / promos', false);
    if (site === 'manapool') addToggle('dense', 'Denser card grid', false);

    var foot = document.createElement('div');
    foot.className = 'ge-foot';
    foot.textContent = 'Saved for this browser · Tampermonkey menu still works';
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

      var existing = document.getElementById(FAB_ID);
      if (existing) return true;

      var panel = buildPanel(site);
      var btn = document.createElement('button');
      btn.id = FAB_ID;
      btn.type = 'button';
      btn.title = 'Grey Edition settings';
      btn.setAttribute('aria-label', 'Grey Edition settings');
      btn.setAttribute('aria-expanded', 'false');

      if (iconUrl) {
        var img = document.createElement('img');
        img.src = iconUrl;
        img.alt = '';
        img.width = 28;
        img.height = 28;
        btn.appendChild(img);
      } else {
        btn.textContent = 'GE';
        btn.style.color = '#c8c8c8';
        btn.style.fontWeight = '700';
        btn.style.fontSize = '12px';
      }

      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var open = panel.classList.toggle('ge-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      });

      document.addEventListener('click', function (e) {
        if (!panel.classList.contains('ge-open')) return;
        var t = e.target;
        if (t === btn || btn.contains(t) || t === panel || panel.contains(t)) return;
        panel.classList.remove('ge-open');
        btn.setAttribute('aria-expanded', 'false');
      }, true);

      document.body.appendChild(panel);
      document.body.appendChild(btn);
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

  var api = {
    version: '1.8.1',
    palette: palette,
    get: get,
    set: set,
    applyDocumentFlags: applyDocumentFlags,
    registerMenus: registerMenus,
    mountSettingsFab: mountSettingsFab,
    rootCss: rootCss,
    siteIcons: SITE_ICONS
  };

  global.GreyEdition = api;
  if (typeof globalThis !== 'undefined') globalThis.GreyEdition = api;
})(typeof window !== 'undefined' ? window : globalThis);
