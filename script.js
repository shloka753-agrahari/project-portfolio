
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle
    ? themeToggle.querySelector("i")
    : null;

const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "dark") {
    document.body.classList.add("dark-theme");

    if (themeIcon) {
        themeIcon.classList.replace("fa-moon", "fa-sun");
    }
}

if (themeToggle) {
    themeToggle.addEventListener("click", function () {

        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {

            localStorage.setItem("portfolio-theme", "dark");

            if (themeIcon) {
                themeIcon.classList.replace("fa-moon", "fa-sun");
            }

        } else {

            localStorage.setItem("portfolio-theme", "light");

            if (themeIcon) {
                themeIcon.classList.replace("fa-sun", "fa-moon");
            }
        }
    });
}

const menuToggle = document.getElementById("menu-toggle");
const navbar = document.getElementById("navbar");

if (menuToggle && navbar) {

    menuToggle.addEventListener("click", function () {

        navbar.classList.toggle("show");

        const menuIcon = menuToggle.querySelector("i");

        if (navbar.classList.contains("show")) {

            menuToggle.setAttribute("aria-expanded", "true");

            if (menuIcon) {
                menuIcon.classList.replace("fa-bars", "fa-xmark");
            }

        } else {

            menuToggle.setAttribute("aria-expanded", "false");

            if (menuIcon) {
                menuIcon.classList.replace("fa-xmark", "fa-bars");
            }
        }
    });

    document.querySelectorAll(".nav-link").forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("show");

            menuToggle.setAttribute("aria-expanded", "false");

            const menuIcon = menuToggle.querySelector("i");

            if (menuIcon) {
                menuIcon.classList.replace("fa-xmark", "fa-bars");
            }
        });
    });
}

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

const observerOptions = {
    root: null,
    threshold: 0.3
};

const sectionObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            navLinks.forEach(function (link) {

                link.classList.remove("active");

                if (link.getAttribute("href") === "#" + entry.target.id) {
                    link.classList.add("active");
                }

            });

        }

    });

}, observerOptions);

sections.forEach(function (section) {
    sectionObserver.observe(section);
});

const progressBars = document.querySelectorAll(".progress-bar");

const skillObserver = new IntersectionObserver(function (entries) {

    entries.forEach(function (entry) {

        if (entry.isIntersecting) {

            const bar = entry.target;
            const width = bar.getAttribute("data-width");

            bar.style.width = width;

            skillObserver.unobserve(bar);
        }

    });

}, {
    threshold: 0.5
});

progressBars.forEach(function (bar) {
    skillObserver.observe(bar);
});

const contactForm = document.getElementById("contact-form");

if (contactForm) {

    const nameInput = document.getElementById("name");
    const emailInput = document.getElementById("email");
    const messageInput = document.getElementById("message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");

    const formStatus = document.getElementById("form-status");

    contactForm.addEventListener("submit", function (event) {

        event.preventDefault();

        nameError.textContent = "";
        emailError.textContent = "";
        messageError.textContent = "";
        formStatus.textContent = "";

        let isValid = true;

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const message = messageInput.value.trim();

       
        if (name.length < 3) {
            nameError.textContent = "Name must contain at least 3 characters.";
            isValid = false;
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailPattern.test(email)) {
            emailError.textContent = "Please enter a valid email address.";
            isValid = false;
        }

        if (message.length < 10) {
            messageError.textContent = "Message must contain at least 10 characters.";
            isValid = false;
        }

        if (isValid) {

            formStatus.textContent = "Thank you! Your message is ready.";

            contactForm.reset();
        }

    });

    [nameInput, emailInput, messageInput].forEach(function (input) {

        input.addEventListener("input", function () {

            const error = document.getElementById(input.id + "-error");

            if (error) {
                error.textContent = "";
            }

            formStatus.textContent = "";
        });

    });
}

const typingText = document.querySelector(".typing-text");

if (typingText) {

    const words = [
        "Computer Science Student",
        "Aspiring Web Developer",
        "AI & ML Enthusiast",
        "Cybersecurity Enthusiast"
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function typeEffect() {

        const currentWord = words[wordIndex];

        if (deleting) {

            typingText.textContent =
                currentWord.substring(0, charIndex - 1);

            charIndex--;

        } else {

            typingText.textContent =
                currentWord.substring(0, charIndex + 1);

            charIndex++;
        }

        let speed = deleting ? 50 : 100;

        if (!deleting && charIndex === currentWord.length) {

            deleting = true;
            speed = 1200;

        } else if (deleting && charIndex === 0) {

            deleting = false;

            wordIndex = (wordIndex + 1) % words.length;

            speed = 400;
        }

        setTimeout(typeEffect, speed);
    }

    typeEffect();
}
