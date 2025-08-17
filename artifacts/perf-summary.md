# Perf comparison (excluding load, LCP, CLS)

> Units: all shown metrics are milliseconds (ms). Delta is **CY − PW** (negative means Cypress is faster). Averages are arithmetic means.

| Description | metric | PW median | CY median | Δ (CY−PW) | PW avg | CY avg | PW p90 | CY p90 |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| DOMContentLoaded completion (ms) | dcl | 940 | 192 | -748 | 966 | 208 | 1005 | 239 |
| Navigation request Time to First Byte (ms) | ttfb | 139 | 5 | -135 | 143 | 6 | 163 | 7 |
| First Contentful Paint (ms) | onFCP | 986 | 202 | -784 | 1011 | 217 | 1044 | 248 |
| TTFB via Web Vitals (ms) | onTTFB | 774 | 8 | -766 | 797 | 15 | 831 | 10 |
