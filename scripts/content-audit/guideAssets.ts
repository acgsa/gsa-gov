/**
 * CSS for the static "Scoring guide & key" page, kept as a string so guide.ts
 * stays focused on data → markup. No external network calls; everything is
 * inlined so the guide opens as a plain file:// page. Mirrors the report's
 * visual language (same accent, badge colors).
 */

export const GUIDE_CSS = `
:root{--fg:#1b1b1b;--muted:#5c5c5c;--line:#d6d7d9;--bg:#fff;--accent:#005ea2;}
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:#f5f6f7}
header{background:var(--accent);color:#fff;padding:1.25rem 1.5rem}
header h1{margin:0 0 .25rem;font-size:1.4rem}
header p{margin:0;opacity:.92;font-size:.9rem}
header p+p{margin-top:.4rem}
a{color:var(--accent)}
a.back{color:#fff;text-decoration:underline}
main{max-width:900px;margin:1.5rem auto;padding:0 1rem}
section{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:1rem 1.25rem;margin-bottom:1rem}
section h2{margin:0 0 .5rem;font-size:1.1rem}
.lede{color:var(--muted);font-size:.9rem;margin:.25rem 0 .75rem}
table{width:100%;border-collapse:collapse;font-size:.88rem}
th,td{text-align:left;padding:.5rem .55rem;border-bottom:1px solid var(--line);vertical-align:top}
th{background:#f0f1f2}
td.pts,th.pts{text-align:right;white-space:nowrap;width:4rem}
tfoot td{border-top:2px solid var(--line);border-bottom:none}
code{background:#eef1f3;border:1px solid var(--line);border-radius:4px;padding:.05rem .3rem;font-size:.85em}
ol,ul{margin:.25rem 0;padding-left:1.25rem}
li{margin:.35rem 0}
.rec{display:inline-block;padding:.1rem .5rem;border-radius:999px;font-size:.72rem;font-weight:700;white-space:nowrap}
.rec-keep{background:#e3f5e1;color:#1a7f37}
.rec-consolidate{background:#fff3cd;color:#8a6d00}
.rec-archive{background:#e1e7f0;color:#4a4f7a}
.rec-delete{background:#fde0e0;color:#b21b1b}
.rec-review{background:#e6eefc;color:#1a4480}
.flag{display:inline-block;font-size:.68rem;font-weight:700;padding:.05rem .4rem;border-radius:4px;white-space:nowrap}
.flag-legal{background:#111;color:#fff}
.flag-review{background:#8a6d00;color:#fff}
`;
