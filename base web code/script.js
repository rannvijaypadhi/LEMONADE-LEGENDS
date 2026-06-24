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
// Auto-fill today's date
const dateEl = document.getElementById("date");
const today = new Date().toISOString().split("T")[0];
dateEl.value = today;

quantityEl.oninput = calcTotal;
sizeEl.onchange = calcTotal;
iceEl.onchange = calcTotal;
calcTotal();

document.getElementById("orderForm").onsubmit = async (e) => {
  e.preventDefault();
  document.getElementById("status").textContent = "Processing...";

  const data = {
    name: document.getElementById("name").value,
    address: document.getElementById("address").value,
    date: date.value,
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
};
