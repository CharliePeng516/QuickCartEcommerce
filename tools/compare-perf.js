// tools/compare-perf.js
// Compare Cypress vs Playwright perf outputs and write a markdown summary with
// median, average (mean), p90, and median delta, excluding selected metrics.
//
// Inputs:
//   artifacts/playwright-perf.json  -> { tool: "playwright", results: Array<Run> }
//   artifacts/cypress-perf.json     -> { tool: "cypress",    results: Array<Run> }
// Output:
//   artifacts/perf-summary.md       -> Markdown table

const fs = require('fs');

const load = (p) => JSON.parse(fs.readFileSync(p, 'utf-8'));
const safeResults = (obj) => (obj && Array.isArray(obj.results) ? obj.results : []);

// Exclude these metrics from the report
const EXCLUDE = new Set(['load', 'onLCP', 'onCLS']);

// Metric descriptions (remaining only)
const DESCRIPTIONS = {
  dcl:    'DOMContentLoaded completion (ms)',
  ttfb:   'Navigation request Time to First Byte (ms)',
  onFCP:  'First Contentful Paint (ms)',
  onTTFB: 'TTFB via Web Vitals (ms)',
  onINP:  'Interaction to Next Paint (ms)',
};

// Preferred display order; unknown non-excluded keys are appended alphabetically
const PREFERRED = ['dcl', 'ttfb', 'onFCP', 'onTTFB', 'onINP'];

// ---- load inputs ----
const pw = safeResults(load('artifacts/playwright-perf.json'));
const cy = safeResults(load('artifacts/cypress-perf.json'));

if (!pw.length && !cy.length) {
  console.error('No results found. Make sure both JSON files exist in artifacts/.');
  process.exit(1);
}

// Build the metric list (exclude specified keys)
const allKeysRaw = Array.from(new Set([
  ...Object.keys(pw[0] || {}),
  ...Object.keys(cy[0] || {}),
]));
const allKeys = allKeysRaw.filter((k) => !EXCLUDE.has(k));

const metrics = [
  ...PREFERRED.filter((k) => allKeys.includes(k)),
  ...allKeys.filter((k) => !PREFERRED.includes(k)).sort(),
];

// Compute median, average (mean), and p90 (filter out non-finite values)
const stat = (arr) => {
  const vals = arr.filter(Number.isFinite);
  const a = [...vals].sort((x, y) => x - y);
  if (!a.length) return { median: NaN, avg: NaN, p90: NaN };

  const median = a.length % 2
    ? a[(a.length - 1) / 2]
    : (a[a.length / 2 - 1] + a[a.length / 2]) / 2;

  const avg = vals.reduce((s, v) => s + v, 0) / vals.length;
  const p90 = a[Math.min(a.length - 1, Math.floor(a.length * 0.9))];

  return { median, avg, p90 };
};

const toMap = (rows) => {
  const m = {};
  for (const k of metrics) m[k] = stat(rows.map((r) => r[k]));
  return m;
};

const pwm = toMap(pw);
const cym = toMap(cy);

// Format numbers (all remaining metrics are shown as integer ms)
const fmt = (v) => (Number.isFinite(v) ? v.toFixed(0) : '-');

// ---- render markdown ----
let md =
  `# Perf comparison (excluding load, LCP, CLS)\n\n` +
  `> Units: all shown metrics are milliseconds (ms). ` +
  `Delta is **CY − PW** (negative means Cypress is faster). Averages are arithmetic means.\n\n` +
  `| Description | metric | PW median | CY median | Δ (CY−PW) | PW avg | CY avg | PW p90 | CY p90 |\n` +
  `|---|---|---:|---:|---:|---:|---:|---:|---:|\n`;

for (const k of metrics) {
  const a = pwm[k] || {};
  const b = cym[k] || {};

  const deltaMedian = (Number.isFinite(a.median) && Number.isFinite(b.median))
    ? (b.median - a.median).toFixed(0)
    : '-';

  md += `| ${DESCRIPTIONS[k] || ''} | ${k} | `
      + `${fmt(a.median)} | ${fmt(b.median)} | ${deltaMedian} | `
      + `${fmt(a.avg)} | ${fmt(b.avg)} | `
      + `${fmt(a.p90)} | ${fmt(b.p90)} |\n`;
}

// ---- write output ----
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync('artifacts/perf-summary.md', md);
console.log(md);
