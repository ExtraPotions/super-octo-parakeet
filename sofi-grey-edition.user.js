// ==UserScript==
// @name           SoFi Grey Edition
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        1.5.0
// @description    Dark charcoal theme for SoFi — Grey Edition settings FAB + hide-ads
// @author         expDARE
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @match          *://sofi.com/*
// @match          *://www.sofi.com/*
// @match          *://app.sofi.com/*
// @match          *://login.sofi.com/*
// @match          *://*.sofi.com/*
// @icon           https://www.sofi.com/favicon.ico
// @run-at         document-start
// @downloadURL    https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/sofi-grey-edition.user.js
// @updateURL      https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/sofi-grey-edition.user.js
// @require        https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/grey-edition-common.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  if (typeof globalThis.GreyEdition === 'undefined' && (typeof window === 'undefined' || typeof window.GreyEdition === 'undefined')) {
    var _geStore = {};
    globalThis.GreyEdition = {
      palette: { body: '#252522', surface: '#2a2a28', header: '#1c1c1a', muted: '#333', text: 'rgba(166,166,166,0.95)', link: '#7ec8f0', linkAlt: '#629fc0', nmBlue: '#5eb0ef', priceGreen: '#16a34a', chipGray: '#aeaeae', deepGreen: '#045206' },
      get: function (k, d) { try { var r = localStorage.getItem('ge-' + k); return r == null ? d : JSON.parse(r); } catch (e) { return k in _geStore ? _geStore[k] : d; } },
      set: function (k, v) { try { localStorage.setItem('ge-' + k, JSON.stringify(v)); } catch (e) { _geStore[k] = v; } },
      applyDocumentFlags: function (site) {
        var r = document.documentElement; if (!r) return;
        r.setAttribute('data-ge-site', site || '');
        r.setAttribute('data-ge-intensity', (this.get('intensity', 'normal') === 'soft') ? 'soft' : 'normal');
        r.setAttribute('data-ge-brighter-links', this.get('brighterLinks', false) ? '1' : '0');
        r.setAttribute('data-ge-hide-ads', this.get('hideAds', false) ? '1' : '0');
        r.setAttribute('data-ge-dense', this.get('dense', false) ? '1' : '0');
      },
      registerMenus: function () {},
      mountSettingsFab: function () {},
      rootCss: function () { return ''; }
    };
    if (typeof window !== 'undefined') window.GreyEdition = globalThis.GreyEdition;
  }

  var GE = globalThis.GreyEdition || window.GreyEdition;
  var SITE = 'sofi';
  var ICON = 'https://www.sofi.com/favicon.ico';
  GE.applyDocumentFlags(SITE);
  GE.registerMenus(SITE, ICON);

  var STYLE_ID = 'grey-edition-sofi';
  var css = "/* SoFi Grey Edition */\n:root { color-scheme: dark !important; }\nhtml, body {\n  background: #252522 !important;\n  background-color: #252522 !important;\n  background-image: none !important;\n  color: rgba(166,166,166,0.95) !important;\n}\na, a:link { color: #7ec8f0 !important; }\na:visited { color: #9fd18a !important; }\na:hover, a:focus { color: #a8dff8 !important; }\nh1, h2, h3, h4, h5, h6 { color: #8f9fb3 !important; }\np, li, label, span, td, th { color: inherit; }\ninput, textarea, select {\n  background: #333333 !important;\n  background-color: #333333 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.7) !important;\n  box-shadow: none !important;\n}\ninput::placeholder, textarea::placeholder { color: #788087 !important; }\nhr { border-color: rgba(0,0,0,0.55) !important; }\ntable, tr, td, th {\n  border-color: rgba(0,0,0,0.35) !important;\n}\n[role=\"dialog\"], [role=\"menu\"], [role=\"listbox\"], [role=\"tooltip\"],\n.modal, .popover, .dropdown, .tooltip, .flyout {\n  background: #2a2a28 !important;\n  background-color: #2a2a28 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.55) !important;\n}\nhtml[data-ge-intensity=\"soft\"],\nhtml[data-ge-intensity=\"soft\"] body {\n  background-color: #2c2c29 !important;\n}\nhtml[data-ge-brighter-links=\"1\"] a,\nhtml[data-ge-brighter-links=\"1\"] a:link { color: #9ad8f8 !important; }\nhtml[data-ge-brighter-links=\"1\"] a:hover { color: #c5ecff !important; }\n\n/* SoFi Grey Edition v1.5.0 */\n#root, #__next, #app, main, .App,\n[class*=\"Layout\"], [class*=\"layout\"],\n[class*=\"Page\"], [class*=\"page-\"],\n[class*=\"Container\"], [class*=\"container\"],\n[class*=\"Card\"], [class*=\"card\"],\n[class*=\"Header\"], [class*=\"header\"],\n[class*=\"Nav\"], [class*=\"navbar\"],\n[class*=\"Footer\"], [class*=\"footer\"],\n[class*=\"Drawer\"], [class*=\"Modal\"], [class*=\"Popover\"],\n[class*=\"Menu\"], [class*=\"Dropdown\"],\n[class*=\"Panel\"], [class*=\"Sidebar\"] {\n  background-color: #2a2a28 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.45) !important;\n}\nhtml, body, #root, #__next, #app, main {\n  background: #252522 !important;\n  background-color: #252522 !important;\n}\nheader, [role=\"banner\"], nav[role=\"navigation\"],\n[class*=\"TopNav\"], [class*=\"top-nav\"], [class*=\"AppBar\"] {\n  background: #1c1c1a !important;\n  background-color: #1c1c1a !important;\n  background-image: none !important;\n  border-bottom: 1px solid rgba(0,0,0,0.7) !important;\n}\nfooter, [role=\"contentinfo\"] {\n  background: linear-gradient(#2e3d4d 0%, #212b36 100%) !important;\n  color: rgba(204,204,204,0.9) !important;\n}\nbutton, [role=\"button\"], .btn, [class*=\"Button\"] {\n  background: linear-gradient(#39576f 0%, #273d4f 100%) !important;\n  color: rgba(204,204,204,0.95) !important;\n  border-color: rgba(0,0,0,0.7) !important;\n  box-shadow: none !important;\n}\n/* Keep SoFi primary CTAs readable (green/teal brand) */\nbutton[class*=\"primary\"], [class*=\"PrimaryButton\"],\na[class*=\"primary\"][role=\"button\"],\n[data-testid*=\"primary\"] button,\nbutton[type=\"submit\"] {\n  background: #00a862 !important;\n  background-color: #00a862 !important;\n  color: #061810 !important;\n  border-color: #008a50 !important;\n}\n[class*=\"Card\"], [class*=\"tile\"], [class*=\"Tile\"],\n[class*=\"Paper\"], article, section[class*=\"section\"] {\n  background: #2a2a28 !important;\n  border-color: rgba(0,0,0,0.4) !important;\n}\n[class*=\"amount\"], [class*=\"Balance\"], [class*=\"balance\"],\n[class*=\"Price\"], [class*=\"price\"] {\n  color: #7ddea0 !important;\n}\nhtml[data-ge-intensity=\"soft\"] [class*=\"Card\"],\nhtml[data-ge-intensity=\"soft\"] [class*=\"Panel\"] {\n  background-color: #32322e !important;\n}\nhtml[data-ge-hide-ads=\"1\"] [class*=\"promo\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"Promo\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"marketing\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"Marketing\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"banner\"],\nhtml[data-ge-hide-ads=\"1\"] [data-ad],\nhtml[data-ge-hide-ads=\"1\"] .adsbygoogle {\n  display: none !important;\n}" + "\n" + (GE.rootCss ? GE.rootCss() : '');

  var applying = false;

  function ensureStyle() {
    var node = document.getElementById(STYLE_ID);
    if (!node) {
      node = document.createElement('style');
      node.id = STYLE_ID;
      node.textContent = css;
    } else if (node.textContent !== css) {
      node.textContent = css;
    }
    (document.documentElement || document.head).appendChild(node);
  }

  function parseRgb(bg) {
    var m = (bg || '').match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return { r: +m[1], g: +m[2], b: +m[3] };
  }
  function isLight(rgb) {
    if (!rgb) return false;
    return rgb.r >= 230 && rgb.g >= 230 && rgb.b >= 230;
  }
  function darkenLightSurfaces() {
    var root = document.body;
    if (!root) return;
    var nodes = root.querySelectorAll('div, section, article, aside, main, form, header, footer, nav, ul, ol, li, table, thead, tbody, tr, td, th');
    var list = [root];
    var max = Math.min(nodes.length, 2500);
    for (var i = 0; i < max; i++) list.push(nodes[i]);
    for (var j = 0; j < list.length; j++) {
      var el = list[j];
      if (!el || !el.style) continue;
      if (el.closest && el.closest('img, picture, video, canvas, svg, #' + STYLE_ID + ', #grey-edition-fab, #grey-edition-fab-panel')) continue;
      var rgb = parseRgb(getComputedStyle(el).backgroundColor);
      if (!isLight(rgb)) continue;
      var surface = (el === root || el.tagName === 'MAIN') ? '#252522' : '#2a2a28';
      el.style.setProperty('background-color', surface, 'important');
      el.style.setProperty('background-image', 'none', 'important');
    }
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      GE.applyDocumentFlags(SITE);
      ensureStyle();
      document.documentElement.style.colorScheme = 'dark';
      document.documentElement.style.setProperty('background-color', '#252522', 'important');
      if (document.body) {
        document.body.style.setProperty('background-color', '#252522', 'important');
        document.body.style.setProperty('background-image', 'none', 'important');
        document.body.style.setProperty('color', 'rgba(166,166,166,0.95)', 'important');
      }
    } finally {
      applying = false;
    }
  }

  function applyAndDarken() {
    apply();
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
    }, 300);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });

})();
