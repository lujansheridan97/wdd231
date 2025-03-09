document.addEventListener("DOMContentLoaded", function() {
    // Output the copyright year in the footer's first paragraph
    let currentYear = new Date().getFullYear();
    document.querySelector("footer p:first-of-type").textContent = `© ${currentYear} Your Company Name`;

    // Output the last modified date in the second paragraph
    let lastModifiedDate = document.lastModified;
    document.querySelector("footer p:nth-of-type(2)").textContent = `Last modified: ${lastModifiedDate}`;
});
