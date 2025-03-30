// Toggle navigation menu
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("open");
}

document.getElementById("menuButton").addEventListener("click", toggleMenu);


// Toggle navigation menu
function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("open");
}

document.getElementById("menuButton").addEventListener("click", toggleMenu);


document.addEventListener("DOMContentLoaded", function() {
    const links = document.querySelectorAll("#navMenu a");
    const currentUrl = window.location.pathname;

    links.forEach(link => {
        if (link.href.includes(currentUrl)) {
            link.classList.add("active");
        }
    });
});
