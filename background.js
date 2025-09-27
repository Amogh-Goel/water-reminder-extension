chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "drinkWater") {
    chrome.notifications.create({
      type: "basic",
      iconUrl: "icon.png",
      title: "Hydration Quest!",
      message: "Drink water to gain +10 points!",
      priority: 2
    });
  }
});

