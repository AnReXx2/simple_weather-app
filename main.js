const iconMapping = {
  "clear-day": "☀️",
  "clear-night": "🌙",
  rain: "🌧️",
  snow: "❄️",
  wind: "💨",
  cloudy: "☁️",
  "partly-cloudy-day": "⛅",
  "partly-cloudy-night": "🌑",
  thunderstorm: "⛈️",
};

const getWeather = async () => {
  try {
    const response = await fetch(
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Batumi?unitGroup=metric&key=LXBVPXLYZLTSK9DMGPSXRK373&contentType=json"
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);

    const { currentConditions, days } = data;

    if (currentConditions) {
      const tempNumber = document.querySelector(".temp-number");
      const iconElement = document.querySelector(".weather-icon");
      const index = document.querySelector(".index");
      const humibity = document.querySelector(".humibity");
      const wind = document.querySelector(".wind");

      tempNumber.innerText = `${currentConditions.temp ?? "N/A"}`;
      index.innerHTML = `${currentConditions.uvindex ?? "N/A"}`;
      humibity.innerHTML = `${currentConditions.humidity ?? "N/A"}`;
      wind.innerHTML = `${currentConditions.winddir ?? "N/A"}`;

      const iconKey = currentConditions.icon;
      const weatherIcon = iconMapping[iconKey] ?? "❓";

      iconElement.innerText = weatherIcon;
    }
    if (days) {
      const forecastContainer = document.querySelector(".forecast-container");
      forecastContainer.innerHTML = ""; // Clear any previous forecast data

      days.forEach((day) => {
        const dayIconKey = day.icon;
        const dayIcon = iconMapping[dayIconKey] ?? "❓";

        const dayElement = document.createElement("div");
        dayElement.classList.add("forecast-day");

        dayElement.innerHTML = `
          <span class="forecast-date">${new Date(
            day.datetime
          ).toLocaleDateString()}</span>
          <span class="forecast-icon">${dayIcon}</span>
          <span class="forecast-temp">Max: ${day.tempmax ?? "N/A"}°C Min: ${
          day.tempmin ?? "N/A"
        }°C</span>
          <span class="forecast-conditions">${day.conditions ?? "N/A"}</span>
        `;

        forecastContainer.appendChild(dayElement);
      });
    }
  } catch (error) {
    console.log(error);
  }
};

getWeather();
