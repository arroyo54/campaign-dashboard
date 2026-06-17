// ═══════════════════════════════════════════════════════════════════
// Purchase → Attribution Tracker (server-side)
//
// ADD THIS to your existing "Conversiones Web" Apps Script.
// After saving the purchase to the sheet, it also sends the purchase
// to the attribution Cloud Function with the email hash.
//
// This is the SERVER-SIDE purchase source — guaranteed to have
// the correct value (unlike the client-side dataLayer which sometimes
// misses it).
// ═══════════════════════════════════════════════════════════════════

var COLLECT_ENDPOINT = 'https://us-central1-heru-growth.cloudfunctions.net/collect';

/**
 * Call this AFTER saving the purchase row in your existing doGet().
 * Example: sendPurchaseToAttribution(p);
 *
 * @param {Object} p - The e.parameter object from doGet
 */
function sendPurchaseToAttribution(p) {
  try {
    var email = String(p.phone || '').trim();  // heru uses phone as ID, but if email available use it
    var rfc = String(p.rfc || '').trim();

    // Try to find an email-like identifier
    // In heru's case, the purchase webhook might have phone or RFC
    // The tracker client-side already captured the email hash at signup
    // So here we send both identifiers for maximum match rate

    var identifiers = {};
    if (email && email.includes('@')) {
      identifiers.email_hash = sha256Server(email.toLowerCase());
    }
    if (p.email) {
      identifiers.email_hash = sha256Server(String(p.email).toLowerCase().trim());
    }
    if (rfc) {
      identifiers.rfc_hash = sha256Server(rfc.toUpperCase());
    }

    var event = {
      cid: 'server_' + (p.transaction_id || Utilities.getUuid()),
      event: 'purchase_server',
      session_id: null,
      timestamp: Date.now(),
      page_path: p.page_url || '/successful-purchase',
      page_referrer: '',
      page_title: '',
      user_agent: 'heru-server/1.0',
      utms: {
        utm_source: p.utm_source || p.first_utm_source || '',
        utm_medium: p.utm_medium || p.first_utm_medium || '',
        utm_campaign: p.utm_campaign || p.first_utm_campaign || '',
        utm_content: p.utm_content || p.first_utm_content || '',
        utm_term: p.utm_term || p.first_utm_term || ''
      },
      click_ids: {},
      params: {
        transaction_id: p.transaction_id || '',
        value: parseFloat(p.value) || 0,
        currency: p.currency || 'MXN',
        item_name: p.item_name || '',
        payment_method: p.payment_method || '',
        identifiers: identifiers
      }
    };

    // Add click IDs if available
    if (p.gclid) event.click_ids.gclid = p.gclid;
    if (p.fbclid) event.click_ids.fbclid = p.fbclid;
    if (p.first_gclid) event.click_ids.first_gclid = p.first_gclid;
    if (p.first_fbclid) event.click_ids.first_fbclid = p.first_fbclid;

    var payload = JSON.stringify({ events: [event] });

    UrlFetchApp.fetch(COLLECT_ENDPOINT, {
      method: 'post',
      contentType: 'application/json',
      payload: payload,
      muteHttpExceptions: true
    });

    Logger.log('Attribution: purchase sent for tx=' + (p.transaction_id || 'unknown'));

  } catch (err) {
    // Don't break the main flow if attribution fails
    Logger.log('Attribution error (non-blocking): ' + err.message);
  }
}

/**
 * SHA-256 hash (server-side, Apps Script)
 */
function sha256Server(input) {
  var raw = Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, input);
  return raw.map(function(b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');
}
