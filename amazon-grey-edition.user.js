// ==UserScript==
// @name           Amazon Grey Edition
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        1.5.0
// @description    Dark charcoal theme for Amazon — Grey Edition settings FAB + hide-ads
// @author         expDARE
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @match          *://amazon.com/*
// @match          *://www.amazon.com/*
// @match          *://smile.amazon.com/*
// @match          *://amazon.ca/*
// @match          *://www.amazon.ca/*
// @match          *://amazon.co.uk/*
// @match          *://www.amazon.co.uk/*
// @match          *://amazon.de/*
// @match          *://www.amazon.de/*
// @match          *://amazon.fr/*
// @match          *://www.amazon.fr/*
// @match          *://amazon.it/*
// @match          *://www.amazon.it/*
// @match          *://amazon.es/*
// @match          *://www.amazon.es/*
// @match          *://amazon.co.jp/*
// @match          *://www.amazon.co.jp/*
// @match          *://amazon.com.au/*
// @match          *://www.amazon.com.au/*
// @match          *://amazon.in/*
// @match          *://www.amazon.in/*
// @match          *://amazon.com.mx/*
// @match          *://www.amazon.com.mx/*
// @match          *://amazon.nl/*
// @match          *://www.amazon.nl/*
// @match          *://amazon.se/*
// @match          *://www.amazon.se/*
// @match          *://amazon.pl/*
// @match          *://www.amazon.pl/*
// @match          *://amazon.com.br/*
// @match          *://www.amazon.com.br/*
// @icon           https://www.amazon.com/favicon.ico
// @run-at         document-start
// @downloadURL    https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/amazon-grey-edition.user.js
// @updateURL      https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/amazon-grey-edition.user.js
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
  var SITE = 'amazon';
  var ICON = 'https://www.amazon.com/favicon.ico';
  GE.applyDocumentFlags(SITE);
  GE.registerMenus(SITE, ICON);

  var STYLE_ID = 'grey-edition-amazon';
  var css = "/* Amazon Grey Edition */\n:root { color-scheme: dark !important; }\nhtml, body {\n  background: #252522 !important;\n  background-color: #252522 !important;\n  background-image: none !important;\n  color: rgba(166,166,166,0.95) !important;\n}\na, a:link { color: #7ec8f0 !important; }\na:visited { color: #9fd18a !important; }\na:hover, a:focus { color: #a8dff8 !important; }\nh1, h2, h3, h4, h5, h6 { color: #8f9fb3 !important; }\np, li, label, span, td, th { color: inherit; }\ninput, textarea, select {\n  background: #333333 !important;\n  background-color: #333333 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.7) !important;\n  box-shadow: none !important;\n}\ninput::placeholder, textarea::placeholder { color: #788087 !important; }\nhr { border-color: rgba(0,0,0,0.55) !important; }\ntable, tr, td, th {\n  border-color: rgba(0,0,0,0.35) !important;\n}\n[role=\"dialog\"], [role=\"menu\"], [role=\"listbox\"], [role=\"tooltip\"],\n.modal, .popover, .dropdown, .tooltip, .flyout {\n  background: #2a2a28 !important;\n  background-color: #2a2a28 !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.55) !important;\n}\nhtml[data-ge-intensity=\"soft\"],\nhtml[data-ge-intensity=\"soft\"] body {\n  background-color: #2c2c29 !important;\n}\nhtml[data-ge-brighter-links=\"1\"] a,\nhtml[data-ge-brighter-links=\"1\"] a:link { color: #9ad8f8 !important; }\nhtml[data-ge-brighter-links=\"1\"] a:hover { color: #c5ecff !important; }\n\n/* Amazon Grey Edition v1.5.0 */\n#a-page, #dp, #nav-cover, #navbar, #navbar-main,\n#nav-belt, #nav-main, #nav-subnav, #nav-flyout-anchor,\n#navFooter, .navFooter, #rhf, #navbar.nav-bluebeacon,\n#gw-card-layout, #gw-desktop-herotator,\n#desktop-banner, #pageContent, #dp-container,\n#centerCol, #leftCol, #rightCol, #buybox,\n#apex_desktop, #productTitle, #ppd,\n.a-box, .a-box-inner, .a-cardui, .a-section,\n.s-main-slot, .s-result-item, .s-widget,\n.a-popover, .a-popover-wrapper, .a-popover-inner,\n.a-dropdown, .a-dropdown-common, .nav-flyout,\n#navbar .nav-flyout, #nav-flyout-accountList,\n#nav-flyout-amazonfresh, #nav-flyout-searchAjax,\n.a-modal-scroller, .a-sheet-web, .a-declarative {\n  background-color: #2a2a28 !important;\n  background-image: none !important;\n  color: rgba(166,166,166,0.95) !important;\n  border-color: rgba(0,0,0,0.45) !important;\n}\n#navbar, #nav-belt, #nav-main, #navbar-main,\nheader#navbar-main, .nav-bluebeacon #navbar {\n  background: #1c1c1a !important;\n  background-color: #1c1c1a !important;\n  background-image: none !important;\n}\n#nav-subnav, #nav-progressive-subnav {\n  background: #252522 !important;\n  background-color: #252522 !important;\n}\n#navFooter, .navFooter, .navLeftFooter, .navFooterVerticalColumn {\n  background: linear-gradient(#2e3d4d 0%, #212b36 100%) !important;\n  color: rgba(204,204,204,0.9) !important;\n}\n#nav-logo .nav-logo-link, #nav-logo-sprites {\n  filter: brightness(1.15) contrast(1.05);\n}\n#twotabsearchtextbox, #nav-search-bar-form input,\ninput[type=\"text\"], input[type=\"search\"], input[type=\"email\"],\ninput[type=\"password\"], textarea, select, .a-input-text {\n  background: #333333 !important;\n  color: rgba(204,204,204,0.95) !important;\n  border: 1px solid rgba(0,0,0,0.7) !important;\n}\n.a-color-base, .a-text-normal, .a-size-base, .a-size-base-plus,\n.a-size-medium, .a-size-large, #productTitle, .a-price-whole,\n.a-list-item, .a-expander-content {\n  color: rgba(190,190,185,0.95) !important;\n}\n.a-color-secondary, .a-color-tertiary, .a-text-bold + span {\n  color: #788087 !important;\n}\n.a-price, .a-price .a-offscreen, .a-price-whole, .a-price-fraction,\n.a-color-price, .a-price-range {\n  color: #7ddea0 !important;\n}\n/* Keep Amazon CTA orange recognizable */\n#buy-now-button, #add-to-cart-button, #submitOrderButtonId,\n.a-button-primary .a-button-inner,\ninput#add-to-cart-button, input#buy-now-button,\n.a-button-buyNow .a-button-inner,\n#glow-ingress-block {\n  /* leave brand orange/yellow alone where possible */\n}\n.a-button-primary, .a-button-oneclick, #buy-now-button,\n#add-to-cart-button, .a-button-buyNow {\n  filter: none !important;\n}\n.a-button .a-button-inner {\n  background: linear-gradient(#39576f 0%, #273d4f 100%) !important;\n  color: rgba(204,204,204,0.95) !important;\n  border-color: #000 !important;\n  box-shadow: none !important;\n}\n.a-button-primary .a-button-inner,\n#buy-now-button .a-button-inner,\n#add-to-cart-button .a-button-inner,\nspan.a-button-primary .a-button-inner {\n  background: linear-gradient(#f7ca00 0%, #f0b800 100%) !important;\n  color: #111 !important;\n}\n.a-cardui, .s-card-container, .puis-card-container,\n[data-component-type=\"s-search-result\"],\n.zg-item-immersion, .a-carousel-card {\n  background: #2a2a28 !important;\n  border-color: rgba(0,0,0,0.45) !important;\n}\n.a-divider.a-divider-break, .a-spacing-base {\n  border-color: rgba(0,0,0,0.4) !important;\n}\n#rhf, #rhf-container, .a-carousel-viewport {\n  background: #252522 !important;\n}\nhtml[data-ge-intensity=\"soft\"] .a-box,\nhtml[data-ge-intensity=\"soft\"] .a-cardui,\nhtml[data-ge-intensity=\"soft\"] .s-card-container {\n  background-color: #32322e !important;\n}\nhtml[data-ge-hide-ads=\"1\"] #sponsoredLinks,\nhtml[data-ge-hide-ads=\"1\"] .AdHolder,\nhtml[data-ge-hide-ads=\"1\"] [data-ad-details],\nhtml[data-ge-hide-ads=\"1\"] [data-component-type=\"sp-sponsored-result\"],\nhtml[data-ge-hide-ads=\"1\"] .s-widget-container[cel_widget_id*=\"ad\"],\nhtml[data-ge-hide-ads=\"1\"] .celwidget[data-cel-widget*=\"ad\"],\nhtml[data-ge-hide-ads=\"1\"] iframe[src*=\"doubleclick\"],\nhtml[data-ge-hide-ads=\"1\"] iframe[src*=\"amazon-adsystem\"],\nhtml[data-ge-hide-ads=\"1\"] .adsense-slot {\n  display: none !important;\n}" + "\n" + (GE.rootCss ? GE.rootCss() : '');

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
