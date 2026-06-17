// ═══════════════════════════════════════════════════════════════
// Supabase → Google Sheets — Sync de Leads (reemplaza Make)
//
// PREREQUISITO:
//   Ir a Supabase → SQL Editor → ejecutar este comando:
//   CREATE POLICY "allow_anon_select" ON public.leads FOR SELECT TO anon USING (true);
//
// INSTRUCCIONES:
// 1. Pegar en Apps Script como archivo nuevo (no borrar el existente)
// 2. Ejecutar backfillFromSupabase() UNA VEZ para importar leads faltantes
//    → Marca leads existentes con "Importado" en col R para que el bot NO les mande WhatsApp
// 3. Ejecutar setupSyncTrigger() UNA VEZ para activar sync cada 15 min
//    → Leads nuevos llegan con col R vacía → el bot SÍ les manda WhatsApp
// ═══════════════════════════════════════════════════════════════

var SUPA_URL = 'https://nrubwqqtewbwmjlxytwk.supabase.co';
var SUPA_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ydWJ3cXF0ZXdid21qbHh5dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEyNTczMzAsImV4cCI6MjA4NjgzMzMzMH0.F38di1ABXLkKpTyi1DMOqmZ_6Su1qLnawdAcPbOrfbg';
var SYNC_SHEET = 'Leads';  // nombre exacto de la pestaña
var COL_WHATSAPP = 18;  // R — "Se envió WhatsApp" (el bot checa esta)

// Columnas nuevas que se agregan al final (T en adelante)
// T: utm_source, U: utm_medium, V: utm_campaign, W: utm_term,
// X: utm_content, Y: page_url, Z: referrer, AA: contact_preference, AB: source
var EXTRA_COLS_START = 20; // columna T = 20
var EXTRA_HEADERS = [
  'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
  'utm_content', 'page_url', 'referrer', 'contact_preference', 'source'
];

// ── FETCH TODOS LOS LEADS DE SUPABASE ──────────────────────
function _fetchAllLeads() {
  var all = [], offset = 0, hasMore = true;
  while (hasMore) {
    var url = SUPA_URL + '/rest/v1/leads?select=*&order=created_at.asc&offset=' + offset + '&limit=1000';
    var resp = UrlFetchApp.fetch(url, {
      headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY },
      muteHttpExceptions: true,
    });
    if (resp.getResponseCode() !== 200) {
      Logger.log('ERROR (' + resp.getResponseCode() + '): ' + resp.getContentText());
      return null;
    }
    var batch = JSON.parse(resp.getContentText());
    all = all.concat(batch);
    offset += 1000;
    hasMore = batch.length === 1000;
  }
  return all;
}

// ── MAPEAR LEAD A FILA (columnas A-K = datos originales) ───
function _leadToBaseRow(lead) {
  return [
    lead.id || '',
    lead.created_at || '',
    lead.name || '',
    lead.email || '',
    lead.phone || '',
    lead.rfc || '',
    lead.curp || '',
    lead.economic_activity || '',
    lead.sat_reaction || '',
    lead.has_accountant === true ? 'TRUE' : lead.has_accountant === false ? 'FALSE' : '',
    lead.tax_need || '',
  ];
}

// ── MAPEAR LEAD A COLUMNAS EXTRA (T en adelante) ───────────
function _leadToExtraCols(lead) {
  return [
    lead.utm_source || '',
    lead.utm_medium || '',
    lead.utm_campaign || '',
    lead.utm_term || '',
    lead.utm_content || '',
    lead.page_url || '',
    lead.referrer || '',
    lead.contact_preference || '',
    lead.source || '',
  ];
}

// ═══════════════════════════════════════════════════════════════
// BACKFILL — Ejecutar UNA VEZ para importar todos los leads
// Marca col R como "Importado" para que el bot NO les mande WA
// ═══════════════════════════════════════════════════════════════
function backfillFromSupabase() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SYNC_SHEET);
  if (!sheet) { Logger.log('ERROR: No se encontró pestaña "' + SYNC_SHEET + '"'); return; }

  // Escribir headers de columnas extra si no existen
  var headerRow = sheet.getRange(1, EXTRA_COLS_START, 1, EXTRA_HEADERS.length).getValues()[0];
  if (!headerRow[0]) {
    sheet.getRange(1, EXTRA_COLS_START, 1, EXTRA_HEADERS.length).setValues([EXTRA_HEADERS]);
  }

  // Obtener IDs existentes en la hoja
  var lastRow = sheet.getLastRow();
  var existingIds = {};
  if (lastRow > 1) {
    var data = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    data.forEach(function(r, idx) { if (r[0]) existingIds[String(r[0])] = idx + 2; }); // row number
  }
  Logger.log('IDs en sheet: ' + Object.keys(existingIds).length);

  // Fetch todos de Supabase
  var allLeads = _fetchAllLeads();
  if (!allLeads) return;
  Logger.log('Leads en Supabase: ' + allLeads.length);

  // Separar: leads que YA existen (actualizar extras) vs leads NUEVOS
  var newLeads = [];
  var updateBatch = []; // {row, extras}

  allLeads.forEach(function(lead) {
    var rowNum = existingIds[String(lead.id)];
    if (rowNum) {
      // Ya existe → solo actualizar columnas extra (UTMs)
      updateBatch.push({ row: rowNum, extras: _leadToExtraCols(lead) });
    } else {
      newLeads.push(lead);
    }
  });

  // Actualizar UTMs de leads existentes (en batch por rangos)
  updateBatch.forEach(function(item) {
    sheet.getRange(item.row, EXTRA_COLS_START, 1, item.extras.length).setValues([item.extras]);
  });
  Logger.log('Actualizados (UTMs): ' + updateBatch.length);
  Logger.log('Leads nuevos: ' + newLeads.length);

  if (newLeads.length === 0) {
    Logger.log('Sin leads nuevos. Solo se actualizaron UTMs.');
    return;
  }

  // Insertar leads nuevos en BATCH (mucho más rápido que fila por fila)
  var startRow = lastRow + 1;
  var numCols = 11; // A-K
  var baseRows = [];
  var extraRows = [];
  var waValues = [];

  newLeads.forEach(function(lead) {
    baseRows.push(_leadToBaseRow(lead));
    extraRows.push(_leadToExtraCols(lead));
    waValues.push(['Importado']);
  });

  // Escribir A-K en batch
  sheet.getRange(startRow, 1, baseRows.length, numCols).setValues(baseRows);
  // Escribir R (col 18) = "Importado" en batch
  sheet.getRange(startRow, COL_WHATSAPP, waValues.length, 1).setValues(waValues);
  // Escribir columnas extra (T+) en batch
  sheet.getRange(startRow, EXTRA_COLS_START, extraRows.length, EXTRA_HEADERS.length).setValues(extraRows);

  SpreadsheetApp.flush();
  Logger.log('Backfill completo: ' + newLeads.length + ' nuevos, ' + updateBatch.length + ' actualizados');
}


// ═══════════════════════════════════════════════════════════════
// SYNC INCREMENTAL — Cada 15 minutos
// Leads nuevos llegan con col R VACÍA → el bot SÍ les manda WA
// ═══════════════════════════════════════════════════════════════
function syncLeadsIncremental() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SYNC_SHEET);
  if (!sheet) return;

  // Obtener IDs existentes
  var lastRow = sheet.getLastRow();
  var existingIds = {};
  if (lastRow > 1) {
    sheet.getRange(2, 1, lastRow - 1, 1).getValues().forEach(function(r) {
      if (r[0]) existingIds[String(r[0])] = true;
    });
  }

  // Fetch todos de Supabase
  var allLeads = _fetchAllLeads();
  if (!allLeads) return;

  // Solo leads nuevos
  var newLeads = allLeads.filter(function(l) { return !existingIds[String(l.id)]; });
  if (!newLeads.length) { Logger.log('Sin leads nuevos'); return; }

  // Insertar en BATCH con col R VACÍA → el bot procesarLeadsNuevos() los detecta y manda WA
  var startRow = lastRow + 1;
  var baseRows = [];
  var extraRows = [];

  newLeads.forEach(function(lead) {
    baseRows.push(_leadToBaseRow(lead));
    extraRows.push(_leadToExtraCols(lead));
  });

  // Escribir A-K en batch
  sheet.getRange(startRow, 1, baseRows.length, 11).setValues(baseRows);
  // Col R queda vacía → el bot les manda WhatsApp
  // Escribir columnas extra (T+) en batch
  sheet.getRange(startRow, EXTRA_COLS_START, extraRows.length, EXTRA_HEADERS.length).setValues(extraRows);

  SpreadsheetApp.flush();
  Logger.log('Sync: ' + newLeads.length + ' leads nuevos agregados (pendientes de WhatsApp)');
}


// ═══════════════════════════════════════════════════════════════
// TEST — Ejecutar para verificar que la conexión a Supabase funciona
// ═══════════════════════════════════════════════════════════════
function testSupabaseConnection() {
  var url = SUPA_URL + '/rest/v1/leads?select=id&limit=3';
  var resp = UrlFetchApp.fetch(url, {
    headers: { 'apikey': SUPA_KEY, 'Authorization': 'Bearer ' + SUPA_KEY },
    muteHttpExceptions: true,
  });
  Logger.log('Status: ' + resp.getResponseCode());
  Logger.log('Response: ' + resp.getContentText());
  if (resp.getResponseCode() === 200) {
    var data = JSON.parse(resp.getContentText());
    if (data.length > 0) {
      Logger.log('CONEXION OK — ' + data.length + ' leads de prueba');
    } else {
      Logger.log('CONEXION OK pero 0 resultados — RLS probablemente bloqueando. Ejecutar en Supabase SQL Editor:');
      Logger.log('CREATE POLICY "allow_anon_select" ON public.leads FOR SELECT TO anon USING (true);');
    }
  } else {
    Logger.log('ERROR de conexion');
  }
}


// ═══════════════════════════════════════════════════════════════
// SETUP — Ejecutar UNA VEZ para crear el trigger de sync
// ═══════════════════════════════════════════════════════════════
function setupSyncTrigger() {
  // Eliminar triggers anteriores de esta función
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'syncLeadsIncremental') ScriptApp.deleteTrigger(t);
  });

  ScriptApp.newTrigger('syncLeadsIncremental')
    .timeBased()
    .everyMinutes(15)
    .create();

  Logger.log('Trigger creado: syncLeadsIncremental cada 15 min');
}
