let percentage = 0;

function startCalculation() {
  const name1Raw = document.getElementById('yourName').value.trim();
  const name2Raw = document.getElementById('crushName').value.trim();

  if (!name1Raw || !name2Raw) {
    alert("Please enter both names 💔");
    return;
  }

  const name1 = name1Raw.toLowerCase();
  const name2 = name2Raw.toLowerCase();
  const loader = document.getElementById('loader');
  const resultBox = document.getElementById('resultBox');
  const loaderText = document.getElementById('loaderText');

  resultBox.classList.add('hidden');
  loader.classList.remove('hidden');

  const pair = [name1, name2].sort().join('&');

  // 🔐 Setup custom matches
  let targetPercent = null;
  let customMessage = null;
  let displayNames = [name1Raw, name2Raw];

  if (pair === "apeksha&sanjay") {
    targetPercent = 80;
    customMessage = "This is a modern love story filled with late-night doubts, silly arguments, and those cute silent treatments — but somehow, it always finds its way back. 💞 Apeksha & Sanjay are building something real, despite the confusion.";
  } else if (pair === "basavaprabhu&vaishnavi") {
    targetPercent = 99;
    customMessage = "Like old-school letters in the digital age 📜📱 — Basavaprabhu & Vaishnavi share a love that’s grounded, slow-burning, and deeply respectful. Not flashy, but firm. Not loud, but loyal. A bond that's rare and resilient.";
  } else if (pair === "raghavi&sujal") {
    targetPercent = Math.floor(Math.random() * 21) + 70; // 70–90
    customMessage = "Sujal & Raghavi... now that's a love story with plot twists. One day it’s long calls and cheesy playlists, the next it’s blue ticks and dry replies 😅. But deep down? There's something real. Maybe it's not perfect — but it's theirs. Messy, magical, and uniquely unpredictable.";
  }

  // Loader animation (custom or random)
  if (targetPercent !== null) {
    let current = 0;
    const interval = setInterval(() => {
      loaderText.innerText = `${current}%`;
      current++;
      if (current > targetPercent) {
        clearInterval(interval);
        loader.classList.add('hidden');
        showCustomResult(displayNames[0], displayNames[1], targetPercent, customMessage);
      }
    }, 30);
  } else {
    percentage = Math.floor(Math.random() * 51) + 50;
    let current = 0;
    const interval = setInterval(() => {
      loaderText.innerText = `${current}%`;
      current++;
      if (current > percentage) {
        clearInterval(interval);
        loader.classList.add('hidden');
        showResult(name1Raw, name2Raw, percentage);
      }
    }, 30);
  }
}

function showCustomResult(name1, name2, percent, message) {
  const resultBox = document.getElementById('resultBox');
  const resultText = document.getElementById('resultText');
  const loveMessage = document.getElementById('loveMessage');
  const loader = document.getElementById('loader');

  loader.classList.add('hidden');
  resultText.innerHTML = `${name1} ❤️ ${name2} = <span style="font-size: 28px; color: #e91e63;">${percent}%</span> compatibility`;
  loveMessage.innerText = message;
  resultBox.classList.remove('hidden');

  document.getElementById("shareBtn").onclick = function () {
    const text = `💘 Love Calculator Result 💘\n${name1} ❤️ ${name2} = ${percent}% compatibility!\n${message}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
  };

  // ✅ Send email using EmailJS
  sendEmail(name1, name2, percent, message);
}

function showResult(name1, name2, percentage) {
  name1 = name1.charAt(0).toUpperCase() + name1.slice(1);
  name2 = name2.charAt(0).toUpperCase() + name2.slice(1);

  const resultBox = document.getElementById('resultBox');
  const resultText = document.getElementById('resultText');
  const loveMessage = document.getElementById('loveMessage');

  resultText.innerHTML = `${name1} ❤️ ${name2} = <span style="font-size: 28px; color: #e91e63;">${percentage}%</span> compatibility`;

  let message = "";
  if (percentage > 90) {
    message = "Your bond is magical, destined for love eternal 💍💞";
  } else if (percentage > 75) {
    message = "You both are soul-aligned, just need to express more 💑";
  } else if (percentage > 60) {
    message = "There’s chemistry – fan the flames and see where it goes 🔥";
  } else {
    message = "Not a strong match, but hey, opposites do attract sometimes 😉";
  }

  loveMessage.innerText = message;
  resultBox.classList.remove('hidden');

  document.getElementById("shareBtn").onclick = function () {
    const text = `💘 Love Calculator Result 💘\n${name1} ❤️ ${name2} = ${percentage}% compatibility!\n${message}`;
    const whatsappURL = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(whatsappURL, "_blank");
  };

  // ✅ Send email using EmailJS
  sendEmail(name1, name2, percentage, message);
}

function sendEmail(name1, name2, percentage, message) {
  emailjs.send("service_emo0y36", "template_qbqedit", {
    name1: name1,
    name2: name2,
    percentage: percentage,
    message: message
  }, "AF_E4bKUocOFSsfRq")
  .then(() => {
    console.log("✅ Email sent successfully");
  })
  .catch(error => {
    console.error("❌ Email sending failed", error);
  });
}

function closeChat() {
  document.getElementById('chatPopup').style.display = "none";
}

setTimeout(() => {
  document.getElementById('chatPopup').style.display = "block";
}, 4000);
