document.addEventListener("DOMContentLoaded", () => {
    // Display the current date in a specific format
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            weekday: 'long', // "Monday"
            year: 'numeric', // "2025"
            month: 'long', // "April"
            day: 'numeric' // "2"
        });
        dateElement.textContent = formattedDate; // Insert the formatted date into the element
    }
});
