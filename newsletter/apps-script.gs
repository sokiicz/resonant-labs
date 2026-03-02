/**
 * Resonant Studio — Idea Inbox Backend
 * Google Apps Script — deploy as a Web App
 *
 * Setup:
 *  1. Replace YOUR_SHEET_ID with the ID from your Google Sheet URL
 *  2. Replace YOUR_ADMIN_SECRET with a password only you know
 *  3. Deploy → New deployment → Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  4. Copy the web app URL into admin.html and js/chatbot.js
 */

const SHEET_ID    = 'YOUR_SHEET_ID';
const ADMIN_SECRET = 'YOUR_ADMIN_SECRET';
const SHEET_NAME  = 'Ideas';

// Column order in the sheet
const COLS = ['id', 'submitted_at', 'name', 'email', 'idea', 'problem', 'newsletter_opt_in'];

// ---------- Receive a new idea submission ----------
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // Basic validation
    if (!data.idea) {
      return jsonResponse({ success: false, error: 'No idea provided' });
    }

    const sheet = getOrCreateSheet();
    const id = Utilities.getUuid();
    const now = Utilities.formatDate(new Date(), 'Europe/London', 'dd/MM/yyyy HH:mm');

    sheet.appendRow([
      id,
      now,
      data.name          || 'Not given',
      data.email         || 'Not given',
      data.idea          || '',
      data.problem       || '',
      data.newsletter_opt_in || 'No',
    ]);

    return jsonResponse({ success: true, id: id });
  } catch (err) {
    return jsonResponse({ success: false, error: err.toString() });
  }
}

// ---------- Fetch all ideas for the admin dashboard ----------
function doGet(e) {
  const secret = (e.parameter && e.parameter.secret) || '';

  if (secret !== ADMIN_SECRET) {
    return jsonResponse({ error: 'Unauthorized' });
  }

  try {
    const sheet = getOrCreateSheet();
    const rows = sheet.getDataRange().getValues();

    // Skip header row
    const ideas = rows.slice(1).map(row => {
      const obj = {};
      COLS.forEach((col, i) => { obj[col] = row[i] || ''; });
      return obj;
    }).reverse(); // Newest first

    return jsonResponse({ ideas: ideas, total: ideas.length });
  } catch (err) {
    return jsonResponse({ error: err.toString() });
  }
}

// ---------- Helpers ----------
function getOrCreateSheet() {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  let sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    // Write header row
    sheet.appendRow(COLS);
    sheet.getRange(1, 1, 1, COLS.length)
      .setFontWeight('bold')
      .setBackground('#1a1a2e')
      .setFontColor('#8b5cf6');
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function jsonResponse(data) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
