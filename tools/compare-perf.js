// tools/compare-perf.js
// Compare Cypress vs Playwright perf outputs and write a markdown summary.
//
// Inputs:
//   artifacts/playwright-perf.json  -> { tool: "playwright", results: Array<Run> }
//   artifacts/cypress-perf.json     -> { tool: "cypress",    results: Array<Run> }
// Output:
//   artifacts/perf-summary.md       -> Markdown table with medians/p90s and deltas

const fs = require('fs');

// ---------- helpers ----------
const load = (p) =>
  JSON.parse(fs.readFileSync(p, 'utf-8'));
const safeResults = (obj) =>
  obj && Array.isArray(obj.results)
    ? obj.results
    : [];

// Metric descriptions (English)
const DESCRIPTIONS = {
  dcl: 'DOMContentLoaded completion (ms)',
  load: 'Load event completion (ms)',
  ttfb: 'Navigation request Time to First Byte (ms)',
  onFCP: 'First Contentful Paint (ms)',
  onTTFB: 'TTFB via Web Vitals (ms)',
  onLCP: 'Largest Contentful Paint (ms)',
  onCLS:
    'Cumulative Layout Shift (unitless; lower is better)',
  onINP: 'Interaction to Next Paint (ms)',
};

// Preferred display order; unknown keys will be appended alphabetically
const PREFERRED = [
  'dcl',
  'load',
  'ttfb',
  'onFCP',
  'onTTFB',
  'onLCP',
  'onCLS',
  'onINP',
];

// ---------- load inputs ----------
const pw = safeResults(
  load('artifacts/playwright-perf.json')
);
const cy = safeResults(
  load('artifacts/cypress-perf.json')
);

if (!pw.length && !cy.length) {
  console.error(
    'No results found. Make sure both JSON files exist in artifacts/.'
  );
  process.exit(1);
}

// Build the metric list
const allKeys = Array.from(
  new Set([
    ...Object.keys(pw[0] || {}),
    ...Object.keys(cy[0] || {}),
  ])
);
const metrics = [
  ...PREFERRED.filter((k) => allKeys.includes(k)),
  ...allKeys
    .filter((k) => !PREFERRED.includes(k))
    .sort(),
];

// Compute median & p90 (filter out non-finite values)
const stat = (arr) => {
  const a = arr
    .filter(Number.isFinite)
    .sort((x, y) => x - y);
  if (!a.length) return { median: NaN, p90: NaN };
  const median =
    a.length % 2
      ? a[(a.length - 1) / 2]
      : (a[a.length / 2 - 1] + a[a.length / 2]) /
        2;
  const p90 =
    a[
      Math.min(
        a.length - 1,
        Math.floor(a.length * 0.9)
      )
    ];
  return { median, p90 };
};

const toMap = (rows) => {
  const m = {};
  for (const k of metrics)
    m[k] = stat(rows.map((r) => r[k]));
  return m;
};

const pwm = toMap(pw);
const cym = toMap(cy);

// Format values: CLS keeps 3 decimals; others are integers (ms)
const fmt = (k, v) =>
  Number.isFinite(v)
    ? k === 'onCLS'
      ? v.toFixed(3)
      : v.toFixed(0)
    : '-';

// ---------- render markdown ----------
let md =
  `# Perf comparison\n\n` +
  `> Units: all metrics are milliseconds (ms) **except \`onCLS\`**, which is unitless. ` +
  `Delta is **CY − PW** (negative means Cypress is faster).\n\n` +
  `| Description | metric | PW median | CY median | Δ (CY−PW) | PW p90 | CY p90 |\n` +
  `|---|---|---:|---:|---:|---:|---:|\n`;

for (const k of metrics) {
  const a = pwm[k] || {};
  const b = cym[k] || {};

  const delta =
    Number.isFinite(a.median) &&
    Number.isFinite(b.median)
      ? k === 'onCLS'
        ? (b.median - a.median).toFixed(3)
        : (b.median - a.median).toFixed(0)
      : '-';

  md += `| ${
    DESCRIPTIONS[k] || ''
  } | ${k} | ${fmt(k, a.median)} | ${fmt(
    k,
    b.median
  )} | ${delta} | ${fmt(k, a.p90)} | ${fmt(
    k,
    b.p90
  )} |\n`;
}

// ---------- write output ----------
fs.mkdirSync('artifacts', { recursive: true });
fs.writeFileSync('artifacts/perf-summary.md', md);
console.log(md);
