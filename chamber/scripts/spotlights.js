document.addEventListener("DOMContentLoaded", function() {
    loadSpotlights();
});

async function loadSpotlights() {
    const response = await fetch('path_to_your_spotlights_data.json');
    const data = await response.json();

    const spotlightContainer = document.getElementById('spotlight-container');
    const spotlights = data.filter(member => member.membershipLevel === 'Gold' || member.membershipLevel === 'Silver');
    
    spotlights.forEach(member => {
        const memberDiv = document.createElement('div');
        memberDiv.classList.add('spotlight');
        memberDiv.innerHTML = `
            <h3>${member.name}</h3>
            <p>Membership Level: ${member.membershipLevel}</p>
            <p>${member.description}</p>
        `;
        spotlightContainer.appendChild(memberDiv);
    });
}
