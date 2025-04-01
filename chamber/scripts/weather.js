document.addEventListener("DOMContentLoaded", () => {
    getWeatherData();
});

async function getWeatherData() {
    const weatherAPIKey = 'c13505122af66c3a6c9424fd0bd669a2';  
    const city = 'San Juan';  // 
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const data = await response.json();

    document.getElementById('current-weather').innerHTML = `
        <p>Current Temperature: ${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
    `;
    
    getWeatherForecast(city, weatherAPIKey); // Get the 3-day forecast
}

async function getWeatherForecast(city, weatherAPIKey) {
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const forecastData = await forecastResponse.json();
    
    let forecastHTML = `<h3>3-Day Forecast:</h3><ul>`;
    for (let i = 0; i < 3; i++) {
        const day = forecastData.list[i * 8];  // Each forecast is 3 hours apart, so 8 entries per day
        forecastHTML += `
            <li>
                <p><strong>${new Date(day.dt * 1000).toLocaleDateString()}:</strong> 
                ${day.main.temp}°C, ${day.weather[0].description}</p>
            </li>`;
    }
    forecastHTML += `</ul>`;
    document.getElementById('weather-forecast').innerHTML = forecastHTML;
}
