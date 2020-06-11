document.addEventListener("DOMContentLoaded", init);

function init() {
  loadHistory();
  loadService();
  initEvents();

  generateNewRandomPrefix();
}

function loadHistory() {
  //todo
}

function loadService() {
  const defaultServiceId = "maildrop-service";
  var serviceId = localStorage.getItem("service-id");

  if (serviceId) {
    if (!setService(serviceId)) setService(defaultServiceId);
  } else {
    setService(defaultServiceId);
  }
}

function initEvents() {
  //let copy = document.getElementById('copy-button');
  let serviceRadios = document.getElementsByClassName("service-radio");

  for (let i = 0; i < serviceRadios.length; i++) {
    const radio = serviceRadios[i];
    radio.addEventListener("change", function () {
      localStorage.setItem("service-id", this.value);
    });
  }
}

function setService(serviceId) {
  let serviceRadio = document.getElementById(serviceId);
  if (serviceRadio) {
    serviceRadio.setAttribute("checked", "checked");
    return true;
  }
  return false;
}

function randomInt(min, max) {
  var multiplier = max - min;
  return min + Math.floor(Math.random() * multiplier);
}

function randomString() {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  let word = "";
  for (let i = 0; i < 6; i++) {
    if (i === 1 || i === 4) word += vowels[randomInt(0, vowels.length)];
    else word += consonants[randomInt(0, consonants.length)];
  }
  return word;
}

function generateAddressPrefix() {
  var words = [];
  for (let i = 0; i < 3; i++) {
    words.push(randomString());
  }
  return words.join("-");
}

function updateAddressPrefix(prefix) {
  document.getElementById("prefix").value = prefix;
}

function generateNewRandomPrefix() {
  let prefix = generateAddressPrefix();
  updateAddressPrefix(prefix);
  addToHistory(prefix);
}

function addToHistory(prefix) {
  prefixHistory.push(prefix);
  displayHistory();
}

function displayHistory() {
  let list = document.getElementById("historyList");
  list.innerHTML = "";
  for (let i = prefixHistory.length - 1; i >= 0; i--) {
    const historyItem = prefixHistory[i];
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(historyItem));
    list.appendChild(li);
  }
}

var prefixHistory = [];
