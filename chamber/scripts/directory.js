document.addEventListener("DOMContentLoaded", async () => {
    const membersData = await fetchMembersData();
    const spotlightMembers = getSpotlightMembers(membersData); // Filter for Gold/Silver members
    displayMembers(spotlightMembers);

    document.getElementById('gridView').addEventListener('click', () => toggleView('grid'));
    document.getElementById('listView').addEventListener('click', () => toggleView('list'));

    displayFooterInfo();
    getWeatherData(); // Fetch weather data for the location
});

async function fetchMembersData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    return data;
}

function getSpotlightMembers(members) {
    // Filter Gold and Silver members
    return members.filter(member => member.membership_level === 'Gold' || member.membership_level === 'Silver');
}

function displayMembers(members) {
    const memberContainer = document.getElementById('membersDirectory');
    memberContainer.innerHTML = ''; // Clear previous content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <img src="images/${member.logo}" alt="${member.name}" class="member-logo">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membership_level)}</p>
            <p>Email: <a href="mailto:${member.email}">${member.email}</a></p>
        `;

        memberContainer.appendChild(memberCard);
    });
}

function toggleView(viewType) {
    const memberContainer = document.getElementById('membersDirectory');
    if (viewType === 'grid') {
        memberContainer.classList.remove('list-view');
        memberContainer.classList.add('grid-view');
    } else {
        memberContainer.classList.remove('grid-view');
        memberContainer.classList.add('list-view');
    }
}

function getMembershipLevel(level) {
    switch(level) {
        case 'Gold': return 'Gold Member';
        case 'Silver': return 'Silver Member';
        default: return 'Member';
    }
}

function displayFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = new Date(document.lastModified).toLocaleString();

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;
}

// Fetch weather data for the Chamber location
async function getWeatherData() {
    const weatherAPIKey = 'YOUR_API_KEY';  // Replace with your OpenWeatherMap API key
    const city = 'CityName';  // Replace with the chamber's city
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const data = await response.json();
    
    document.getElementById('weather-info').textContent = `${data.weather[0].description}, ${data.main.temp}°C`;
    getForecast(city, weatherAPIKey);  // Get the 3-day forecast
}

async function getForecast(city, weatherAPIKey) {
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const forecastData = await forecastResponse.json();
    
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';  // Clear existing content
    
    for (let i = 0; i < 3; i++) {
        const day = forecastData.list[i * 8]; // Get data for the next 3 days
        const forecastCard = document.createElement('div');
        forecastCard.classList.add('forecast-card');
        
        forecastCard.innerHTML = `
            <h4>${new Date(day.dt * 1000).toLocaleDateString()}</h4>
            <p>${day.weather[0].description}</p>
            <p>Temp: ${day.main.temp}°C</p>
        `;
        
        forecastContainer.appendChild(forecastCard);
    }
}
