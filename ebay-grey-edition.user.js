// ==UserScript==
// @name           eBay Grey Edition
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        1.5.0
// @description    Dark charcoal theme for eBay — Grey Edition settings FAB + hide-ads
// @author         expDARE
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @match          *://ebay.com/*
// @match          *://www.ebay.com/*
// @match          *://ebay.co.uk/*
// @match          *://www.ebay.co.uk/*
// @match          *://ebay.de/*
// @match          *://www.ebay.de/*
// @match          *://ebay.fr/*
// @match          *://www.ebay.fr/*
// @match          *://ebay.it/*
// @match          *://www.ebay.it/*
// @match          *://ebay.es/*
// @match          *://www.ebay.es/*
// @match          *://ebay.ca/*
// @match          *://www.ebay.ca/*
// @match          *://ebay.com.au/*
// @match          *://www.ebay.com.au/*
// @match          *://ebay.at/*
// @match          *://www.ebay.at/*
// @match          *://ebay.be/*
// @match          *://www.ebay.be/*
// @match          *://ebay.nl/*
// @match          *://www.ebay.nl/*
// @match          *://ebay.ch/*
// @match          *://www.ebay.ch/*
// @match          *://ebay.ie/*
// @match          *://www.ebay.ie/*
// @match          *://ebay.pl/*
// @match          *://www.ebay.pl/*
// @icon           https://www.ebay.com/favicon.ico
// @run-at         document-start
// @downloadURL    https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/ebay-grey-edition.user.js
// @updateURL      https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/ebay-grey-edition.user.js
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
  var SITE = 'ebay';
  var ICON = 'https://www.ebay.com/favicon.ico';
  GE.applyDocumentFlags(SITE);
  GE.registerMenus(SITE, ICON);

  var STYLE_ID = 'grey-edition-ebay';
  var css = "/* eBay Grey Edition */\n:root { color-scheme: dark !important; }\nhtml, body {\n  background: #252522 !important;\n  background-color: #252522 !important;\n  background-image: none !important;\n  color: rgba(166,166,166,0.95) !important;\n}\na, a:link { color: #7ec8f0 !important; }\na:visited { color: #9fd18a !important; }\na:hover, a:focus { color: #a8dff8 !important; }\nh1, h2, h3, h4, h5, h6 { color: #8f9fb3 !important; }\np, li, label, span, td, th { color: inherit; }\ninput, textarea, select {\n  background: #333333 !important;\n  background-color: #333333 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.7) !important;\n  box-shadow: none !important;\n}\ninput::placeholder, textarea::placeholder { color: #788087 !important; }\nhr { border-color: rgba(0,0,0,0.55) !important; }\ntable, tr, td, th {\n  border-color: rgba(0,0,0,0.35) !important;\n}\n[role=\"dialog\"], [role=\"menu\"], [role=\"listbox\"], [role=\"tooltip\"],\n.modal, .popover, .dropdown, .tooltip, .flyout {\n  background: #2a2a28 !important;\n  background-color: #2a2a28 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.55) !important;\n}\nhtml[data-ge-intensity=\"soft\"],\nhtml[data-ge-intensity=\"soft\"] body {\n  background-color: #2c2c29 !important;\n}\nhtml[data-ge-brighter-links=\"1\"] a,\nhtml[data-ge-brighter-links=\"1\"] a:link { color: #9ad8f8 !important; }\nhtml[data-ge-brighter-links=\"1\"] a:hover { color: #c5ecff !important; }\n\n/* eBay Grey Edition v1.5.0 */\n#gh, #gh-gb, #gh-top, #gh-main, #gh-cat-box,\n#mainContent, #CenterPanel, #LeftPanel, #RightPanel,\n#Body, .pagecontainer, .s-page, .srp-main,\n.srp-river, .srp-river-results, .s-item, .s-item__wrapper,\n.x-item-title, .x-price-primary, .x-bin-price,\n.vim, .ux-layout-section, .ux-section,\n.lightbox-dialog, .dialog__window, .menu-button__menu,\n.gh-eb, .gh-tbl, .gh-td, footer, .global-footer,\n.seo-footer, #gf-BIG, .gf-bttl {\n  background-color: #2a2a28 !important;\n  background-image: none !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.45) !important;\n}\n#gh, #gh-gb, header.gh, .gh-header {\n  background: #1c1c1a !important;\n  background-color: #1c1c1a !important;\n  background-image: none !important;\n}\n#gh-top, .gh-top {\n  background: #252522 !important;\n}\nfooter, .global-footer, #gf-BIG, .seo-footer {\n  background: linear-gradient(#2e3d4d 0%, #212b36 100%) !important;\n  color: rgba(204,204,204,0.9) !important;\n}\n#gh-ac, #gh-as-a, input[type=\"text\"], input[type=\"search\"],\ninput[type=\"email\"], input[type=\"password\"], textarea, select {\n  background: #333333 !important;\n  color: rgba(204,204,204,0.95) !important;\n  border: 1px solid rgba(0,0,0,0.7) !important;\n}\n.s-item__title, .x-item-title__mainTitle, h1.x-item-title-label,\n.ux-textspans, .textual-display {\n  color: rgba(190,190,185,0.95) !important;\n}\n.s-item__price, .x-price-primary, .x-bin-price__content,\n.x-price-approx__price, span[itemprop=\"price\"] {\n  color: #7ddea0 !important;\n}\n.s-item, .s-card, .srp-grid .s-item,\n.b-list__items .s-item, .x-tray {\n  background: #2a2a28 !important;\n  border-color: rgba(0,0,0,0.4) !important;\n}\n/* Keep eBay primary CTA blue recognizable */\n.btn--primary, a.btn--primary, button.btn--primary,\n.x-bin-action, .x-buybox .btn--primary,\n#binBtn_btn, #bidBtn_btn {\n  background: #3665f3 !important;\n  background-color: #3665f3 !important;\n  color: #fff !important;\n  border-color: #2b4fc7 !important;\n}\n.btn--secondary, button.btn--secondary, a.btn--secondary {\n  background: linear-gradient(#39576f 0%, #273d4f 100%) !important;\n  color: rgba(204,204,204,0.95) !important;\n  border-color: #000 !important;\n}\n.fake-menu, .menu__items, .listbox__options, .dropdown__panel {\n  background: #2a2a28 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.55) !important;\n}\nhtml[data-ge-intensity=\"soft\"] .s-item,\nhtml[data-ge-intensity=\"soft\"] .ux-layout-section,\nhtml[data-ge-intensity=\"soft\"] .vim {\n  background-color: #32322e !important;\n}\nhtml[data-ge-hide-ads=\"1\"] .ad-container,\nhtml[data-ge-hide-ads=\"1\"] .s-answer-region-center-bottom,\nhtml[data-ge-hide-ads=\"1\"] [data-testid*=\"ad\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"sponsored\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"Sponsored\"],\nhtml[data-ge-hide-ads=\"1\"] iframe[src*=\"doubleclick\"],\nhtml[data-ge-hide-ads=\"1\"] iframe[src*=\"googlesyndication\"],\nhtml[data-ge-hide-ads=\"1\"] .ebay-ad {\n  display: none !important;\n}" + "\n" + (GE.rootCss ? GE.rootCss() : '');

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
