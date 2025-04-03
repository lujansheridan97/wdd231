document.addEventListener("DOMContentLoaded", () => {
    fetchMembersData();
});

async function fetchMembersData() {
    try {
       // Correct path to member.json
        const response = await fetch('member.json');

        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        const members = data.members;  // Access the 'members' array

        if (!Array.isArray(members)) {
            throw new Error('Invalid JSON format');
        }

        displayMembers(members);
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('membersDirectory').innerHTML = `<p>Sorry, we couldn't load the member data. Please try again later.</p>`;
    }
}

function displayMembers(members) {
    const membersDirectory = document.getElementById("membersDirectory");
    membersDirectory.innerHTML = ''; // Clear any existing content

    members.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.classList.add('member-card');

        memberCard.innerHTML = `
            <img src="images/${member.image}" alt="${member.name}">
            <h3>${member.name}</h3>
            <p><strong>Business:</strong> ${member.name}</p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><strong>Phone:</strong> ${member.phone}</p>
            <p><strong>Website:</strong> <a href="${member.website}" target="_blank">${member.website}</a></p>
            <p><strong>Email:</strong> <a href="mailto:${member.email}">${member.email}</a></p>
            <p><strong>Membership Level:</strong> ${member.membership_level}</p>
            <p>${member.description}</p>
        `;

        membersDirectory.appendChild(memberCard);
    });
}
