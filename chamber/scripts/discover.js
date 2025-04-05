const container = document.getElementById("cards-container");

fetch("data/discover.json")
  .then(res => res.json())
  .then(data => {
    data.forEach(place => {
      const card = document.createElement("div");
      card.className = "card";

      card.innerHTML = `
        <h2>${place.name}</h2>
        <figure>
          <img src="${place.image}" alt="${place.name}" loading="lazy" />
        </figure>
        <address>${place.address}</address>
        <p>${place.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  });
// Last visit tracking
const msg = document.getElementById("visitMessage");
const lastVisit = localStorage.getItem("lastVisit");
const now = Date.now();

if (!lastVisit) {
  msg.textContent = "Welcome! Let us know if you have any questions.";
} else {
  const days = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
  msg.textContent = days < 1
    ? "Back so soon! Awesome!"
    : `You last visited ${days} day(s) ago.`;
}

// Store the current time for the next visit
localStorage.setItem("lastVisit", now);

// Dynamic Card Injection for Puerto Rico's Local Discoveries
fetch('data/discovery.json')
  .then(response => response.json())
  .then(data => {
    const cardsContainer = document.getElementById('cards-container');
    data.forEach(item => {
      const card = document.createElement('article');
      card.classList.add('card');

      card.innerHTML = `
        <h3>${item.name}</h3>
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
        <p><strong>Address:</strong> ${item.address}</p>
        <p>${item.description}</p>
        <a href="https://maps.app.goo.gl" target="_blank">Learn More</a>
      `;

      cardsContainer.appendChild(card);
    });
  })
  .catch(error => console.error('Error fetching JSON data:', error));
