document.addEventListener("DOMContentLoaded", async () => {
    const membersData = await fetchMembersData();
    const spotlightMembers = getSpotlightMembers(membersData); // Filtrar miembros Gold/Silver
    displayMembers(spotlightMembers);

    // Agregar eventos de clic para alternar entre vista de cuadrícula y lista
    document.getElementById('gridView').addEventListener('click', () => toggleView('grid'));
    document.getElementById('listView').addEventListener('click', () => toggleView('list'));

    displayFooterInfo();
    getWeatherData(); // Obtener datos del clima para la ubicación
});

async function fetchMembersData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    return data;
}

function getSpotlightMembers(members) {
    // Filtrar miembros Gold y Silver
    return members.filter(member => member.membership_level === 'Gold' || member.membership_level === 'Silver');
}

function displayMembers(members) {
    const memberContainer = document.getElementById('membersDirectory');
    memberContainer.innerHTML = ''; // Limpiar contenido previo

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

// Obtener datos del clima para la ubicación de la Cámara de Comercio
async function getWeatherData() {
    const weatherAPIKey = 'YOUR_API_KEY';  // Reemplaza con tu API Key de OpenWeatherMap
    const city = 'CityName';  // Reemplaza con la ciudad de la cámara
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const data = await response.json();
    
    document.getElementById('weather-info').textContent = `${data.weather[0].description}, ${data.main.temp}°C`;
    getForecast(city, weatherAPIKey);  // Obtener el pronóstico de 3 días
}

async function getForecast(city, weatherAPIKey) {
    const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${weatherAPIKey}&units=metric`);
    const forecastData = await forecastResponse.json();
    
    const forecastContainer = document.getElementById('forecast');
    forecastContainer.innerHTML = '';  // Limpiar contenido previo
    
    for (let i = 0; i < 3; i++) {
        const day = forecastData.list[i * 8]; // Obtener datos para los próximos 3 días
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

// Mostrar destacados (Gold/Silver)
function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = ''; // Limpiar contenido previo

    const filteredMembers = members.filter(member => member.membership_level === 'Gold' || member.membership_level === 'Silver');
    const randomSpotlights = getRandomMembers(filteredMembers, 3); // Seleccionar 3 miembros aleatorios

    randomSpotlights.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');

        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.image}" alt="${member.name}">
            <p>Phone: ${member.phone}</p>
            <p>Address: ${member.address}</p>
            <p>Website: <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p>Membership Level: ${member.membership_level}</p>
        `;

        spotlightContainer.appendChild(spotlightCard);
    });
}

// Función para obtener miembros aleatorios
function getRandomMembers(members, count) {
    const randomMembers = [];
    while (randomMembers.length < count) {
        const randomIndex = Math.floor(Math.random() * members.length);
        const randomMember = members[randomIndex];
        if (!randomMembers.includes(randomMember)) {
            randomMembers.push(randomMember);
        }
    }
    return randomMembers;
}
