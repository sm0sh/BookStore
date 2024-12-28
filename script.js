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

    // Registration Form Submission
    if (registerForm) {
        registerForm.addEventListener("submit", function(event) {
            const username = registerForm.querySelector("input[type='text']").value;
            const password = registerForm.querySelector("input[type='password']").value;
            const confirmPassword = registerForm.querySelector("input[type='password'][placeholder='confirm password']").value;
            if (password !== confirmPassword) {
                event.preventDefault();
                alert("Passwords do not match.");
            } else {
                event.preventDefault(); // Prevent default form submission
                console.log('Sending registration data:', { username, password }); // Debugging log
                fetch('/api/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                })
                .then(response => {
                    console.log('Response from server:', response); // Debugging log
                    return response.json();
                })
                .then(data => {
                    if (data.message) {
                        alert(data.message);
                        if (data.user) {
                            // Optionally redirect to login or home page
                            window.location.href = 'login.html';
                        }
                    }
                })
                .catch(error => {
                    console.error('Error:', error);
                    alert('An error occurred during registration.');
                });
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
            const targetId = this.getAttribute("href");
            if (targetId.startsWith("#")) {
                event.preventDefault();
                document.querySelector(targetId).scrollIntoView({ behavior: "smooth" });
            }
        });
    });
});
