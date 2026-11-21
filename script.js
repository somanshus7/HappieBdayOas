// Oas's birthday experience — original Web Audio melody (not a commercial song).
// Change the name/message/passcode in index.html and this file as you wish.
const $ = id => document.getElementById(id);
const scenes = [...document.querySelectorAll('.scene')];
let audioCtx=null, musicOn=false, melodyTimer=null, noteIndex=0;
const notes=[523.25,659.25,783.99,659.25,587.33,698.46,880,698.46,523.25,587.33,659.25,783.99,698.46,659.25,587.33,523.25];
function playNote(freq,duration=.34,when=0){
  if(!audioCtx)return;
  const t=audioCtx.currentTime+when, osc=audioCtx.createOscillator(), gain=audioCtx.createGain();
  osc.type='sine';osc.frequency.value=freq;gain.gain.setValueAtTime(.0001,t);
  gain.gain.exponentialRampToValueAtTime(.075,t+.025);gain.gain.exponentialRampToValueAtTime(.0001,t+duration);
  osc.connect(gain);gain.connect(audioCtx.destination);osc.start(t);osc.stop(t+duration+.03);
}
function startMusic(){
  const AudioContext=window.AudioContext||window.webkitAudioContext;
  if(!AudioContext){$('soundLabel').textContent='Audio unavailable';return;}
  audioCtx=audioCtx||new AudioContext();audioCtx.resume();
  musicOn=true;$('soundToggle').setAttribute('aria-pressed','true');$('soundIcon').textContent='♫';$('soundLabel').textContent='Music on';
  playNote(261.63,.8);playNote(392,.8,.12);playNote(523.25,.8,.24);
  melodyTimer=setInterval(()=>{if(musicOn){playNote(notes[noteIndex%notes.length],.32);if(noteIndex%4===0)playNote(notes[noteIndex%notes.length]/2,.55,.02);noteIndex++;}},390);
}
function stopMusic(){musicOn=false;clearInterval(melodyTimer);$('soundToggle').setAttribute('aria-pressed','false');$('soundIcon').textContent='♫';$('soundLabel').textContent='Music off';}
$('soundToggle').addEventListener('click',()=>musicOn?stopMusic():startMusic());
function go(id){scenes.forEach(s=>s.classList.toggle('active',s.id===id));window.scrollTo({top:0,behavior:'smooth'});if(!musicOn && id!=='intro'){} }
document.querySelectorAll('[data-next]').forEach(b=>b.addEventListener('click',()=>{go(b.dataset.next);if(!musicOn)startMusic();}));
document.querySelectorAll('[data-go]').forEach(b=>b.addEventListener('click',()=>{go(b.dataset.go);$('miniNav').classList.remove('open');}));
$('menuBtn').addEventListener('click',()=>$('miniNav').classList.toggle('open'));
function burst(n=22,emojis=['✨','💛','🌸','🦚']){for(let i=0;i<n;i++){const e=document.createElement('span');e.textContent=emojis[Math.floor(Math.random()*emojis.length)];e.className='particle';e.style.cssText=`position:fixed;z-index:20;left:${Math.random()*100}vw;top:${Math.random()*80+5}vh;font-size:${12+Math.random()*17}px;pointer-events:none;animation:particleFall ${1.2+Math.random()*1.5}s ease-out forwards`;document.body.append(e);setTimeout(()=>e.remove(),2900);}}
const particleStyle=document.createElement('style');particleStyle.textContent='@keyframes particleFall{to{transform:translateY(140px) rotate(240deg) scale(.4);opacity:0}}';document.head.append(particleStyle);
function chime(){if(!audioCtx)return;[659.25,783.99,987.77].forEach((n,i)=>playNote(n,.22,i*.11));}
$('blowBtn').addEventListener('click',()=>{$('cakeStage').classList.add('blown');$('cakeFeedback').textContent='Wish sent into the universe. May it come true, Oas. 💫';$('blowBtn').textContent='Wish made! 💛';$('blowBtn').disabled=true;burst(38);chime();setTimeout(()=>go('innings'),1700);});
let runs=0,balls=0,fours=0;
const shots=[{r:6,msg:'SIX! Straight into the stars! Dhoni would approve. 💥'},{r:4,msg:'FOUR! Smooth timing, birthday queen! ✨'},{r:2,msg:'Two runs! Smart running between the wickets. 🏏'},{r:6,msg:'ANOTHER SIX! What a finish, Oas! 🏆'}];
$('shotBtn').addEventListener('click',()=>{const s=shots[balls%shots.length];runs+=s.r;balls++;if(s.r>=4)fours++;$('runs').textContent=String(runs).padStart(2,'0');$('balls').textContent=balls;$('fours').textContent=fours;$('shotFeedback').textContent=s.msg;$('cricketBall').style.transform=`translate(${100+Math.random()*130}px,${-25-Math.random()*45}px) rotate(${360+Math.random()*400}deg)`;burst(9,['🏏','✨','💛']);chime();});
$('resetGame').addEventListener('click',()=>{runs=balls=fours=0;$('runs').textContent='00';$('balls').textContent='0';$('fours').textContent='0';$('shotFeedback').textContent='Fresh innings! Tap to play a shot.';$('cricketBall').style.transform='none';});
$('prayerBtn').addEventListener('click',()=>{$('prayerFeedback').classList.remove('hidden');$('prayerBtn').textContent='Blessings sent 💙';burst(30,['🦚','🪷','💙','✨']);chime();});
document.querySelectorAll('.bloom').forEach((b,i)=>b.addEventListener('click',()=>{b.classList.add('open');$('flowerFeedback').textContent=['A rose for your kindness. 🌹','A blossom for your beautiful heart. 🌸','A tulip for new beginnings. 🌷','A sunflower for your bright smile. 🌼'][i];burst(8,['🌸','💛','✨']);}));
$('envelope').addEventListener('click',()=>{$('letterCard').classList.remove('hidden');$('letterHint').classList.add('hidden');$('envelope').style.transform='scale(.7) rotateX(70deg)';$('finalBtn').classList.remove('hidden');burst(25,['💌','💗','✨']);chime();});
$('finalBtn').addEventListener('click',()=>{go('finale');burst(55,['🎉','💛','🦚','🏏','✨']);});
$('replay').addEventListener('click',()=>{stopMusic();runs=balls=fours=0;$('runs').textContent='00';$('balls').textContent='0';$('fours').textContent='0';$('shotFeedback').textContent='Tap to play a shot and collect your birthday runs!';$('cricketBall').style.transform='none';$('cakeStage').classList.remove('blown');$('cakeFeedback').textContent='Your birthday magic is waiting…';$('blowBtn').textContent='Blow out the candle ✨';$('blowBtn').disabled=false;$('prayerFeedback').classList.add('hidden');$('prayerBtn').textContent='Send a little prayer 🙏';document.querySelectorAll('.bloom').forEach(b=>b.classList.remove('open'));$('flowerFeedback').textContent='A little colour for someone who makes life brighter.';$('letterCard').classList.add('hidden');$('letterHint').classList.remove('hidden');$('envelope').style.transform='';$('finalBtn').classList.add('hidden');go('intro');});
go('intro');
