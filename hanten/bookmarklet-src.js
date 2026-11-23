(function(){
var d=document,ID='hanten-bm';
var old=d.getElementById(ID);
if(old){old.remove();clearInterval(window.__hantenT);d.querySelectorAll('video').forEach(function(x){x.style.transform='';});return;}
function V(){return d.querySelector('#movie_player video')||d.querySelector('video');}
if(!V()){alert('動画が見つかりません。YouTubeの動画ページで押してください。');return;}
var S={mir:true,sp:null,a:null,b:null,loop:true,min:false};
function f(t){if(t==null)return'—';t=Math.max(0,Math.floor(t));return Math.floor(t/60)+':'+String(t%60).padStart(2,'0');}
var st=d.createElement('style');
st.textContent='#'+ID+'{position:fixed;right:12px;bottom:calc(12px + env(safe-area-inset-bottom,0px));z-index:2147483647;background:rgba(19,19,22,.94);color:#f3f3f5;font:14px/1.3 system-ui,sans-serif;border:1px solid #3a3a44;border-radius:12px;padding:8px;display:flex;flex-wrap:wrap;gap:6px;max-width:min(360px,calc(100vw - 24px));box-shadow:0 6px 24px rgba(0,0,0,.5)}'
+'#'+ID+' button{all:unset;cursor:pointer;min-height:36px;padding:0 10px;display:inline-flex;align-items:center;background:#2a2a31;border:1px solid #44444e;border-radius:8px;color:#f3f3f5;font:14px system-ui,sans-serif;white-space:nowrap}'
+'#'+ID+' button.on{background:#163a47;border-color:#4cc9f0;color:#dff6fd}'
+'#'+ID+' .r{display:flex;flex-wrap:wrap;gap:6px;width:100%;align-items:center}'
+'#'+ID+' .l{color:#a3a3ad;font-size:12px;margin-right:2px}'
+'#'+ID+'.min .r{display:none}#'+ID+':not(.min) .chip{display:none}';
var p=d.createElement('div');p.id=ID;p.appendChild(st);
function B(parent,label,fn){var b=d.createElement('button');b.type='button';b.textContent=label;b.addEventListener('click',function(e){e.stopPropagation();fn();draw();});parent.appendChild(b);return b;}
function R(){var r=d.createElement('div');r.className='r';p.appendChild(r);return r;}
var chip=B(p,'反転 ▲',function(){S.min=false;});chip.className='chip';
var r1=R(),r2=R(),r3=R();
var bMir=B(r1,'反転',function(){S.mir=!S.mir;});
var sp=d.createElement('span');sp.className='l';sp.textContent='速さ';r1.appendChild(sp);
var bSp=[0.5,0.75,1,1.25,1.5].map(function(s){var b=B(r1,String(s),function(){S.sp=s;V().playbackRate=s;});b.dataset.s=s;return b;});
var bA=B(r2,'',function(){var t=Math.round(V().currentTime*10)/10;if(S.b!=null&&t>=S.b-0.5)S.b=null;S.a=t;});
var bB=B(r2,'',function(){var t=Math.round(V().currentTime*10)/10;if(t<=(S.a||0)+0.5){return;}S.b=t;if(S.loop)V().currentTime=S.a||0;});
var bL=B(r2,'くり返し',function(){S.loop=!S.loop;});
B(r3,'区間を消す',function(){S.a=null;S.b=null;});
B(r3,'−5秒',function(){V().currentTime=Math.max(0,V().currentTime-5);});
B(r3,'＋5秒',function(){V().currentTime=V().currentTime+5;});
B(r3,'小さく',function(){S.min=true;});
B(r3,'終わる',function(){p.remove();clearInterval(window.__hantenT);d.querySelectorAll('video').forEach(function(x){x.style.transform='';});});
function draw(){
bMir.className=S.mir?'on':'';
bSp.forEach(function(b){var cur=S.sp==null?V().playbackRate:S.sp;b.className=(+b.dataset.s===cur)?'on':'';});
bA.textContent='ここから '+f(S.a);bA.className=S.a!=null?'on':'';
bB.textContent='ここまで '+f(S.b);bB.className=S.b!=null?'on':'';
bL.className=S.loop?'on':'';
p.className=S.min?'min':'';
}
d.body.appendChild(p);draw();
window.__hantenT=setInterval(function(){
var v=V();if(!v)return;
var want=S.mir?'scaleX(-1)':'';if(v.style.transform!==want)v.style.transform=want;
if(S.sp!=null&&v.playbackRate!==S.sp)v.playbackRate=S.sp;
if(S.loop){
if(S.b!=null&&v.currentTime>=S.b&&!v.paused)v.currentTime=S.a||0;
else if(v.ended&&(S.a!=null||S.b!=null)){v.currentTime=S.a||0;v.play();}
}
},100);
})();
