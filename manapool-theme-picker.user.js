// ==UserScript==
// @name           ManaPool Theme Picker
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        2.0.1
// @description    Dark charcoal theme for Mana Pool — collapsible home sections + collapse/expand in Theme Picker menu
// @author         expDARE
// @license        CC-BY-NC-4.0
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @match          *://manapool.com/*
// @match          *://www.manapool.com/*
// @icon           https://manapool.com/favicon.svg
// @run-at         document-start
// @downloadURL    https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/manapool-theme-picker.user.js
// @updateURL      https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/manapool-theme-picker.user.js
// @require        https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/theme-picker-common.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

(function () {
  'use strict';

  if (typeof globalThis.ThemePicker === 'undefined' && typeof window !== 'undefined' && typeof window.ThemePicker === 'undefined') {
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
  GE.applyDocumentFlags('manapool');
  GE.registerMenus('manapool', 'https://manapool.com/favicon.svg');

  var STYLE_ID = 'theme-picker-manapool';
  var css = "/* ManaPool Theme Picker */\n:root {\n  color-scheme: dark !important;\n  --background: 60 3% 14% !important;          /* #252522 */\n  --foreground: 0 0% 65% !important;           /* ~#a6a6a6 */\n  --muted: 60 3% 20% !important;               /* #333 */\n  --muted-foreground: 210 5% 50% !important;   /* #788087 */\n  --popover: 60 4% 16% !important;             /* #2a2a28 */\n  --popover-foreground: 0 0% 65% !important;\n  --card: 60 4% 16% !important;\n  --card-foreground: 0 0% 65% !important;\n  --border: 0 0% 0% / 0.45 !important;\n  --input: 0 0% 20% !important;\n  --primary: 201 40% 55% !important;           /* ~#629fc0 link blue */\n  --primary-foreground: 0 0% 90% !important;\n  --secondary: 210 20% 22% !important;         /* navy-ish */\n  --secondary-foreground: 0 0% 80% !important;\n  --accent: 210 25% 25% !important;\n  --accent-foreground: 0 0% 80% !important;\n  --destructive: 0 55% 45% !important;\n  --destructive-foreground: 0 70% 80% !important;\n  --ring: 201 40% 55% !important;\n}\n\nhtml, body, .app, #app {\n  background-color: #252522 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n\n/* Tailwind utility overrides that beat light theme */\n.bg-white { background-color: #2a2a28 !important; }\n.bg-gray-50, .bg-gray-100, .bg-gray-200 { background-color: #2a2a28 !important; }\n.bg-gray-300 { background-color: #333333 !important; }\n.hover\\:bg-gray-100:hover, .hover\\:bg-gray-200:hover { background-color: #333333 !important; }\n\n.text-gray-900, .text-gray-800, .text-gray-700 { color: #adadad !important; }\n.text-gray-500, .text-gray-400 { color: #788087 !important; }\n.text-slate-700, .text-slate-400 { color: #8f9fb3 !important; }\n\n/* Nav / header */\nheader.bg-white, header {\n  background: linear-gradient(#2e3d4d 0%, #212b36 100%) !important;\n  border-color: rgba(0, 0, 0, 0.7) !important;\n}\nheader a, header button, header .text-primary {\n  color: rgba(204, 204, 204, 0.95) !important;\n}\nheader a:hover, header button:hover {\n  color: rgba(119, 185, 223, 0.95) !important;\n  background-color: transparent !important;\n}\n/* Active/highlighted nav pills */\nheader a[href=\"/browse_sealed\"],\nheader button[data-popover-trigger],\nheader a.text-primary {\n  color: rgba(201, 227, 181, 0.95) !important;\n}\n\n/* Logo SVG wordmark \u00e2\u0080\u0094 force light fills on text paths */\nheader a[href=\"/\"] svg text,\nheader a[href=\"/\"] svg .cls-text,\nheader a[href=\"/\"] svg path[fill=\"#1e3a5f\"],\nheader a[href=\"/\"] svg path[fill=\"#0f2744\"],\nheader a[href=\"/\"] svg [fill=\"#00205b\"],\nheader a[href=\"/\"] svg [fill=\"#003087\"] {\n  fill: #c8c8c8 !important;\n}\n/* Broad: lighten dark fills in logo SVG (keep blue mark, lighten near-black wordmark) */\nheader a[href=\"/\"] svg path[fill=\"#3b384d\"],\nheader a[href=\"/\"] svg path[fill=\"#28273b\"],\nheader a[href=\"/\"] svg path[fill=\"#202033\"],\nheader a[href=\"/\"] svg path[fill=\"#282840\"],\nheader a[href=\"/\"] svg path[fill=\"#303048\"],\nheader a[href=\"/\"] svg path[fill=\"#484660\"],\nheader a[href=\"/\"] svg path[fill=\"#4e4c66\"] {\n  fill: #a8a8b8 !important;\n}\n/* Wordmark letters often use solid dark blues \u00e2\u0080\u0094 catch low-luminance fills via filter on the text group if present */\nheader a[href=\"/\"] svg {\n  filter: none;\n}\nheader .sr-only + a svg,\nheader a[href=\"/\"] {\n  color: #c8c8c8 !important;\n}\n\n/* Popovers / menus (bits-ui portals) \u00e2\u0080\u0094 the white boxes you circled */\n[data-popover-content],\n[data-bits-popover-content],\n[data-radix-popper-content-wrapper],\n[role=\"dialog\"],\n[role=\"menu\"],\n[data-state=\"open\"][class*=\"bg-\"],\ndiv[data-popover-content],\n.bg-popover {\n  background-color: #2a2a28 !important;\n  background: #2a2a28 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.7) !important;\n}\n[data-popover-content] .bg-white,\n[role=\"dialog\"] .bg-white,\n[role=\"menu\"] .bg-white,\n[data-popover-content] .bg-gray-50,\n[data-popover-content] .bg-gray-100 {\n  background-color: #333333 !important;\n}\n[data-popover-content] a,\n[role=\"dialog\"] a,\n[role=\"menu\"] a {\n  color: rgba(98, 159, 192, 0.9) !important;\n}\n[data-popover-content] .text-primary,\n[role=\"dialog\"] .text-primary {\n  color: rgba(119, 185, 223, 0.95) !important;\n}\n\n/* Product cards */\narticle.bg-white,\n.group.bg-white,\nli article {\n  background-color: #2a2a28 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n.bg-gray-100.overflow-x-auto,\nul .bg-gray-100 {\n  background-color: rgba(24, 24, 22, 0.5) !important;\n}\n\n/* Rarity strip must stay a thin bar (gold/silver) \u00e2\u0080\u0094 don't let it fill the card */\n.gradient-wrapper {\n  height: 15px !important;\n  max-height: 15px !important;\n  min-height: 15px !important;\n  flex: 0 0 15px !important;\n  overflow: hidden !important;\n  position: relative !important;\n  align-self: stretch !important;\n}\n.gradient-rare { background: linear-gradient(to left, #d4af37, #fc0, #d4af37) !important; }\n.gradient-mythic { background: linear-gradient(to left, #d9878a, #fbd3c9, #d9878a) !important; }\n.gradient-uncommon { background: linear-gradient(to left, #909497, #c0c0c0, #909497) !important; }\n.gradient-common { background: linear-gradient(to bottom, #333, #000) !important; }\n\n\n/* Inputs */\ninput, textarea, select {\n  background-color: #333333 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.7) !important;\n}\n\n/* Footer */\nfooter {\n  background: linear-gradient(#2e3d4d 0%, #212b36 100%) !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n}\n\n\n/* === v1.3: darker top bars + brighter stock/condition chips === */\n\n/* Header \u00e2\u0080\u0094 deeper charcoal (less blue wash) */\nheader,\nheader.bg-white,\nheader.sticky {\n  background: #1c1c1a !important;\n  background-color: #1c1c1a !important;\n  background-image: none !important;\n  border-bottom: 1px solid rgba(0, 0, 0, 0.85) !important;\n}\n\n/* Breadcrumb strip (was bg-blue-50 / light grey) */\nnav[aria-label=\"Breadcrumb\"],\nnav[aria-label=\"Breadcrumb\"] ol,\nnav[aria-label=\"Breadcrumb\"] .bg-blue-50,\n.bg-blue-50 {\n  background-color: #2a2a28 !important;\n  background: #2a2a28 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  box-shadow: none !important;\n}\nnav[aria-label=\"Breadcrumb\"] a,\nnav[aria-label=\"Breadcrumb\"] button {\n  color: rgba(98, 159, 192, 0.95) !important;\n}\nnav[aria-label=\"Breadcrumb\"] .text-gray-300,\nnav[aria-label=\"Breadcrumb\"] svg {\n  color: #788087 !important;\n}\n\n/* In-stock / condition chips \u00e2\u0080\u0094 bright saturated pills on dark UI */\nspan.inline-flex.items-center.border.rounded-sm,\n.inline-flex.items-center.border.rounded-sm,\n.inline-flex.items-center.rounded-full.border {\n  font-weight: 700 !important;\n  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.12) !important;\n}\n\n/* Qty / NM \u00e2\u0080\u0094 vivid blue */\n.bg-blue-100 {\n  background-color: #5eb0ef !important;\n}\n.text-blue-800, .text-blue-700 {\n  color: #061018 !important;\n}\n.border-blue-200 {\n  border-color: #8ec8f5 !important;\n}\n.hover\\:bg-blue-200:hover {\n  background-color: #7ec0f2 !important;\n}\n\n/* LP \u00e2\u0080\u0094 vivid mint */\n.bg-green-100 {\n  background-color: #7ddea0 !important;\n  color: #062012 !important;\n}\n.inline-flex.items-center.border.text-green-800,\n.bg-green-100.text-green-800,\n.text-green-800 {\n  color: #062012 !important;\n}\n.border-green-200 {\n  border-color: #a6ebc0 !important;\n}\n.hover\\:bg-green-200:hover {\n  background-color: #95e6b2 !important;\n}\n\n/* MP / yellow-tan */\n.bg-yellow-100, .bg-amber-100, .bg-yellow-200 {\n  background-color: #f0d35a !important;\n}\n.text-yellow-800, .text-amber-800, .text-amber-700, .text-yellow-700 {\n  color: #1a1400 !important;\n}\n.border-yellow-200, .border-amber-200 {\n  border-color: #f5e08a !important;\n}\n.bg-amber-400 {\n  background-color: #f5c542 !important;\n}\n\n/* Foil \u00e2\u0080\u0094 bright lavender */\n.bg-purple-100, .bg-purple-200 {\n  background-color: #c9a0ef !important;\n}\n.bg-purple-400 {\n  background-color: #b57aef !important;\n}\n.text-purple-900, .text-purple-800, .text-purple-700 {\n  color: #1a0828 !important;\n}\n.border-purple-200 {\n  border-color: #d9b8f5 !important;\n}\n\n/* Borderless / Extended Art \u00e2\u0080\u0094 brighter terracotta */\n.bg-orange-100, .bg-orange-200 {\n  background-color: #f0a06a !important;\n}\n.bg-orange-400 {\n  background-color: #f08a45 !important;\n}\n.text-orange-900, .text-orange-800, .text-orange-700 {\n  color: #1a0c00 !important;\n}\n.border-orange-200 {\n  border-color: #f5b890 !important;\n}\n\n/* Surge / pink treatments */\n.bg-pink-100, .bg-rose-100, .bg-pink-200 {\n  background-color: #f5b0c8 !important;\n}\n.text-pink-900, .text-rose-900, .text-pink-800 {\n  color: #1a0610 !important;\n}\n\n/* Indigo / sky / teal accents used on chips */\n.bg-indigo-400 { background-color: #8b8aef !important; }\n.bg-sky-400 { background-color: #5ec8f5 !important; }\n.bg-teal-400 { background-color: #4fd4c4 !important; }\n\n/* Non-Foil / dark chips \u00e2\u0080\u0094 keep dark but with clear light text */\n.bg-gray-100.text-gray-800,\nspan.bg-gray-100,\n.bg-gray-800:not([class*=\"perspective\"]) {\n  /* don't nuke card image frames \u00e2\u0080\u0094 handled below */\n}\n\n/* Generic dark chip (Non-Foil style): prefer readable light text */\n.inline-flex.bg-gray-100,\n.inline-flex.items-center.border.bg-gray-100 {\n  background-color: #4a4a46 !important;\n  color: #e8e8e0 !important;\n}\n.inline-flex.items-center.border.bg-gray-100 .text-gray-800,\n.inline-flex.text-gray-800 {\n  color: #e8e8e0 !important;\n}\n\n/* Stock chip tray under cards \u00e2\u0080\u0094 keep recessed, not muddy white */\n.mt-2.w-full.rounded-b-lg.bg-gray-50,\n.rounded-b-lg.bg-gray-50 {\n  background-color: #222220 !important;\n}\n\n\n/* === v1.3.1: prices = Add button green; logo = NM chip blue === */\n/* Tailwind green-600 used by \"+ Add\" */\n.text-green-700,\n.mt-1.text-xl.font-bold.text-green-700,\n.text-xl.font-bold.text-green-700,\n[class*=\"font-bold\"].text-green-700 {\n  color: #16a34a !important;\n}\n.hover\\:text-green-600:hover { color: #22c55e !important; }\n\n/* Don't let chip LP text steal price color \u00e2\u0080\u0094 LP chips use text-green-800 */\n.inline-flex.items-center.border.bg-green-100,\n.inline-flex.items-center.border.text-green-800 {\n  color: #062012 !important;\n}\n\n/* Logo wordmark \u00e2\u0086\u0092 NM chip blue (#5eb0ef) */\nheader a[href=\"/\"] {\n  color: #5eb0ef !important;\n}\n\n/* === v1.5.1: collapsible homepage sections === */\n.mpge-section-toggle {\n  display: inline-flex !important;\n  align-items: center !important;\n  justify-content: center !important;\n  width: 1.75rem !important;\n  height: 1.75rem !important;\n  margin-right: 0.5rem !important;\n  border-radius: 0.375rem !important;\n  border: 1px solid rgba(0,0,0,0.6) !important;\n  background: #333330 !important;\n  color: #c8c8c8 !important;\n  cursor: pointer !important;\n  font-size: 0.85rem !important;\n  line-height: 1 !important;\n  flex-shrink: 0 !important;\n}\n.mpge-section-toggle:hover {\n  background: #3f3f3b !important;\n  color: #fff !important;\n}\n.mpge-section-head {\n  display: flex !important;\n  align-items: center !important;\n  gap: 0.25rem !important;\n  min-width: 0 !important;\n}\n.mpge-section-head h2 {\n  cursor: pointer !important;\n  display: block !important;\n  visibility: visible !important;\n}\n.mpge-section-collapsed .mpge-section-body {\n  display: none !important;\n}\n\n/* === v1.5.2: collapse/expand all (docked by avatar) === */\n.mpge-collapse-all {\n  display: none !important;\n  align-items: center !important;\n  justify-content: center !important;\n  height: 2.25rem !important;\n  padding: 0 0.65rem !important;\n  margin-right: 0.5rem !important;\n  border-radius: 0.5rem !important;\n  border: 1px solid rgba(0,0,0,0.65) !important;\n  background: #333330 !important;\n  color: #c8c8c8 !important;\n  font-size: 0.75rem !important;\n  font-weight: 700 !important;\n  letter-spacing: 0.02em !important;\n  white-space: nowrap !important;\n  cursor: pointer !important;\n  line-height: 1 !important;\n}\n.mpge-collapse-all:hover {\n  background: #3f3f3b !important;\n  color: #ffffff !important;\n}\n\n/* === v1.6.0: expand portal theming === */\n[data-portal],\n[data-bits-portal],\n[data-bits-content],\n[data-bits-select-content],\n[data-bits-listbox-content],\n[data-bits-combobox-content],\n[data-bits-dialog-content],\n[data-bits-sheet-content],\n[data-bits-drawer-content],\n[data-select-content],\n[data-listbox-content],\n[data-combobox-content],\n[role=\"listbox\"],\n[role=\"combobox\"],\n[data-sheet],\n[data-drawer],\n[data-toast],\n[data-sonner-toast],\n.toast,\n[class*=\"toast\"] {\n  background-color: #2a2a28 !important;\n  background: #2a2a28 !important;\n  color: rgba(166, 166, 166, 0.95) !important;\n  border-color: rgba(0, 0, 0, 0.7) !important;\n}\n\n/* Soft intensity (lighter charcoal) */\nhtml[data-ge-intensity=\"soft\"] {\n  --background: 60 3% 17% !important;\n  --popover: 60 4% 19% !important;\n  --card: 60 4% 19% !important;\n  --muted: 60 3% 24% !important;\n}\nhtml[data-ge-intensity=\"soft\"],\nhtml[data-ge-intensity=\"soft\"] body,\nhtml[data-ge-intensity=\"soft\"] .app,\nhtml[data-ge-intensity=\"soft\"] #app {\n  background-color: #2c2c29 !important;\n}\nhtml[data-ge-intensity=\"soft\"] .bg-white,\nhtml[data-ge-intensity=\"soft\"] .bg-gray-50,\nhtml[data-ge-intensity=\"soft\"] .bg-gray-100,\nhtml[data-ge-intensity=\"soft\"] article.bg-white,\nhtml[data-ge-intensity=\"soft\"] .group.bg-white {\n  background-color: #32322e !important;\n}\n\n/* Dense grid */\nhtml[data-ge-dense=\"1\"] ul.grid,\nhtml[data-ge-dense=\"1\"] .grid,\nhtml[data-ge-dense=\"1\"] [class*=\"grid-cols\"] {\n  gap: 0.45rem !important;\n  row-gap: 0.45rem !important;\n  column-gap: 0.45rem !important;\n}\nhtml[data-ge-dense=\"1\"] article,\nhtml[data-ge-dense=\"1\"] li article {\n  padding-bottom: 0.25rem !important;\n}\n\n/* Hide obvious promo/ad wrappers */\nhtml[data-ge-hide-ads=\"1\"] [class*=\"promo\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"advert\"],\nhtml[data-ge-hide-ads=\"1\"] [class*=\"sponsored\"],\nhtml[data-ge-hide-ads=\"1\"] [data-ad],\nhtml[data-ge-hide-ads=\"1\"] .adsbygoogle,\nhtml[data-ge-hide-ads=\"1\"] iframe[src*=\"doubleclick\"],\nhtml[data-ge-hide-ads=\"1\"] iframe[src*=\"googlesyndication\"] {\n  display: none !important;\n}\n" + "\n" + (GE.rootCss ? GE.rootCss() : '');
  var logoFixed = false;
  var applying = false;
  var NM_BLUE = '#5eb0ef';

  var vars = {
    '--background': '60 3% 14%',
    '--foreground': '0 0% 65%',
    '--muted': '60 3% 20%',
    '--muted-foreground': '210 5% 50%',
    '--popover': '60 4% 16%',
    '--popover-foreground': '0 0% 65%',
    '--card': '60 4% 16%',
    '--card-foreground': '0 0% 65%',
    '--border': '0 0% 18%',
    '--input': '0 0% 20%',
    '--primary': '201 40% 57%',
    '--primary-foreground': '0 0% 90%',
    '--secondary': '210 20% 22%',
    '--secondary-foreground': '0 0% 80%',
    '--accent': '210 25% 25%',
    '--accent-foreground': '0 0% 80%',
    '--ring': '201 40% 55%'
  };

  var SECTION_TITLES = [
    'Recommended for you',
    'Sealed Products',
    'Commander Cards',
    'Recently Listed Unique Cards',
    'Top Sellers'
  ];
  var STORAGE_KEY = 'mpge-collapsed-sections-v1';
  var SCROLL_KEY = 'mpge-section-scroll-v1';

  // Structural-only CSS kept even on Original (no charcoal theme)
  var featureCss = [
    '/* ManaPool Theme Picker features (no theme) */',
    '.mpge-section-collapsed .mpge-section-body { display: none !important; }',
    '.mpge-section-toggle {',
    '  display: inline-flex !important; align-items: center !important; justify-content: center !important;',
    '  width: 1.75rem !important; height: 1.75rem !important; margin-right: 0.5rem !important;',
    '  border-radius: 0.375rem !important; border: 1px solid rgba(0,0,0,0.25) !important;',
    '  background: transparent !important; color: inherit !important; cursor: pointer !important;',
    '  font-size: 0.85rem !important; line-height: 1 !important; flex-shrink: 0 !important;',
    '}',
    '.mpge-section-head { display: flex !important; align-items: center !important; gap: 0.25rem !important; min-width: 0 !important; }',
    '.mpge-section-head h2 { cursor: pointer !important; display: block !important; visibility: visible !important; }',
    '.mpge-collapse-all { display: none !important; }',
    'html[data-ge-dense="1"] ul.grid, html[data-ge-dense="1"] .grid, html[data-ge-dense="1"] [class*="grid-cols"] {',
    '  gap: 0.45rem !important; row-gap: 0.45rem !important; column-gap: 0.45rem !important;',
    '}',
    'html[data-ge-hide-ads="1"] [class*="promo"], html[data-ge-hide-ads="1"] [class*="advert"],',
    'html[data-ge-hide-ads="1"] [class*="sponsored"], html[data-ge-hide-ads="1"] [data-ad],',
    'html[data-ge-hide-ads="1"] .adsbygoogle { display: none !important; }',
    'html[data-ge-hide-sold-out="1"] [data-mpge-sold-out="1"] { display: none !important; }',
    'html[data-ge-compact-prices="1"] .text-green-700, html[data-ge-compact-prices="1"] .text-xl.font-bold { font-size: 0.95rem !important; }',
    'html[data-ge-always-chips="1"] .inline-flex.items-center.border { opacity: 1 !important; visibility: visible !important; }'
  ].join('\n');

  function ensureStyle() {
    var node = document.getElementById(STYLE_ID);
    if (!node) {
      node = document.createElement('style');
      node.id = STYLE_ID;
      (document.documentElement || document.head).appendChild(node);
    }
    if (GE.isThemeEnabled && !GE.isThemeEnabled()) {
      // Original: site theme only + structural features (no charcoal / no rootCss remaps)
      node.textContent = featureCss;
      return;
    }
    if (node.textContent !== css) node.textContent = css;
  }

  function clearThemeOverrides() {
    var root = document.documentElement;
    if (!root) return;
    delete root.dataset.themePickerVars;
    root.classList.remove('dark');
    root.style.removeProperty('color-scheme');
    Object.keys(vars).forEach(function (k) {
      root.style.removeProperty(k);
    });
    logoFixed = false;
  }

  function applyVarsOnce() {
    if (GE.isThemeEnabled && !GE.isThemeEnabled()) {
      clearThemeOverrides();
      return;
    }
    var root = document.documentElement;
    if (root.dataset.themePickerVars === '1') return;
    root.dataset.themePickerVars = '1';
    root.style.colorScheme = 'dark';
    root.classList.add('dark');
    Object.keys(vars).forEach(function (k) {
      root.style.setProperty(k, vars[k]);
    });
  }

  function fixLogoOnce() {
    if (GE.isThemeEnabled && !GE.isThemeEnabled()) return;
    if (logoFixed) return;
    var stops = document.querySelectorAll('header a[href="/"] svg stop[stop-color]');
    if (!stops.length) return;
    logoFixed = true;
    stops.forEach(function (stop) {
      var c = (stop.getAttribute('stop-color') || '').toLowerCase();
      if (!c.startsWith('#')) return;
      var hex = c.slice(1);
      if (hex.length === 3) hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
      if (hex.length !== 6) return;
      var r = parseInt(hex.slice(0, 2), 16);
      var g = parseInt(hex.slice(2, 4), 16);
      var b = parseInt(hex.slice(4, 6), 16);
      var lum = 0.299 * r + 0.587 * g + 0.114 * b;
      if (lum < 100 && b < 160) stop.setAttribute('stop-color', NM_BLUE);
    });
  }

  function isHome() {
    var path = location.pathname.replace(/\/+$/, '') || '/';
    return path === '/';
  }

  function loadCollapsed() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function saveCollapsed(map) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  function loadScrollMap() {
    try {
      return JSON.parse(localStorage.getItem(SCROLL_KEY) || '{}') || {};
    } catch (e) {
      return {};
    }
  }

  function saveScrollMap(map) {
    try {
      localStorage.setItem(SCROLL_KEY, JSON.stringify(map));
    } catch (e) {}
  }

  function setCollapsed(section, collapsed) {
    var title = section.getAttribute('data-mpge-title') || '';
    var wasCollapsed = section.classList.contains('mpge-section-collapsed');
    var scrollMap = loadScrollMap();

    if (collapsed && !wasCollapsed) {
      scrollMap[title] = window.scrollY || window.pageYOffset || 0;
      saveScrollMap(scrollMap);
    }

    section.classList.toggle('mpge-section-collapsed', collapsed);
    var btn = section.querySelector('.mpge-section-toggle');
    if (btn) {
      btn.textContent = collapsed ? '\u25B8' : '\u25BE';
      btn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      btn.title = (collapsed ? 'Expand ' : 'Collapse ') + title;
    }
    var map = loadCollapsed();
    map[title] = !!collapsed;
    saveCollapsed(map);

    if (!collapsed && wasCollapsed) {
      var savedY = scrollMap[title];
      if (typeof savedY === 'number') {
        var cur = window.scrollY || window.pageYOffset || 0;
        if (Math.abs(cur - savedY) < 120 || cur > savedY) {
          requestAnimationFrame(function () {
            try { window.scrollTo(0, savedY); } catch (e) {}
          });
        }
      }
    }

    syncCollapseAllButtons();
  }

  function getEnhancedSections() {
    return Array.prototype.slice.call(document.querySelectorAll('[data-mpge-collapsible="1"]'));
  }

  function allCollapsed() {
    var sections = getEnhancedSections();
    if (!sections.length) return false;
    return sections.every(function (s) {
      return s.classList.contains('mpge-section-collapsed');
    });
  }

  function setAllCollapsed(collapsed) {
    getEnhancedSections().forEach(function (section) {
      setCollapsed(section, collapsed);
    });
    var map = loadCollapsed();
    SECTION_TITLES.forEach(function (title) {
      map[title] = !!collapsed;
    });
    saveCollapsed(map);
    syncCollapseAllButtons();
  }

  function syncCollapseAllButtons() {
    var collapsed = allCollapsed();
    document.querySelectorAll('.mpge-collapse-all').forEach(function (btn) {
      btn.textContent = collapsed ? 'Expand all' : 'Collapse all';
      btn.setAttribute('aria-pressed', collapsed ? 'true' : 'false');
      btn.title = collapsed ? 'Expand all home sections' : 'Collapse all home sections';
    });
  }

  function ensureCollapseAllButtons() {
    // Collapse/expand all lives in the Theme Picker settings menu now
    document.querySelectorAll('.mpge-collapse-all').forEach(function (b) { b.remove(); });
  }

  if (typeof GE.registerSiteActions === 'function') {
    GE.registerSiteActions('manapool', {
      collapseAll: function () {
        enhanceHomeSections();
        setAllCollapsed(true);
      },
      expandAll: function () {
        enhanceHomeSections();
        setAllCollapsed(false);
      }
    });
  }

  function enhanceHomeSections() {
    if (!document.body) return;
    if (!isHome()) return;

    var map = loadCollapsed();
    SECTION_TITLES.forEach(function (title) {
      var headings = document.querySelectorAll('h2');
      var h2 = null;
      for (var i = 0; i < headings.length; i++) {
        if ((headings[i].textContent || '').trim() === title) {
          h2 = headings[i];
          break;
        }
      }
      if (!h2) return;
      var section = h2.closest('div.relative');
      if (!section || section.getAttribute('data-mpge-collapsible') === '1') return;

      section.setAttribute('data-mpge-collapsible', '1');
      section.setAttribute('data-mpge-title', title);
      h2.classList.remove('hidden');
      h2.style.setProperty('display', 'block', 'important');

      var headerRow = h2.parentElement;
      if (!headerRow) return;

      var bodyWrap = document.createElement('div');
      bodyWrap.className = 'mpge-section-body';
      var node = headerRow.nextSibling;
      while (node) {
        var next = node.nextSibling;
        bodyWrap.appendChild(node);
        node = next;
      }
      section.appendChild(bodyWrap);

      var head = document.createElement('div');
      head.className = 'mpge-section-head';
      var btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'mpge-section-toggle';
      btn.setAttribute('aria-label', 'Toggle ' + title);
      head.appendChild(btn);
      headerRow.insertBefore(head, h2);
      head.appendChild(h2);

      function toggle() {
        setCollapsed(section, !section.classList.contains('mpge-section-collapsed'));
      }
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        toggle();
      });
      h2.addEventListener('click', function (e) {
        e.preventDefault();
        toggle();
      });

      setCollapsed(section, !!map[title]);
    });
    ensureCollapseAllButtons();
    syncCollapseAllButtons();
  }


  function markSoldOutCards() {
    var cards = document.querySelectorAll('article, li article, li.group, .group.bg-white');
    for (var i = 0; i < cards.length; i++) {
      var el = cards[i];
      if (el.getAttribute('data-mpge-sold-checked') === '1') continue;
      el.setAttribute('data-mpge-sold-checked', '1');
      var t = (el.textContent || '').toLowerCase();
      var sold = /\bout of stock\b|\bsold out\b|\bno stock\b/.test(t);
      if (!sold) {
        var zero = el.querySelector('.line-through, [class*="sold"], [class*="out-of-stock"]');
        if (zero) sold = true;
      }
      if (sold) el.setAttribute('data-mpge-sold-out', '1');
      else el.removeAttribute('data-mpge-sold-out');
    }
  }

  function persistScrollAggressive() {
    try {
      var map = loadScrollMap();
      getEnhancedSections().forEach(function (section) {
        var title = section.getAttribute('data-mpge-title') || '';
        if (!title) return;
        if (section.classList.contains('mpge-section-collapsed')) return;
        map[title] = window.scrollY || window.pageYOffset || 0;
      });
      saveScrollMap(map);
    } catch (e) {}
  }

  function apply() {
    if (applying) return;
    applying = true;
    try {
      GE.applyDocumentFlags('manapool');
      ensureStyle();
      applyVarsOnce();
      fixLogoOnce();
      enhanceHomeSections();
      ensureCollapseAllButtons();
      markSoldOutCards();
      persistScrollAggressive();
    } finally {
      applying = false;
    }
  }

  apply();
  var sectionTimer = null;
  var obs = new MutationObserver(function () {
    if (!document.getElementById(STYLE_ID)) apply();
    else if (!logoFixed) fixLogoOnce();
    if (sectionTimer) clearTimeout(sectionTimer);
    sectionTimer = setTimeout(function () {
      enhanceHomeSections();
      ensureCollapseAllButtons();
      markSoldOutCards();
    }, 300);
  });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  if (document.body) apply();
  window.addEventListener('pageshow', function () {
    enhanceHomeSections();
    ensureCollapseAllButtons();
    markSoldOutCards();
  });
  window.addEventListener('scroll', function () {
    if (window.__mpgeScrollT) clearTimeout(window.__mpgeScrollT);
    window.__mpgeScrollT = setTimeout(persistScrollAggressive, 200);
  }, { passive: true });
  window.addEventListener('pagehide', persistScrollAggressive);
})();
