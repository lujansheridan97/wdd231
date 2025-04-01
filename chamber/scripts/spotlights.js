document.addEventListener("DOMContentLoaded", async () => {
    const membersData = await fetchMembersData();
    const spotlightMembers = getSpotlightMembers(membersData);
    displaySpotlights(spotlightMembers);
});

async function fetchMembersData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    return data;
}

function getSpotlightMembers(members) {
    // Filter members by Gold and Silver membership levels
    return members.filter(member => member.membership_level === 'Gold' || member.membership_level === 'Silver');
}

function displaySpotlights(members) {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = ''; // Clear previous content

    // Randomly select 2-3 spotlight members
    const randomSpotlights = getRandomMembers(members, 3);

    randomSpotlights.forEach(member => {
        const spotlightCard = document.createElement('div');
        spotlightCard.classList.add('spotlight-card');
        spotlightCard.innerHTML = `
            <h3>${member.name}</h3>
            <img src="${member.logo}" alt="${member.name}">
            <p>${member.address}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
        `;
        spotlightContainer.appendChild(spotlightCard);
    });
}

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
