function fillCookieData() {
  var a = document.cookie.split(";");
  var _balalance = a[0].split("=");
  var balance = _balalance[1];
  var _risk = a[1].split("=");
  var risk = _risk[1];
  document.getElementById("balance").value = balance;
  document.getElementById("risk").value = risk;
}

document.querySelector("#calculate").addEventListener("click", (e) => {
  e.preventDefault();
  const date = new Date();
  let today = date.getTime();
  let expires = 30 * 24 * 60 * 60 * 1000;
  date.setTime(today + expires);
  let cookie_date = date.toUTCString();
  document.cookie = `balance=${document.getElementById("balance").value};expires=${cookie_date}`;
  document.cookie = `risk=${document.getElementById("risk").value};expires=${cookie_date}`;
});

function calculate() {
  window.scrollTo({ top: 1000, behavior: "smooth" });
  var balance;
  var risk;
  var leverage;
  var entry;
  var stopLoss;
  var takeProfit;
  var stopLossPercentage;
  var takeProfitPercentage = 0;
  var potentialProfit = 0;
  var potentialLoss = 0;
  var coinPosition = 0;
  var position;
  var amount;
  var rr;
  var _percentageDevide = 100;
  balance = parseFloat(document.getElementById("balance").value);
  risk = parseFloat(document.getElementById("risk").value);

  leverage = parseFloat(document.getElementById("leverage").value);
  entry = parseFloat(document.getElementById("entry").value);
  stopLoss = parseFloat(document.getElementById("stop-loss").value);
  takeProfit = parseFloat(document.getElementById("take-profit").value);

  stopLossPercentage = Math.abs((100 - (stopLoss / entry) * 100).toFixed(2));
  position = ((balance * risk) / stopLossPercentage).toFixed(4);
  coinPosition = (position / entry).toFixed(4);
  amount = (position / leverage).toFixed(2);
  if (!isNaN(takeProfit)) {
    takeProfitPercentage = Math.abs(100 - (takeProfit / entry) * 100).toFixed(2);
    potentialProfit = ((position * takeProfitPercentage) / 100).toFixed(2);
  }
  potentialLoss = ((position * stopLossPercentage) / _percentageDevide).toFixed(2);
  rr = (takeProfitPercentage / stopLossPercentage).toFixed(2);

  document.getElementById("rr").value = "This trade has " + rr + " risk to reward ratio.";
  document.getElementById("pwinloss").value =
    "You will be risking $" + potentialLoss + " for $" + potentialProfit + " potential profit.";
  document.getElementById("position-size").value =
    "For chosen " + risk + "% risk your position size is $" + position + ", or " + coinPosition + " coins.";
  document.getElementById("trade-amount").value = "With " + leverage + "X leverage that is $" + amount + " cost.";
  if (entry > stopLoss) {
    document.getElementById("summary").value =
      "LONG " +
      leverage +
      "X" +
      "\r\n" +
      "Entry: " +
      entry +
      "\r\n" +
      "SL: " +
      stopLoss +
      "\r\n" +
      "TP: " +
      takeProfit +
      "\r\n" +
      "Quantity: " +
      coinPosition +
      "\r\n" +
      "Cost: " +
      amount +
      "\r\n" +
      "\r\n" +
      "Good luck!";
  } else {
    document.getElementById("summary").value =
      "SHORT " +
      leverage +
      "X" +
      "\r\n" +
      "Entry: " +
      entry +
      "\r\n" +
      "SL: " +
      stopLoss +
      "\r\n" +
      "TP: " +
      takeProfit +
      "\r\n" +
      "Quantity: " +
      coinPosition +
      "\r\n" +
      "Cost: " +
      amount +
      "\r\n" +
      "\r\n" +
      "Good luck!";
  }
}

function reset() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  document.getElementById("leverage").value = "";
  document.getElementById("entry").value = "";
  document.getElementById("stop-loss").value = "";
  document.getElementById("take-profit").value = "";
}
