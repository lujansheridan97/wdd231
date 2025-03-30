// Dynamic Course List
const courses = [
    { name: "WDD 130 - HTML & CSS", credits: 3, completed: true, category: "WDD" },
    { name: "WDD 131 - JavaScript Basics", credits: 4, completed: false, category: "WDD" },
    { name: "CSE 121b - Web Accessibility", credits: 2, completed: false, category: "CSE" },
    { name: "WDD 231 - Front-End Frameworks", credits: 3, completed: true, category: "WDD" },
    { name: "CSE 110 - Programming Basics", credits: 3, completed: false, category: "CSE" }
];

function displayCourses(filter = "all") {
    const courseContainer = document.getElementById("courseList");
    courseContainer.innerHTML = "";

    const filteredCourses = filter === "all" ? courses : courses.filter(course => course.category === filter);

    filteredCourses.forEach(course => {
        const courseElement = document.createElement("div");
        courseElement.classList.add("course");
        if (course.completed) {
            courseElement.classList.add("completed");
            courseElement.innerHTML = `<strong>${course.name}</strong> - ${course.credits} Credits ✅`;
        } else {
            courseElement.innerHTML = `<strong>${course.name}</strong> - ${course.credits} Credits ❌`;
        }
        courseContainer.appendChild(courseElement);
    });

    calculateTotalCredits(filteredCourses);
}

document.getElementById("allCourses").addEventListener("click", () => displayCourses("all"));
document.getElementById("wddCourses").addEventListener("click", () => displayCourses("WDD"));
document.getElementById("cseCourses").addEventListener("click", () => displayCourses("CSE"));

document.addEventListener("DOMContentLoaded", () => displayCourses("all"));

// Calculate Total Credits
function calculateTotalCredits(filteredCourses) {
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    document.getElementById("totalCredits").textContent = `Total Credits: ${totalCredits}`;
}

// Update Footer
function updateFooter() {
    document.getElementById("currentyear").textContent = new Date().getFullYear();
    document.getElementById("lastModified").textContent = `Last Modified: ${document.lastModified}`;
}

document.addEventListener("DOMContentLoaded", updateFooter);
