// Auto-fill today's date
const dateEl = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateEl.value = today;

// Step navigation
function goToStep(step) {
  document.querySelectorAll(".step").forEach(s => s.classList.remove("active"));
  document.getElementById("step" + step).classList.add("active");

  if (step === 3) fillSummary();
}

// Price calculation
const quantityEl = document.getElementById("quantity");
const sizeEl = document.getElementById("size");
const iceEl = document.getElementById("extraIce");
const totalEl = document.getElementById("totalPrice");

function calcTotal() {
  let base = 2;
  if (sizeEl.value === "large") base += 1;
  if (iceEl.checked) base += 0.10;
  totalEl.textContent = "$" + (base * quantityEl.value).toFixed(2);
}
quantityEl.oninput = calcTotal;
sizeEl.onchange = calcTotal;
iceEl.onchange = calcTotal;
calcTotal();

// Step 3 summary
function updateSummaryTitle(qty) {
  const title = document.getElementById("summaryTitle");

  if (qty <= 3) title.textContent = "Can I have some?";
  else if (qty <= 5) title.textContent = "We can all share… right?";
  else title.textContent = "Okay wow… you're thirsty.";
}

function fillSummary() {
  const qty = Number(quantityEl.value);

  updateSummaryTitle(qty);

  document.getElementById("sumName").textContent = name.value;
  document.getElementById("sumAddress").textContent = address.value;
  document.getElementById("sumDate").textContent = dateEl.value;
  document.getElementById("sumQty").textContent = qty;
  document.getElementById("sumSize").textContent = sizeEl.value;
  document.getElementById("sumIce").textContent = iceEl.checked ? "Yes" : "No";
  document.getElementById("sumTotal").textContent = totalEl.textContent;
}

// Submit order
async function submitOrder() {
  const data = {
    name: name.value,
    address: address.value,
    date: dateEl.value,
    quantity: quantityEl.value,
    size: sizeEl.value,
    extraIce: iceEl.checked,
    total: totalEl.textContent
  };

  const res = await fetch("https://YOUR-BACKEND/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const json = await res.json();
  if (json.checkoutUrl) window.location.href = json.checkoutUrl;
}
