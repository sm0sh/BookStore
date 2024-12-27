// script.js

console.log("DOM fully loaded and parsed."); // Log when DOM is loaded
// Form Validation
document.addEventListener("DOMContentLoaded", function() {
    const loginForm = document.querySelector(".login-form");
    const registerForm = document.querySelector(".register-form");
    const contactForm = document.querySelector(".contact-form");

    // Login Form Validation
    if (loginForm) {
        loginForm.addEventListener("submit", function(event) {
            const username = loginForm.querySelector("input[type='text']").value;
            const password = loginForm.querySelector("input[type='password']").value;
            if (!username || !password) {
                event.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }

    // Registration Form Validation
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            const password = registerForm.querySelector("input[type='password']").value;
            
            const confirmPassword = registerForm.querySelector("input[type='password'][placeholder='confirm password']").value;
            if (password !== confirmPassword) {
                event.preventDefault();
                alert("Passwords do not match.");
            }
        });
    }

    // Contact Form Validation
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            const name = contactForm.querySelector("input[name='firstname']").value;
            const suggestion = contactForm.querySelector("textarea[name='subject']").value;
            if (!name || !suggestion) {
                event.preventDefault();
                alert("Please fill in all fields.");
            }
        });
    }

    // Shopping Cart Functionality
    const cart = [];
    const cartCounter = document.querySelector(".cart-counter");

    document.querySelectorAll(".gallery .image-holder button").forEach(button => {
        button.addEventListener("click", function() {
            const bookTitle = this.parentElement.parentElement.querySelector("img").alt;
            cart.push(bookTitle);
            cartCounter.textContent = cart.length;
            alert(`${bookTitle} has been added to your cart.`);
        });
    });

    // Smooth Scrolling for Navigation
    const navLinks = document.querySelectorAll(".navbar a");
    navLinks.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            const targetId = this.getAttribute("href");
            document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
        });
    });
});