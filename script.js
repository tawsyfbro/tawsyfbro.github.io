/**
 * Jamaat Timings — Load data from Google Sheets and display with filters.
 *
 * SETUP: Publish your Google Sheet to the web:
 * 1. File → Share → Publish to web
 * 2. Choose "Comma-separated values (.csv)" and the sheet (e.g. Sheet1)
 * 3. Copy the export URL and set GOOGLE_SHEETS_CSV_URL below.
 *
 * Or use the Sheet ID: replace YOUR_SHEET_ID in the URL.
 */
const GOOGLE_SHEETS_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vSL48mXRcbeX03vwQmjLVctz4Pn3tvxzQCMFn6plSm1pHfxjGvS9cyXPimpt1r7LNkwWkJRafv3JaxZ/pub?gid=0&single=true&output=csv';



/** Set to true to use sample data when the sheet URL is not configured. */
const USE_SAMPLE_DATA_IF_NEEDED = true;

const PRAYER_ORDER = ['fajr', 'zuhr', 'asr', 'maghrib', 'isha', 'jumuah'];


// DOM elements
const areaSelect = document.getElementById('area-select');
const mosqueSelect = document.getElementById('mosque-select');
const prayerSelect = document.getElementById('prayer-select');
const prevPrayerBtn = document.getElementById('prev-prayer');
const nextPrayerBtn = document.getElementById('next-prayer');
const currentPrayerLabel = document.getElementById('current-prayer-label');
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const errorMessage = document.getElementById('error-message');
const resultsContainer = document.getElementById('results-container');
const timingsBody = document.getElementById('timings-body');
const noResultsEl = document.getElementById('no-results');

let allRows = [];
let currentPrayerIndex = 0;

/**
 * Parse CSV text into array of objects using first row as keys.
 * Handles quoted fields and lowercase header keys for matching.
 */
function parseCSV(text) {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = parseCSVLine(lines[0]).map((h) => h.trim().toLowerCase().replace(/\s+/g, '_'));
  const rows = [];

  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    const row = {};
    headers.forEach((key, j) => {
      row[key] = (values[j] || '').trim();
    });
    if (row.mosque_name || row.prayer || row.jamaat_time) rows.push(row);
  }
  return rows;
}

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const c = line[i];
    if (c === '"') {
      inQuotes = !inQuotes;
    } else if ((c === ',' && !inQuotes) || (c === '\n' && !inQuotes)) {
      result.push(current);
      current = '';
    } else {
      current += c;
    }
  }
  result.push(current);
  return result;
}

/**
 * Normalize prayer name for display and comparison (e.g. "asr" → "Asr").
 */

function formatPrayer(name) {
  if (!name) return '';
  return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

// NEW: normalize for comparison (handles Jumu'ah vs Jumuah)
function normalizePrayerValue(name) {
  return (name || '').toLowerCase().replace(/['’]/g, '');
}

/**
 * Fetch CSV from Google Sheets and return parsed rows.
 */
async function fetchData() {
  const url = GOOGLE_SHEETS_CSV_URL;
  if (USE_SAMPLE_DATA_IF_NEEDED && (url.includes('YOUR_SHEET_ID') || !url.trim())) {
    return [...SAMPLE_ROWS];
  }
  const res = await fetch(url, { mode: 'cors' });
  if (!res.ok) throw new Error(`Failed to load data: ${res.status}`);
  const text = await res.text().then((t) => t.replace(/^\uFEFF/, ''));
  return parseCSV(text);
}

function showLoading(show) {
  loadingEl.hidden = !show;
  errorEl.hidden = true;
  resultsContainer.hidden = show;
}

function showError(message) {
  loadingEl.hidden = true;
  errorEl.hidden = false;
  errorMessage.textContent = message;
  resultsContainer.hidden = true;
}

function showResults() {
  loadingEl.hidden = true;
  errorEl.hidden = true;
  resultsContainer.hidden = false;
}

/**
 * Populate area and mosque dropdowns from allRows.
 */

function fillFilters() {
  const areas = [...new Set(allRows.map((r) => r.area).filter(Boolean))].sort();
  const mosques = [...new Set(allRows.map((r) => r.mosque_name).filter(Boolean))].sort();

  areaSelect.innerHTML = '<option value="">All areas</option>';
  areas.forEach((a) => {
    const opt = document.createElement('option');
    opt.value = a;
    opt.textContent = a;
    areaSelect.appendChild(opt);
  });

  mosqueSelect.innerHTML = '<option value="">All mosques</option>';
  mosques.forEach((m) => {
    const opt = document.createElement('option');
    opt.value = m;
    opt.textContent = m;
    mosqueSelect.appendChild(opt);
  });
}

/**
 * Get current filter values and prayer from dropdown/arrow state.
 */
function getFilters() {
  const area = areaSelect.value;
  const mosque = mosqueSelect.value;
  // const prayer = prayerSelect.value || (PRAYER_ORDER[currentPrayerIndex] ?? '');
  const prayer = prayerSelect.value; // Removed the fallback to currentPrayerIndex
  return { area, mosque, prayer };
}

/**
 * Filter rows by area, mosque, and prayer.
 */
//-------------------------------------GEMINI CHANGE
// function getFilteredRows() {
//   const { area, mosque, prayer } = getFilters();
//   return allRows.filter((r) => {
//     if (area && r.area !== area) return false;
//     if (mosque && r.mosque_name !== mosque) return false;
//     if (prayer && (r.prayer || '').toLowerCase() !== prayer.toLowerCase()) return false;
//     return true;
//   });
// }

function getFilteredRows() {
  const { area, mosque, prayer } = getFilters();
  const normalizedFilterPrayer = normalizePrayerValue(prayer);

  return allRows.filter((r) => {
    if (area && r.area !== area) return false;
    if (mosque && r.mosque_name !== mosque) return false;
    if (normalizedFilterPrayer &&
        normalizePrayerValue(r.prayer) !== normalizedFilterPrayer) return false;
    return true;
  });
}

//-------------------------------------GEMINI CHANGE

/**
 * Render table body and sync prayer dropdown + arrow label.
 */
// function renderTable() {
//   const rows = getFilteredRows();

//   timingsBody.innerHTML = '';
//   rows.forEach((r) => {
//     const tr = document.createElement('tr');
//     tr.innerHTML = `
//       <td>${escapeHtml(r.mosque_name || '—')}</td>
//       <td>${escapeHtml(r.area || '—')}</td>
//       <td class="col-prayer">${formatPrayer(r.prayer)}</td>
//       <td class="col-time">${escapeHtml(r.jamaat_time || '—')}</td>
//     `;
//     timingsBody.appendChild(tr);
//   });

//   noResultsEl.hidden = rows.length > 0;
//   currentPrayerLabel.textContent = formatPrayer(getFilters().prayer) || '—';
// }

//-------------------------------------GEMINI CHANGE
function renderTable() {
  const rows = getFilteredRows();
  const activePrayer = getFilters().prayer;

  timingsBody.innerHTML = '';
  rows.forEach((r) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${escapeHtml(r.mosque_name || '—')}</td>
      <td>${escapeHtml(r.area || '—')}</td>
      <td class="col-prayer">${formatPrayer(r.prayer)}</td>
      <td class="col-time">${escapeHtml(r.jamaat_time || '—')}</td>
    `;
    timingsBody.appendChild(tr);
  });

  noResultsEl.hidden = rows.length > 0;
  
  // Update label: Show "All Prayers" if no specific prayer is selected
  currentPrayerLabel.textContent = activePrayer ? formatPrayer(activePrayer) : 'All Prayers';
}

//-------------------------------------GEMINI CHANGE

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

/**
 * Set prayer filter by index (0 = fajr, 1 = zuhr, …) and update UI.
 */
function setPrayerByIndex(index) {
  currentPrayerIndex = ((index % PRAYER_ORDER.length) + PRAYER_ORDER.length) % PRAYER_ORDER.length;
  prayerSelect.value = PRAYER_ORDER[currentPrayerIndex];
  renderTable();
}

function onPrevPrayer() {
  setPrayerByIndex(currentPrayerIndex - 1);
}

function onNextPrayer() {
  setPrayerByIndex(currentPrayerIndex + 1);
}

/**
 * When area or mosque changes, restrict mosque/area options and re-render.
 */
function onFilterChange() {
  renderTable();
}

async function init() {
  showLoading(true);
  try {
    allRows = await fetchData();
    if (!allRows.length) {
      showError('No data found in the sheet. Check that the first row has headers: mosque_id, mosque_name, area, prayer, jamaat_time');
      return;
    }
    fillFilters();
    setPrayerByIndex(0);
    showResults();
    renderTable();
  } catch (e) {
    showError(e.message || 'Could not load timings.');
    return;
  }

  areaSelect.addEventListener('change', onFilterChange);
  mosqueSelect.addEventListener('change', onFilterChange);


  // prayerSelect.addEventListener('change', () => {
  //   const val = prayerSelect.value;
  //   const idx = PRAYER_ORDER.indexOf(val.toLowerCase());
  //   if (idx !== -1) currentPrayerIndex = idx;
  //   renderTable();
  // });
//------------------------------GEMINI CHANGE
//   prayerSelect.addEventListener('change', () => {
//   const val = prayerSelect.value;
//   if (val !== "") {
//     const idx = PRAYER_ORDER.indexOf(val.toLowerCase());
//     if (idx !== -1) currentPrayerIndex = idx;
//   }
//   renderTable();
// });

  prayerSelect.addEventListener('change', () => {
    const val = prayerSelect.value;
    if (val !== "") {
      const idx = PRAYER_ORDER.indexOf(normalizePrayerValue(val));
      if (idx !== -1) currentPrayerIndex = idx;
    }
    renderTable();
  });


//------------------------------GEMINI CHANGE

  prevPrayerBtn.addEventListener('click', onPrevPrayer);
  nextPrayerBtn.addEventListener('click', onNextPrayer);
}


init();
