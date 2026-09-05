// ==UserScript==
// @name           Amazon Dark Pattern Blocker
// @namespace      https://github.com/ExtraPotions/super-octo-parakeet
// @version        0.1.15
// @description    Remove Amazon dark patterns (Prime upsells, credit cards, Rufus, etc.) — fork of August4067 MIT script; amazon.com only
// @author         expDARE
// @license        MIT
// @homepageURL    https://github.com/ExtraPotions/super-octo-parakeet
// @match          https://www.amazon.com/*
// @match          https://amazon.com/*
// @icon           https://www.amazon.com/favicon.ico
// @run-at         document-start
// @downloadURL    https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/amazon-dark-pattern-blocker.user.js
// @updateURL      https://raw.githubusercontent.com/ExtraPotions/super-octo-parakeet/main/amazon-dark-pattern-blocker.user.js
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// ==/UserScript==

/* jshint esversion: 8 */
/* eslint-env es2017 */

/*
 * Fork of Amazon Dark Pattern Blocker by August4067
 * Original: https://greasyfork.org/en/scripts/563061-amazon-dark-pattern-blocker
 *
 * MIT License
 * Copyright 2025, August4067
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Maintained fork by expDARE — ExtraPotions/super-octo-parakeet
 * Match scope narrowed to amazon.com / www.amazon.com only.
 * 0.1.11: stop removing #desktop-banner / gwm homepage layout (was wiping the homepage).
 * 0.1.12: stop removing #attach-desktop-sideSheet (right-side cart flyout).
 * 0.1.13: protect cart rails (ewc/sw/sc-buy-box); drop broad protection + #sw-maple hides.
 * 0.1.14: remove display:revert force-show (broke ewc/cart); expand cart guards; leave #sc-primeupsell-widget alone.
 * 0.1.15: homepage only strips Join Prime + Rufus; CSS hides exclude #nav-flyout-ewc descendants (fixes blank cart rail).
 */

(function () {
  "use strict";

  // ============================================
  // CONFIGURATION
  // ============================================

  const CONFIG = {
    // Elements to remove from DOM
    selectors: {
      primeUpsells: {
        setting: "removePrimeUpsells",
        // homepageHeroBanner removed in 0.1.11 — #desktop-banner is the main gateway hero, not a Prime-only strip
        productPageIlmPromo: '[data-feature-name="desktop-dp-ilm"]',
        productPagePrimeUpsell: "#primeDPUpsellStaticContainerNPA",
        productPagePrimeUpsellAlt: "#primeDPUpsellStaticContainer",
        deliveryPrimeUpsell:
          "#mir-layout-DELIVERY_BLOCK-slot-SECONDARY_DELIVERY_MESSAGE_LARGE",
        navBarJoinPrime: "#nav-join-prime",
        // 0.1.14: do not hide/remove #sc-primeupsell-widget — sits in cart right rail
        // (#proceed-to-checkout-desktop-container) beside #sc-buy-box
        checkoutPrimeUpsell: "#osu-prime-recommendations",
        checkoutPrimeStripe: "#prime-spc-stripe-recommendations",
        checkoutPrimeIsoa: ".isoa-wrapper-radio",
        searchPagePrimeUpsell:
          ".udm-primary-delivery-message:has(.prime-signup-ingress)",
        searchPagePrimeSavings:
          'span[data-csa-c-owner="PromotionsDiscovery"]:has(label[id^="greenBadge"])',
        businessPrimeUpsell: "#businessPrimeDPUpsellStaticContainer",
        productPagePrimeAccordionUpsell: "#primeSavingsUpsellAccordionRow",
        productPageBuyBoxPrimeUpsell:
          '#shippingMessageInsideBuyBox_feature_div:has(a[href*="prime"])',
        productPageFreeShippingPrimeUpsell:
          '#freeShippingPriceBadging_feature_div:has(a[href*="prime"])',
        productPageExclusivePricing: "#pep_feature_div",
      },
      urgencyTactics: {
        setting: "removeUrgencyTactics",
        cartScarcity: ".sc-product-scarcity",
        buyAgainScarcity: '[class*="_scarcityMessage_"]',
        searchPageScarcity: 'span[aria-label*="left in stock"]',
        searchPageDealCountdown: '.a-badge[data-a-badge-type="deal"]',
        productPageDealBadge: "#dealBadge_feature_div",
        productPageDealProgress: "#dealProgress_feature_div",
        cartLowestPrice30Days: ".sc-delight-pricing",
        productPageLowestPrice30Days: "#delightPricingBadge_feature_div",
      },
      subscribeAndSave: {
        setting: "removeSubscribeNudges",
        cartSnsUpsell: ".sc-subscribe-and-save-upsell-message",
      },
      sponsoredProducts: {
        setting: "removeSponsoredProducts",
        // e.g., sponsoredResult: '[data-component-type="sp-sponsored-result"]',
      },
      creditCardUpsells: {
        setting: "removeCreditCardUpsells",
        cartCreditCardBanner: "#sc-new-upsell",
        // 0.1.13: do not hide #sw-maple — lives inside smart-wagon / right cart rail
        productPageCreditCardBanner: "#issuancePriceblockAmabot_feature_div",
        productPageCreditCardBannerMaple: "#maplePriceblockAmabot_feature_div",
        thankYouPageCreditCard: '[cel_widget_id="typ-mapleSlot"]',
        productPageInstallmentPlan:
          "#paymentOptions_PriceblockMessaging_feature_div",
      },
      aiUpsells: {
        setting: "removeAIUpsells",
        navRufus: "#nav-rufus-disco",
        navHealthAI:
          'li.nav-li:has(a[data-csa-c-content-id="nav_cs_health_ai"])',
        productPageRufus: "#nile-inline_feature_div",
        rufusTextSelectionTooltip: "#rufus-ask-rufus-tooltip",
        rufusPriceIngress: "#rufus-price-ingress",
        rufusPriceInsightsFodcx: "#fodcx_feature_div",
      },
      amazonServicePromos: {
        setting: "removeAmazonServicePromos",
        productPageMusicShoveler: '[cel_widget_id^="kahuna-music"]',
        productPageHeroQuickPromo: "#heroQuickPromoContainer",
        productPageAudibleUpsell: "#audibleUpsellAccordionRow",
        productPageFeedbackSurvey: "#feedbackSurvey_feature_div",
      },
      homepageClutter: {
        setting: "removeHomepageClutter",
        // 0.1.11: do NOT target #gwm-window-layout / [id^="gwm-Deck"] — those are the main homepage cards.
        // Leave empty until safer Prime-only homepage selectors are found.
      },
      amazonBusinessPromos: {
        setting: "removeAmazonBusinessPromos",
        productPageBuyItOnAB: "#buyItOnAB_feature_div",
        productPageB2BUpsell: "#b2bUpsell_feature_div",
      },
      protectionPlans: {
        setting: "removeProtectionPlans",
        productPageProtectionPlan: "#mbb_feature_div",
        // 0.1.12+: never touch #attach-desktop-sideSheet (right-side cart).
        // 0.1.13: drop broad [id*="attach-warranty"] / [data-feature-name*="protection"].
        attachWarrantyExact: "#attach-warranty",
        attachSiNoCoverageRow: "#attachSiNoCoverage",
      },
    },

    // Buttons/links to click (dismiss modals, "No thanks" buttons)
    clickTargets: {
      primeModals: {
        checkoutPrimeDecline: "#prime-decline-button",
      },
      generalDismiss: {
        // e.g., noThanks: '[data-action="no-thanks"]',
      },
    },

    // Elements to modify text content (remove Prime upsell text while keeping useful info)
    textReplacements: {
      cartFreeShippingMessage: {
        selector: ".sc-sss-box .sc-sss",
        pattern:
          /Add\s+(\$[\d.]+)\s+of eligible items or.*?to get FREE delivery/s,
        replacement: "Add $1 of eligible items to get FREE delivery",
      },
      cartFlyoutFreeShippingMessage: {
        selector: ".ewc-compact-actions .sc-sss, #sw-threshold-message .sc-sss",
        pattern:
          /Add\s+(\$[\d.]+)\s+of eligible items or.*?to get FREE delivery[^.]*\./s,
        replacement:
          "Add $1 of eligible items to get FREE delivery on eligible items with no order minimum.",
      },
      searchPageSecondaryDelivery: {
        selector: ".udm-secondary-delivery-message",
        pattern: /^\s*Or\s+/i,
        replacement: "",
      },
    },

    // Checkboxes to uncheck (pre-selected add-ons, protection plans)
    uncheckTargets: {
      checkout: {
        // e.g., protectionPlan: '#add-protection-plan-checkbox',
      },
      subscribeAndSave: {
        // e.g., snsCheckbox: '#sns-checkbox',
      },
    },

    // Page detection patterns
    pages: {
      product: /\/dp\/|\/gp\/product\//,
      cart: /\/cart|\/gp\/cart/,
      checkoutPrimeInterstitial: /\/checkout\/.*\/pip/,
      checkout: /\/checkout\//,
      search: /\/s\?|\/s\/|\/b\?/,
      homepage: /^\/($|\?)/,
    },

    pollInterval: 2000,
    throttleDelay: 100,
    debug: false,
  };

  // Settings configuration
  const SETTINGS_CONFIG = {
    removePrimeUpsells: {
      displayName: "Remove Prime upsells",
      default: true,
    },
    removeUrgencyTactics: {
      displayName: "Remove urgency tactics",
      default: true,
    },
    removeSubscribeNudges: {
      displayName: "Remove Subscribe & Save nudges",
      default: true,
    },
    removeSponsoredProducts: {
      displayName: "Remove sponsored products",
      default: true,
    },
    removeCreditCardUpsells: {
      displayName: "Remove credit card upsells",
      default: true,
    },
    removeAIUpsells: {
      displayName: "Remove Rufus AI",
      default: true,
    },
    removeAmazonServicePromos: {
      displayName: "Remove Amazon service promos",
      default: true,
    },
    removeProtectionPlans: {
      displayName: "Remove protection plans",
      default: true,
    },
    removeAmazonBusinessPromos: {
      displayName: "Remove Amazon Business promos",
      default: true,
    },
    removeHomepageClutter: {
      displayName: "Remove homepage clutter",
      default: false,
    },
    autoClipCoupons: {
      displayName: "Auto-clip coupons",
      default: true,
    },
  };

  // ============================================
  // SETTINGS
  // ============================================

  class Setting {
    constructor(name, config) {
      this.name = name;
      this.displayName = config.displayName;
      this.default = config.default;
    }

    get value() {
      return GM_getValue(this.name, this.default);
    }

    set value(val) {
      GM_setValue(this.name, val);
    }

    toggle() {
      this.value = !this.value;
    }
  }

  const Settings = Object.fromEntries(
    Object.entries(SETTINGS_CONFIG).map(([name, config]) => [
      name,
      new Setting(name, config),
    ]),
  );

  // 0.1.11 one-time: prior builds defaulted homepage clutter ON and deleted the gateway layout
  try {
    if (GM_getValue("adpbMigrate011", true)) {
      GM_setValue("removeHomepageClutter", false);
      GM_setValue("adpbMigrate011", false);
    }
  } catch (e) {}

  // ============================================
  // UTILITIES
  // ============================================

  function debug(message, ...args) {
    if (CONFIG.debug) {
      console.log(`[Amazon Dark Pattern Blocker] ${message}`, ...args);
    }
  }

  const CART_RAIL_SELECTORS = [
    // /cart page (from live inspect)
    "#sc-page-content",
    "#sc-retail-cart-container",
    "#sc-cart-column",
    "#sc-active-cart",
    "#sc-empty-cart",
    "#sc-saved-cart",
    "#proceed-to-checkout-desktop-container",
    "#sc-buy-box-panel",
    "#sc-buy-box",
    "#sc-buy-box-ptc-button",
    "form#activeCartViewForm",
    // attach / ewc flyouts
    "#attach-desktop-sideSheet",
    "#attach-accessory-pane",
    "#attachSideSheet_feature_div",
    "#nav-flyout-ewc",
    ".nav-ewcFlyout",
    ".nav-ewc-persistent",
    "#nav-flyout-ewc .nav-flyout-content",
    "#ewc-content",
    "#ewc-compact",
    "#ewc-compact-body",
    ".ewc-container",
    // smart wagon
    "#smartWagon_feature_div",
    "#sw-content",
    "#sw-foldaway",
    "#sw-subtotals",
    "#sw-items",
  ];

  function isInsideCartRail(el) {
    if (!el || !el.closest) return false;
    try {
      return !!el.closest(CART_RAIL_SELECTORS.join(","));
    } catch (e) {
      return false;
    }
  }

  // ============================================
  // CSS INJECTION (runs at document-start, before paint)
  // ============================================

  function injectStyles() {
    if (document.getElementById("adpb-styles")) return;

    const path = window.location.pathname + window.location.search;
    const isHomepage = CONFIG.pages.homepage.test(path);

    // 0.1.15: on homepage, ONLY hide Join Prime + Rufus nav chips.
    // Full selector dumps were blanking the persistent EWC cart rail on the right.
    let rules = [];
    if (isHomepage) {
      if (Settings.removePrimeUpsells.value) rules.push("#nav-join-prime");
      if (Settings.removeAIUpsells.value) {
        rules.push("#nav-rufus-disco");
        rules.push("#rufus-ask-rufus-tooltip");
      }
    } else {
      for (const category of Object.values(CONFIG.selectors)) {
        if (!category.setting || !Settings[category.setting].value) continue;
        for (const [key, selector] of Object.entries(category)) {
          if (key === "setting") continue;
          rules.push(selector);
        }
      }
    }

    if (rules.length === 0) return;

    // Never hide nodes inside the cart / EWC / attach rails
    const exclude = [
      ":not(#nav-flyout-ewc):not(#nav-flyout-ewc *)",
      ":not(#ewc-content):not(#ewc-content *)",
      ":not(#ewc-compact):not(#ewc-compact *)",
      ":not(#attach-desktop-sideSheet):not(#attach-desktop-sideSheet *)",
      ":not(#attachSideSheet_feature_div):not(#attachSideSheet_feature_div *)",
      ":not(#proceed-to-checkout-desktop-container):not(#proceed-to-checkout-desktop-container *)",
      ":not(#sc-buy-box-panel):not(#sc-buy-box-panel *)",
      ":not(#sc-active-cart):not(#sc-active-cart *)",
      ":not(#smartWagon_feature_div):not(#smartWagon_feature_div *)",
    ].join("");

    const safeRules = rules
      .filter(function (sel) {
        return CART_RAIL_SELECTORS.indexOf(sel) === -1;
      })
      .map(function (sel) {
        return sel + exclude;
      });

    if (safeRules.length === 0) return;

    const style = document.createElement("style");
    style.id = "adpb-styles";
    style.textContent =
      "/* Amazon Dark Pattern Blocker 0.1.15 - FOUC prevention (cart-rail safe) */\n" +
      safeRules.join(",\n") +
      " {\n  display: none !important;\n}\n";
    (document.head || document.documentElement).appendChild(style);
    debug("Injected CSS hide rules for " + safeRules.length + " selectors");
  }

  function getPageType() {
    const path = window.location.pathname + window.location.search;
    for (const [pageType, pattern] of Object.entries(CONFIG.pages)) {
      if (pattern.test(path)) {
        return pageType;
      }
    }
    return "other";
  }

  // ============================================
  // DECLUTTERER
  // ============================================

  const Declutterer = {
    /**
     * Remove elements matching selectors in a category
     */
    removeByCategory(categoryKey, settingKey) {
      if (!Settings[settingKey].value) return 0;

      const selectors = CONFIG.selectors[categoryKey];
      if (!selectors) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(selectors)) {
        if (name === "setting") continue;
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach((el) => {
            if (isInsideCartRail(el)) {
              debug(`Skipped ${name} (inside cart rail)`);
              return;
            }
            el.remove();
            count++;
            debug(`Removed ${name}`);
          });
        } catch (e) {
          debug(`Invalid selector for ${name}: ${selector}`, e);
        }
      }

      return count;
    },

    /**
     * Click elements in a category (for dismissing modals, etc.)
     */
    clickByCategory(categoryKey) {
      const targets = CONFIG.clickTargets[categoryKey];
      if (!targets) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(targets)) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          el.click();
          count++;
          debug(`Clicked ${name}`);
        });
      }

      return count;
    },

    /**
     * Uncheck pre-selected checkboxes in a category
     */
    uncheckByCategory(categoryKey) {
      const targets = CONFIG.uncheckTargets[categoryKey];
      if (!targets) return 0;

      let count = 0;

      for (const [name, selector] of Object.entries(targets)) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el) => {
          if (el.checked) {
            el.checked = false;
            el.dispatchEvent(new Event("change", { bubbles: true }));
            count++;
            debug(`Unchecked ${name}`);
          }
        });
      }

      return count;
    },

    /**
     * Handle the Prime accordion upsell in the buy box.
     * If pre-selected, it clicks the regular price before the upsell is removed.
     */
    processPrimeAccordionUpsell() {
      if (!Settings.removePrimeUpsells.value) return;

      const primeRow = document.querySelector(
        "#primeSavingsUpsellAccordionRow",
      );
      if (!primeRow || primeRow.dataset.dpbProcessed) return;

      // Check if it's currently active/selected
      const isActive =
        primeRow.classList.contains("a-accordion-active") ||
        primeRow.querySelector(".a-icon-radio-active");

      if (isActive) {
        // Find the regular price row to click
        // baseBuyingOptionAccordionRow is the standard one-time purchase row
        const regularRow =
          document.querySelector("#baseBuyingOptionAccordionRow") ||
          document.querySelector(
            "#buyBoxAccordion [data-a-accordion-row-name]:not(#primeSavingsUpsellAccordionRow)",
          );

        if (regularRow) {
          const clickTarget = regularRow.querySelector(
            '.a-accordion-row-a11y, .accordion-header, [role="button"]',
          );
          if (clickTarget) {
            debug("Prime upsell is pre-selected. Clicking regular price...");
            primeRow.dataset.dpbProcessed = "true";
            clickTarget.click();
          }
        }
      }
    },

    // Category processors
    processPrimeUpsells() {
      this.removeByCategory("primeUpsells", "removePrimeUpsells");
    },

    processUrgencyTactics() {
      this.removeByCategory("urgencyTactics", "removeUrgencyTactics");
    },

    processSubscribeNudges() {
      this.removeByCategory("subscribeAndSave", "removeSubscribeNudges");
    },

    processSponsoredProducts() {
      this.removeByCategory("sponsoredProducts", "removeSponsoredProducts");
    },

    processPrimeModals() {
      this.clickByCategory("primeModals");
    },

    processGeneralDismiss() {
      this.clickByCategory("generalDismiss");
    },

    processCheckoutUnchecks() {
      this.uncheckByCategory("checkout");
    },

    processSubscribeUnchecks() {
      this.uncheckByCategory("subscribeAndSave");
    },

    processCreditCardUpsells() {
      this.removeByCategory("creditCardUpsells", "removeCreditCardUpsells");
    },

    processAIUpsells() {
      this.removeByCategory("aiUpsells", "removeAIUpsells");
    },

    processAmazonServicePromos() {
      this.removeByCategory("amazonServicePromos", "removeAmazonServicePromos");
    },

    processProtectionPlans() {
      this.removeByCategory("protectionPlans", "removeProtectionPlans");
    },

    processAmazonBusinessPromos() {
      this.removeByCategory(
        "amazonBusinessPromos",
        "removeAmazonBusinessPromos",
      );
    },

    processHomepageClutter() {
      this.removeByCategory("homepageClutter", "removeHomepageClutter");
    },

    /**
     * Handle the Prime interstitial page that hijacks checkout
     * Replaces content with a message and auto-clicks decline
     */
    processPrimeInterstitial() {
      if (!Settings.removePrimeUpsells.value) return;

      const container = document.querySelector("#updp-prime-recommendations");
      const declineButton = document.querySelector("#prime-decline-button");

      if (container && declineButton && !container.dataset.dpbProcessed) {
        container.dataset.dpbProcessed = "true";

        // Get the decline URL before we do anything
        const declineUrl = declineButton.href;

        // Replace the container content with a simple message
        container.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: center;
                      min-height: 200px; font-size: 18px; color: #0F1111;">
            <p>Skipping Prime upsell page...</p>
          </div>
        `;

        debug("Replaced Prime interstitial content, redirecting...");

        // Navigate to the decline URL
        if (declineUrl) {
          window.location.href = declineUrl;
        }
      }
    },

    /**
     * If Audible is pre-selected in the format switcher, click a physical format instead
     */
    processAudibleDefaultSelection() {
      if (!Settings.removeAmazonServicePromos.value) return;

      const audibleSwatch = document.querySelector(
        "#tmm-grid-swatch-AUDIO_DOWNLOAD.selected",
      );
      if (!audibleSwatch || audibleSwatch.dataset.dpbProcessed) return;
      audibleSwatch.dataset.dpbProcessed = "true";

      // Prefer hardcover, fall back to paperback
      const physicalSwatch =
        document.querySelector("#tmm-grid-swatch-HARDCOVER a") ||
        document.querySelector("#tmm-grid-swatch-PAPERBACK a");
      if (physicalSwatch) {
        physicalSwatch.click();
        debug("Switched from Audible default to physical format");
      }
    },

    /**
     * Auto-clip coupons to remove gamification (checkbox click-to-save pattern)
     */
    processAutoClipCoupons() {
      if (!Settings.autoClipCoupons.value) return 0;

      let count = 0;
      const coupons = document.querySelectorAll(
        '[data-component-type="s-coupon-component"] .s-coupon-tile.unclaimed input[type="checkbox"]:not(:checked), .ct-coupon-tile.unclaimed input[type="checkbox"]:not(:checked)',
      );
      coupons.forEach((checkbox) => {
        checkbox.click();
        count++;
        debug("Auto-clipped coupon");
      });
      return count;
    },

    /**
     * Replace text content in elements (for removing inline Prime upsells while keeping useful text)
     */
    processTextReplacements() {
      if (!Settings.removePrimeUpsells.value) return 0;

      const replacements = CONFIG.textReplacements;
      if (!replacements) return 0;

      let count = 0;

      for (const [name, config] of Object.entries(replacements)) {
        const elements = document.querySelectorAll(config.selector);
        elements.forEach((el) => {
          // Check if already processed
          if (el.dataset.dpbProcessed) return;

          const originalText = el.textContent;
          if (config.pattern.test(originalText)) {
            // Remove all child elements (scripts, links, etc.) and replace with clean text
            const newText = originalText.replace(
              config.pattern,
              config.replacement,
            );
            el.textContent = newText;
            el.dataset.dpbProcessed = "true";
            count++;
            debug(`Replaced text in ${name}`);
          }
        });
      }

      return count;
    },
  };

  // ============================================
  // PAGE HANDLERS
  // ============================================

  const PageHandlers = {
    product() {
      Declutterer.processPrimeAccordionUpsell();
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCreditCardUpsells();
      Declutterer.processAmazonServicePromos();
      Declutterer.processAudibleDefaultSelection();
      Declutterer.processAmazonBusinessPromos();
      Declutterer.processProtectionPlans();
      Declutterer.processUrgencyTactics();
      Declutterer.processSubscribeNudges();
      Declutterer.processSubscribeUnchecks();
      Declutterer.processAutoClipCoupons();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    cart() {
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCreditCardUpsells();
      Declutterer.processUrgencyTactics();
      Declutterer.processSubscribeNudges();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    checkoutPrimeInterstitial() {
      // This is the Prime upsell interstitial page that hijacks checkout
      // Replace the content with a message and auto-click decline
      Declutterer.processPrimeInterstitial();
    },

    checkout() {
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCheckoutUnchecks();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    search() {
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processSponsoredProducts();
      Declutterer.processUrgencyTactics();
      Declutterer.processAutoClipCoupons();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },

    homepage() {
      // 0.1.15: do NOT run full prime/clutter passes on homepage — they blank the
      // persistent right-side EWC cart rail. Only strip Join Prime + Rufus in the nav.
      if (Settings.removePrimeUpsells.value) {
        document.querySelectorAll("#nav-join-prime").forEach(function (el) {
          if (!isInsideCartRail(el)) el.remove();
        });
      }
      if (Settings.removeAIUpsells.value) {
        document.querySelectorAll("#nav-rufus-disco, #rufus-ask-rufus-tooltip").forEach(function (el) {
          if (!isInsideCartRail(el)) el.remove();
        });
      }
    },

    other() {
      // Fallback: run shared patterns
      Declutterer.processPrimeAccordionUpsell();
      Declutterer.processPrimeUpsells();
      Declutterer.processAIUpsells();
      Declutterer.processCreditCardUpsells();
      Declutterer.processAmazonBusinessPromos();
      Declutterer.processUrgencyTactics();
      Declutterer.processTextReplacements();
      Declutterer.processPrimeModals();
      Declutterer.processGeneralDismiss();
    },
  };

  function processPage() {
    try {
      const pageType = getPageType();
      const handler = PageHandlers[pageType] || PageHandlers.other;
      debug(`Processing page type: ${pageType}`);
      handler();
    } catch (error) {
      debug("Error during processing:", error);
    }
  }

  // ============================================
  // MENU
  // ============================================

  function setupMenu() {
    for (const [key, setting] of Object.entries(Settings)) {
      GM_registerMenuCommand(
        `${setting.value ? "\u2713" : "\u2717"} ${setting.displayName}`,
        () => {
          setting.toggle();
          const state = setting.value ? "enabled" : "disabled";
          alert(`${setting.displayName} ${state}. Refresh the page to apply.`);
        },
      );
    }
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function setupMutationObserver() {
    let timeoutId = null;
    const observer = new MutationObserver((mutations) => {
      let shouldProcess = false;
      for (const m of mutations) {
        if (m.addedNodes.length > 0) {
          shouldProcess = true;
          break;
        }
      }

      if (shouldProcess) {
        if (!timeoutId) {
          timeoutId = setTimeout(() => {
            processPage();
            timeoutId = null;
          }, CONFIG.throttleDelay);
        }
      }
    });

    const target = document.documentElement || document.body;
    if (target) {
      observer.observe(target, {
        childList: true,
        subtree: true,
      });
      debug("MutationObserver setup");
    }
  }

  function init() {
    debug("Initializing...");

    setupMenu();
    setupMutationObserver();

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", processPage);
    } else {
      processPage();
    }

    debug("Ready");
  }

  function safeInit() {
    try {
      init();
    } catch (error) {
      console.error(
        "[Amazon Dark Pattern Blocker] Initialization failed:",
        error,
      );
    }
  }

  // Inject CSS rules immediately (before paint) to prevent flash of unwanted content
  try {
    injectStyles();
  } catch (error) {
    console.error("[Amazon Dark Pattern Blocker] CSS injection failed:", error);
  }

  // Initialize immediately
  safeInit();

  // Continuous polling for dynamic content + SPA navigation detection
  let lastUrl = location.href;
  setInterval(() => {
    processPage();

    if (location.href !== lastUrl) {
      debug(`Navigation detected: ${lastUrl} -> ${location.href}`);
      lastUrl = location.href;
    }
  }, CONFIG.pollInterval);
})();
