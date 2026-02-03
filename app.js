const rules = document.querySelectorAll(".rule");
const sellRules = document.querySelectorAll(".sell-rule");
const btn = document.getElementById("tradeBtn");
const sellBtn = document.getElementById("sellBtn");
const result = document.getElementById("result");
const symbolInput = document.getElementById("symbol");
const historyList = document.getElementById("historyList");
const clearBtn = document.getElementById("clearHistory");

function getHistory() {
  return JSON.parse(localStorage.getItem("tradeHistory")) || [];
}

function saveHistory(entry) {
  const history = getHistory();
  history.unshift(entry);
  localStorage.setItem("tradeHistory", JSON.stringify(history));
  renderHistory();
}

function renderHistory() {
  const history = getHistory();
  historyList.innerHTML = "";
  history.forEach(h => {
    const div = document.createElement("div");
    div.className = "history-item " + h.type;
    div.innerHTML = `<b>${h.symbol}</b> - ${h.type.toUpperCase()}<br>${h.time}`;
    historyList.appendChild(div);
  });
}

function checkBuy() {
  const checked = document.querySelectorAll(".rule:checked").length;
  if (checked === rules.length && symbolInput.value.trim()) {
    btn.disabled = false;
    btn.classList.add("active");
  } else {
    btn.disabled = true;
    btn.classList.remove("active");
  }
}

function checkSell() {
  const anySell = document.querySelectorAll(".sell-rule:checked").length > 0;
  if (anySell && symbolInput.value.trim()) {
    sellBtn.disabled = false;
    sellBtn.classList.add("active");
  } else {
    sellBtn.disabled = true;
    sellBtn.classList.remove("active");
  }
}

rules.forEach(r => r.addEventListener("change", checkBuy));
sellRules.forEach(r => r.addEventListener("change", checkSell));
symbolInput.addEventListener("input", () => {
  checkBuy();
  checkSell();
});

btn.onclick = () => {
  saveHistory({ symbol: symbolInput.value, type: "buy", time: new Date().toLocaleString() });
  result.innerHTML = "✅ Đã lưu lệnh MUA";
};

sellBtn.onclick = () => {
  saveHistory({ symbol: symbolInput.value, type: "sell", time: new Date().toLocaleString() });
  result.innerHTML = "🔴 Đã lưu lệnh BÁN";
};

clearBtn.onclick = () => {
  localStorage.removeItem("tradeHistory");
  renderHistory();
};

renderHistory();
