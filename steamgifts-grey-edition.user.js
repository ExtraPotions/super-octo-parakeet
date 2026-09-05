// ==UserScript==
// @name           SteamGifts Grey Edition
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        1.6.2
// @description    Lean dark charcoal Grey Edition theme for SteamGifts (and SteamTrades / SGTools). Compatible with ESGST (JustArchi/A-ESGST). Derived from / inspired by SG Dark Grey by SquishedPotatoe (CC-BY-SA-4.0).
// @author         expDARE
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @downloadURL    https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/steamgifts-grey-edition.user.js
// @updateURL      https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/steamgifts-grey-edition.user.js
// @supportURL     https://github.com/ExtraPotions/super-octo-parakeet/issues
// @match          *://www.steamgifts.com/*
// @match          *://www.steamtrades.com/*
// @match          *://www.sgtools.info/*
// @license        CC-BY-SA-4.0
// @require        https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/grey-edition-common.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @run-at         document-start
// @noframes
// @icon           https://cdn.steamgifts.com/img/favicon.ico
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
      rootCss: function () { return ''; }
    };
    if (typeof window !== 'undefined') window.GreyEdition = globalThis.GreyEdition;
  }
  var GE = globalThis.GreyEdition || window.GreyEdition;
  GE.applyDocumentFlags('steamgifts');
  GE.registerMenus('steamgifts');

  var STYLE_ID = 'grey-edition-steamgifts';
  var css = `/* SteamGifts Grey Edition v1.6.2 — lean CSS rewrite
   Inspired by / derived from SG Dark Grey by SquishedPotatoe (CC-BY-SA-4.0)
   Compatible with ESGST / A-ESGST — does not remove ESGST nodes.
*/
:root {
  color-scheme: dark;
  --ge-body: #252522;
  --ge-surface: #2a2a28;
  --ge-header: #1c1c1a;
  --ge-muted: #333333;
  --ge-text: rgba(166,166,166,0.95);
  --ge-text-bright: rgba(204,204,204,0.9);
  --ge-link: rgba(98,159,192,0.85);
  --ge-link-bright: #7ec8f0;
  --ge-secondary: #788087;
  --ge-headings: #8f9fb3;
  --ge-border: rgba(0,0,0,0.7);
  --ge-nav-btn: linear-gradient(#39576f 0%, #273d4f 100%);
  --ge-header-footer: linear-gradient(#2e3d4d 0%, #212b36 100%);
  --ge-enter-green-bg: linear-gradient(#5a7740 0%, #283e18 100%);
  --ge-enter-green-txt: rgba(201,227,181,0.95);
  --ge-enter-yellow-bg: linear-gradient(#85891a 0%, #575a02 100%);
  --ge-enter-yellow-txt: rgba(218,220,163,0.95);
  --ge-enter-red-bg: linear-gradient(#a54040 0%, #6a1010 100%);
  --ge-enter-red-txt: #efa9a9;
  --ge-enter-blue-bg: linear-gradient(#3a6a8a 0%, #1e3d52 100%);
  --ge-enter-blue-txt: rgba(160,210,240,0.95);
  --ge-pageheading: linear-gradient(#3b3b3b 0%, #2e2e2e 100%);
  --ge-pinned: linear-gradient(#212f3b 0%, #1d242b 100%);
  --ge-content: rgba(24,24,22,0.35);
  --ge-input: #333333;
}

html, body {
  background: var(--ge-body) !important;
  background-color: var(--ge-body) !important;
  background-image: none !important;
  color: var(--ge-text) !important;
}
/* Keep charcoal under content — transparent wrappers let SteamGifts #f0f2f5 bleed through */
.page__outer-wrap, .page_outer_wrap, .page__inner-wrap {
  background: var(--ge-body) !important;
  background-color: var(--ge-body) !important;
  background-image: none !important;
  color: var(--ge-text) !important;
}

html[data-ge-intensity="soft"] {
  --ge-body: #2c2c29;
  --ge-surface: #32322e;
  --ge-muted: #3a3a36;
}
html[data-ge-intensity="soft"],
html[data-ge-intensity="soft"] body {
  background-color: #2c2c29 !important;
}

/* Do NOT paint flex layout wrappers — causes overlap/hidden UI */
.widget-container {
  background: transparent !important;
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
  filter: none !important;
}

header, .header, .header__outer-wrap, .header_outer_wrap {
  background-image: var(--ge-header-footer) !important;
  background-color: #212b36 !important;
  border-color: var(--ge-border) !important;
  color: var(--ge-text-bright) !important;
  position: relative !important;
  z-index: 100 !important;
}
header nav, .nav__left-container, .nav__right-container {
  background: transparent !important;
}
.nav__button, .nav_btn, .nav__button-container .nav__button,
.esgst-header-menu-button {
  background-image: var(--ge-nav-btn) !important;
  color: var(--ge-text-bright) !important;
  border-color: #000 !important;
}
.nav__button:hover, .nav_btn:hover,
.nav__button-container.is-selected .nav__button,
.esgst-header-menu-button:hover {
  filter: brightness(1.25) saturate(1.3);
}
.nav__relative-dropdown, .nav__absolute-dropdown, .nav__row,
.dropdown, .dropdown_btn, .esgst-header-menu-absolute-dropdown,
.esgst-header-menu-dropdown {
  background: linear-gradient(#404040 0%, #363636 100%) !important;
  background-color: #363636 !important;
  border-color: #000 !important;
  color: var(--ge-text) !important;
  z-index: 200 !important;
}
.nav__row:hover, .dropdown_btn:hover, .esgst-header-menu-row:hover {
  background-image: var(--ge-nav-btn) !important;
}
.nav__row__summary__name, .nav__notification,
.nav__points, .nav_points, a.nav__button[href*="account"] {
  color: var(--ge-text-bright) !important;
}

.featured__container, .featured__outer-wrap {
  background-color: rgba(24,46,67,0.55) !important;
  border-color: rgba(0,0,0,0.8) !important;
  position: relative !important;
  z-index: 1 !important;
  overflow: visible !important;
}
.featured__inner-wrap, .featured__heading, .featured__columns, .featured__column {
  color: var(--ge-text) !important;
  border-color: rgba(0,0,0,0.45) !important;
}
.featured__heading__medium a, .featured__heading a {
  color: #c8c8c8 !important;
}
.featured__heading__small, .featured__column {
  color: var(--ge-secondary) !important;
}
.pinned-giveaways-header, .pinned-giveaways-tab, .pinned-giveaways-expand {
  background-image: var(--ge-pinned) !important;
  background-color: #1d242b !important;
  color: var(--ge-text-bright) !important;
  border-color: rgba(0,0,0,0.45) !important;
  position: relative !important;
  z-index: 2 !important;
}
.pinned-giveaways, .pinned-giveaways__inner-wrap, .pinned_giveaways {
  background-image: var(--ge-pinned) !important;
  background-color: #1d242b !important;
  border-color: rgba(0,0,0,0.45) !important;
  overflow: visible !important;
  position: relative !important;
  z-index: 1 !important;
}
.sidebar__search-container, .sidebar__search-input {
  background-color: var(--ge-input) !important;
  background: var(--ge-input) !important;
}

.giveaway__row-outer-wrap, .giveaway_row {
  background-color: transparent !important;
  border-color: rgba(0,0,0,0.35) !important;
  color: var(--ge-text) !important;
  overflow: visible !important;
  position: relative !important;
  filter: none !important;
}
.giveaway__row-inner-wrap, .giveaway-summary {
  background-color: var(--ge-content) !important;
  border-color: rgba(0,0,0,0.4) !important;
  color: var(--ge-text) !important;
  overflow: visible !important;
  position: relative !important;
  filter: none !important;
}
.giveaway__row-outer-wrap:hover .giveaway__row-inner-wrap {
  background-color: rgba(36,36,32,0.55) !important;
}
.giveaway__heading, .giveaway__summary {
  overflow: visible !important;
  position: relative !important;
  z-index: 1 !important;
}
.giveaway__heading__name, .giveaway__heading__thin {
  color: #adadad !important;
}
.giveaway__links a:not(.esgst-gc), .giveaway__columns, .giveaway__column {
  color: var(--ge-text) !important;
  border-color: rgba(0,0,0,0.7) !important;
}
.giveaway__columns:not(.esgst-gv-icons):not(.esgst-giveaway-panel) > *:not(.giveaway__column--group):not(.giveaway__column--whitelist):not(.giveaway__column--invite-only):not(.giveaway__column--community-voted):not(.giveaway__column--contributor-level):not(.giveaway__column--region-restricted):not(form):not(.esgst-elgb-button):not(.esgst-button-set):not(.esgst-gc):not(.giveaway__column--width-fill) {
  background-image: linear-gradient(rgba(255,255,255,0.06) 0, rgba(115,115,115,0.06) 100%) !important;
  border-color: rgba(0,0,0,0.7) !important;
  box-shadow: 0 0 0 1px rgba(255,255,255,0.05) !important;
}

.is-faded:not(em), .giveaway__row-inner-wrap.is-faded,
.giveaway-gridview .faded, .giveaway__row-inner-wrap.esgst-faded {
  /* Avoid heavy opacity — it greys out Enter/Leave icons too */
  opacity: 1 !important;
  filter: none !important;
  background-color: rgba(20, 20, 18, 0.55) !important;
}
.giveaway__row-inner-wrap.is-faded .giveaway__summary,
.giveaway__row-inner-wrap.is-faded .giveaway__heading__name,
.giveaway__row-inner-wrap.esgst-faded .giveaway__summary {
  opacity: 0.65 !important;
}
.giveaway__row-inner-wrap.is-faded .giveaway__quick-entry-wrap,
.giveaway__row-inner-wrap.esgst-faded .giveaway__quick-entry-wrap {
  opacity: 1 !important;
  filter: none !important;
}

.giveaway__column--contributor-level--positive,
.featured__column--contributor-level--positive,
.giveaway__column--contributor-level--positive:not(.esgst-glh-highlight),
.featured__column--contributor-level--positive:not(.esgst-glh-highlight) {
  background-image: var(--ge-enter-green-bg) !important;
  color: var(--ge-enter-green-txt) !important;
  border-color: #000 !important;
}
.giveaway__column--contributor-level--negative,
.featured__column--contributor-level--negative {
  background-image: var(--ge-enter-red-bg) !important;
  color: var(--ge-enter-red-txt) !important;
}
.giveaway__column--region-restricted,
.featured__column--region-restricted,
.giveaway__column--invite-only,
.giveaway__column--community-voted {
  background-image: var(--ge-enter-yellow-bg) !important;
  color: var(--ge-enter-yellow-txt) !important;
  border-color: #000 !important;
}
.giveaway__column--group, .featured__column--group {
  background-image: linear-gradient(#4b8a42 0%, #21471f 100%) !important;
  color: #7ac270 !important;
}

/* Enter / leave / quick-entry — Enter MUST stay green */
.giveaway__quick-entry-wrap,
.giveaway__quick-entry-form {
  overflow: visible !important;
  position: relative !important;
  z-index: 5 !important;
  background: transparent !important;
  filter: none !important;
  opacity: 1 !important;
}
.giveaway__quick-entry-btn,
.giveaway__quick-entry-btn i {
  opacity: 1 !important;
  filter: none !important;
  visibility: visible !important;
}
.giveaway__quick-entry-btn--insert,
.giveaway__quick-entry-btn[data-do="entry_insert"],
.sidebar__entry-insert,
a.sidebar__entry-insert,
button.sidebar__entry-insert,
.sidebar__action-button,
.nav__sits,
.form__submit-button,
.form__sync-default,
.featured__action-button,
.entry.validEntry,
.btn_action.green,
.page__heading__button--green,
.page_heading_btn.green,
.btn-success,
#btn-get,
.esgst-sttb-button,
.esgst-stbb-button,
.table__column__key__redeem,
.esgst-enter-button,
.esgst-egh-button,
[data-do="entry_insert"],
.js__submit-hide-games {
  background-image: var(--ge-enter-green-bg) !important;
  background-color: #3d5a28 !important;
  color: var(--ge-enter-green-txt) !important;
  border-color: #000 !important;
}
.giveaway__quick-entry-btn--insert i,
.giveaway__quick-entry-btn[data-do="entry_insert"] i,
.sidebar__entry-insert i,
[data-do="entry_insert"] i {
  color: var(--ge-enter-green-txt) !important;
}
.giveaway__quick-entry-btn--delete,
.giveaway__quick-entry-btn[data-do="entry_delete"],
.sidebar__entry-delete,
[data-do="entry_delete"] {
  background-image: var(--ge-enter-yellow-bg) !important;
  background-color: #6a6e10 !important;
  color: var(--ge-enter-yellow-txt) !important;
  border-color: #000 !important;
}
.giveaway__quick-entry-btn--delete i,
[data-do="entry_delete"] i,
.sidebar__entry-delete i {
  color: var(--ge-enter-yellow-txt) !important;
}
.giveaway__quick-entry-btn--description {
  background-image: var(--ge-enter-blue-bg) !important;
  background-color: #2a4a62 !important;
  color: var(--ge-enter-blue-txt) !important;
  border-color: #000 !important;
}
.giveaway__quick-entry-btn--description i {
  color: var(--ge-enter-blue-txt) !important;
}

/* Beat SteamGifts icon-only greens — paint the whole control */
.giveaway__quick-entry-btn--insert,
.giveaway__quick-entry-btn[data-do="entry_insert"],
.sidebar__entry-insert,
.featured__action-button,
.form__submit-button,
.btn_action.green,
.esgst-enter-button {
  background: var(--ge-enter-green-bg) !important;
  background-image: var(--ge-enter-green-bg) !important;
  background-color: #3d5a28 !important;
  color: var(--ge-enter-green-txt) !important;
  border: 1px solid #000 !important;
  box-shadow: inset 0 1px 0 rgba(255,255,255,0.12) !important;
}
.giveaway__quick-entry-btn--insert.is-locked,
.giveaway__quick-entry-btn[data-do="entry_insert"].is-locked {
  background-image: linear-gradient(#555 0%, #3a3a3a 100%) !important;
  background-color: #4a4a4a !important;
  color: #b0b0b0 !important;
  opacity: 1 !important;
  display: inline-flex !important;
}

.sidebar__error, .sidebar__suspension, .btn_action.red,
.page__heading__button--red, .page_heading_btn.red, .btn-danger,
.header__error {
  background-image: var(--ge-enter-red-bg) !important;
  background-color: #7a2020 !important;
  color: var(--ge-enter-red-txt) !important;
  border-color: #000 !important;
}
.sidebar__entry-loading, .btn_action.yellow, .esgst-loading {
  background-image: var(--ge-enter-yellow-bg) !important;
  color: var(--ge-enter-yellow-txt) !important;
}

.sidebar {
  background-color: rgba(24,24,22,0.33) !important;
  border-color: rgba(0,0,0,0.4) !important;
  color: var(--ge-text) !important;
  overflow: visible !important;
  position: relative !important;
  z-index: 2 !important;
}
.sidebar__navigation, .sidebar__search-container,
.sidebar__navigation__item, .sidebar_search {
  background-color: transparent !important;
  border-color: rgba(0,0,0,0.4) !important;
  color: var(--ge-text) !important;
}
.sidebar__heading, h3.sidebar__heading {
  color: var(--ge-headings) !important;
}
.sidebar__navigation__item__link, .sidebar__navigation__item__name,
.sidebar a {
  color: rgba(119,185,223,0.9) !important;
}
.sidebar__navigation__item.is-selected,
.sidebar__navigation__item__link.is-selected {
  background-image: var(--ge-pageheading) !important;
  color: var(--ge-text-bright) !important;
}
.sidebar__search-input, .sidebar input[type="text"] {
  background: var(--ge-input) !important;
  border-color: var(--ge-border) !important;
  color: var(--ge-text) !important;
}

.page__heading, .page_heading, .page__heading__breadcrumbs,
.page_heading_breadcrumbs, .page__heading__button, .page_heading_btn {
  background-image: var(--ge-pageheading) !important;
  border-color: var(--ge-border) !important;
  color: rgba(119,185,223,0.9) !important;
  position: relative !important;
  z-index: 2 !important;
  overflow: visible !important;
}
.page__heading__breadcrumbs a, .page_heading_breadcrumbs a {
  color: rgba(119,185,223,0.9) !important;
}
.pagination, .pagination__navigation, .pagination_navigation,
.pagination__results {
  background-color: transparent !important;
  color: var(--ge-text) !important;
  overflow: visible !important;
  position: relative !important;
  z-index: 1 !important;
}
.pagination__navigation a, .pagination_navigation a {
  color: var(--ge-link) !important;
  background-image: var(--ge-pageheading) !important;
  border-color: var(--ge-border) !important;
}
.pagination__navigation a.is-selected, .pagination__navigation .is-selected {
  filter: brightness(1.25);
  color: var(--ge-text-bright) !important;
}

.page__content, .page_content, .comment, .comment__parent,
.comment__child, .comments, .table, .table__row-outer-wrap,
.table__row-inner-wrap, .table__heading,
.notification, .poll, .poll__answer, .markdown,
.discussion, .deals, .trade {
  background-color: var(--ge-content) !important;
  border-color: rgba(0,0,0,0.4) !important;
  color: var(--ge-text) !important;
}
.block_header, .block_header_text, .block_header_link {
  background-color: transparent !important;
  color: var(--ge-headings) !important;
}
.table__column--width-fill, .table__column__heading,
.table__column__secondary-link:not(.esgst-namwc-highlight):not(.esgst-wbh-highlight) {
  color: var(--ge-text) !important;
}
.table__row-outer-wrap:hover, .table__row-inner-wrap:hover {
  background-color: rgba(40,40,36,0.5) !important;
}
.markdown a:not(.esgst-gc),
.comment__username:not(.comment__username--op) a:not(.esgst-namwc-highlight):not(.esgst-wbh-highlight),
.giveaway__username:not(.esgst-namwc-highlight):not(.esgst-wbh-highlight),
.table__column__secondary-link:not(.esgst-namwc-highlight):not(.esgst-wbh-highlight):not(.table__column__select) {
  color: var(--ge-link) !important;
}
.comment__username--op a:not(.esgst-namwc-highlight):not(.esgst-wbh-highlight) {
  color: rgba(201,227,181,0.95) !important;
}
h1, h2, h3, .form__heading__text {
  color: var(--ge-headings) !important;
}

input:not([type="hidden"]):not([type="checkbox"]):not([type="radio"]),
textarea, select,
.form__input, .form__text {
  background-color: var(--ge-input) !important;
  border-color: var(--ge-border) !important;
  color: var(--ge-text) !important;
}
.form__rows, .form__row, .form__heading, .form_list_item {
  background-color: transparent !important;
  border-color: var(--ge-border) !important;
  color: var(--ge-text) !important;
}
.popup, .popup__outer-wrap, .popup__inner-wrap, .popup__heading,
.popup__actions, .popup_outer_wrap, .popup_inner_wrap,
.b-modal, .modal, .lightbox, .lightbox-header, .lightbox-footer-outer,
.lightbox-content-image {
  background: #2e2e2e !important;
  background-color: #2e2e2e !important;
  border-color: rgba(0,0,0,0.65) !important;
  color: var(--ge-text) !important;
  z-index: 500 !important;
}
.lightbox-header, .lightbox-footer-outer {
  background-image: var(--ge-header-footer) !important;
}
.popup__actions a, .popup_actions a {
  color: var(--ge-link) !important;
}

.footer__outer-wrap, footer, .footer_outer_wrap, .footer__inner-wrap,
.footer_inner_wrap {
  background-image: var(--ge-header-footer) !important;
  border-color: var(--ge-border) !important;
  color: var(--ge-text) !important;
  clear: both !important;
  position: relative !important;
  z-index: 1 !important;
}
.footer__inner-wrap a, .footer_inner_wrap a, .footer_column_link {
  color: var(--ge-link) !important;
}

.hpsgck, .fanatical_container, .bundle_container, [class*="hpsg"] {
  background-color: var(--ge-surface) !important;
  border-color: rgba(0,0,0,0.45) !important;
  color: var(--ge-text) !important;
  overflow: hidden !important;
}
.fanatical_name, .bundle_name {
  color: rgba(119,185,223,0.9) !important;
}
.fanatical_savings, .fanatical_pricing, .bundle_pricing {
  background-image: var(--ge-enter-green-bg) !important;
  color: var(--ge-enter-green-txt) !important;
}
html[data-ge-hide-ads="1"] .hpsgck,
html[data-ge-hide-ads="1"] .fanatical_container,
html[data-ge-hide-ads="1"] .bundle_container,
html[data-ge-hide-ads="1"] [class*="hpsg"],
html[data-ge-hide-ads="1"] .adsbygoogle,
html[data-ge-hide-ads="1"] [id*="google_ads"],
html[data-ge-hide-ads="1"] [data-ad] {
  display: none !important;
}

.notification--success {
  background-image: linear-gradient(rgba(117,185,39,0.14) 0%, rgba(56,92,15,0.63) 100%) !important;
  border-color: rgba(73,131,7,0.7) !important;
  color: rgba(192,236,142,0.8) !important;
}
.notification--warning {
  background-image: linear-gradient(rgba(180,185,39,0.23) 0%, rgba(102,105,17,0.9) 100%) !important;
  color: rgba(230,233,165,0.9) !important;
}
.notification--danger, .notification--error {
  background-image: linear-gradient(rgba(185,39,39,0.23) 0%, rgba(105,17,17,0.9) 100%) !important;
  color: #ed8282 !important;
}
.notification--info {
  background-image: linear-gradient(rgba(39,112,185,0.23) 0%, rgba(17,61,105,0.9) 100%) !important;
  color: #92bde8 !important;
}

code, pre, .markdown code, .markdown pre {
  background: var(--ge-surface) !important;
  color: #b7b776 !important;
  border-color: rgba(0,0,0,0.45) !important;
}
blockquote, .markdown blockquote {
  background: rgba(0,0,0,0.18) !important;
  border-left-color: rgba(130,130,125,0.64) !important;
  color: rgba(161,161,161,0.95) !important;
}

.giveaway_image_thumbnail, .giveaway_image_avatar, .global__image-outer-wrap,
.featured_giveaway_image_avatar, .nav__avatar-inner-wrap, .table_image_avatar {
  background-color: #404040 !important;
  border-color: rgba(0,0,0,0.65) !important;
  filter: brightness(0.9);
  position: relative !important;
  z-index: 1 !important;
  flex-shrink: 0 !important;
}
.giveaway_image_thumbnail:hover, .global__image-outer-wrap:hover {
  filter: brightness(1);
}

html[data-ge-brighter-links="1"] a:not(.esgst-gc),
html[data-ge-brighter-links="1"] .markdown a:not(.esgst-gc),
html[data-ge-brighter-links="1"] .sidebar__navigation__item__link {
  color: var(--ge-link-bright) !important;
}

.esgst-popup, .esgst-popup-button, .esgst-popup-actions,
.esgst-popup-scrollable, .esgst-popout, .esgst-panel,
.esgst-gf-container, .esgst-menu-split, .esgst-form-row,
.esgst-form-row-indent, .esgst-button-set, .esgst-button-group,
.esgst-header-menu-row, .esgst-modal, [class*="esgst-popup"],
[class*="esgst-popout"], [class*="esgst-panel"], [class*="esgst-filter"],
.esgst-gv-popout, .esgst-ap-popup, .esgst-settings {
  background-color: #2a2a28 !important;
  background: #2a2a28 !important;
  border-color: rgba(0,0,0,0.5) !important;
  color: var(--ge-text) !important;
}
.esgst-popup-button, .esgst-button, .esgst-clickable {
  background-image: var(--ge-nav-btn) !important;
  color: var(--ge-text-bright) !important;
  border-color: #000 !important;
}
.esgst-popup a:not(.esgst-gc), .esgst-popout a:not(.esgst-gc),
.esgst-popup-actions a {
  color: var(--ge-link) !important;
}
.esgst-green, .esgst-positive { color: rgba(120,167,73,0.9) !important; }
.esgst-red, .esgst-negative { color: rgba(221,60,60,0.95) !important; }
.esgst-yellow, .esgst-orange { color: rgba(230,233,165,0.9) !important; }

.trade_row, .trade, .trades, .sgtools, .sg-tools {
  background-color: var(--ge-content) !important;
  color: var(--ge-text) !important;
  border-color: rgba(0,0,0,0.4) !important;
}
.btn_action.green {
  background-image: var(--ge-enter-green-bg) !important;
  background-color: #3d5a28 !important;
  color: var(--ge-enter-green-txt) !important;
  border-color: #000 !important;
}

.secondary, .giveaway__columns .fa, .icon-red, .icon-grey {
  color: var(--ge-secondary) !important;
}
.icon-green, i.fa.fa-check-circle-o.green, .sg-icon-green {
  color: rgba(120,167,73,0.85) !important;
}

::-webkit-scrollbar { width: 10px; height: 10px; }
::-webkit-scrollbar-track { background: #1a1a18; }
::-webkit-scrollbar-thumb { background: #3d3d3d; border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: #4a4a48; }
` + '\n' + (GE.rootCss ? GE.rootCss() : '');

  function inject() {
    var node = document.getElementById(STYLE_ID);
    if (!node) {
      node = document.createElement('style');
      node.id = STYLE_ID;
      (document.documentElement || document.head || document).appendChild(node);
    }
    if (node.textContent !== css) node.textContent = css;
    GE.applyDocumentFlags('steamgifts');
  }

  inject();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', inject, { once: true });
  }
  var obs = new MutationObserver(function () {
    if (!document.getElementById(STYLE_ID)) inject();
  });
  obs.observe(document.documentElement, { childList: true });
})();
