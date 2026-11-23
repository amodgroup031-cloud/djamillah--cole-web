/* Djamillah École — application */
(function(){
'use strict';
const KEY='djamillah_ecole_v1';
const $=s=>document.querySelector(s);
const view=$('#view');
const PASS_LESSON=12, PASS_EXAM=14;
const INTERVALS=[0,1,3,7,14,30];

// ---------- état
function blank(){return {name:'',created:today(),lessons:{},exams:{},unlocked:1,filiere:null,vocab:{},streak:{last:null,count:0},days:[],opts:{ar:1,tr:true},log:[]};}
let S;
try{S=JSON.parse(localStorage.getItem(KEY))||blank();}catch(e){S=blank();}
S=Object.assign(blank(),S);
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function today(d){d=d||new Date();return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');}
function addDays(n){const d=new Date();d.setDate(d.getDate()+n);return today(d);}
function touchStreak(){const t=today();if(S.streak.last===t)return;S.streak.count=(S.streak.last===addDays(-1))?S.streak.count+1:1;S.streak.last=t;if(!S.days.includes(t))S.days.push(t);save();}
function applyOpts(){document.documentElement.style.setProperty('--arsize',S.opts.ar);document.body.classList.toggle('notr',!S.opts.tr);}
applyOpts();

// ---------- helpers
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const shuffle=a=>{a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
const isAr=s=>/[؀-ۿ]/.test(s);
const T=s=>isAr(s)?`<span class="ar">${esc(s)}</span>`:esc(s);
const norm=s=>s.replace(/[ً-ْٰـ\s؟?]/g,'').replace(/[أإآٱ]/g,'ا').replace(/ى/g,'ي');
function toast(m){const t=$('#toast');t.textContent=m;t.hidden=false;clearTimeout(toast.t);toast.t=setTimeout(()=>t.hidden=true,2200);}
function modal(html){const m=$('#modal');m.querySelector('.modal-box').innerHTML=html;m.hidden=false;}
function closeModal(){$('#modal').hidden=true;}
$('#modal').addEventListener('click',e=>{if(e.target.id==='modal'||e.target.closest('[data-close]'))closeModal();});
function confirmBox(msg,ok,label){modal(`<h3>${msg}</h3><div class="two mt16"><button class="btn ghost" data-close style="margin:0">Annuler</button><button class="btn red" id="cfOk">${label||'Confirmer'}</button></div>`);$('#cfOk').onclick=()=>{closeModal();ok();};}
function level(id){return LEVELS.find(l=>l.id==id);}
function lessonById(id){for(const l of LEVELS)for(const x of (l.lessons||[]))if(x.id===id)return [l,x];return [];}
function lessonUnlocked(lv,i){if(lv.id>S.unlocked)return false;if(i===0)return true;const p=S.lessons[lv.lessons[i-1].id];return !!(p&&p.best>=PASS_LESSON);}
function lessonDone(id){const p=S.lessons[id];return !!(p&&p.best>=PASS_LESSON);}
function examUnlocked(lv){return lv.id<=S.unlocked&&(lv.lessons||[]).length>0&&lv.lessons.every(x=>lessonDone(x.id));}
function mention(n){if(n==null)return '—';if(n>=16)return 'Très bien';if(n>=14)return 'Bien';if(n>=12)return 'Assez bien';if(n>=10)return 'Passable';return 'Insuffisant';}
function fmt(n){return n==null?'—':(Math.round(n*10)/10).toString().replace('.',',');}
function addVocab(list,src){let n=0;for(const [ar,tr,fr] of list){const id=norm(ar)+'|'+fr;if(!S.vocab[id]){S.vocab[id]={ar,tr,fr,box:0,due:today(),src,added:today()};n++;}}if(n)save();return n;}
function dueWords(){const t=today();return Object.entries(S.vocab).filter(([k,v])=>v.due<=t);}
function nextLesson(){for(const lv of LEVELS){if(lv.id>S.unlocked||!lv.lessons)continue;for(let i=0;i<lv.lessons.length;i++){if(!lessonDone(lv.lessons[i].id))return [lv,lv.lessons[i],i];}if(!S.exams[lv.id]||!S.exams[lv.id].passed)return [lv,null,-1];}return [];}
function levelProgress(lv){if(!lv.lessons)return 0;const tot=lv.lessons.length+1;let d=lv.lessons.filter(x=>lessonDone(x.id)).length;if(S.exams[lv.id]&&S.exams[lv.id].passed)d++;return Math.round(d/tot*100);}
function average(){const notes=[];for(const k in S.lessons)if(S.lessons[k].best!=null)notes.push(S.lessons[k].best);for(const k in S.exams)if(S.exams[k].best!=null){notes.push(S.exams[k].best,S.exams[k].best);}return notes.length?notes.reduce((a,b)=>a+b,0)/notes.length:null;}

// ---------- routeur
const titles={home:'Djamillah École',niveaux:'Mes cours',vocab:'Cahier de vocabulaire',coran:'Mode Coran',bulletin:'Mon bulletin',profil:'Profil et réglages',revision:'Révision du jour',filiere:'Choix de filière'};
function setTop(title,back,tab){$('#topTitle').textContent=title;$('#backBtn').hidden=!back;$('#topLogo').hidden=!!back;document.querySelectorAll('#tabbar a').forEach(a=>a.classList.toggle('on',a.dataset.tab===tab));$('#tabbar').style.display=tab==='none'?'none':'';}
$('#backBtn').onclick=()=>history.back();
$('#settingsBtn').onclick=()=>location.hash='#/profil';
window.addEventListener('hashchange',route);
function route(){
  closeModal();window.scrollTo(0,0);
  if(!S.name){return renderWelcome();}
  const h=(location.hash||'#/home').slice(2).split('/');
  const r=h[0]||'home';
  switch(r){
    case 'home':return renderHome();
    case 'niveaux':return renderLevels();
    case 'niveau':return renderLevel(+h[1]);
    case 'lecon':return renderLesson(h[1]);
    case 'exos':return startQuiz('lesson',h[1]);
    case 'examen':return startQuiz('exam',+h[1]);
    case 'vocab':return renderVocab();
    case 'revision':return renderReview();
    case 'bulletin':return renderBulletin();
    case 'coran':return renderCoran();
    case 'sourate':return renderSurah(h[1]);
    case 'filiere':return renderFiliere();
    case 'profil':return renderProfile();
    default:return renderHome();
  }
}
document.addEventListener('click',e=>{const g=e.target.closest('[data-go]');if(g){location.hash=g.dataset.go;}});

// ---------- accueil
function renderWelcome(){
  setTop('Djamillah École',false,'none');$('#topbar').style.display='none';
  view.innerHTML=`<div class="welcome"><img src="img/logo.png" alt=""><div class="ar">مَدْرَسَةُ جَمِيلَة</div><h1>Djamillah École</h1><p class="muted">Ton école d’arabe personnelle, du Primaire au Doctorat.<br>Arabe moderne et arabe du Coran.</p>
  <div class="card" style="text-align:left"><label><b>Comment t’appelles-tu ?</b></label><input class="field mt8" id="wName" placeholder="Ton prénom" autocomplete="off"><button class="btn mt8" id="wGo">Commencer · بِسْمِ اللَّهِ</button></div></div>`;
  $('#wGo').onclick=()=>{const n=$('#wName').value.trim();if(!n){toast('Écris ton prénom');return;}S.name=n;save();$('#topbar').style.display='';location.hash='#/home';route();};
}
function renderHome(){
  setTop(titles.home,false,'home');$('#topbar').style.display='';
  const [lv,ls]=nextLesson();const cur=level(S.unlocked)||LEVELS[0];const due=dueWords().length;
  const words=Object.values(S.vocab);const wd=words.length?words[(new Date().getDate()*7)%words.length]:null;
  let cont='';
  if(lv&&ls)cont=`<div class="card"><div class="row between"><span class="badge">Niveau ${lv.id} · ${lv.name}</span><span class="badge gold">${S.lessons[ls.id]?'En cours':'À commencer'}</span></div><h3 class="mt8">${esc(ls.title)}</h3><div class="ar" style="font-size:22px;color:var(--g)">${ls.ar}</div><button class="btn mt8" data-go="#/lecon/${ls.id}">▶ Continuer la leçon</button></div>`;
  else if(lv)cont=`<div class="card"><h3>🎓 Examen de fin de niveau ${lv.id}</h3><p class="muted">Toutes les leçons sont réussies. Passe l’examen pour débloquer le niveau suivant.</p><button class="btn gold" data-go="#/examen/${lv.id}">Passer l’examen</button></div>`;
  else cont=`<div class="card"><h3>Les prochaines leçons arrivent bientôt</h3><p class="muted">Révise ton vocabulaire et le Mode Coran en attendant.</p></div>`;
  view.innerHTML=`<div class="card hero"><div class="hello">السَّلَامُ عَلَيْكُمْ</div><div class="hello-name">${esc(S.name)}</div>
   <div class="row between"><span>Niveau ${cur.id} · ${cur.name} <span class="ar" style="font-size:16px">${cur.ar}</span></span><b>${levelProgress(cur)}%</b></div><div class="bar mt8"><i style="width:${levelProgress(cur)}%"></i></div>
   <div class="stats"><div class="stat"><b>🔥 ${S.streak.count}</b><span>jours de suite</span></div><div class="stat"><b>${words.length}</b><span>mots au cahier</span></div><div class="stat"><b>${fmt(average())}</b><span>moyenne /20</span></div></div></div>
   ${cont}
   <div class="card daily" data-go="#/revision"><div class="ic">🗂️</div><div style="flex:1"><b>Révision du jour</b><div class="muted" style="font-size:13px">${due?due+' mot'+(due>1?'s':'')+' à réviser aujourd’hui':'Tout est révisé, bravo !'}</div></div><span class="badge ${due?'gold':''}">${due?'Réviser':'✓'}</span></div>
   ${wd?`<div class="card word-day row between"><div><small class="muted">Mot du jour</small><div><b>${esc(wd.fr)}</b></div><small class="tr" style="color:#8a6d12;font-style:italic">${esc(wd.tr)}</small></div><div class="ar">${wd.ar}</div></div>`:''}
   <div class="tiles"><button class="tile" data-go="#/coran"><div class="ic">📖</div><b>Mode Coran</b><small>Versets mot à mot</small></button><button class="tile" data-go="#/bulletin"><div class="ic">📊</div><b>Bulletin</b><small>Notes et progression</small></button><button class="tile" data-go="#/niveaux"><div class="ic">🎓</div><b>Les 6 niveaux</b><small>Primaire → Doctorat</small></button><button class="tile" data-go="#/vocab"><div class="ic">📝</div><b>Mon cahier</b><small>${words.length} mots</small></button></div>`;
}

// ---------- niveaux
function renderLevels(){
  setTop(titles.niveaux,false,'niveaux');
  view.innerHTML=`<p class="muted" style="margin-top:0">Chaque niveau se débloque en réussissant l’examen du niveau précédent (${PASS_EXAM}/20 minimum).</p>`+LEVELS.map(lv=>{
    const locked=lv.id>S.unlocked;const done=S.exams[lv.id]&&S.exams[lv.id].passed;
    return `<button class="lvl ${locked?'locked':''}" data-go="#/niveau/${lv.id}"><div class="num" style="background:${lv.color}">${lv.id}</div><div class="info"><div class="row between"><b>${lv.name}</b>${locked?'<span class="lock">🔒</span>':done?'<span class="badge">✓ Validé</span>':'<span class="badge gold">En cours</span>'}</div><div class="ar" style="font-size:17px;color:var(--g);line-height:1.6">${lv.ar}</div><small>${esc(lv.desc)}</small>${!locked&&lv.lessons?`<div class="bar mt8"><i style="width:${levelProgress(lv)}%"></i></div>`:''}</div></button>`;}).join('');
}
function renderLevel(id){
  const lv=level(id);if(!lv)return renderLevels();
  setTop(`Niveau ${lv.id} · ${lv.name}`,true,'niveaux');
  const locked=lv.id>S.unlocked;
  let html=`<div class="card hero" style="background:linear-gradient(140deg,${lv.color},var(--gd))"><div class="ar" style="font-size:24px">${lv.ar}</div><h2 style="margin:4px 0">${lv.name}</h2><p style="margin:0;opacity:.9">${esc(lv.desc)}</p>${lv.filiere&&S.filiere?`<div class="mt8"><span class="badge gold">Filière : ${FILIERES.find(f=>f.id===S.filiere).name}</span></div>`:''}</div>`;
  if(locked)html+=`<div class="card center"><div style="font-size:40px">🔒</div><b>Niveau verrouillé</b><p class="muted">Réussis l’examen du niveau ${lv.id-1} pour ouvrir ce niveau.</p></div>`;
  if(lv.filiere&&!locked&&!S.filiere)html+=`<div class="card"><b>Choisis ta filière pour entrer en Licence</b><button class="btn gold mt8" data-go="#/filiere">Choisir ma filière</button></div>`;
  if(lv.lessons){
    html+=`<h2>Leçons</h2>`+lv.lessons.map((x,i)=>{const un=lessonUnlocked(lv,i);const p=S.lessons[x.id];const d=lessonDone(x.id);
      return `<button class="lesson ${d?'done':''} ${un?'':'locked'}" ${un?`data-go="#/lecon/${x.id}"`:''}><div class="n">${d?'✓':i+1}</div><div class="info"><b>Leçon ${i+1} · ${esc(x.title)}</b><br><small>${p&&p.best!=null?`Meilleure note : <span class="score">${fmt(p.best)}/20</span>`:(un?'À commencer':'🔒 Réussis la leçon précédente')}</small></div>${x.video?'<span>🎬</span>':''}</button>`;}).join('');
    const eu=examUnlocked(lv);const ex=S.exams[lv.id];
    html+=`<div class="card mt16"><div class="row between"><b>🎓 Examen de fin de niveau</b>${ex&&ex.best!=null?`<span class="score">${fmt(ex.best)}/20</span>`:''}</div><p class="muted" style="margin:6px 0 10px">${lv.exam.length} questions · réussite à ${PASS_EXAM}/20 · débloque le niveau ${lv.id+1}.</p>${eu?`<button class="btn gold" data-go="#/examen/${lv.id}">${ex&&ex.passed?'Repasser l’examen':'Passer l’examen'}</button>`:`<button class="btn" disabled>🔒 Termine toutes les leçons</button>`}</div>`;
  } else {
    let list=lv.syllabus;
    if(lv.filiere){const f=S.filiere||'coran';list=lv.syllabus[f];html+=S.filiere?'':`<p class="muted">Aperçu du programme (filière Sciences islamiques et Coran) :</p>`;}
    html+=`<h2>Programme</h2><div class="card"><ul class="syll">${list.map((t,i)=>`<li><span>${i+1}. ${esc(t)}</span><span class="badge grey">En préparation</span></li>`).join('')}</ul></div><p class="muted center" style="font-size:13px">Les leçons de ce niveau seront ajoutées au fil des mises à jour.</p>`;
  }
  view.innerHTML=html;
}

// ---------- leçon
function renderLesson(id){
  const [lv,x]=lessonById(id);if(!x)return renderLevels();
  const idx=lv.lessons.indexOf(x);if(!lessonUnlocked(lv,idx)){toast('Leçon verrouillée');location.hash='#/niveau/'+lv.id;return;}
  setTop(`Leçon ${idx+1}`,true,'niveaux');
  if(!S.lessons[id]){S.lessons[id]={best:null,attempts:0,opened:today()};save();}
  const added=addVocab(x.vocab,id);
  let html=`<span class="badge">Niveau ${lv.id} · ${lv.name}</span><h1 class="mt8">${esc(x.title)}</h1><div class="ar" style="font-size:24px;color:var(--g);margin-top:-8px">${x.ar}</div><p class="muted">${esc(x.intro)}</p>`;
  const vsrc=x.video&&x.video[0]==='@'?((window.DE&&DE.remote)||'')+x.video.slice(1):x.video;
  if(x.video)html+=`<div class="video-box"><video id="lvid" controls playsinline preload="metadata" src="${vsrc}"></video><div class="video-ph" id="vph" hidden><div class="play">📶</div><b>Vidéo de la leçon</b><small>Connecte-toi à internet pour regarder la vidéo, puis touche ici pour réessayer.</small></div></div><p class="muted" style="font-size:13px;margin-top:-4px">🎬 Regarde la vidéo en entier, puis relis le cours ci-dessous.</p>`;
  html+=x.sections.map(s=>`<div class="card sec"><h3>${esc(s.h)}</h3>${s.html}</div>`).join('');
  html+=`<div class="card"><h3>📝 Vocabulaire de la leçon</h3><p class="muted" style="margin:0 0 8px;font-size:13px">Ces mots sont dans ton cahier et reviendront dans la révision du jour.</p><div class="vocab-mini">${x.vocab.map(v=>`<div class="vm"><span class="ar">${v[0]}</span><small>${esc(v[2])}</small></div>`).join('')}</div></div>`;
  const p=S.lessons[id];
  html+=`<div class="sticky-foot"><button class="btn gold" data-go="#/exos/${id}">✍️ Faire les exercices (${x.exos.length})${p.best!=null?' · '+fmt(p.best)+'/20':''}</button></div>`;
  view.innerHTML=html;
  const v=$('#lvid');if(v){v.addEventListener('error',()=>{v.hidden=true;$('#vph').hidden=false;});$('#vph').onclick=()=>{$('#vph').hidden=true;v.hidden=false;v.load();};}
  view.querySelectorAll('.letter').forEach(b=>b.onclick=()=>modal(`<div class="modal-big ar">${b.dataset.l}</div><h2 class="center" style="margin:0">${b.dataset.n}</h2><p class="center muted">Son : ${esc(b.dataset.s)}</p><div class="ar center" style="font-size:34px;color:var(--g)">${b.dataset.l}َ  ${b.dataset.l}ِ  ${b.dataset.l}ُ</div><p class="center muted">avec fatha, kasra, damma</p><button class="btn" data-close>Fermer</button>`));
  if(added)toast(`${added} mots ajoutés à ton cahier`);
}

// ---------- quiz
let Q=null;
function startQuiz(kind,id){
  let items,title,back;
  if(kind==='lesson'){const [lv,x]=lessonById(id);if(!x)return renderLevels();if(!lessonUnlocked(lv,lv.lessons.indexOf(x)))return renderLevels();items=x.exos;title='Exercices · '+x.title;}
  else{const lv=level(id);if(!lv||!examUnlocked(lv)){toast('Examen verrouillé');location.hash='#/niveau/'+id;return;}items=lv.exam;title=`Examen · Niveau ${lv.id}`;}
  Q={kind,id,items:kind==='exam'?shuffle(items):items,i:0,score:0,mistakes:[],title};
  setTop(kind==='exam'?'Examen de fin de niveau':'Exercices',true,'none');
  renderQ();
}
function renderQ(){
  const it=Q.items[Q.i];const n=Q.items.length;
  let body='';
  const head=`<div class="qhead"><span class="qcount">${Q.i+1}/${n}</span><div class="bar"><i style="width:${Q.i/n*100}%"></i></div></div>`;
  const qt=`<p class="qtitle">${T(it.q).replace(/([؀-ۿ][؀-ۿً-ْ\s]*)/g,'$1')}</p>${it.ar?`<div class="qar ar">${it.ar}</div>`:''}`;
  Q.cur={done:false,val:null};
  if(it.t==='qcm'){const ord=shuffle(it.o.map((o,k)=>k));Q.cur.ord=ord;body=ord.map(k=>`<button class="opt" data-k="${k}">${T(it.o[k])}</button>`).join('');}
  else if(it.t==='tf'){body=`<div class="tfrow"><button class="opt" data-k="1">✔ Vrai</button><button class="opt" data-k="0">✘ Faux</button></div>`;}
  else if(it.t==='match'){const L=shuffle(it.pairs.map((p,k)=>k)),Rr=shuffle(it.pairs.map((p,k)=>k));Q.cur.err=0;Q.cur.ok=0;body=`<div class="match">${L.map((k,j)=>`<button class="mt" data-side="L" data-k="${k}">${T(it.pairs[k][0])}</button><button class="mt" data-side="R" data-k="${Rr[j]}">${T(it.pairs[Rr[j]][1])}</button>`).join('')}</div>`;}
  else if(it.t==='order'){Q.cur.ans=[];Q.cur.pool=shuffle(it.w.map((w,k)=>k));if(it.w.length>1&&Q.cur.pool.every((k,j)=>k===j))Q.cur.pool.reverse();body=`<div class="answer-line" id="aline"></div><div class="pool" id="pool"></div>`;}
  else if(it.t==='write'){Q.cur.txt='';const keys='ا ب ت ث ج ح خ د ذ ر ز س ش ص ض ط ظ ع غ ف ق ك ل م ن ه و ي ة ى ء أ إ آ ؤ ئ'.split(' ');body=`<div class="writebox ar" id="wb"></div><div class="kbd">${keys.map(k=>`<button data-key="${k}">${k}</button>`).join('')}<button class="wide" data-key=" ">espace</button><button class="del" data-key="del">⌫ effacer</button></div>`;}
  view.innerHTML=`${head}<div class="muted" style="font-size:12px;margin-bottom:4px">${esc(Q.title)}</div>${qt}<div id="qbody">${body}</div><div id="fb"></div><div class="sticky-foot"><button class="btn" id="qbtn" disabled>Valider</button></div>`;
  const btn=$('#qbtn');
  const enable=()=>{btn.disabled=false;};
  if(it.t==='qcm'||it.t==='tf'){view.querySelectorAll('.opt').forEach(o=>o.onclick=()=>{if(Q.cur.done)return;view.querySelectorAll('.opt').forEach(x=>x.classList.remove('sel'));o.classList.add('sel');Q.cur.val=+o.dataset.k;enable();});}
  if(it.t==='match'){let sel=null;view.querySelectorAll('.mt').forEach(m=>m.onclick=()=>{if(Q.cur.done||m.classList.contains('ok'))return;
      if(!sel||sel.dataset.side===m.dataset.side){if(sel)sel.classList.remove('sel');sel=m;m.classList.add('sel');return;}
      if(sel.dataset.k===m.dataset.k){sel.classList.remove('sel');sel.classList.add('ok');m.classList.add('ok');Q.cur.ok++;sel=null;if(Q.cur.ok===it.pairs.length){enable();}}
      else{const a=sel,b=m;a.classList.add('no');b.classList.add('no');Q.cur.err++;setTimeout(()=>{a.classList.remove('no','sel');b.classList.remove('no');},500);sel=null;}});}
  if(it.t==='order'){const draw=()=>{$('#aline').innerHTML=Q.cur.ans.map((k,j)=>`<button class="tok ar" data-j="${j}">${it.w[k]}</button>`).join('')||'<span class="muted" style="direction:ltr;font-size:13px">Touche les mots dans l’ordre (de droite à gauche)</span>';$('#pool').innerHTML=Q.cur.pool.map((k,j)=>`<button class="tok ar" data-j="${j}">${it.w[k]}</button>`).join('');
      $('#aline').querySelectorAll('.tok').forEach(t=>t.onclick=()=>{if(Q.cur.done)return;Q.cur.pool.push(Q.cur.ans.splice(+t.dataset.j,1)[0]);draw();});
      $('#pool').querySelectorAll('.tok').forEach(t=>t.onclick=()=>{if(Q.cur.done)return;Q.cur.ans.push(Q.cur.pool.splice(+t.dataset.j,1)[0]);draw();});
      btn.disabled=Q.cur.pool.length>0;};draw();}
  if(it.t==='write'){view.querySelectorAll('.kbd button').forEach(b=>b.onclick=()=>{if(Q.cur.done)return;const k=b.dataset.key;Q.cur.txt=k==='del'?Q.cur.txt.slice(0,-1):Q.cur.txt+k;$('#wb').textContent=Q.cur.txt;btn.disabled=!Q.cur.txt.trim();});}
  btn.onclick=()=>{if(Q.cur.done){Q.i++;if(Q.i>=Q.items.length)return finishQuiz();return renderQ();}check(it);};
}
function check(it){
  let pts=0,right='';
  if(it.t==='qcm'){pts=Q.cur.val===it.a?1:0;view.querySelectorAll('.opt').forEach(o=>{const k=+o.dataset.k;if(k===it.a)o.classList.add('good');else if(k===Q.cur.val)o.classList.add('bad');});right=it.o[it.a];}
  else if(it.t==='tf'){const v=Q.cur.val===1;pts=v===it.a?1:0;view.querySelectorAll('.opt').forEach(o=>{const k=+o.dataset.k===1;if(k===it.a)o.classList.add('good');else if(k===v)o.classList.add('bad');});right=it.a?'Vrai':'Faux';}
  else if(it.t==='match'){pts=Q.cur.err===0?1:Q.cur.err<=2?0.5:0;right=it.pairs.map(p=>p[0]+' = '+p[1]).join(' ; ');}
  else if(it.t==='order'){const got=Q.cur.ans.map(k=>it.w[k]).join(' ');pts=got===it.w.join(' ')?1:0;right=it.w.join(' ');}
  else if(it.t==='write'){pts=it.a.some(a=>norm(a)===norm(Q.cur.txt))?1:0;right=it.a[0];}
  Q.score+=pts;Q.cur.done=true;
  if(pts<1)Q.mistakes.push({q:it.q,right,ex:it.ex});
  const ok=pts===1;
  $('#fb').innerHTML=`<div class="feedback ${ok?'good':'bad'}"><b>${ok?'✓ Bravo, c’est juste !':pts>0?'≈ Presque ! ('+(it.t==='match'?Q.cur.err+' erreur(s)':'')+')':'✗ Pas tout à fait'}</b>${!ok?`Bonne réponse : ${T(right)}<br>`:''}${it.ex?esc(it.ex).replace(/([؀-ۿ][؀-ۿً-ْٰ ]*[؀-ۿً-ْ])/g,'<span class="ar" style="font-size:20px">$1</span>'):''}</div>`;
  const btn=$('#qbtn');btn.disabled=false;btn.textContent=Q.i+1>=Q.items.length?'Voir mon résultat':'Continuer';
  btn.scrollIntoView({block:'nearest'});
}
function finishQuiz(){
  const n=Q.items.length;const note=Math.round(Q.score/n*20*10)/10;touchStreak();
  let passed,unlockedMsg='',rec;
  if(Q.kind==='lesson'){rec=S.lessons[Q.id]||(S.lessons[Q.id]={best:null,attempts:0});rec.attempts++;rec.last=note;rec.date=today();if(rec.best==null||note>rec.best)rec.best=note;passed=note>=PASS_LESSON;}
  else{rec=S.exams[Q.id]||(S.exams[Q.id]={best:null,attempts:0,passed:false});rec.attempts++;rec.last=note;rec.date=today();if(rec.best==null||note>rec.best)rec.best=note;passed=note>=PASS_EXAM;if(passed){rec.passed=true;if(S.unlocked<=Q.id&&Q.id<6){S.unlocked=Q.id+1;unlockedMsg=`<div class="card" style="background:var(--goldl)"><b>🎉 Niveau ${Q.id+1} · ${level(Q.id+1).name} débloqué !</b></div>`;}}}
  S.log.push({k:Q.kind,id:Q.id,note,date:today()});save();
  const pass=Q.kind==='lesson'?PASS_LESSON:PASS_EXAM;
  let next='';
  if(Q.kind==='lesson'){const [lv,x]=lessonById(Q.id);const i=lv.lessons.indexOf(x);if(passed){if(i+1<lv.lessons.length)next=`<button class="btn" data-go="#/lecon/${lv.lessons[i+1].id}">Leçon suivante ▶</button>`;else next=`<button class="btn gold" data-go="#/examen/${lv.id}">🎓 Passer l’examen du niveau ${lv.id}</button>`;}}
  else if(passed){const nl=level(Q.id+1);next=nl&&nl.filiere&&!S.filiere?`<button class="btn gold" data-go="#/filiere">Choisir ma filière</button>`:`<button class="btn" data-go="#/niveau/${Q.id+1}">Découvrir le niveau suivant ▶</button>`;}
  setTop('Résultat',false,'none');
  view.innerHTML=`<div class="card result"><div class="medal">${passed?(note>=16?'🏆':'🎉'):'💪'}</div><div class="big-score">${fmt(note)}<small>/20</small></div><div class="mention">${mention(note)}</div><p class="muted">${passed?(Q.kind==='lesson'?'Leçon réussie ! La suite est débloquée.':'Examen réussi, félicitations !'):`Il faut ${pass}/20 pour valider. Relis la leçon et réessaie, tu vas y arriver.`}</p><span class="badge">${Math.round(Q.score*10)/10} bonne(s) réponse(s) sur ${n}</span></div>${unlockedMsg}
   ${Q.mistakes.length?`<h2>À retenir</h2>`+Q.mistakes.map(m=>`<div class="mistake"><b>${T(m.q)}</b><br>Réponse : ${T(m.right)}${m.ex?'<br><small class="muted">'+esc(m.ex)+'</small>':''}</div>`).join(''):''}
   <div class="mt16">${next}<button class="btn ghost" data-go="${Q.kind==='lesson'?'#/exos/'+Q.id:'#/examen/'+Q.id}">↻ Recommencer</button><button class="btn ghost" data-go="#/bulletin">📊 Voir mon bulletin</button></div>`;
}

// ---------- vocabulaire
let vFilter='all',vSearch='';
function renderVocab(){
  setTop(titles.vocab,false,'vocab');
  const all=Object.entries(S.vocab);const due=dueWords().length;const mastered=all.filter(([k,v])=>v.box>=3).length;
  view.innerHTML=`<div class="card hero"><div class="row between"><div><b style="font-size:18px">${all.length} mots</b><div style="opacity:.85;font-size:13px">${mastered} maîtrisés · ${due} à réviser</div></div><div class="ar" style="font-size:28px">دَفْتَرِي</div></div><button class="btn light mt8" data-go="#/revision">🗂️ Révision du jour (${due})</button></div>
  <input class="search" id="vs" placeholder="🔍 Chercher un mot (arabe ou français)" value="${esc(vSearch)}">
  <div class="seg">${[['all','Tous'],['due','À réviser'],['learn','En cours'],['ok','Maîtrisés']].map(([k,l])=>`<button data-f="${k}" class="${vFilter===k?'on':''}">${l}</button>`).join('')}</div>
  <div id="vlist"></div><button class="btn ghost" id="vadd">＋ Ajouter un mot moi-même</button>`;
  const draw=()=>{const t=today();let L=all.filter(([k,v])=>vFilter==='all'||(vFilter==='due'&&v.due<=t)||(vFilter==='learn'&&v.box<3)||(vFilter==='ok'&&v.box>=3));
    if(vSearch){const s=vSearch.toLowerCase();L=L.filter(([k,v])=>v.fr.toLowerCase().includes(s)||norm(v.ar).includes(norm(vSearch))||(v.tr||'').toLowerCase().includes(s));}
    $('#vlist').innerHTML=L.length?L.map(([k,v])=>`<div class="word"><div class="ar">${v.ar}</div><div class="meta"><b>${esc(v.fr)}</b><small>${esc(v.tr||'')}</small></div><div class="dots">${[0,1,2,3,4].map(i=>`<i class="${v.box>i?'on':''}"></i>`).join('')}</div></div>`).join(''):'<p class="muted center">Aucun mot ici pour l’instant.</p>';};
  draw();
  $('#vs').oninput=e=>{vSearch=e.target.value;draw();};
  view.querySelectorAll('.seg button').forEach(b=>b.onclick=()=>{vFilter=b.dataset.f;view.querySelectorAll('.seg button').forEach(x=>x.classList.toggle('on',x===b));draw();});
  $('#vadd').onclick=()=>{modal(`<h3>Ajouter un mot</h3><input class="field ar" id="na" placeholder="Mot en arabe" dir="rtl" style="font-size:22px"><input class="field" id="nt" placeholder="Prononciation (facultatif)"><input class="field" id="nf" placeholder="Traduction en français"><button class="btn" id="nok">Ajouter au cahier</button>`);
    $('#nok').onclick=()=>{const a=$('#na').value.trim(),f=$('#nf').value.trim();if(!a||!f){toast('Arabe et français obligatoires');return;}addVocab([[a,$('#nt').value.trim(),f]],'perso');closeModal();toast('Mot ajouté');renderVocab();};};
}
let RV=null;
function renderReview(){
  setTop(titles.revision,true,'vocab');
  if(!RV||RV.date!==today())RV={date:today(),queue:shuffle(dueWords().map(([k])=>k)),done:0,ok:0};
  if(!RV.queue.length){touchStreak();view.innerHTML=`<div class="card result"><div class="medal">🌟</div><h2>Révision terminée !</h2><p class="muted">${RV.done?`${RV.ok} mots sus sur ${RV.done} cartes vues aujourd’hui.`:'Aucun mot à réviser aujourd’hui.'} Reviens demain pour la suite.</p><span class="badge gold">🔥 ${S.streak.count} jour(s) de suite</span></div><button class="btn ghost" data-go="#/vocab">Retour au cahier</button>`;RV.done=RV.done;return;}
  const k=RV.queue[0];const v=S.vocab[k];
  view.innerHTML=`<div class="qhead"><span class="qcount">${RV.queue.length} restant(s)</span><div class="bar"><i style="width:${RV.done/(RV.done+RV.queue.length)*100}%"></i></div></div>
   <div class="flash" id="fc"><div class="ar">${v.ar}</div><div id="back" hidden><div class="tr">${esc(v.tr||'')}</div><div class="fr">${esc(v.fr)}</div></div><p class="muted" id="hint" style="font-size:13px">Que signifie ce mot ? Réfléchis, puis retourne la carte.</p></div>
   <div id="rbtns"><button class="btn" id="flip">Voir la réponse</button></div>`;
  $('#flip').onclick=()=>{$('#back').hidden=false;$('#hint').hidden=true;$('#rbtns').innerHTML=`<div class="two"><button class="btn red" id="no">✗ À revoir</button><button class="btn" id="yes">✓ Je savais</button></div>`;
    $('#no').onclick=()=>{v.box=0;v.due=today();RV.queue.push(RV.queue.shift());RV.done++;save();renderReview();};
    $('#yes').onclick=()=>{v.box=Math.min(5,v.box+1);v.due=addDays(INTERVALS[v.box]);RV.queue.shift();RV.done++;RV.ok++;save();renderReview();};};
}

// ---------- bulletin
function ring(p){const r=34,c=2*Math.PI*r;return `<svg class="ring" viewBox="0 0 84 84"><circle cx="42" cy="42" r="${r}" fill="none" stroke="#E9E6DC" stroke-width="9"/><circle cx="42" cy="42" r="${r}" fill="none" stroke="#C9A227" stroke-width="9" stroke-linecap="round" stroke-dasharray="${c*p/100} ${c}" transform="rotate(-90 42 42)"/><text x="42" y="47" text-anchor="middle" font-size="17" font-weight="800" fill="#064632">${p}%</text></svg>`;}
function renderBulletin(){
  setTop(titles.bulletin,false,'bulletin');
  const avg=average();const cur=level(S.unlocked);
  const totalSteps=LEVELS.filter(l=>l.lessons).reduce((a,l)=>a+l.lessons.length+1,0);
  let doneSteps=0;LEVELS.forEach(l=>{if(l.lessons){doneSteps+=l.lessons.filter(x=>lessonDone(x.id)).length;if(S.exams[l.id]&&S.exams[l.id].passed)doneSteps++;}});
  const prog=Math.round(doneSteps/totalSteps*100);
  const words=Object.values(S.vocab);const mastered=words.filter(v=>v.box>=3).length;
  let html=`<div class="card"><div class="report-head">${ring(prog)}<div><small class="muted">Élève</small><h2 style="margin:0">${esc(S.name)}</h2><div>Niveau ${cur.id} · <b>${cur.name}</b></div>${S.filiere?`<small class="muted">Filière : ${FILIERES.find(f=>f.id===S.filiere).name}</small>`:''}</div></div>
   <div class="stats" style="grid-template-columns:repeat(3,1fr)"><div class="stat" style="background:var(--gl)"><b style="color:var(--gd)">${fmt(avg)}</b><span>Moyenne /20</span></div><div class="stat" style="background:var(--goldl)"><b class="mention" style="font-size:15px;line-height:24px">${mention(avg)}</b><span>Mention</span></div><div class="stat" style="background:var(--gl)"><b style="color:var(--gd)">🔥${S.streak.count}</b><span>Série</span></div></div>
   <div class="stats"><div class="stat" style="background:var(--cream)"><b>${words.length}</b><span>Mots au cahier</span></div><div class="stat" style="background:var(--cream)"><b>${mastered}</b><span>Mots maîtrisés</span></div><div class="stat" style="background:var(--cream)"><b>${S.days.length}</b><span>Jours d’étude</span></div></div></div>`;
  for(const lv of LEVELS){if(lv.id>S.unlocked||!lv.lessons)continue;
    const notes=lv.lessons.map(x=>S.lessons[x.id]&&S.lessons[x.id].best).filter(n=>n!=null);const ex=S.exams[lv.id];
    const m=notes.length?notes.reduce((a,b)=>a+b,0)/notes.length:null;
    html+=`<h2>Niveau ${lv.id} · ${lv.name} <span class="ar" style="font-size:17px;color:var(--g)">${lv.ar}</span></h2><div class="card"><div class="row between" style="margin-bottom:6px"><small class="muted">Progression du niveau</small><b>${levelProgress(lv)}%</b></div><div class="bar"><i style="width:${levelProgress(lv)}%"></i></div>
     <table class="grades mt8"><tr><th>Matière</th><th>Essais</th><th>Note /20</th></tr>${lv.lessons.map((x,i)=>{const p=S.lessons[x.id];return `<tr><td>L${i+1}. ${esc(x.title)}</td><td>${p?p.attempts||0:0}</td><td><b class="${p&&p.best!=null&&p.best<PASS_LESSON?'':'score'}">${p&&p.best!=null?fmt(p.best):'—'}</b></td></tr>`;}).join('')}
     <tr><td><b>Moyenne des leçons</b></td><td></td><td><b>${fmt(m)}</b></td></tr><tr><td><b>🎓 Examen de fin de niveau</b></td><td>${ex?ex.attempts:0}</td><td><b class="score">${ex&&ex.best!=null?fmt(ex.best):'—'}</b></td></tr></table>
     <div class="row between mt8"><span class="muted">Décision</span>${ex&&ex.passed?'<span class="badge">✓ Admis au niveau supérieur</span>':'<span class="badge gold">En cours</span>'}</div></div>`;}
  const last=S.log.slice(-6).reverse();
  if(last.length)html+=`<h2>Dernières évaluations</h2><div class="card"><table class="grades">${last.map(l=>{const t=l.k==='exam'?`Examen niveau ${l.id}`:(()=>{const [lv,x]=lessonById(l.id);return x?`Leçon ${lv.lessons.indexOf(x)+1} · ${x.title}`:l.id;})();return `<tr><td>${esc(t)}<br><small class="muted">${l.date.split('-').reverse().join('/')}</small></td><td><b class="score">${fmt(l.note)}</b></td></tr>`;}).join('')}</table></div>`;
  view.innerHTML=html;
}

// ---------- Coran
function renderCoran(){
  setTop(titles.coran,false,'coran');
  view.innerHTML=`<div class="card hero"><div class="ar" style="font-size:30px;text-align:center">﴿ وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا ﴾</div><p class="center" style="margin:4px 0 0;opacity:.9;font-size:13px">« Et récite le Coran lentement et clairement. » (73:4)</p></div>
  <p class="muted">Touche une sourate, puis un mot pour voir sa traduction, sa racine et l’ajouter à ton cahier.</p>`+
  SURAHS.map(s=>`<button class="surah" data-go="#/sourate/${s.id}"><div class="num">${s.num}</div><div class="info"><b>${s.name}</b><br><small>${s.fr} · ${s.verses.length} versets · ${s.lieu}</small></div><div class="ar">${s.ar}</div></button>`).join('')+
  `<p class="muted center" style="font-size:13px">D’autres sourates seront ajoutées au fil des niveaux.</p>`;
}
function renderSurah(id){
  const s=SURAHS.find(x=>x.id===id);if(!s)return renderCoran();
  setTop(s.name,true,'coran');
  const ar=n=>String(n).replace(/\d/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
  view.innerHTML=`<div class="card center"><div class="ar" style="font-size:34px;color:var(--gd)">سُورَةُ ${s.ar}</div><b>${s.name} — ${s.fr}</b><p class="muted" style="font-size:14px">${esc(s.intro)}</p></div>`+
  s.verses.map((v,i)=>`<div class="verse"><div class="vtext ar">${v.ar} <span class="vnum">${ar(i+1)}</span></div><div class="words">${v.w.map((w,j)=>`<button class="w" data-v="${i}" data-j="${j}"><span class="ar">${w[0]}</span><small>${esc(w[2])}</small></button>`).join('')}</div><div class="vtr">${esc(v.tr)}</div><div class="vfr">${esc(v.fr)}</div></div>`).join('')+
  `<p class="muted center" style="font-size:12px">Traduction des sens en français, à visée pédagogique.</p>`;
  view.querySelectorAll('.w').forEach(b=>b.onclick=()=>{const w=s.verses[+b.dataset.v].w[+b.dataset.j];
    modal(`<div class="modal-big ar" style="font-size:60px">${w[0]}</div><p class="center" style="font-style:italic;color:#8a6d12;margin:0">${esc(w[1])}</p><h2 class="center" style="margin:6px 0">${esc(w[2])}</h2>${w[3]?`<div class="note">${esc(w[3]).replace(/([؀-ۿ][؀-ۿً-ْٰ ]*)/g,'<span class="ar">$1</span>')}</div>`:''}<div class="two mt16"><button class="btn ghost" data-close style="margin:0">Fermer</button><button class="btn" id="addw">＋ Au cahier</button></div>`);
    $('#addw').onclick=()=>{const n=addVocab([[w[0],w[1],w[2]]],'coran:'+s.id);closeModal();toast(n?'Ajouté à ton cahier':'Déjà dans ton cahier');};});
}

// ---------- filière
function renderFiliere(){
  setTop(titles.filiere,true,'none');
  let sel=S.filiere;
  const canChoose=S.unlocked>=4;
  view.innerHTML=`<div class="card hero"><div class="ar" style="font-size:24px">اخْتِيَارُ التَّخَصُّص</div><h2 style="margin:4px 0">Entrée en Licence</h2><p style="margin:0;opacity:.9">Choisis la spécialité que tu suivras en Licence, Master et Doctorat.</p></div>
   ${canChoose?'':'<div class="note">Tu pourras valider ton choix après avoir réussi l’examen du niveau 3 (Lycée). Tu peux déjà découvrir les filières.</div><br>'}
   ${FILIERES.map(f=>`<button class="fil ${sel===f.id?'sel':''}" data-f="${f.id}"><div class="row between"><span class="ic">${f.icon}</span><span class="ar">${f.ar}</span></div><b>${f.name}</b><small>${esc(f.desc)}</small></button>`).join('')}
   <button class="btn gold" id="fok" ${canChoose&&sel?'':'disabled'}>Valider ma filière</button>`;
  view.querySelectorAll('.fil').forEach(b=>b.onclick=()=>{sel=b.dataset.f;view.querySelectorAll('.fil').forEach(x=>x.classList.toggle('sel',x===b));if(canChoose)$('#fok').disabled=false;});
  $('#fok').onclick=()=>{const f=FILIERES.find(x=>x.id===sel);confirmBox(`Choisir la filière « ${f.name} » ?`,()=>{S.filiere=sel;save();toast('Filière enregistrée');location.hash='#/niveau/4';},'Oui, je choisis');};
}

// ---------- profil
function renderProfile(){
  setTop(titles.profil,true,'none');
  view.innerHTML=`<div class="card center"><img src="img/logo.png" style="width:84px;border-radius:20px"><h2 style="margin:8px 0 0">${esc(S.name)}</h2><small class="muted">Élève depuis le ${S.created.split('-').reverse().join('/')}</small></div>
  <div class="card"><h3>Réglages</h3>
   <div class="toggle"><span>Taille du texte arabe</span><div class="seg" style="margin:0;width:150px">${[[0.85,'A−'],[1,'A'],[1.25,'A+']].map(([v,l])=>`<button data-s="${v}" class="${S.opts.ar==v?'on':''}">${l}</button>`).join('')}</div></div>
   <div class="toggle"><span>Afficher la prononciation (translittération)</span><button class="switch ${S.opts.tr?'on':''}" id="trs"></button></div>
   <div class="toggle" style="border:0"><span>Mon prénom</span><button class="btn ghost" id="ren" style="width:auto;margin:0;padding:8px 14px">Modifier</button></div></div>
  <div class="card"><h3>Ma filière</h3><p class="muted" style="margin:0 0 8px">${S.filiere?FILIERES.find(f=>f.id===S.filiere).name:'Pas encore choisie (à l’entrée en Licence).'}</p><button class="btn ghost" data-go="#/filiere" style="margin:0">Voir les filières</button></div>
  <div class="card"><h3>À propos</h3><p class="muted" style="margin:0;font-size:14px">Djamillah École — école d’arabe personnelle : arabe moderne et arabe du Coran, du Primaire au Doctorat. Fonctionne sans connexion ; ta progression est enregistrée sur ce téléphone.<br><br>© AMOD GROUP – Tous droits réservés</p></div>
  <div class="card"><h3>Mises à jour</h3><p class="muted" style="margin:0 0 8px;font-size:14px">Version installée : <b>${window.DE?DE.version:'1.2.0'}</b>. Les nouvelles leçons et améliorations arrivent toutes seules dès que le téléphone est connecté à internet, sans réinstaller l’application.</p><button class="btn ghost" style="margin:0" onclick="DE_checkNow(this)">Vérifier les mises à jour</button></div>
  <button class="btn red" id="rst">Effacer toute ma progression</button>`;
  view.querySelectorAll('[data-s]').forEach(b=>b.onclick=()=>{S.opts.ar=+b.dataset.s;save();applyOpts();renderProfile();});
  $('#trs').onclick=()=>{S.opts.tr=!S.opts.tr;save();applyOpts();renderProfile();};
  $('#ren').onclick=()=>{modal(`<h3>Mon prénom</h3><input class="field" id="nn" value="${esc(S.name)}"><button class="btn" id="nnok">Enregistrer</button>`);$('#nnok').onclick=()=>{const v=$('#nn').value.trim();if(v){S.name=v;save();}closeModal();renderProfile();};};
  $('#rst').onclick=()=>confirmBox('Effacer toute ta progression ? Notes, cahier et niveaux seront remis à zéro.',()=>{const n=S.name;S=blank();S.name=n;save();toast('Progression effacée');location.hash='#/home';},'Effacer');
}

route();
window.__deOK=true;

// ---------- mises à jour automatiques
function updateBanner(r){
  if(document.getElementById('upd'))return;
  const d=document.createElement('div');d.id='upd';d.className='upd';
  d.innerHTML=`<div><b>✨ Nouvelle version ${esc(r.v)} prête</b><small>${esc(r.notes||'Nouvelles leçons et améliorations.')}</small></div><button id="updGo">Appliquer</button><button id="updX" aria-label="Plus tard">✕</button>`;
  document.body.appendChild(d);
  $('#updGo').onclick=()=>location.reload();
  $('#updX').onclick=()=>{d.remove();toast('Elle s’appliquera au prochain lancement');};
}
if(window.DE){
  try{const seen=localStorage.getItem('de_seen');if(DE.fromCache&&seen!==DE.version){localStorage.setItem('de_seen',DE.version);const c=JSON.parse(localStorage.getItem('de_bundle'));setTimeout(()=>toast(`Mise à jour ${DE.version} installée ✓`),600);}}catch(e){}
  setTimeout(()=>DE.check(false).then(r=>{if(r.status==='ready')updateBanner(r);}),2500);
}
window.DE_checkNow=function(btn){
  if(!window.DE)return;btn.disabled=true;btn.textContent='Recherche…';
  DE.check(true).then(r=>{btn.disabled=false;btn.textContent='Vérifier les mises à jour';
    if(r.status==='ready')updateBanner(r);else if(r.status==='uptodate')toast('Ton application est à jour ✓');else toast('Pas de connexion internet pour l’instant');});
};
})();
