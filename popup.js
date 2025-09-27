// Load saved data on popup open
document.addEventListener("DOMContentLoaded", () => {
  chrome.storage.local.get(["score", "waterLevel"], (data) => {
    document.getElementById("score").textContent = data.score || 0;
    document.getElementById("waterBar").style.width = (data.waterLevel || 0) + "%";
  });


// Handle drinking water
document.getElementById("drinkBtn").addEventListener("click", () => {
  console.log("Drink button clicked");
  chrome.storage.local.get(["score", "waterLevel"], (data) => {
    let score = (data.score || 0) + 10;  // +10 points per drink
    let waterLevel = (data.waterLevel || 0) + 20; // +20% bar per drink

    if (waterLevel > 100) waterLevel = 100; // cap at 100%

    chrome.storage.local.set({ score, waterLevel }, () => {
      document.getElementById("score").textContent = score;
      document.getElementById("waterBar").style.width = waterLevel + "%";
    });
  });
});

// Set reminder interval
document.getElementById("setReminder").addEventListener("click", () => {
  let minutes = parseInt(document.getElementById("interval").value);
  if (minutes > 0) {
    chrome.alarms.clear("drinkWater", () => {
      chrome.alarms.create("drinkWater", { periodInMinutes: minutes });
      alert("Reminder set every " + minutes + " minutes!");
    });
  }
});
});
