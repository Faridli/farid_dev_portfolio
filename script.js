
const menuToggle = document.getElementById("menu-toggle");
const menuIcon = document.getElementById("menu-icon");
const navLinks = document.querySelector(".nav-links");

// Menu Open and Close
menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

    if (navLinks.classList.contains("active")) {
        menuIcon.textContent = "✕";
    } else {
        menuIcon.textContent = "☰";
    }

});

// Close menu after clicking a link
const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");
        menuIcon.textContent = "☰";

    });

});






// Dark Mode and Light Mode


// Dark Mode and Light Mode with localStorage

const themeToggle = document.getElementById("theme-toggle");

// আগের Theme পছন্দ পরীক্ষা করা
const savedTheme = localStorage.getItem("theme");

// পেজ লোড হলে Theme সেট করা
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
} else {
    themeToggle.textContent = "🌙";
}

// Theme পরিবর্তন করা
themeToggle.addEventListener("click", function () {

    document.body.classList.toggle("light-mode");

    if (document.body.classList.contains("light-mode")) {

        themeToggle.textContent = "☀️";

        localStorage.setItem("theme", "light");

    } else {

        themeToggle.textContent = "🌙";

        localStorage.setItem("theme", "dark");

    }

});






// Scroll Animation

const revealElements = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .contact-content"
);

const observer = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.15
});

revealElements.forEach(function (element) {

    element.classList.add("reveal");

    observer.observe(element);

});



