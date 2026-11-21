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
const wishes=[
  'You are so special, Oas — never let the world make you forget that. 💗',
  'You deserve every beautiful thing life has waiting for you. 🌷',
  'Your smile makes ordinary moments feel a little brighter. ✨',
  'May Shri Krishna guide your steps and fill your days with peace, courage and joy. 🦚'
];
let popped=0;
document.querySelectorAll('.balloon').forEach((b,i)=>b.onclick=()=>{
  if(b.classList.contains('popped'))return;
  b.classList.add('popped');popped++;
  const card=document.createElement('p');
  card.className='revealed-message';
  card.innerHTML=`<span class="message-number">0${i+1}</span>${wishes[i]}`;
  $('balloonMessages').append(card);
  $('balloonMsg').textContent=`${4-popped} ${4-popped===1?'reminder':'reminders'} left to discover…`;
  burst(15);
  if(popped===4){
    $('balloonMsg').textContent='Every reminder is true. You are one of a kind. 💗';
    $('finalNext').classList.remove('hidden');
  }
});
$('finalNext').onclick=()=>{show('final');burst(55)};
$('envelope').onclick=()=>{
  if($('envelope').classList.contains('opened'))return;
  $('envelope').classList.add('opened');
  $('envelopeHint').textContent='A little note, from the heart…';
  setTimeout(()=>$('letterReveal').classList.add('visible'),850);
  burst(22);
};
$('finaleParty').onclick=()=>{partyMode();burst(100);toast('This birthday celebration is all yours, Oas! 💗')};
$('replay').onclick=()=>{
  popped=0;entered='';updatePin();
  document.querySelectorAll('.balloon').forEach(b=>b.classList.remove('popped'));
  $('finalNext').classList.add('hidden');$('cakeNext').classList.add('hidden');
  $('balloonMessages').innerHTML='<p class="message-placeholder">Every balloon is carrying a little reminder for you. 💗</p>';
  $('balloonMsg').textContent='4 little reminders are waiting…';
  $('envelope').classList.remove('opened');$('letterReveal').classList.remove('visible');
  $('envelopeHint').textContent='Tap to open your letter 💌';
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

// Use the music.mp3 file you add beside index.html. No generated tune is included.
const birthdayTrack = $('birthdayTrack');
let musicOn = false;
function startMusic(){
  birthdayTrack.play().then(()=>{
    musicOn=true;
    $('musicToggle').classList.add('playing');
    $('musicLabel').textContent='Birthday music on';
    $('musicToggle').setAttribute('aria-label','Turn birthday music off');
  }).catch(()=>{
    toast('Add music.mp3 beside index.html, then tap play 🎵');
  });
}
function stopMusic(){
  birthdayTrack.pause();
  musicOn=false;
  $('musicToggle').classList.remove('playing');
  $('musicLabel').textContent='Play your birthday song';
  $('musicToggle').setAttribute('aria-label','Play your birthday song');
}
$('musicToggle').addEventListener('click',()=>{if(musicOn)stopMusic();else startMusic()});
function clickSound(){}
function playChime(){}
function playPop(){}
