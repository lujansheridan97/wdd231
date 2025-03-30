document.addEventListener("DOMContentLoaded", async () => {
    // Fetch the member data from the JSON file
    const membersData = await fetchMembersData();

    // Display members in grid or list view
    displayMembers(membersData);

    // Setup view toggle buttons
    document.getElementById('gridView').addEventListener('click', () => toggleView('grid'));
    document.getElementById('listView').addEventListener('click', () => toggleView('list'));

    // Display the copyright year and last modification date
    displayFooterInfo();
});

// Fetch member data from members.json
async function fetchMembersData() {
    const response = await fetch('data/members.json');
    const data = await response.json();
    return data;
}

// Display members in the selected view
function displayMembers(members) {
    const memberContainer = document.getElementById('membersDirectory');
    memberContainer.innerHTML = ''; // Clear existing content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <img src="${member.image}" alt="${member.name}" class="member-image">
            <h3>${member.name}</h3>
            <p>${member.address}</p>
            <p>Phone: ${member.phone}</p>
            <p><a href="${member.website}" target="_blank">Visit Website</a></p>
            <p>Membership Level: ${getMembershipLevel(member.membership_level)}</p>
            <p>${member.other_info}</p>
        `;

        memberContainer.appendChild(memberCard);
    });
}

// Toggle between grid and list view
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

// Return the membership level as a string
function getMembershipLevel(level) {
    switch(level) {
        case 1: return 'Member';
        case 2: return 'Silver';
        case 3: return 'Gold';
        default: return 'Unknown';
    }
}

// Display the copyright year and last modification date
function displayFooterInfo() {
    const currentYear = new Date().getFullYear();
    const lastModifiedDate = new Date(document.lastModified).toLocaleString();

    document.getElementById('currentyear').textContent = currentYear;
    document.getElementById('lastModified').textContent = `Last modified: ${lastModifiedDate}`;
}
