const functions = require("firebase-functions");
const crypto = require("crypto");
const fetch = require("node-fetch");

// ═══════════════════════════════════════════════════════════════
// Shared helpers
// ═══════════════════════════════════════════════════════════════
function cors(req, res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.set("Access-Control-Max-Age", "3600");
  if (req.method === "OPTIONS") { res.status(204).send(""); return true; }
  return false;
}

function sha256(val) {
  return crypto.createHash("sha256").update(val.trim().toLowerCase()).digest("hex");
}

function validateRequest(req, res) {
  if (req.method !== "POST") { res.status(405).json({ error: "Only POST" }); return null; }
  const { emails, phones, audienceName, audienceId } = req.body || {};

  const hashedEmails = (emails || [])
    .map(e => String(e).trim().toLowerCase())
    .filter(e => e && e.includes("@"))
    .map(e => sha256(e));

  const hashedPhones = (phones || [])
    .map(p => String(p).trim().replace(/[\s\-\(\)\+]/g, ""))
    .filter(p => p && p.length >= 10)
    .map(p => sha256(p));

  if (hashedEmails.length === 0 && hashedPhones.length === 0) {
    res.status(400).json({ error: "emails[] or phones[] is required" });
    return null;
  }
  return { hashedEmails, hashedPhones, audienceName, audienceId };
}

const fnOpts = { timeoutSeconds: 120, memory: "256MB" };

// ═══════════════════════════════════════════════════════════════
// 1. META (Facebook) — Custom Audiences API
// ═══════════════════════════════════════════════════════════════
const META_API = "https://graph.facebook.com/v21.0";
const META_AD_ACCOUNT = "act_233555237761096";

exports.uploadToMeta = functions.region("us-central1").runWith(fnOpts)
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;
    const v = validateRequest(req, res);
    if (!v) return;

    const TOKEN = process.env.META_ADS_TOKEN;
    if (!TOKEN) { res.status(500).json({ error: "META_ADS_TOKEN not configured" }); return; }

    try {
      let audId = v.audienceId;
      if (!audId) {
        const name = v.audienceName || `Heru — ${new Date().toISOString().split("T")[0]}`;
        const r = await fetch(`${META_API}/${META_AD_ACCOUNT}/customaudiences`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, subtype: "CUSTOM", description: "Desde Heru Dashboard", customer_file_source: "USER_PROVIDED_ONLY", access_token: TOKEN }),
        });
        const d = await r.json();
        if (d.error) { res.status(400).json({ error: "Error creando audiencia", meta_error: d.error }); return; }
        audId = d.id;
      }

      // Build multi-key payload: [EMAIL_SHA256, PHONE_SHA256] per user where available
      // Meta supports multi-key matching for better match rates
      const schema = [];
      if (v.hashedEmails.length) schema.push("EMAIL_SHA256");
      if (v.hashedPhones.length) schema.push("PHONE_SHA256");

      // Combine: each entry is an array matching schema order
      const maxLen = Math.max(v.hashedEmails.length, v.hashedPhones.length);
      const allData = [];
      for (let i = 0; i < maxLen; i++) {
        const row = [];
        if (v.hashedEmails.length) row.push(v.hashedEmails[i] || "");
        if (v.hashedPhones.length) row.push(v.hashedPhones[i] || "");
        if (row.some(r => r)) allData.push(row);
      }

      const BATCH = 10000, sessionId = Date.now(), total = Math.ceil(allData.length / BATCH);
      let received = 0, invalid = 0;
      for (let i = 0; i < total; i++) {
        const batch = allData.slice(i * BATCH, (i + 1) * BATCH);
        const r = await fetch(`${META_API}/${audId}/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            payload: JSON.stringify({ schema, data: batch }),
            session: JSON.stringify({ session_id: sessionId, batch_seq: i + 1, last_batch_flag: i === total - 1, estimated_num_total: allData.length }),
            access_token: TOKEN,
          }),
        });
        const d = await r.json();
        if (d.error) { res.status(400).json({ error: `Batch ${i+1} error`, meta_error: d.error, audience_id: audId }); return; }
        received += d.num_received || 0;
        invalid += d.num_invalid_entries || 0;
      }

      res.json({
        success: true, platform: "meta", audience_id: audId,
        audience_url: `https://business.facebook.com/adsmanager/audiences?act=233555237761096&selected_audience_id=${audId}`,
        total_sent: allData.length, total_received: received, total_invalid: invalid,
        emails_sent: v.hashedEmails.length, phones_sent: v.hashedPhones.length,
      });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

// ═══════════════════════════════════════════════════════════════
// 2. GOOGLE ADS — Data Manager API (Customer Match)
// ═══════════════════════════════════════════════════════════════
const GOOGLE_DM_API = "https://datamanager.googleapis.com/v1";
const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";

async function googleAccessToken() {
  const r = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
      client_id: process.env.GOOGLE_CLIENT_ID,
      client_secret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  });
  const d = await r.json();
  if (d.error) throw new Error(`Google token error: ${d.error_description || d.error}`);
  return d.access_token;
}

exports.uploadToGoogle = functions.region("us-central1").runWith(fnOpts)
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;
    const v = validateRequest(req, res);
    if (!v) return;

    const CUSTOMER_ID = process.env.GOOGLE_ADS_CUSTOMER_ID;
    if (!CUSTOMER_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
      res.status(500).json({ error: "Google Ads env vars not configured (GOOGLE_ADS_CUSTOMER_ID, GOOGLE_REFRESH_TOKEN, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET)" });
      return;
    }

    try {
      const token = await googleAccessToken();
      const authHeaders = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json" };

      let listName = v.audienceId;
      if (!listName) {
        const name = v.audienceName || `Heru — ${new Date().toISOString().split("T")[0]}`;
        const r = await fetch(`${GOOGLE_DM_API}/accountTypes/GOOGLE_ADS/accounts/${CUSTOMER_ID}/userLists`, {
          method: "POST", headers: authHeaders,
          body: JSON.stringify({
            displayName: name,
            description: "Desde Heru Campaign Dashboard",
            ingestedUserListInfo: { contactIdInfo: { dataSourceType: "DATA_SOURCE_TYPE_FIRST_PARTY" }, uploadKeyTypes: ["CONTACT_ID"] },
            membershipDuration: "7776000s",
          }),
        });
        const d = await r.json();
        if (d.error) { res.status(400).json({ error: "Error creando lista", google_error: d.error }); return; }
        listName = d.name;
      }

      // Build members with email + phone identifiers
      const maxLen = Math.max(v.hashedEmails.length, v.hashedPhones.length);
      const allMembers = [];
      for (let i = 0; i < maxLen; i++) {
        const identifiers = [];
        if (i < v.hashedEmails.length && v.hashedEmails[i]) identifiers.push({ emailAddress: v.hashedEmails[i] });
        if (i < v.hashedPhones.length && v.hashedPhones[i]) identifiers.push({ phoneNumber: v.hashedPhones[i] });
        if (identifiers.length) allMembers.push({ userData: { userIdentifiers: identifiers } });
      }

      // Extract list ID from the full resource name
      const listId = listName.split("/").pop();

      const BATCH = 10000, total = Math.ceil(allMembers.length / BATCH);
      const results = [];
      for (let i = 0; i < total; i++) {
        const batch = allMembers.slice(i * BATCH, (i + 1) * BATCH);
        const r = await fetch(`${GOOGLE_DM_API}/audienceMembers:ingest`, {
          method: "POST", headers: authHeaders,
          body: JSON.stringify({
            destinations: [{
              operatingAccount: { accountType: "GOOGLE_ADS", accountId: CUSTOMER_ID },
              productDestinationId: listId,
            }],
            audienceMembers: batch,
            consent: { adUserData: "CONSENT_GRANTED", adPersonalization: "CONSENT_GRANTED" },
            encoding: "HEX",
            termsOfService: { customerMatchTermsOfServiceStatus: "ACCEPTED" },
          }),
        });
        const d = await r.json();
        if (d.error) { res.status(400).json({ error: `Batch ${i+1} error`, google_error: d.error, list_name: listName }); return; }
        results.push(d);
      }

      res.json({
        success: true, platform: "google", list_name: listName,
        total_sent: allMembers.length, batches: total, results,
        emails_sent: v.hashedEmails.length, phones_sent: v.hashedPhones.length,
      });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

// ═══════════════════════════════════════════════════════════════
// 3. REDDIT ADS — Custom Audiences API v3
// ═══════════════════════════════════════════════════════════════
const REDDIT_API = "https://ads-api.reddit.com/api/v3";
const REDDIT_TOKEN_URL = "https://www.reddit.com/api/v1/access_token";
const REDDIT_UA = "web:heru-campaign-dashboard:v1.0 (by /u/heru_app)";

async function redditAccessToken() {
  const creds = Buffer.from(`${process.env.REDDIT_CLIENT_ID}:${process.env.REDDIT_CLIENT_SECRET}`).toString("base64");
  const r = await fetch(REDDIT_TOKEN_URL, {
    method: "POST",
    headers: { "Authorization": `Basic ${creds}`, "Content-Type": "application/x-www-form-urlencoded", "User-Agent": REDDIT_UA },
    body: new URLSearchParams({ grant_type: "refresh_token", refresh_token: process.env.REDDIT_REFRESH_TOKEN }),
  });
  const d = await r.json();
  if (d.error) throw new Error(`Reddit token error: ${d.error}`);
  return d.access_token;
}

exports.uploadToReddit = functions.region("us-central1").runWith(fnOpts)
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;
    const v = validateRequest(req, res);
    if (!v) return;

    if (!process.env.REDDIT_CLIENT_ID || !process.env.REDDIT_REFRESH_TOKEN) {
      res.status(500).json({ error: "Reddit env vars not configured (REDDIT_CLIENT_ID, REDDIT_CLIENT_SECRET, REDDIT_REFRESH_TOKEN, REDDIT_AD_ACCOUNT_ID)" });
      return;
    }

    try {
      const token = await redditAccessToken();
      const headers = { "Authorization": `Bearer ${token}`, "Content-Type": "application/json", "User-Agent": REDDIT_UA };

      let audId = v.audienceId;
      if (!audId) {
        const name = v.audienceName || `Heru — ${new Date().toISOString().split("T")[0]}`;
        const r = await fetch(`${REDDIT_API}/custom_audiences`, {
          method: "POST", headers,
          body: JSON.stringify({ name, type: "CUSTOMER_LIST", ad_account_id: process.env.REDDIT_AD_ACCOUNT_ID }),
        });
        const d = await r.json();
        if (d.error || d.errors) { res.status(400).json({ error: "Error creando audiencia", reddit_error: d.error || d.errors }); return; }
        audId = d.id || d.data?.id;
      }

      // Reddit supports EMAIL_SHA256 and MAID_SHA256 — upload emails
      // Phone matching not natively supported by Reddit, use emails only
      const hashed = v.hashedEmails.length ? v.hashedEmails : v.hashedPhones;
      const colType = v.hashedEmails.length ? "EMAIL_SHA256" : "MAID_SHA256";

      const BATCH = 2500, total = Math.ceil(hashed.length / BATCH);
      let uploaded = 0;
      for (let i = 0; i < total; i++) {
        const batch = hashed.slice(i * BATCH, (i + 1) * BATCH);
        const r = await fetch(`${REDDIT_API}/custom_audiences/${audId}/users`, {
          method: "PATCH", headers,
          body: JSON.stringify({ data: { action_type: "ADD", column_order: [colType], user_data: batch.map(h => [h]) } }),
        });
        if (!r.ok) {
          const errText = await r.text();
          res.status(400).json({ error: `Batch ${i+1} error (${r.status})`, details: errText, audience_id: audId });
          return;
        }
        uploaded += batch.length;
      }

      res.json({
        success: true, platform: "reddit", audience_id: audId,
        total_sent: hashed.length, batches: total,
        emails_sent: v.hashedEmails.length, phones_sent: v.hashedPhones.length,
      });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

// ═══════════════════════════════════════════════════════════════
// 4. TREBLE — Deploy WhatsApp conversation via API
// ═══════════════════════════════════════════════════════════════
exports.deployToTreble = functions.region("us-central1").runWith(fnOpts)
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;
    if (req.method !== "POST") { res.status(405).json({ error: "Only POST" }); return; }

    const TOKEN = process.env.TREBLE_API_KEY;
    if (!TOKEN) { res.status(500).json({ error: "TREBLE_API_KEY not configured" }); return; }

    const { phones, pollId } = req.body || {};
    if (!pollId) { res.status(400).json({ error: "pollId is required" }); return; }
    if (!phones || !phones.length) { res.status(400).json({ error: "phones[] is required" }); return; }

    try {
      const users = phones.map(p => {
        let phone = String(p.phone || p).replace(/[\s\-\(\)\+]/g, "");
        const cc = p.country_code || "+52";
        if (phone.startsWith("52") && phone.length > 10) phone = phone.slice(2);
        const entry = { cellphone: phone, country_code: cc, user_session_keys: [] };
        if (p.name) entry.user_session_keys.push({ key: "name", value: p.name });
        if (p.vars && Array.isArray(p.vars)) {
          p.vars.forEach(v => entry.user_session_keys.push({ key: v.key, value: v.value }));
        }
        return entry;
      });

      const BATCH = 500, total = Math.ceil(users.length / BATCH);
      const results = [];
      for (let i = 0; i < total; i++) {
        const batch = users.slice(i * BATCH, (i + 1) * BATCH);
        const r = await fetch(`https://main.treble.ai/deployment/api/poll/${pollId}`, {
          method: "POST",
          headers: { "Authorization": TOKEN, "Content-Type": "application/json" },
          body: JSON.stringify({ users: batch }),
        });
        const d = await r.json();
        if (!r.ok) {
          res.status(r.status).json({ error: `Batch ${i+1} error`, treble_error: d, sent_so_far: i * BATCH });
          return;
        }
        results.push(d);
      }

      res.json({ success: true, platform: "treble", total_sent: users.length, batches: total, results });
    } catch (e) { res.status(500).json({ error: e.message }); }
  });

// ═══════════════════════════════════════════════════════════════
// 5. ATTRIBUTION TRACKER — Collect endpoint
// Receives batched events from heru-tracker.js
// ═══════════════════════════════════════════════════════════════

const admin = require("firebase-admin");
if (!admin.apps.length) admin.initializeApp();
const db = admin.firestore();

exports.collect = functions.region("us-central1").runWith({ timeoutSeconds: 30, memory: "256MB" })
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;
    if (req.method !== "POST") { res.status(405).json({ error: "Only POST" }); return; }

    try {
      const { events } = req.body;
      if (!events || !Array.isArray(events) || events.length === 0) {
        return res.status(400).json({ error: "No events" });
      }

      const batch = events.slice(0, 20);
      const ip = (req.headers["x-forwarded-for"] || "").split(",")[0].trim();
      const ipHash = ip ? "h_" + Math.abs(simpleHash(ip)).toString(36) : "";

      const fbBatch = db.batch();

      for (const event of batch) {
        if (!event.cid) continue;

        const doc = {
          cid: event.cid,
          event: event.event || "unknown",
          session_id: event.session_id || null,
          timestamp: event.timestamp || Date.now(),
          server_time: admin.firestore.FieldValue.serverTimestamp(),
          page_path: (event.page_path || "").substring(0, 200),
          page_referrer: (event.page_referrer || "").substring(0, 500),
          page_title: (event.page_title || "").substring(0, 200),
          user_agent: (event.user_agent || "").substring(0, 300),
          ip_hash: ipHash,
          utms: event.utms || {},
          click_ids: event.click_ids || {},
          params: event.params || {}
        };

        // Route to collection based on event type
        let collection = "touchpoints";
        if (event.event && event.event.startsWith("purchase")) collection = "raw_purchases";
        if (event.event === "identity_discovered" || event.event === "identity_manual") collection = "raw_identities";

        fbBatch.set(db.collection(collection).doc(), doc);

        // Link identity: cid ↔ email/phone hash
        if ((event.event === "identity_discovered" || event.event === "identity_manual") && event.params?.hash) {
          fbBatch.set(db.collection("identities").doc(event.cid), {
            cid: event.cid,
            [event.params.type + "_hash"]: event.params.hash,
            updated_at: admin.firestore.FieldValue.serverTimestamp()
          }, { merge: true });
        }

        // Store purchase separately with dedup key
        if (event.event && event.event.startsWith("purchase") && event.params) {
          const txId = event.params.transaction_id;
          const purchaseDoc = {
            cid: event.cid,
            session_id: event.session_id || null,
            timestamp: event.timestamp || Date.now(),
            server_time: admin.firestore.FieldValue.serverTimestamp(),
            transaction_id: txId || null,
            value: parseFloat(event.params.value) || 0,
            currency: event.params.currency || "MXN",
            item_name: event.params.item_name || null,
            source_event: event.event,
            utms: event.utms || {},
            click_ids: event.click_ids || {}
          };
          const docRef = txId
            ? db.collection("purchases").doc(txId)
            : db.collection("purchases").doc();
          fbBatch.set(docRef, purchaseDoc, { merge: true });
        }
      }

      await fbBatch.commit();
      return res.status(200).json({ ok: true, received: batch.length });

    } catch (err) {
      console.error("collect error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  });

// ═══════════════════════════════════════════════════════════════
// 6. ATTRIBUTION QUERY — Returns journey + attribution for a user
// ═══════════════════════════════════════════════════════════════

exports.attribution = functions.region("us-central1").runWith({ timeoutSeconds: 60, memory: "256MB" })
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;

    try {
      const { cid, transaction_id, model } = req.query;
      if (!cid && !transaction_id) {
        return res.status(400).json({ error: "Provide cid or transaction_id" });
      }

      let targetCid = cid;
      if (!targetCid && transaction_id) {
        const pSnap = await db.collection("purchases").doc(transaction_id).get();
        if (!pSnap.exists) return res.status(404).json({ error: "Purchase not found" });
        targetCid = pSnap.data().cid;
      }

      const tpSnap = await db.collection("touchpoints")
        .where("cid", "==", targetCid)
        .orderBy("timestamp", "asc")
        .get();
      const touchpoints = tpSnap.docs.map(d => d.data());

      const pSnap = await db.collection("purchases")
        .where("cid", "==", targetCid)
        .orderBy("timestamp", "asc")
        .get();
      const purchases = pSnap.docs.map(d => d.data());

      const idDoc = await db.collection("identities").doc(targetCid).get();
      const identity = idDoc.exists ? idDoc.data() : null;

      const attrModel = model || "position_based";
      const journeys = purchases.map(p => {
        const preTp = touchpoints.filter(t => t.timestamp <= p.timestamp);
        return {
          purchase: p,
          touchpoints_count: preTp.length,
          journey: preTp.map(t => attrGetSource(t)).join(" → "),
          attribution: attrCalculate(preTp, p.value, attrModel)
        };
      });

      return res.json({ cid: targetCid, identity, touchpoints: touchpoints.length, purchases: purchases.length, journeys });

    } catch (err) {
      console.error("attribution error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  });

// ═══════════════════════════════════════════════════════════════
// 7. ATTRIBUTION SUMMARY — JSON endpoint for dashboard
// ═══════════════════════════════════════════════════════════════

exports.attributionSummary = functions.region("us-central1").runWith({ timeoutSeconds: 300, memory: "512MB" })
  .https.onRequest(async (req, res) => {
    if (cors(req, res)) return;

    try {
      const purchasesSnap = await db.collection("purchases")
        .orderBy("timestamp", "desc")
        .limit(1000)
        .get();

      if (purchasesSnap.empty) return res.json({ detail: [], daily: [], total_purchases: 0 });

      const detailRows = [];
      const dailySummary = {};

      for (const pDoc of purchasesSnap.docs) {
        const p = pDoc.data();
        const fecha = new Date(p.timestamp).toISOString().substring(0, 10);

        const tpSnap = await db.collection("touchpoints")
          .where("cid", "==", p.cid)
          .where("timestamp", "<=", p.timestamp)
          .orderBy("timestamp", "asc")
          .get();
        const touchpoints = tpSnap.docs.map(d => d.data());

        const idDoc = await db.collection("identities").doc(p.cid).get();
        const emailHash = idDoc.exists ? (idDoc.data().email_hash || "") : "";
        const journey = touchpoints.map(t => attrGetSource(t)).join(" → ");
        const firstTouch = touchpoints.length > 0 ? attrGetSource(touchpoints[0]) : "";
        const lastTouch = touchpoints.length > 0 ? attrGetSource(touchpoints[touchpoints.length - 1]) : "";

        const attribution = attrCalculate(touchpoints, p.value, "position_based");

        for (const attr of attribution) {
          detailRows.push({
            fecha, transaction_id: p.transaction_id || "", cid: p.cid, email_hash: emailHash,
            value: p.value || 0, currency: p.currency || "MXN", item: p.item_name || "",
            source: attr.source, weight: attr.weight, attributed_value: attr.attributed_value,
            num_touchpoints: touchpoints.length, journey, first_touch: firstTouch, last_touch: lastTouch,
            utm_campaign: p.utms?.utm_campaign || ""
          });

          const key = `${fecha}|${attr.source}`;
          if (!dailySummary[key]) dailySummary[key] = { fecha, source: attr.source, value: 0, purchases: 0 };
          dailySummary[key].value += attr.attributed_value;
          dailySummary[key].purchases += attr.weight;
        }
      }

      const daily = Object.values(dailySummary)
        .sort((a, b) => b.fecha.localeCompare(a.fecha) || b.value - a.value);

      return res.json({ detail: detailRows, daily, total_purchases: purchasesSnap.size });

    } catch (err) {
      console.error("attributionSummary error:", err);
      return res.status(500).json({ error: "Internal error" });
    }
  });

// ═══════════════════════════════════════════════════════════════
// Attribution helpers
// ═══════════════════════════════════════════════════════════════

function simpleHash(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
}

function attrGetSource(tp) {
  if (tp.utms?.utm_source) return tp.utms.utm_source;
  const ci = tp.click_ids || {};
  if (ci.fbclid) return "meta";
  if (ci.gclid || ci.wbraid || ci.gbraid) return "google";
  if (ci.rdt_cid) return "reddit";
  if (ci.ttclid) return "tiktok";
  if (ci.msclkid) return "bing";
  if (ci.li_fat_id) return "linkedin";
  const ref = tp.page_referrer || "";
  if (ref.includes("google.com")) return "google_organic";
  if (ref.includes("facebook.com") || ref.includes("fb.com")) return "meta_organic";
  if (ref.includes("tiktok.com")) return "tiktok_organic";
  if (ref.includes("reddit.com")) return "reddit_organic";
  if (ref.includes("youtube.com")) return "youtube";
  if (ref) return "referral";
  return "direct";
}

function attrCalculate(touchpoints, purchaseValue, model) {
  if (!touchpoints.length || !purchaseValue) return [];

  const sessions = {};
  touchpoints.forEach(t => {
    const source = attrGetSource(t);
    const key = (t.session_id || t.timestamp) + ":" + source;
    if (!sessions[key]) sessions[key] = { source, timestamp: t.timestamp, utms: t.utms, click_ids: t.click_ids };
  });

  const ut = Object.values(sessions).sort((a, b) => a.timestamp - b.timestamp);
  if (!ut.length) return [];

  const w = {};

  if (model === "linear") {
    const each = 1 / ut.length;
    ut.forEach(t => { w[t.source] = (w[t.source] || 0) + each; });
  } else if (model === "time_decay") {
    const hl = 7 * 86400000;
    const last = ut[ut.length - 1].timestamp;
    const rw = ut.map(t => ({ source: t.source, w: Math.pow(2, -(last - t.timestamp) / hl) }));
    const tot = rw.reduce((s, x) => s + x.w, 0);
    rw.forEach(x => { w[x.source] = (w[x.source] || 0) + x.w / tot; });
  } else {
    // position_based (U-shape)
    if (ut.length === 1) {
      w[ut[0].source] = 1;
    } else if (ut.length === 2) {
      w[ut[0].source] = (w[ut[0].source] || 0) + 0.5;
      w[ut[1].source] = (w[ut[1].source] || 0) + 0.5;
    } else {
      w[ut[0].source] = (w[ut[0].source] || 0) + 0.4;
      w[ut[ut.length - 1].source] = (w[ut[ut.length - 1].source] || 0) + 0.4;
      const mid = 0.2 / (ut.length - 2);
      for (let i = 1; i < ut.length - 1; i++) {
        w[ut[i].source] = (w[ut[i].source] || 0) + mid;
      }
    }
  }

  return Object.entries(w).map(([source, weight]) => ({
    source,
    weight: Math.round(weight * 10000) / 10000,
    attributed_value: Math.round(purchaseValue * weight * 100) / 100
  })).sort((a, b) => b.attributed_value - a.attributed_value);
}
