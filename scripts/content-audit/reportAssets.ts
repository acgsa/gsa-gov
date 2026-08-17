/**
 * Client-side JS + CSS for the static report, kept as strings so report.ts
 * stays focused on data → markup. No external network calls; everything is
 * inlined so the report opens as a plain file:// page.
 */

export const REPORT_CSS = `
:root{--fg:#1b1b1b;--muted:#5c5c5c;--line:#d6d7d9;--bg:#fff;--accent:#005ea2;}
*{box-sizing:border-box}
body{margin:0;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;color:var(--fg);background:#f5f6f7}
header{background:var(--accent);color:#fff;padding:1.25rem 1.5rem}
header h1{margin:0 0 .25rem;font-size:1.4rem}
header p{margin:0;opacity:.9;font-size:.9rem}
header p+p{margin-top:.35rem}
a.guide-link{color:#fff;text-decoration:underline;font-weight:600}
main{max-width:1200px;margin:1.5rem auto;padding:0 1rem}
.cards{display:flex;flex-wrap:wrap;gap:.75rem;margin-bottom:1rem}
.stat{background:var(--bg);border:1px solid var(--line);border-radius:8px;padding:.75rem 1rem;min-width:120px;text-align:left;font:inherit;color:inherit;cursor:pointer}
.stat:hover{border-color:var(--accent)}
.stat[aria-pressed=true]{border-color:var(--accent);box-shadow:inset 0 0 0 2px var(--accent);background:#eef5fb}
.stat .n{font-size:1.5rem;font-weight:700}
.stat .l{font-size:.75rem;color:var(--muted);text-transform:uppercase;letter-spacing:.03em}
.controls{display:flex;flex-wrap:wrap;gap:.5rem;align-items:center;margin:1rem 0}
.controls input,.controls select{padding:.45rem .6rem;border:1px solid var(--line);border-radius:6px;font-size:.9rem}
.controls input[type=search]{min-width:260px}
table{width:100%;border-collapse:collapse;background:var(--bg);border:1px solid var(--line);border-radius:8px;overflow:hidden}
th,td{text-align:left;padding:.55rem .6rem;border-bottom:1px solid var(--line);font-size:.85rem;vertical-align:top}
th{background:#f0f1f2;cursor:pointer;white-space:nowrap;position:sticky;top:0}
th[aria-sort=ascending]::after{content:" ▲"}
th[aria-sort=descending]::after{content:" ▼"}
tbody tr:hover{background:#f8f9fa}
.score{font-weight:700}
.rec{display:inline-block;padding:.1rem .5rem;border-radius:999px;font-size:.72rem;font-weight:700;white-space:nowrap}
.rec-keep{background:#e3f5e1;color:#1a7f37}
.rec-consolidate{background:#fff3cd;color:#8a6d00}
.rec-archive{background:#e1e7f0;color:#4a4f7a}
.rec-delete{background:#fde0e0;color:#b21b1b}
.rec-review{background:#e6eefc;color:#1a4480}
.flag{display:inline-block;font-size:.68rem;font-weight:700;padding:.05rem .4rem;border-radius:4px;margin-left:.25rem}
.flag-legal{background:#111;color:#fff}
.flag-review{background:#8a6d00;color:#fff}
a{color:var(--accent)}
.url{word-break:break-all}
.muted{color:var(--muted)}
.count{margin:.5rem 0;color:var(--muted);font-size:.85rem}
.override{padding:.25rem .35rem;border:1px solid var(--line);border-radius:6px;font-size:.78rem}
tr.is-overridden{background:#fff8e1}
tr.is-overridden:hover{background:#fff3cd}
.overridden-badge{display:inline-block;font-size:.62rem;font-weight:700;padding:.05rem .35rem;border-radius:4px;background:#8a6d00;color:#fff;text-transform:uppercase;letter-spacing:.03em}
[hidden]{display:none!important}
.dl{padding:.45rem .7rem;border:1px solid var(--accent);background:var(--accent);color:#fff;border-radius:6px;font-size:.85rem;cursor:pointer}
.dl:hover{background:#00477a}
.ia{font-size:.8rem}
`;

export const REPORT_JS = `
(function(){
  var table=document.getElementById('t');
  var tbody=table.tBodies[0];
  // Only main rows are "rows"; each carries a reference to its detail row so
  // sorting can move the pair together (fixes orphaned detail rows).
  var rows=Array.prototype.filter.call(tbody.rows,function(r){
    return r.className.indexOf('detail')===-1;
  });
  rows.forEach(function(r){
    r._detail=document.getElementById('d'+r.getAttribute('data-group'));
  });
  var q=document.getElementById('q');
  var recSel=document.getElementById('rec');
  var flagSel=document.getElementById('flag');
  var count=document.getElementById('count');
  var sortState={col:-1,dir:1};

  function apply(){
    var term=(q.value||'').toLowerCase();
    var rec=recSel.value;var flag=flagSel.value;var shown=0;
    rows.forEach(function(r){
      var matchesText=!term||r.getAttribute('data-search').indexOf(term)>-1;
      var matchesRec=!rec||r.getAttribute('data-rec')===rec;
      var matchesFlag=!flag||r.getAttribute('data-'+flag)==='1';
      var vis=matchesText&&matchesRec&&matchesFlag;
      r.style.display=vis?'':'none';if(vis)shown++;
    });
    count.textContent=shown+' of '+rows.length+' pages';
  }
  q.addEventListener('input',apply);recSel.addEventListener('change',apply);flagSel.addEventListener('change',apply);

  // ---- Stat cards act as one-click filters that drive the dropdowns ----
  var cards=Array.prototype.slice.call(document.querySelectorAll('.stat'));
  function syncCards(){
    cards.forEach(function(c){
      var f=c.getAttribute('data-filter');
      var active;
      if(f===''){active=!recSel.value&&!flagSel.value;}
      else if(f.indexOf('rec:')===0){active=recSel.value===f.slice(4);}
      else if(f.indexOf('flag:')===0){active=flagSel.value===f.slice(5);}
      c.setAttribute('aria-pressed',active?'true':'false');
    });
  }
  cards.forEach(function(c){
    c.addEventListener('click',function(){
      var f=c.getAttribute('data-filter');
      if(f===''){recSel.value='';flagSel.value='';}
      else if(f.indexOf('rec:')===0){
        var v=f.slice(4);recSel.value=(recSel.value===v?'':v);flagSel.value='';
      }else if(f.indexOf('flag:')===0){
        var fv=f.slice(5);flagSel.value=(flagSel.value===fv?'':fv);recSel.value='';
      }
      apply();syncCards();
    });
  });
  recSel.addEventListener('change',syncCards);flagSel.addEventListener('change',syncCards);

  function sortBy(col){
    var dir=sortState.col===col?-sortState.dir:1;sortState={col:col,dir:dir};
    var ths=table.tHead.rows[0].cells;
    for(var i=0;i<ths.length;i++)ths[i].removeAttribute('aria-sort');
    ths[col].setAttribute('aria-sort',dir===1?'ascending':'descending');
    // Decorate: read each sort key from the DOM ONCE (not on every compare).
    var keyed=rows.map(function(r){
      var raw=r.cells[col].getAttribute('data-v');
      if(raw===null)raw=r.cells[col].textContent;
      var num=parseFloat(raw);
      return {row:r,str:raw,num:isNaN(num)?null:num};
    });
    keyed.sort(function(a,b){
      if(a.num!==null&&b.num!==null)return (a.num-b.num)*dir;
      return a.str.localeCompare(b.str)*dir;
    });
    // Batch all DOM moves into one fragment => a single reflow instead of ~10k.
    var frag=document.createDocumentFragment();
    keyed.forEach(function(k){
      frag.appendChild(k.row);
      if(k.row._detail)frag.appendChild(k.row._detail);
    });
    tbody.appendChild(frag);
  }
  Array.prototype.forEach.call(table.tHead.rows[0].cells,function(th,i){
    if(th.hasAttribute('data-sortable'))th.addEventListener('click',function(){sortBy(i);});
  });

  // ---- Reviewer overrides (report-only; results JSON is never mutated) ----
  // Overrides persist in localStorage so they survive a page refresh. This is
  // still purely client-side: the results JSON/CSV artifacts are never mutated.
  var STORAGE_KEY='gsa-content-audit-overrides';
  var overrides=loadOverrides();
  var overrideCount=document.getElementById('overrideCount');
  var recClasses={'Keep':'rec rec-keep','Consolidate':'rec rec-consolidate','Archive':'rec rec-archive','Delete':'rec rec-delete','Needs review':'rec rec-review'};

  function loadOverrides(){
    try{
      var raw=window.localStorage.getItem(STORAGE_KEY);
      var parsed=raw?JSON.parse(raw):null;
      return (parsed&&typeof parsed==='object')?parsed:{};
    }catch(e){return {};}
  }
  function saveOverrides(){
    try{window.localStorage.setItem(STORAGE_KEY,JSON.stringify(overrides));}catch(e){}
  }

  function refreshOverrideCount(){
    var n=Object.keys(overrides).length;
    overrideCount.textContent=n+(n===1?' override':' overrides');
  }

  // Paint a single row to reflect an override (or clear it when 'to' is empty).
  function paintRow(tr,to){
    var orig=tr.getAttribute('data-orig-rec');
    var cell=tr.querySelector('.rec-cell');
    var badgeEl=cell.querySelector('.overridden-badge');
    var recEl=cell.querySelector('.rec');
    var sel=tr.querySelector('select.override');
    if(to&&to!==orig){
      tr.classList.add('is-overridden');
      tr.setAttribute('data-rec',to);
      if(badgeEl)badgeEl.hidden=false;
      if(recEl){recEl.className=recClasses[to]||'rec rec-review';recEl.textContent=to;}
      if(sel)sel.value=to;
    }else{
      tr.classList.remove('is-overridden');
      tr.setAttribute('data-rec',orig);
      if(badgeEl)badgeEl.hidden=true;
      if(recEl){recEl.className=recClasses[orig]||'rec rec-review';recEl.textContent=orig;}
      if(sel)sel.value='';
    }
  }

  // Re-apply any stored overrides to the table on load.
  function restoreOverrides(){
    rows.forEach(function(tr){
      var url=tr.getAttribute('data-url');
      var o=overrides[url];
      if(o&&o.to)paintRow(tr,o.to);
    });
    refreshOverrideCount();
  }

  Array.prototype.forEach.call(document.querySelectorAll('select.override'),function(sel){
    sel.addEventListener('change',function(){
      var tr=sel.closest('tr');
      var url=tr.getAttribute('data-url');
      var orig=tr.getAttribute('data-orig-rec');
      var val=sel.value;
      if(val&&val!==orig){
        overrides[url]={from:orig,to:val};
      }else{
        delete overrides[url];
      }
      paintRow(tr,val);
      saveOverrides();
      refreshOverrideCount();
      apply();
    });
  });

  var dlBtn=document.getElementById('dlOverrides');
  dlBtn.addEventListener('click',function(){
    var list=Object.keys(overrides).map(function(url){
      return {url:url,from:overrides[url].from,to:overrides[url].to};
    });
    var payload={generatedAt:new Date().toISOString(),count:list.length,overrides:list};
    var blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
    var a=document.createElement('a');
    a.href=URL.createObjectURL(blob);
    a.download='content-audit-overrides.json';
    document.body.appendChild(a);a.click();
    document.body.removeChild(a);URL.revokeObjectURL(a.href);
  });

  var clearBtn=document.getElementById('clearOverrides');
  if(clearBtn)clearBtn.addEventListener('click',function(){
    var n=Object.keys(overrides).length;
    if(n===0)return;
    if(!window.confirm('Clear all '+n+' override'+(n===1?'':'s')+'? This cannot be undone.'))return;
    rows.forEach(function(tr){
      if(overrides[tr.getAttribute('data-url')])paintRow(tr,'');
    });
    overrides={};
    saveOverrides();
    refreshOverrideCount();
    apply();
  });

  restoreOverrides();
  apply();syncCards();
})();
`;
