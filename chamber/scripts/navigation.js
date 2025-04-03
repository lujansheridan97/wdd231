document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById('menuButton');
    const navMenu = document.getElementById('navMenu');
    
    // Toggle the navigation menu visibility when the menu button is clicked
    menuButton.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
});
