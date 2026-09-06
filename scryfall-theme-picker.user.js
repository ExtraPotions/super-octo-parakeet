// ==UserScript==
// @name           Scryfall Theme Picker
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        2.0.3
// @description    Theme palettes + settings for Scryfall — readable blues, themed chips, dim warnings, gallery polish
// @author         expDARE
// @license        CC-BY-NC-4.0
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @match          *://scryfall.com/*
// @match          *://www.scryfall.com/*
// @icon           https://scryfall.com/favicon.ico?v=23c9b39069bf
// @run-at         document-start
// @downloadURL    https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/scryfall-theme-picker.user.js
// @updateURL      https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/scryfall-theme-picker.user.js
// @require        https://github.com/ExtraPotions/super-octo-parakeet/releases/latest/download/theme-picker-common.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  if (typeof globalThis.ThemePicker === 'undefined' && (typeof window === 'undefined' || typeof window.ThemePicker === 'undefined')) {
    var _geStore = {};
    globalThis.ThemePicker = {
      palette: { body: '#252522', surface: '#2a2a28', header: '#1c1c1a', muted: '#333', text: 'rgba(166,166,166,0.95)', link: '#7ec8f0', linkAlt: '#629fc0', nmBlue: '#5eb0ef', priceGreen: '#16a34a', chipGray: '#aeaeae', deepGreen: '#045206' },
      get: function (k, d) { try { var r = localStorage.getItem('ge-' + k); return r == null ? d : JSON.parse(r); } catch (e) { return k in _geStore ? _geStore[k] : d; } },
      set: function (k, v) { try { localStorage.setItem('ge-' + k, JSON.stringify(v)); } catch (e) { _geStore[k] = v; } },
      applyDocumentFlags: function (site) {
        var r = document.documentElement; if (!r) return;
        var pal = this.get('palette', 'darkGray');
        if (pal !== 'original' && pal !== 'lightGray' && pal !== 'darkGray' && pal !== 'navy' && pal !== 'black') {
          pal = (this.get('intensity', 'normal') === 'soft') ? 'lightGray' : 'darkGray';
        }
        r.setAttribute('data-ge-site', site || '');
        r.setAttribute('data-ge-intensity', (this.get('intensity', 'normal') === 'soft') ? 'soft' : 'normal');
        r.setAttribute('data-ge-palette', pal);
        r.setAttribute('data-ge-brighter-links', this.get('brighterLinks', false) ? '1' : '0');
        r.setAttribute('data-ge-hide-ads', this.get('hideAds', false) ? '1' : '0');
        r.setAttribute('data-ge-dense', this.get('dense', false) ? '1' : '0');
      },
      isThemeEnabled: function () {
        var pal = this.get('palette', 'darkGray');
        return pal !== 'original';
      },
      registerMenus: function () {},
      mountSettingsFab: function () {},
      rootCss: function () { return ''; }
    };
    if (typeof window !== 'undefined') window.ThemePicker = globalThis.ThemePicker;
  }
  var GE = globalThis.ThemePicker || window.ThemePicker;
  GE.applyDocumentFlags('scryfall');
  GE.registerMenus('scryfall', 'https://scryfall.com/favicon.ico?v=23c9b39069bf');

  var STYLE_ID = 'theme-picker-scryfall';
  var css = "/* Scryfall Theme Picker v1.9.0 \u2014 sitewide charcoal + durable overlays */\n/* Protect Theme Picker FAB/panel from Scryfall button chrome */\n#theme-picker-fab,\nhtml body button#theme-picker-fab,\n#theme-picker-fab-panel,\n#theme-picker-fab-panel * {\n  /* site button gradients must not win */\n}\nhtml body button#theme-picker-fab {\n  background: var(--ge-rail-btn-bg, #111111) !important;\n  background-image: none !important;\n  color: var(--ge-rail-accent, #7ec8f0) !important;\n  border: 1px solid var(--ge-rail-accent, #7ec8f0) !important;\n  box-shadow: 0 2px 10px rgba(0,0,0,.4) !important;\n  width: 52px !important;\n  height: 52px !important;\n  padding: 0 !important;\n  margin: 0 !important;\n  border-radius: 999px !important;\n  filter: none !important;\n  opacity: 1 !important;\n  pointer-events: auto !important;\n}\n\n:root { color-scheme: dark !important; }\n\nhtml, body {\n  background: #252522 !important;\n  background-color: #252522 !important;\n  background-image: none !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n\nhtml body #main,\nhtml body #main.main,\n#main,\n#main.main,\n.main {\n  background: #252522 !important;\n  background-color: #252522 !important;\n  background-image: none !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n\n.card-profile,\n.card-profiles,\n.card-text,\n.form-layout,\n.form-input,\n.form-n,\n.form-n-title,\n.control-panel,\n.control-panel-content,\n.sidebar.bright,\n.sidebar-card,\n.deckbuilder,\n.deckbuilder-toolbar,\n.deckbuilder-editor-inner,\n.blog-post-large,\n.blog-post-small,\n.api-example,\n.api-example-body,\n.api-example-results,\n.dropdown-menu-items,\n.card-grid-header-content,\n.advanced-search-submit-bottom,\n.bot-marketing-panel-desc,\n.bot-marketing-panel-footer,\n.donation-service,\n.donation-stripe-amount,\n.deck-wizard-category,\n.diff ul,\n.canned-api-example pre,\n.card-content-warning,\n.prints,\n.prints-table,\n.current-prints,\n.toolbox,\n.buybox,\n.checklist,\n.search-info,\n.inner-container,\n.container,\n.set,\n.set-details,\n.card-tools,\n.sidebar,\narticle,\n.modal,\n.popover,\n.autocomplete {\n  background: #2a2a28 !important;\n  background-color: #2a2a28 !important;\n  background-image: none !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.45) !important;\n  box-shadow: none !important;\n}\n\n.card-profile,\n.card-text {\n  border-color: rgba(0, 0, 0, 0.55) !important;\n}\n\nheader, .header, nav.toolbar, .toolbar,\n#footer, footer.footer, .footer {\n  background: linear-gradient(#2e3d4d 0%, #212b36 100%) !important;\n  background-color: #212b36 !important;\n  border-color: rgba(0, 0, 0, 0.7) !important;\n  color: rgba(204, 204, 204, 0.9) !important;\n}\n\na, a:link { color: #7ec8f0 !important; }\na:visited { color: rgba(128, 172, 83, 0.9) !important; }\n\nh1, h2, h3, h4,\n.card-text-title, .card-text-artist, .card-text-type-line {\n  color: #8f9fb3 !important;\n}\n\n.card-text-oracle, .card-text-flavor,\n#main p, #main li, #main td, #main th, #main label {\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n\ninput, textarea, select,\n.form-input, .search-form input, #q,\n.select2-container--default .select2-selection--single,\n.select2-dropdown, .select2-results__options {\n  background: #333333 !important;\n  background-color: #333333 !important;\n  border: 1px solid rgba(0, 0, 0, 0.7) !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  box-shadow: none !important;\n}\n\nbutton:not(#theme-picker-fab):not(#theme-picker-fab *), .button, a.button, .button-navy, .button-primary,\n.button-n, .select-n {\n  background: linear-gradient(#39576f 0%, #273d4f 100%) !important;\n  border-color: #000 !important;\n  color: rgba(204, 204, 204, 0.9) !important;\n  box-shadow: none !important;\n}\n\ntable, tr, td, th, .prints-table, .checklist tr {\n  background-color: rgba(45, 45, 42, 0.9) !important;\n  color: rgba(161, 161, 161, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.35) !important;\n}\n.checklist tr:nth-child(even),\n.prints tr:hover, .card-profile tr:hover,\n.control-panel-table tbody tr:hover {\n  background-color: #333333 !important;\n}\n.prints .current, .prints tr.current, tr.current {\n  background-color: rgba(46, 61, 77, 0.85) !important;\n}\n\n.card-image, .card-image img, img.card, picture img,\n.card-grid .card {\n  background-color: transparent !important;\n  background-image: none !important;\n}\n\na, a:link,\na.button, .button a,\n#main a, .card-profile a, .card-text a,\n.rulings a, .sidebar a, .footer a,\n.link, .js-tooltip {\n  color: #7ec8f0 !important;\n}\na:visited { color: #9fd18a !important; }\na:hover, a:focus { color: #a8dff8 !important; }\n\n.button-n.tcgplayer, .tcgplayer.select-n,\n.button-n.tcgplayer path, .tcgplayer.select-n path {\n  color: #7eb6ff !important;\n  fill: #7eb6ff !important;\n  border-color: #7eb6ff !important;\n}\n.rulings a { color: #b39ddb !important; }\n\nh1, h2, h3, h4, h5, h6,\n.card-text-title, .rulings h6 {\n  color: #a8b8cc !important;\n}\n\n.rulings,\n.rulings-item,\n.rulings p,\n.rulings-column {\n  background-color: #2a2a28 !important;\n  color: rgba(190, 190, 185, 0.98) !important;\n}\n.rulings-item-date { color: #9aa3ad !important; }\n\n.sidebar-toolbox .button-n,\n.sidebar-toolbox .select-n,\n.sidebar-toolbox a.button-n,\n#main .button-n,\n#main .select-n,\n.button-n, .select-n {\n  background: #aeaeae !important;\n  background-color: #aeaeae !important;\n  background-image: none !important;\n  border-color: rgba(0, 0, 0, 0.35) !important;\n  color: #1a1a18 !important;\n  box-shadow: none !important;\n}\n.sidebar-toolbox .button-n:hover,\n.button-n:hover, .select-n:hover {\n  background: #bebebe !important;\n  background-color: #bebebe !important;\n  color: #0a0a08 !important;\n}\n.button-n.inverted-white, .inverted-white.select-n,\n.button-n.inverted, .inverted.select-n {\n  background: #aeaeae !important;\n  color: #1a1a18 !important;\n}\n.button-n.tcgplayer, .button-n.cardkingdom, .button-n.manapool,\na.button-n[href*=\"tcgplayer\"], a.button-n[href*=\"cardkingdom\"], a.button-n[href*=\"manapool\"] {\n  background: #aeaeae !important;\n  background-color: #aeaeae !important;\n}\n.button-n.tcgplayer, .tcgplayer.select-n,\n.button-n.tcgplayer path, .tcgplayer.select-n path {\n  color: #0b3d9e !important;\n  fill: #0b3d9e !important;\n  border-color: #0b3d9e !important;\n}\n.sidebar-toolbox .button-n svg,\n.button-n svg { color: inherit !important; }\n\n.search-controls,\n.search-info,\n.reference-block,\n.advanced-search,\n.advanced-search-autocomplete-menu,\nform.form-layout.advanced-search,\n#rulings.rulings,\n.prints-table svg {\n  background: #2a2a28 !important;\n  background-color: #2a2a28 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.45) !important;\n}\n.search-controls input,\n.search-controls select,\n.form-layout input.form-input,\n.advanced-search-checkbox input[type=\"checkbox\"] {\n  background: #252522 !important;\n  background-color: #252522 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n\n.sidebar-toolbox a.button-n,\n.sidebar-toolbox .button-n,\n.sidebar-toolbox a.button-n:link,\n.sidebar-toolbox a.button-n:visited,\na.button-n:visited {\n  color: #1a1a18 !important;\n}\n\n.sidebar-toolbox .button-n.positive,\n.sidebar-toolbox .button-n.positive-n,\n.button-n.positive,\n.button-n.positive-n,\na.button-n.positive,\na.button-n.positive-n,\na.button-n[href*=\"manapool\"],\na.button-n[href*=\"cardkingdom\"],\na.button-n[href*=\"card-kingdom\"],\n.sidebar-toolbox a[href*=\"manapool\"],\n.sidebar-toolbox a[href*=\"cardkingdom\"] {\n  color: #045206 !important;\n  border-color: #045206 !important;\n}\n.sidebar-toolbox .button-n.positive path,\n.sidebar-toolbox .button-n.positive-n path,\n.button-n.positive path,\n.button-n.positive-n path,\n.button-n.positive g,\n.button-n.positive-n g,\na.button-n[href*=\"manapool\"] path,\na.button-n[href*=\"cardkingdom\"] path {\n  fill: #045206 !important;\n  stroke: #045206 !important;\n}\n.sidebar-toolbox a.button-n.positive:visited,\na.button-n.positive:visited,\na.button-n[href*=\"manapool\"]:visited,\na.button-n[href*=\"cardkingdom\"]:visited {\n  color: #033f05 !important;\n}\n\n.button-n.cardhoarder,\n.cardhoarder.select-n {\n  color: #a33a00 !important;\n  border-color: #a33a00 !important;\n}\n\n/* === v1.6.0 durable overlays / tooltips / grids === */\n.tippy-box,\n.tippy-content,\n.tippy-tooltip,\n[data-tippy-root],\n.js-tooltip,\n.js-tooltip-content,\n.tooltip,\n.ui-tooltip,\n.popover,\n.popover-content,\n.autocomplete,\n.autocomplete-menu,\n.autocomplete-results,\n.advanced-search-autocomplete-menu,\n.select2-dropdown,\n.select2-results,\n.select2-results__option,\n.reference-block,\n.reference-blocks,\n.card-grid,\n.card-grid-item,\n.card-grid-header,\n.card-grid-header-content,\n.print-gallery,\n.prints,\n.prints-current,\n.current-prints,\n.card-faces,\n.card-face,\n.modal-dialog,\n.modal-content,\n.lightbox,\n.dropdown-menu,\n.dropdown-menu-items {\n  background: #2a2a28 !important;\n  background-color: #2a2a28 !important;\n  background-image: none !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.55) !important;\n  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.45) !important;\n}\n.tippy-arrow,\n.tippy-box[data-placement^=top] > .tippy-arrow::before {\n  color: #2a2a28 !important;\n  border-top-color: #2a2a28 !important;\n}\n.select2-results__option--highlighted,\n.autocomplete-results li:hover,\n.dropdown-menu-items a:hover {\n  background-color: #333333 !important;\n  color: #e0e0d8 !important;\n}\n\nhtml[data-ge-intensity=\"soft\"],\nhtml[data-ge-intensity=\"soft\"] body,\nhtml[data-ge-intensity=\"soft\"] #main {\n  background-color: #2c2c29 !important;\n}\nhtml[data-ge-intensity=\"soft\"] .card-profile,\nhtml[data-ge-intensity=\"soft\"] .card-text,\nhtml[data-ge-intensity=\"soft\"] .sidebar,\nhtml[data-ge-intensity=\"soft\"] .toolbox,\nhtml[data-ge-intensity=\"soft\"] .prints,\nhtml[data-ge-intensity=\"soft\"] .reference-block {\n  background-color: #32322e !important;\n}\n\nhtml[data-ge-brighter-links=\"1\"] a,\nhtml[data-ge-brighter-links=\"1\"] a:link,\nhtml[data-ge-brighter-links=\"1\"] .js-tooltip {\n  color: #9ad8f8 !important;\n}\nhtml[data-ge-brighter-links=\"1\"] a:hover {\n  color: #c5ecff !important;\n}\n\nhtml[data-ge-hide-ads=\"1\"] .bot-marketing-panel,\nhtml[data-ge-hide-ads=\"1\"] .bot-marketing-panel-desc,\nhtml[data-ge-hide-ads=\"1\"] .bot-marketing-panel-footer,\nhtml[data-ge-hide-ads=\"1\"] .adsbygoogle,\nhtml[data-ge-hide-ads=\"1\"] [data-ad],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"sponsored\"] {\n  display: none !important;\n}\n" + "\n" + "/* v1.9 gallery / set polish + dim warnings */\n.print-gallery, .prints, .current-prints, .card-grid, .set, .set-details,\n.card-grid-header, .card-grid-header-content, .prints-table {\n  background-color: #2a2a28 !important;\n  border-color: rgba(0,0,0,0.45) !important;\n}\n.print-gallery img, .card-grid img { background: transparent !important; }\nhtml[data-ge-dim-warnings=\"1\"] .card-content-warning {\n  opacity: 0.4 !important; filter: grayscale(0.55) !important;\n  max-height: 3.5rem !important; overflow: hidden !important;\n}\nhtml[data-ge-dim-warnings=\"1\"] .card-content-warning:hover {\n  opacity: 1 !important; filter: none !important; max-height: none !important;\n}\n" + "\n" + (GE.rootCss ? GE.rootCss() : '');
  var applying = false;

  function clearInlineTheme() {
    var root = document.documentElement;
    if (root) {
      root.style.removeProperty('color-scheme');
      root.style.removeProperty('background-color');
    }
    if (document.body) {
      document.body.style.removeProperty('background-color');
      document.body.style.removeProperty('background-image');
    }
    var main = document.getElementById('main');
    if (main) {
      main.style.removeProperty('background-color');
      main.style.removeProperty('background-image');
    }
  }

  function ensureStyle() {
    var node = document.getElementById(STYLE_ID);
    if (!node) {
      node = document.createElement('style');
      node.id = STYLE_ID;
      (document.documentElement || document.head).appendChild(node);
    }
    if (GE.isThemeEnabled && !GE.isThemeEnabled()) {
      // Original: no theme CSS, no rootCss remaps
      node.textContent = '/* Scryfall Theme Picker — original (site theme) */';
      clearInlineTheme();
      return;
    }
    if (node.textContent !== css) node.textContent = css;
  }

  function parseRgb(bg) {
    var m = (bg || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3] };
  }
  function isLight(rgb) {
    if (!rgb) return false;
    return rgb.r >= 220 && rgb.g >= 220 && rgb.b >= 220;
  }
  function darkenLightSurfaces() {
    var root = document.getElementById('main') || document.body;
    if (!root) return;
    var nodes = root.querySelectorAll('div, section, article, aside, main, form, table, thead, tbody, tr, td, th, ul, ol, li, header, footer, nav, pre, fieldset, a.button-n, .button-n');
    var list = [root];
    for (var i = 0; i < nodes.length; i++) list.push(nodes[i]);
    for (var j = 0; j < list.length; j++) {
      var el = list[j];
      if (!el || !el.style) continue;
      if (el.id === 'theme-picker-fab' || el.id === 'theme-picker-fab-panel') continue;
      if (el.closest && el.closest('#theme-picker-fab, #theme-picker-fab-panel, .card-image, picture, svg, img, .card-grid-item-card, .card-face')) continue;
      var rgb = parseRgb(getComputedStyle(el).backgroundColor);
      if (!isLight(rgb)) continue;
      var surface = '#2a2a28';
      if (el === root || el.id === 'main') surface = '#252522';
      if (el.classList && (el.classList.contains('button-n') || el.classList.contains('select-n'))) surface = '#aeaeae';
      el.style.setProperty('background-color', surface, 'important');
      el.style.setProperty('background-image', 'none', 'important');
    }
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      GE.applyDocumentFlags('scryfall');
      ensureStyle();
      if (GE.isThemeEnabled && !GE.isThemeEnabled()) {
        clearInlineTheme();
        return;
      }
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.style.setProperty('background-color', '#252522', 'important');
      if (document.body) {
        document.body.style.setProperty('background-color', '#252522', 'important');
        document.body.style.setProperty('background-image', 'none', 'important');
      }
      var main = document.getElementById('main');
      if (main) {
        main.style.setProperty('background-color', '#252522', 'important');
        main.style.setProperty('background-image', 'none', 'important');
      }
    } finally {
      applying = false;
    }
  }

  function applyAndDarken() {
    apply();
    if (GE.isThemeEnabled && !GE.isThemeEnabled()) return;
    requestAnimationFrame(function () { darkenLightSurfaces(); });
  }

  apply();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyAndDarken, { once: true });
  } else {
    applyAndDarken();
  }
  window.addEventListener('pageshow', applyAndDarken);
  window.addEventListener('load', applyAndDarken);

  var darkenTimer = null;
  var obs = new MutationObserver(function () {
    if (!document.getElementById(STYLE_ID)) apply();
    if (darkenTimer) clearTimeout(darkenTimer);
    darkenTimer = setTimeout(function () {
      apply();
      darkenLightSurfaces();
    }, 250);
  });
  obs.observe(document.documentElement, { childList: true });
})();
