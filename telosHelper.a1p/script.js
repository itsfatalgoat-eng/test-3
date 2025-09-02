// Check if running inside Alt1
if (window.alt1) {
  alt1.identifyApp("teloshelper", "Telos Helper");
  console.log("Telos Helper loaded in Alt1.");
} else {
  alert("Not running inside Alt1 Toolkit.");
}

// 🟢 Helper: get phase from HP percentage
function getTelosPhase(hpPercent, enrage) {
  if (hpPercent > 75) return 1;
  if (hpPercent > 50) return 2;
  if (hpPercent > 25) return 3;
  if (hpPercent > 0) return 4;
  if (enrage >= 100) return 5;
  return "Unknown";
}

// 🟢 OCR: read Telos HP % (replace coords for your screen!)
function readTelosHp() {
  if (!window.alt1) return;

  try {
    const ocr = new OCR();
    const rawText = ocr.readLine(100, 100, 200, 30);
    const match = rawText.match(/(\d+)%/);
    if (!match) return;

    const hpPercent = parseInt(match[1]);
    const enrage = 100; // Placeholder

    const phase = getTelosPhase(hpPercent, enrage);
    document.getElementById("phase").innerText =
      `Phase: ${phase} (HP ${hpPercent}%)`;
  } catch (e) {
    console.error("OCR failed:", e);
  }
}

// Auto-check HP every 2 seconds
setInterval(readTelosHp, 2000);

// Beam timer example
function startBeamTimer() {
  document.getElementById("timer").innerText = "Beam in 25s…";
  setTimeout(() => {
    document.getElementById("timer").innerText = "⚡ Beam NOW!";
    if (window.alt1) alt1.overLayText("BEAM!", "red", 50, 2000);
  }, 25000);
}
