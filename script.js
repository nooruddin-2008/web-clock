function update() {
  const now = new Date();
  const h = now.getHours();
  const m = now.getMinutes();
  const s = now.getSeconds();
  const hour = h + m / 60;

  // Clock
  document.getElementById("clock").textContent =
    String(h).padStart(2, "0") + ":" +
    String(m).padStart(2, "0") + ":" +
    String(s).padStart(2, "0");

  // Greeting
  let greeting;
  if (h >= 5 && h < 12) greeting = "Good morning";
  else if (h >= 12 && h < 17) greeting = "Good afternoon";
  else if (h >= 17 && h < 21) greeting = "Good evening";
  else greeting = "Good night";
  document.getElementById("greeting").textContent = greeting;

  // Background and text color
  let bg;
  let textColor = "white";
  if (h >= 5 && h < 8) {
    bg = "linear-gradient(#4a5a9a, #f4a273)";
  } else if (h >= 8 && h < 17) {
    bg = "linear-gradient(#3a96e5, #bfe6ff)";
    textColor = "#0e2a47";
  } else if (h >= 17 && h < 20) {
    bg = "linear-gradient(#5a5096, #f08a5d)";
  } else {
    bg = "linear-gradient(#0b1026, #1b2447)";
  }
  document.body.style.background = bg;
  document.body.style.color = textColor;

  // Sun (6am to 6pm) and moon (6pm to 6am)
  const sun = document.getElementById("sun");
  const moon = document.getElementById("moon");
  let p;
  let circle;

  if (hour >= 6 && hour < 18) {
    p = (hour - 6) / 12;
    circle = sun;
    sun.style.display = "block";
    moon.style.display = "none";
  } else {
    p = ((hour + 6) % 24) / 12;
    circle = moon;
    moon.style.display = "block";
    sun.style.display = "none";
  }

  circle.style.left = (p * 100) + "%";
  circle.style.bottom = (Math.sin(Math.PI * p) * 60 + 10) + "vh";
}

// Weather
function describe(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Foggy";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code >= 95) return "Thunderstorm";
  return "Unknown";
}

async function loadWeather() {
  // for my city islamabad pakistan.
  const url = "https://api.open-meteo.com/v1/forecast" +
              "?latitude=33.68&longitude=73.05" +
              "&current=temperature_2m,weather_code";
  try {
    const res = await fetch(url);
    const data = await res.json();
    const temp = Math.round(data.current.temperature_2m);
    const text = describe(data.current.weather_code);
    document.getElementById("weather").textContent = temp + "°C · " + text;
  } catch (err) {
    document.getElementById("weather").textContent = "Weather unavailable";
    console.error(err);
  }
}

update();
setInterval(update, 1000);
loadWeather();
setInterval(loadWeather, 10 * 60 * 1000);