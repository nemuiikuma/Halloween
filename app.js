const questions=[
 {scene:"凌晨 00:13 · 一封没有署名的邀请",q:"门缝里滑进一张派对邀请函，你会？",a:[["立刻换装，未知才有意思","witch"],["先查地址，再决定去不去","vampire"],["叫上朋友，热闹不能缺席","ghost"],["把邀请函收好，静观其变","cat"]]},
 {scene:"凌晨 00:47 · 雾中的十字路口",q:"四条路，只能凭感觉选一条。",a:[["灯火最亮、笑声最多的路","ghost"],["月光铺满的安静小径","cat"],["通往古堡的黑色石阶","vampire"],["长着奇怪蘑菇的森林","witch"]]},
 {scene:"凌晨 01:26 · 镜子慢了半拍",q:"镜中的你突然眨了眨眼，你的第一反应？",a:[["也眨一下，看它还会做什么","witch"],["镇定观察，找出规律","vampire"],["尖叫三秒，然后拍照发群聊","ghost"],["关灯离开，今晚不必知道答案","cat"]]},
 {scene:"凌晨 02:02 · 失控的化装舞会",q:"舞会忽然停电，你会成为哪种人？",a:[["点亮手机，组织大家撤离","vampire"],["趁黑换个身份继续玩","cat"],["大喊一声，顺便制造气氛","ghost"],["掏出蜡烛——你早有准备","witch"]]},
 {scene:"凌晨 02:44 · 只剩一颗糖",q:"最后一颗魔法糖，据说能实现小愿望。",a:[["分给身边最需要的人","ghost"],["留着，等真正重要的时刻","vampire"],["许愿今晚永远不要结束","witch"],["不吃。免费的魔法最贵","cat"]]},
 {scene:"凌晨 03:31 · 有东西跟着你",q:"回家路上，身后的脚步声越来越近……",a:[["猛然回头，直面它","vampire"],["拐进小巷，反过来跟踪它","cat"],["打给朋友，开着免提走","ghost"],["在地上画一个神秘符号","witch"]]},
 {scene:"凌晨 04:59 · 天亮前的最后选择",q:"如果能带走一种午夜能力，你选？",a:[["读懂所有沉默背后的真话","vampire"],["在任何地方来去无踪","cat"],["让孤单的人重新笑起来","ghost"],["把荒唐的念头变成现实","witch"]]}
];
const results={
 witch:{name:"野生女巫",icon:"✦",tag:"CHAOTIC CREATOR · 混乱创造者",copy:"你把生活当作一锅正在冒泡的魔药。直觉敏锐，讨厌标准答案，越是无人走过的路，越让你兴奋。你的魔法不是预知未来，而是把“要是……”真的变成现实。",traits:["脑洞失控","直觉型选手","规则改写者"]},
 vampire:{name:"古堡吸血鬼",icon:"♜",tag:"ELEGANT STRATEGIST · 优雅谋略家",copy:"你冷静、精准，擅长在别人慌乱时看见全局。你不是不动感情，只是习惯把真心藏在从容之后。一旦认定值得守护的人或事，你的忠诚比漫长黑夜更可靠。",traits:["情绪稳定","深度观察","长期主义"]},
 ghost:{name:"派对幽灵",icon:"◌",tag:"SOCIAL SPARK · 气氛点火者",copy:"你走到哪里，哪里就像忽然亮起一串小灯。共情力是你的超能力，幽默是你的隐身斗篷。你害怕冷场胜过害怕鬼，却也懂得在热闹散去后接住朋友的低落。",traits:["快乐感染体","共情雷达","人群充电"]},
 cat:{name:"月影黑猫",icon:"◈",tag:"MYSTERY SEEKER · 神秘探索者",copy:"你不急着被所有人理解。独立、敏锐、有自己的边界，表面漫不经心，心里却记录着每个细节。你选择靠近谁，从来不是偶然；你沉默的时候，往往看得最清楚。",traits:["边界感满分","冷幽默","细节侦探"]}
};
let index=0,scores={witch:0,vampire:0,ghost:0,cat:0},history=[];
const $=s=>document.querySelector(s), screens=["home","quiz","result"];
function show(id){screens.forEach(x=>$("#"+x).classList.toggle("active",x===id));window.scrollTo(0,0)}
function render(){const item=questions[index];$("#stepLabel").textContent=`${String(index+1).padStart(2,"0")} / 07`;$("#bigNumber").textContent=String(index+1).padStart(2,"0");$("#progress").style.width=`${(index+1)/questions.length*100}%`;$("#scene").textContent=item.scene;$("#question").textContent=item.q;$("#backBtn").style.visibility=index?"visible":"hidden";$("#answers").innerHTML=item.a.map((x,i)=>`<button class="answer" data-type="${x[1]}"><b>${String.fromCharCode(65+i)}</b>${x[0]}</button>`).join("");document.querySelectorAll(".answer").forEach(b=>b.onclick=()=>choose(b.dataset.type))}
function choose(type){scores[type]++;history.push(type);if(index<questions.length-1){index++;render()}else finish()}
function finish(){const order=["witch","vampire","ghost","cat"];const key=order.reduce((a,b)=>scores[b]>scores[a]?b:a,order[0]);const r=results[key];$("#resultIcon").textContent=r.icon;$("#resultName").textContent=r.name;$("#resultTag").textContent=r.tag;$("#resultCopy").textContent=r.copy;$("#traits").innerHTML=r.traits.map(x=>`<span># ${x}</span>`).join("");$("#result").dataset.key=key;show("result");$("#result").classList.add("flash");setTimeout(()=>$("#result").classList.remove("flash"),800)}
$("#startBtn").onclick=()=>{show("quiz");render()};
$("#backBtn").onclick=()=>{if(!index)return;index--;scores[history.pop()]--;render()};
$("#restartBtn").onclick=()=>{index=0;scores={witch:0,vampire:0,ghost:0,cat:0};history=[];show("home")};
$("#shareBtn").onclick=async()=>{const r=results[$("#result").dataset.key];const text=`我的万圣节午夜人格是「${r.name}」${r.icon}\n${r.tag}\n${r.copy}\n来测测你藏在午夜里的另一面！`;try{await navigator.clipboard.writeText(text);$("#toast").textContent="✦ 结果文案已复制，去吓朋友一跳吧"}catch{window.prompt("复制你的结果：",text)}setTimeout(()=>$("#toast").textContent="",3000)};
