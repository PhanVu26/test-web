const rules=document.querySelectorAll('.rule');
const sellRules=document.querySelectorAll('.sell-rule');
const btn=document.getElementById('tradeBtn');
const sellBtn=document.getElementById('sellBtn');
const symbolInput=document.getElementById('symbol');
const result=document.getElementById('result');
const historyList=document.getElementById('historyList');
const clearBtn=document.getElementById('clearHistory');

function getHistory(){
  return JSON.parse(localStorage.getItem('tradeHistory'))||[];
}

function saveHistory(e){
  const h=getHistory();
  h.unshift(e);
  localStorage.setItem('tradeHistory',JSON.stringify(h));
  renderHistory();
}

function renderHistory(){
  historyList.innerHTML='';
  getHistory().forEach(h=>{
    const d=document.createElement('div');
    d.className='history-item '+h.type;
    d.innerHTML=`<b>${h.symbol}</b> • ${h.type.toUpperCase()}<br><small>${h.time}</small>`;
    historyList.appendChild(d);
  });
}

function checkBuy(){
  if(document.querySelectorAll('.rule:checked').length===rules.length && symbolInput.value.trim()){
    btn.disabled=false;btn.classList.add('active');
  }else{btn.disabled=true;btn.classList.remove('active');}
}

function checkSell(){
  if(document.querySelectorAll('.sell-rule:checked').length>0 && symbolInput.value.trim()){
    sellBtn.disabled=false;sellBtn.classList.add('active');
  }else{sellBtn.disabled=true;sellBtn.classList.remove('active');}
}

rules.forEach(r=>r.onchange=checkBuy);
sellRules.forEach(r=>r.onchange=checkSell);
symbolInput.oninput=()=>{checkBuy();checkSell();};

btn.onclick=()=>{
  saveHistory({symbol:symbolInput.value.toUpperCase(),type:'buy',time:new Date().toLocaleString()});
  result.innerHTML='✅ Đã lưu lệnh MUA';
};

sellBtn.onclick=()=>{
  saveHistory({symbol:symbolInput.value.toUpperCase(),type:'sell',time:new Date().toLocaleString()});
  result.innerHTML='🔴 Đã lưu lệnh BÁN';
};

clearBtn.onclick=()=>{
  localStorage.removeItem('tradeHistory');
  renderHistory();
};

renderHistory();
