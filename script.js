/**
 * FARID ALI - PORTFOLIO JAVASCRIPT
 * Handles typing animation, theme toggling, mobile menu, scrollspy, and contact form
 */

document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------------------------------------------------
    // 1. DYNAMIC ROLES TYPING EFFECT
    // ------------------------------------------------------------------------
    const roleTextElement = document.getElementById("role-text");
    const roles = [
        "Python & Django Developer",
        "Backend Web Enthusiast",
        "Problem Solver",
        "Creative Web Developer"
    ];

    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const pauseDelay = 1800;

    function typeRole() {
        if (!roleTextElement) return;

        const currentRole = roles[roleIndex];

        if (isDeleting) {
            roleTextElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            roleTextElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = pauseDelay;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 400;
        }

        setTimeout(typeRole, currentSpeed);
    }

    typeRole();

    // ------------------------------------------------------------------------
    // 2. MOBILE NAVIGATION MENU
    // ------------------------------------------------------------------------
    const menuToggle = document.getElementById("menu-toggle");
    const menuIcon = document.getElementById("menu-icon");
    const navLinks = document.getElementById("nav-links");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const isOpen = navLinks.classList.contains("active");

            if (menuIcon) {
                if (isOpen) {
                    menuIcon.classList.remove("fa-bars");
                    menuIcon.classList.add("fa-xmark");
                } else {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }
            }
        });

        // Close menu when a navigation item is clicked
        const navItems = document.querySelectorAll(".nav-link");
        navItems.forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                if (menuIcon) {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (!menuToggle.contains(event.target) && !navLinks.contains(event.target)) {
                navLinks.classList.remove("active");
                if (menuIcon) {
                    menuIcon.classList.remove("fa-xmark");
                    menuIcon.classList.add("fa-bars");
                }
            }
        });
    }

    // ------------------------------------------------------------------------
    // 3. DARK / LIGHT THEME TOGGLE
    // ------------------------------------------------------------------------
    const themeToggle = document.getElementById("theme-toggle");

    // Check system preference or saved preference
    const savedTheme = localStorage.getItem("farid_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
        document.body.classList.add("light-mode");
        updateThemeIcon(true);
    } else {
        document.body.classList.remove("light-mode");
        updateThemeIcon(false);
    }

    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            document.body.classList.toggle("light-mode");
            const isLight = document.body.classList.contains("light-mode");
            localStorage.setItem("farid_theme", isLight ? "light" : "dark");
            updateThemeIcon(isLight);
        });
    }

    function updateThemeIcon(isLight) {
        if (!themeToggle) return;
        const icon = themeToggle.querySelector("i");
        if (icon) {
            if (isLight) {
                icon.className = "fa-solid fa-sun";
            } else {
                icon.className = "fa-solid fa-moon";
            }
        }
    }

    // ------------------------------------------------------------------------
    // 4. NAVBAR SCROLL SPY & HEADER SHADOW
    // ------------------------------------------------------------------------
    const header = document.getElementById("header");
    const sections = document.querySelectorAll("section[id]");
    const navAnchors = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        // Header shadow on scroll
        if (header) {
            if (scrollY > 50) {
                header.style.boxShadow = "var(--shadow-md)";
                header.style.padding = "2px 0";
            } else {
                header.style.boxShadow = "none";
                header.style.padding = "0";
            }
        }

        // Active link scrollspy
        sections.forEach((current) => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 140;
            const sectionId = current.getAttribute("id");

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navAnchors.forEach((link) => {
                    link.classList.remove("active");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });

        // Back to top button visibility
        const backToTopBtn = document.getElementById("back-to-top");
        if (backToTopBtn) {
            if (scrollY > 400) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        }
    });

    // ------------------------------------------------------------------------
    // 5. BACK TO TOP BUTTON ACTION
    // ------------------------------------------------------------------------
    const backToTopBtn = document.getElementById("back-to-top");
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ------------------------------------------------------------------------
    // 6. SCROLL REVEAL ANIMATIONS (INTERSECTION OBSERVER)
    // ------------------------------------------------------------------------
    const animatedElements = document.querySelectorAll(
        ".section-header, .hero-content, .hero-visual, .metric-item, " +
        ".info-card, .story-box, .skill-category, .project-card, " +
        ".timeline-item, .contact-card, .contact-form-panel"
    );

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.12,
            rootMargin: "0px 0px -40px 0px"
        }
    );

    animatedElements.forEach((el) => {
        el.classList.add("reveal");
        revealObserver.observe(el);
    });

    // ------------------------------------------------------------------------
    // 7. CONTACT FORM INTERACTION
    // ------------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const formFeedback = document.getElementById("form-feedback");
    const submitBtn = document.getElementById("submit-btn");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const subject = document.getElementById("subject").value.trim();
            const message = document.getElementById("message").value.trim();

            if (!name || !email || !message) {
                showFeedback("Please fill out all required fields.", "error");
                return;
            }

            // Button loading state
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
            }

            // Simulate sending message
            setTimeout(() => {
                // Success feedback
                showFeedback(
                    "Thank you, " + name + "! Your message has been sent successfully. I will get back to you soon.",
                    "success"
                );

                contactForm.reset();

                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = `<span>Send Message</span> <i class="fa-solid fa-paper-plane"></i>`;
                }

                // Hide feedback after 6 seconds
                setTimeout(() => {
                    if (formFeedback) {
                        formFeedback.className = "form-feedback";
                        formFeedback.style.display = "none";
                    }
                }, 6000);
            }, 1200);
        });
    }

    function showFeedback(text, type) {
        if (!formFeedback) return;
        formFeedback.textContent = text;
        formFeedback.className = `form-feedback ${type}`;
        formFeedback.style.display = "block";
    }

    // ------------------------------------------------------------------------
    // 8. DYNAMIC COPYRIGHT YEAR
    // ------------------------------------------------------------------------
    const currentYearSpan = document.getElementById("current-year");
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
});
