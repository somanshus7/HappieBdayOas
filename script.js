// Oas' birthday mini-universe — all music is generated in-browser (no external song files).
const SECRET_CODE = "200";
const screens = [...document.querySelectorAll('.screen')];
let current = 0, entered = "";
const ids = ['gate','welcome','cake','gift','balloons','final'];
const $ = id => document.getElementById(id);
function show(name){
  screens.forEach(s=>s.classList.toggle('active',s.id===name));
  current=ids.indexOf(name);
  $('progress').querySelector('span').style.width=`${current/(ids.length-1)*100}%`;
  window.scrollTo({top:0,behavior:'smooth'});
  if(name==='final') partyMode();
}
function updatePin(){
  $('pinDots').innerHTML=Array.from({length:4},(_,i)=>`<span>${i<entered.length?'●':'○'}</span>`).join('');
}
const pad=$('keypad');
[1,2,3,4,5,6,7,8,9,'⌫',0,'✓'].forEach(v=>{
  let b=document.createElement('button');b.textContent=v;
  b.addEventListener('click',()=>{
    if(v==='⌫')entered=entered.slice(0,-1);
    else if(v==='✓'){checkCode();return}
    else if(entered.length<4)entered+=v;
    updatePin(); clickSound();
  });
  pad.append(b);
});
function checkCode(){
  if(entered===SECRET_CODE){$('error').textContent='Unlocked! 💗';sparkleBurst(18);setTimeout(()=>show('welcome'),450)}
  else{$('error').textContent='Not quite — try again, birthday star!';entered='';updatePin();clickSound(true);}
}
document.querySelectorAll('[data-next]').forEach(b=>b.onclick=()=>{clickSound();show(b.dataset.next)});
$('flame').addEventListener('click',()=>{
  $('cakeWrap').classList.add('blown');
  $('wishText').textContent='Wish made! May it come true. ✨';
  $('cakeNext').classList.remove('hidden');burst(24);playChime();
});
$('cakeNext').onclick=()=>{clickSound();show('gift')};
$('bouquet').onclick=()=>{$('bouquet').classList.add('bloom');burst(22);playChime()};
$('giftNext').onclick=()=>{clickSound();show('balloons')};
const wishes=['You deserve the happiest days. 💖','May every dream find its way to you. ✨','Keep smiling — it suits you! 🌸','A year full of adventures awaits! 🥳'];
let popped=0;
document.querySelectorAll('.balloon').forEach((b,i)=>b.onclick=()=>{
  if(b.classList.contains('popped'))return;
  b.classList.add('popped');popped++;$('balloonMsg').textContent=wishes[i];burst(15);playPop();
  if(popped===4){$('balloonMsg').textContent='All four wishes are yours! 💗';$('finalNext').classList.remove('hidden');}
});
$('finalNext').onclick=()=>{show('final');burst(55)};
$('finaleParty').onclick=()=>{partyMode();burst(100);playChime();toast('This birthday dance floor is all yours, Oas! 💗')};
$('replay').onclick=()=>{
  popped=0;entered='';updatePin();
  document.querySelectorAll('.balloon').forEach(b=>b.classList.remove('popped'));
  $('finalNext').classList.add('hidden');$('cakeNext').classList.add('hidden');
  $('cakeWrap').classList.remove('blown');$('wishText').textContent='Your wish is on its way… 💫';
  $('bouquet').classList.remove('bloom');document.body.classList.remove('party');show('gate');burst(20);
};
function burst(n=18){
  for(let i=0;i<n;i++){
    let e=document.createElement('i');e.textContent=['💗','✨','🌸','💕','🎵'][Math.floor(Math.random()*5)];
    e.style.cssText=`position:fixed;left:${Math.random()*100}vw;top:${Math.random()*100}vh;font-style:normal;font-size:${12+Math.random()*18}px;pointer-events:none;z-index:10;animation:fall ${1+Math.random()*1.5}s ease-out forwards`;
    document.body.append(e);setTimeout(()=>e.remove(),2600);
  }
}
function sparkleBurst(n){burst(n)}
const fxStyle=document.createElement('style');
fxStyle.textContent='@keyframes fall{to{transform:translateY(100px) rotate(220deg);opacity:0}}';
document.head.append(fxStyle);
function toast(message){$('toast').textContent=message;$('toast').classList.add('show');setTimeout(()=>$('toast').classList.remove('show'),2600)}
function partyMode(){document.body.classList.add('party')}

// Original, lightweight synthesized birthday instrumental. Browsers require a tap to start audio.
let audioCtx=null, musicTimer=null, musicOn=false, step=0, master=null;
const melody=[523.25,659.25,783.99,659.25,587.33,698.46,783.99,698.46,523.25,659.25,880,783.99,698.46,659.25,587.33,523.25];
const chords=[[261.63,329.63,392],[220,261.63,329.63],[174.61,220,261.63],[196,246.94,293.66]];
function audioReady(){
  if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.22;master.connect(audioCtx.destination);}
  if(audioCtx.state==='suspended')audioCtx.resume();
}
function tone(freq,duration=.22,type='sine',volume=.12,delay=0){
  if(!audioCtx)return;
  const t=audioCtx.currentTime+delay,osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
  osc.type=type;osc.frequency.setValueAtTime(freq,t);
  gain.gain.setValueAtTime(.0001,t);gain.gain.exponentialRampToValueAtTime(volume,t+.025);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
  osc.connect(gain);gain.connect(master);osc.start(t);osc.stop(t+duration+.03);
}
function musicStep(){
  const i=step%16;
  tone(melody[i],.28,'triangle',.075);
  if(i%4===0){const chord=chords[Math.floor(step/16)%4];chord.forEach((f,j)=>tone(f,.7,'sine',.025,j*.012));tone(65.41,.32,'sine',.09);}
  if(i%2===0)tone(1200,.045,'sine',.012);
  step++;
}
function startMusic(){
  audioReady();if(musicOn)return;musicOn=true;musicStep();musicTimer=setInterval(musicStep,300);
  $('musicToggle').classList.add('playing');$('musicLabel').textContent='Birthday music on';$('musicToggle').setAttribute('aria-label','Turn birthday music off');
  toast('A little birthday soundtrack, just for you 🎶');
}
function stopMusic(){
  musicOn=false;clearInterval(musicTimer);musicTimer=null;
  if(master&&audioCtx){master.gain.setTargetAtTime(.0001,audioCtx.currentTime,.08);}
  $('musicToggle').classList.remove('playing');$('musicLabel').textContent='Play the birthday vibe';$('musicToggle').setAttribute('aria-label','Turn birthday music on');
  setTimeout(()=>{if(master&&audioCtx&&!musicOn)master.gain.setTargetAtTime(.22,audioCtx.currentTime,.01)},180);
}
$('musicToggle').addEventListener('click',()=>{if(musicOn)stopMusic();else startMusic()});
function clickSound(soft=false){if(!audioCtx||!musicOn)return;tone(soft?220:740,.08,'sine',.045)}
function playChime(){if(!audioCtx||!musicOn)return;[659.25,783.99,987.77].forEach((f,i)=>tone(f,.35,'sine',.09,i*.09))}
function playPop(){if(!audioCtx||!musicOn)return;tone(260,.1,'triangle',.09);tone(740,.12,'sine',.045,.04)}
show('gate');
