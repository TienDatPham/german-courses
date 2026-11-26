// Shared card logic. The page defines `const D` (head, labels, cards, key) before loading this file.
const ALL=D.cards,LAB=D.labels;
let cur=-1,flip=false,known={},table=false;
try{known=JSON.parse(localStorage.getItem(D.key)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(D.key,JSON.stringify(known))}catch(e){}};
const el=(id)=>document.getElementById(id);
const esc=(s)=>s.replace(/[&<>]/g,(c)=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])).replace(/\`([^\`]+)\`/g,'<b>$1</b>');
const unknown=()=>ALL.map((_,k)=>k).filter((k)=>!known[ALL[k].f]);
el('revlab').textContent=LAB[0]+' zuerst';
const HR='<hr style="width:100%;border:0;border-top:1px solid var(--line);margin:16px 0">';
function stats(){
  el('pos').textContent='Unbekannt: '+unknown().length+'/'+ALL.length;
  el('stat').textContent='Gewusst: '+(ALL.length-unknown().length)+'/'+ALL.length;
}
function drawTable(){
  const th=D.head.concat(['Bekannt']).map((h)=>'<th>'+esc(h)+'</th>').join('');
  const body=ALL.map((c,k)=>'<tr>'+[c.f].concat(c.b).map((t,i)=>'<td>'+esc(t)+'</td>').join('')+'<td class="chk"><input type="checkbox" data-i="'+k+'"'+(known[c.f]?' checked':'')+' aria-label="Bekannt"></td></tr>').join('');
  el('tbl').innerHTML='<table><thead><tr>'+th+'</tr></thead><tbody>'+body+'</tbody></table>';
}
function draw(){
  stats();
  if(table)return;
  if(cur<0){el('card').innerHTML='<div class="front">'+(ALL.length&&!unknown().length?'Alle Wörter gewusst':'Keine Karten')+'</div>';return}
  const c=ALL[cur],rev=el('rev').checked;
  const front='<div class="front">'+esc(c.f)+'</div>';
  const back='<div class="back">'+c.b.map((t,k)=>t?'<p><span class="lab">'+esc(LAB[k])+'</span>'+esc(t)+'</p>':'').join('')+'</div>';
  const alt='<div class="front" style="font-size:22px;font-weight:500">'+esc(c.b[0])+'</div>';
  el('card').innerHTML=flip?front+HR+back:(rev?alt:front);
}
function pick(){
  const u=unknown();
  if(!u.length)return -1;
  const o=u.filter((k)=>k!==cur),p=o.length?o:u;
  return p[Math.floor(Math.random()*p.length)];
}
function next(){cur=pick();flip=false;draw()}
function mark(v){if(cur<0)return;known[ALL[cur].f]=v;save();next()}
function showTable(on){
  table=on;
  el('main').classList.toggle('tv',on);
  el('tbl').hidden=!on;
  el('all').textContent=on?'Karten':'Alle Wörter';
  if(on)drawTable();
  if(!on&&(cur<0||known[ALL[cur].f])&&unknown().length)next();
  else draw();
}
el('card').onclick=()=>{if(cur>=0){flip=!flip;draw()}};
el('rev').onchange=()=>{flip=false;draw()};
el('ok').onclick=()=>mark(true);
el('no').onclick=()=>mark(false);
el('all').onclick=()=>showTable(!table);
el('reset').onclick=()=>{known={};save();cur=-1;if(table)drawTable();if(!table)next();else stats()};
el('tbl').onchange=(e)=>{const i=e.target.dataset&&e.target.dataset.i;if(i===undefined)return;known[ALL[i].f]=e.target.checked;save();stats()};
document.onkeydown=(e)=>{
  if(e.key==='ArrowUp'){e.preventDefault();showTable(!table);return}
  if(table)return;
  if(e.key===' '||e.key==='ArrowDown'){e.preventDefault();if(cur>=0){flip=!flip;draw()}}
  else if(e.key==='ArrowRight'){e.preventDefault();mark(true)}
  else if(e.key==='ArrowLeft'){e.preventDefault();mark(false)}
};
next();
