// ═══════════════════════════════════════════════════════════════════
// heru Attribution Tracker v1.0
// Multi-touch attribution for heru.app
// Inspired by Elykia's approach — built for heru's stack
//
// Install: <script async src="https://YOUR_DOMAIN/heru-tracker.js"></script>
// ═══════════════════════════════════════════════════════════════════

(function() {
  'use strict';

  // ── Config ─────────────────────────────────────────────────────
  var COLLECT_URL = 'https://us-central1-heru-growth.cloudfunctions.net/collect';
  var COOKIE_DOMAIN = '.heru.app';
  var SESSION_TIMEOUT_MS = 30 * 60 * 1000;  // 30 min
  var FLUSH_INTERVAL_MS = 2000;              // 2 sec
  var MAX_BATCH_SIZE = 20;
  var VERSION = '1.0';

  // ── Cookie durations (days) ────────────────────────────────────
  var CID_DAYS = 730;       // 2 years
  var CLICK_DAYS = 90;      // 90 days
  var SESSION_DAYS = 1;     // renewed every interaction (30 min timeout)
  var OPTOUT_DAYS = 3650;   // 10 years

  // ── Click IDs to capture ───────────────────────────────────────
  var CLICK_ID_PARAMS = [
    'gclid', 'fbclid', 'rdt_cid', 'ttclid',
    'wbraid', 'gbraid', 'msclkid', 'li_fat_id', 'epik', '_scid'
  ];

  // ── UTM params ─────────────────────────────────────────────────
  var UTM_PARAMS = [
    'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_id'
  ];

  // ── State ──────────────────────────────────────────────────────
  var queue = [];
  var flushTimer = null;
  var cidValue = null;
  var sessionObj = null;

  // ═══════════════════════════════════════════════════════════════
  // COOKIES
  // ═══════════════════════════════════════════════════════════════

  function setCookie(name, value, days) {
    var expires = new Date(Date.now() + days * 86400000).toUTCString();
    var parts = [
      name + '=' + encodeURIComponent(value),
      'expires=' + expires,
      'path=/',
      'SameSite=Lax'
    ];
    if (COOKIE_DOMAIN) parts.push('domain=' + COOKIE_DOMAIN);
    if (location.protocol === 'https:') parts.push('Secure');
    document.cookie = parts.join('; ');
  }

  function getCookie(name) {
    var match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    return match ? decodeURIComponent(match[1]) : null;
  }

  function deleteCookie(name) {
    setCookie(name, '', -1);
  }

  // ═══════════════════════════════════════════════════════════════
  // CLIENT ID (persistent user identifier)
  // ═══════════════════════════════════════════════════════════════

  function generateCid() {
    var rand = Math.random().toString(36).substring(2, 15);
    var ts = Date.now();
    return rand + '.' + ts;
  }

  // ═══════════════════════════════════════════════════════════════
  // LOCAL STORAGE BACKUP (Safari ITP fix)
  // Safari limits JS-created cookies to 7 days. localStorage persists.
  // We use cookie as primary (works cross-subdomain) and localStorage
  // as fallback when Safari purges the cookie.
  // ═══════════════════════════════════════════════════════════════

  function lsGet(key) {
    try { return localStorage.getItem(key); } catch(e) { return null; }
  }

  function lsSet(key, value) {
    try { localStorage.setItem(key, value); } catch(e) {}
  }

  function lsRemove(key) {
    try { localStorage.removeItem(key); } catch(e) {}
  }

  function getOrCreateCid() {
    // 1. Try cookie first (works cross-subdomain)
    var cid = getCookie('_heru_cid');

    // 2. If cookie gone (Safari ITP), recover from localStorage
    if (!cid) {
      cid = lsGet('_heru_cid');
    }

    // 3. If neither exists, generate new
    if (!cid) {
      cid = generateCid();
    }

    // 4. Always write to both (keep in sync)
    setCookie('_heru_cid', cid, CID_DAYS);
    lsSet('_heru_cid', cid);

    return cid;
  }

  // ═══════════════════════════════════════════════════════════════
  // SESSION MANAGEMENT (30 min inactivity timeout)
  // ═══════════════════════════════════════════════════════════════

  function getOrCreateSession() {
    var raw = getCookie('_heru_session');
    var session = null;
    if (raw) {
      try { session = JSON.parse(raw); } catch(e) { session = null; }
    }

    var now = Date.now();
    var isNew = false;

    if (!session || (now - session.last) > SESSION_TIMEOUT_MS) {
      session = { id: now, last: now, pv: 0 };
      isNew = true;
    }

    session.last = now;
    session.pv = (session.pv || 0) + 1;
    setCookie('_heru_session', JSON.stringify(session), SESSION_DAYS);

    return { session: session, isNew: isNew };
  }

  // ═══════════════════════════════════════════════════════════════
  // URL PARAMETER EXTRACTION
  // ═══════════════════════════════════════════════════════════════

  function getUrlParams(paramList) {
    var result = {};
    try {
      var params = new URLSearchParams(window.location.search);
      for (var i = 0; i < paramList.length; i++) {
        var val = params.get(paramList[i]);
        if (val) result[paramList[i]] = val;
      }
    } catch(e) {}
    return result;
  }

  function getUtms() {
    return getUrlParams(UTM_PARAMS);
  }

  function getClickIds() {
    return getUrlParams(CLICK_ID_PARAMS);
  }

  // ═══════════════════════════════════════════════════════════════
  // CLICK ID COOKIE (persists 90 days)
  // ═══════════════════════════════════════════════════════════════

  function captureClickIds() {
    var clickIds = getClickIds();
    if (Object.keys(clickIds).length === 0) return null;

    // Merge with existing (don't overwrite other platform IDs)
    var existing = {};
    var raw = getCookie('_heru_click') || lsGet('_heru_click');
    if (raw) {
      try { existing = JSON.parse(raw); } catch(e) {}
    }

    var merged = {};
    for (var k in existing) merged[k] = existing[k];
    for (var k2 in clickIds) merged[k2] = clickIds[k2];

    var mergedStr = JSON.stringify(merged);
    setCookie('_heru_click', mergedStr, CLICK_DAYS);
    lsSet('_heru_click', mergedStr);
    return clickIds;
  }

  function getStoredClickIds() {
    var raw = getCookie('_heru_click') || lsGet('_heru_click');
    if (!raw) return {};
    try { return JSON.parse(raw); } catch(e) { return {}; }
  }

  // ═══════════════════════════════════════════════════════════════
  // SHA-256 HASHING (for identity resolution)
  // ═══════════════════════════════════════════════════════════════

  function sha256(str) {
    if (!window.crypto || !window.crypto.subtle) return Promise.resolve(null);
    var buffer = new TextEncoder().encode(str.toLowerCase().trim());
    return window.crypto.subtle.digest('SHA-256', buffer).then(function(hash) {
      var hexCodes = [];
      var view = new DataView(hash);
      for (var i = 0; i < view.byteLength; i++) {
        hexCodes.push(view.getUint8(i).toString(16).padStart(2, '0'));
      }
      return hexCodes.join('');
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // EVENT TRACKING
  // ═══════════════════════════════════════════════════════════════

  function buildBasePayload() {
    return {
      cid: cidValue,
      session_id: sessionObj ? sessionObj.id : null,
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_referrer: document.referrer || '',
      page_title: document.title || '',
      screen_width: window.screen ? window.screen.width : null,
      screen_height: window.screen ? window.screen.height : null,
      language: navigator.language || '',
      user_agent: navigator.userAgent || '',
      timestamp: Date.now(),
      tracker_version: VERSION
    };
  }

  function track(eventName, eventParams) {
    if (getCookie('_heru_optout')) return;

    var payload = buildBasePayload();
    payload.event = eventName;
    payload.params = eventParams || {};

    // Always attach current UTMs and stored click IDs
    payload.utms = getUtms();
    payload.click_ids = getStoredClickIds();

    queue.push(payload);

    if (queue.length >= MAX_BATCH_SIZE) {
      flush();
    }
  }

  // ═══════════════════════════════════════════════════════════════
  // BATCH FLUSH
  // ═══════════════════════════════════════════════════════════════

  function flush() {
    if (queue.length === 0) return;

    var batch = queue.splice(0, MAX_BATCH_SIZE);

    try {
      var body = JSON.stringify({ events: batch });

      // Use sendBeacon on unload, fetch otherwise
      if (navigator.sendBeacon) {
        navigator.sendBeacon(COLLECT_URL, new Blob([body], { type: 'application/json' }));
      } else {
        fetch(COLLECT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: body,
          keepalive: true
        }).catch(function() {});
      }
    } catch(e) {}
  }

  function startFlushTimer() {
    if (flushTimer) return;
    flushTimer = setInterval(function() {
      flush();
    }, FLUSH_INTERVAL_MS);
  }

  // ═══════════════════════════════════════════════════════════════
  // IDENTITY DISCOVERY (email/phone detection in forms)
  // ═══════════════════════════════════════════════════════════════

  function isEmailField(el) {
    if (el.type === 'email') return true;
    var name = (el.name || el.id || '').toLowerCase();
    return /email|correo|e-mail|e_mail/.test(name);
  }

  function isPhoneField(el) {
    if (el.type === 'tel') return true;
    var name = (el.name || el.id || '').toLowerCase();
    return /phone|tel[eé]fono|celular|m[oó]vil|whatsapp/.test(name);
  }

  function isValidEmail(str) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str);
  }

  function watchForms() {
    var debounceTimers = {};

    function handleInput(e) {
      var el = e.target;
      if (!el || el.tagName !== 'INPUT') return;

      var val = (el.value || '').trim();
      if (!val) return;

      var type = null;
      if (isEmailField(el) && isValidEmail(val)) {
        type = 'email';
      } else if (isPhoneField(el) && val.length >= 10) {
        type = 'phone';
      }

      if (!type) return;

      // Debounce 1.5s
      var key = type + ':' + el.name;
      if (debounceTimers[key]) clearTimeout(debounceTimers[key]);
      debounceTimers[key] = setTimeout(function() {
        sha256(val).then(function(hash) {
          if (!hash) return;
          setCookie('_heru_uid', hash, CID_DAYS);
          lsSet('_heru_uid', hash);
          track('identity_discovered', {
            type: type,
            hash: hash
          });
        });
      }, 1500);
    }

    document.addEventListener('input', handleInput, true);
    document.addEventListener('focusout', function(e) {
      if (e.target && e.target.tagName === 'INPUT') handleInput(e);
    }, true);
  }

  // ═══════════════════════════════════════════════════════════════
  // PURCHASE DETECTION
  // ═══════════════════════════════════════════════════════════════

  function checkPurchasePage() {
    var path = window.location.pathname.toLowerCase();

    // heru.app purchase success page
    if (path.indexOf('successful-purchase') !== -1 ||
        path.indexOf('purchase-success') !== -1 ||
        path.indexOf('compra-exitosa') !== -1 ||
        path.indexOf('thank-you') !== -1) {

      // Try to read value from dataLayer if available
      var purchaseData = extractPurchaseFromDataLayer();

      track('purchase_detected', {
        page: path,
        value: purchaseData.value || null,
        currency: purchaseData.currency || 'MXN',
        transaction_id: purchaseData.transaction_id || null,
        item_name: purchaseData.item_name || null
      });
    }
  }

  function extractPurchaseFromDataLayer() {
    var result = {};
    if (!window.dataLayer) return result;

    // Walk dataLayer backwards to find most recent purchase event
    for (var i = window.dataLayer.length - 1; i >= 0; i--) {
      var entry = window.dataLayer[i];
      if (!entry) continue;

      // Check for ecommerce.value (GTM standard)
      if (entry.ecommerce) {
        result.value = entry.ecommerce.value || entry.ecommerce.revenue;
        result.currency = entry.ecommerce.currency || 'MXN';
        result.transaction_id = entry.ecommerce.transaction_id;
        if (entry.ecommerce.items && entry.ecommerce.items[0]) {
          result.item_name = entry.ecommerce.items[0].item_name;
        }
        break;
      }

      // Check for flat value (some implementations)
      if (entry.event === 'purchase' || entry.event === 'paid_customer_charged') {
        result.value = entry.value;
        result.currency = entry.currency || 'MXN';
        result.transaction_id = entry.transaction_id;
        break;
      }
    }

    return result;
  }

  // ═══════════════════════════════════════════════════════════════
  // SPA NAVIGATION TRACKING
  // ═══════════════════════════════════════════════════════════════

  function wrapHistoryMethod(method) {
    var original = history[method];
    history[method] = function() {
      var result = original.apply(this, arguments);
      onNavigation();
      return result;
    };
  }

  var lastTrackedPath = '';

  function onNavigation() {
    var currentPath = window.location.pathname + window.location.search;
    if (currentPath === lastTrackedPath) return;
    lastTrackedPath = currentPath;

    // Small delay to let the page update
    setTimeout(function() {
      trackPageView();
      checkPurchasePage();
    }, 100);
  }

  function setupSpaTracking() {
    wrapHistoryMethod('pushState');
    wrapHistoryMethod('replaceState');
    window.addEventListener('popstate', onNavigation);
  }

  // ═══════════════════════════════════════════════════════════════
  // PAGE VIEW
  // ═══════════════════════════════════════════════════════════════

  function trackPageView() {
    track('page_view', {
      page_path: window.location.pathname,
      page_title: document.title
    });
  }

  // ═══════════════════════════════════════════════════════════════
  // DATALAYER OBSERVER
  // Watches for purchase events pushed to dataLayer by GTM
  // ═══════════════════════════════════════════════════════════════

  function observeDataLayer() {
    if (!window.dataLayer) window.dataLayer = [];

    var originalPush = window.dataLayer.push;
    window.dataLayer.push = function() {
      var result = originalPush.apply(this, arguments);

      // Check each pushed item for purchase events
      for (var i = 0; i < arguments.length; i++) {
        var entry = arguments[i];
        if (!entry || typeof entry !== 'object') continue;

        if (entry.event === 'purchase' || entry.event === 'paid_customer_charged') {
          var ecom = entry.ecommerce || {};
          track('purchase_datalayer', {
            value: ecom.value || entry.value || null,
            currency: ecom.currency || entry.currency || 'MXN',
            transaction_id: ecom.transaction_id || entry.transaction_id || null,
            item_name: (ecom.items && ecom.items[0]) ? ecom.items[0].item_name : null,
            event_name: entry.event
          });
        }
      }

      return result;
    };
  }

  // ═══════════════════════════════════════════════════════════════
  // PUBLIC API
  // ═══════════════════════════════════════════════════════════════

  window.heru_tracker = function(action, arg1, arg2) {
    switch(action) {
      case 'event':
        track(arg1, arg2);
        break;

      case 'identify':
        if (arg1 && arg1.email) {
          sha256(arg1.email).then(function(hash) {
            if (hash) {
              setCookie('_heru_uid', hash, CID_DAYS);
              track('identity_manual', { type: 'email', hash: hash });
            }
          });
        }
        if (arg1 && arg1.phone) {
          sha256(arg1.phone).then(function(hash) {
            if (hash) {
              track('identity_manual', { type: 'phone', hash: hash });
            }
          });
        }
        break;

      case 'purchase':
        // Manual purchase tracking with guaranteed value
        track('purchase_manual', {
          value: arg1.value || 0,
          currency: arg1.currency || 'MXN',
          transaction_id: arg1.transaction_id || null,
          item_name: arg1.item_name || null
        });
        break;

      case 'opt_out':
        setCookie('_heru_optout', '1', OPTOUT_DAYS);
        queue = [];
        break;

      case 'version':
        return VERSION;
    }
  };

  // ═══════════════════════════════════════════════════════════════
  // INIT
  // ═══════════════════════════════════════════════════════════════

  function init() {
    // Check opt-out
    if (getCookie('_heru_optout')) return;

    // 1. Get or create client ID
    cidValue = getOrCreateCid();

    // 2. Session management
    var sess = getOrCreateSession();
    sessionObj = sess.session;

    // 3. Capture click IDs from URL
    var newClickIds = captureClickIds();
    if (newClickIds && Object.keys(newClickIds).length > 0) {
      track('click_ids_captured', newClickIds);
    }

    // 4. Track session start (if new)
    if (sess.isNew) {
      track('session_start', {
        landing_page: window.location.pathname,
        referrer: document.referrer || 'direct'
      });
    }

    // 5. Track page view
    lastTrackedPath = window.location.pathname + window.location.search;
    trackPageView();

    // 6. Check if this is a purchase page
    checkPurchasePage();

    // 7. Observe dataLayer for purchase events
    observeDataLayer();

    // 8. Watch forms for identity discovery
    watchForms();

    // 9. Setup SPA navigation tracking
    setupSpaTracking();

    // 10. Start flush timer
    startFlushTimer();

    // 11. Flush on page unload
    window.addEventListener('beforeunload', flush);
    document.addEventListener('visibilitychange', function() {
      if (document.visibilityState === 'hidden') flush();
    });
  }

  // Run when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
