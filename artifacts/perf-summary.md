# Perf comparison

> Units: all metrics are milliseconds (ms) **except `onCLS`**, which is unitless. Delta is **CY − PW** (negative means Cypress is faster).

| Description | metric | PW median | CY median | Δ (CY−PW) | PW p90 | CY p90 |
|---|---|---:|---:|---:|---:|---:|
| DOMContentLoaded completion (ms) | dcl | 940 | 192 | -748 | 1005 | 239 |
| Load event completion (ms) | load | 0 | 884 | 884 | 1950 | 922 |
| Navigation request Time to First Byte (ms) | ttfb | 139 | 5 | -135 | 163 | 7 |
| First Contentful Paint (ms) | onFCP | 986 | 202 | -784 | 1044 | 248 |
| TTFB via Web Vitals (ms) | onTTFB | 774 | 8 | -766 | 831 | 10 |
| Largest Contentful Paint (ms) | onLCP | - | 202 | - | - | 248 |
| Cumulative Layout Shift (unitless; lower is better) | onCLS | - | 0.011 | - | - | 0.011 |
