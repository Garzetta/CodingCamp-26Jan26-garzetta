// JavaScript to display a welcome message to the user
welcomeMessage();

// Function to display a welcome message to the user
function welcomeMessage() {
    // Prompt the user for their name
    let userResponse = prompt("Welcome! What is your name?");

    // Handle case where user cancels or enters an empty name
    if (userResponse === null || userResponse.trim() === "") {
        userResponse = "Guest";
    }

    // Display the welcome message
    document.getElementById("welcome-speech").innerText = `Hello ${userResponse}, Welcome to Our Website`;
}

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
});

// Form Validation and Submission
const contactForm = document.getElementById('contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous error messages
        clearErrors();
        
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();
        
        // Validation flags
        let isValid = true;
        
        // Validate Name
        if (name === '') {
            showError('name-error', 'Name is required');
            isValid = false;
        } else if (name.length < 3) {
            showError('name-error', 'Name must be at least 3 characters');
            isValid = false;
        } else if (!/^[a-zA-Z\s]+$/.test(name)) {
            showError('name-error', 'Name can only contain letters and spaces');
            isValid = false;
        }
        
        // Validate Email
        if (email === '') {
            showError('email-error', 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email-error', 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate Phone
        if (phone === '') {
            showError('phone-error', 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone)) {
            showError('phone-error', 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate Message
        if (message === '') {
            showError('message-error', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message-error', 'Message must be at least 10 characters');
            isValid = false;
        }
        
        // If form is valid, display the results
        if (isValid) {
            displayResults(name, email, phone, message);
            
            // Optional: Clear form after successful submission
            contactForm.reset();
        }
    });
}

// Function to show error messages
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    const inputElement = errorElement.previousElementSibling;
    
    errorElement.textContent = message;
    inputElement.classList.add('error');
}

// Function to clear all error messages
function clearErrors() {
    const errorMessages = document.querySelectorAll('.error-message');
    const inputs = document.querySelectorAll('.form-input');
    
    errorMessages.forEach(error => {
        error.textContent = '';
    });
    
    inputs.forEach(input => {
        input.classList.remove('error');
    });
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to validate phone number
function isValidPhone(phone) {
    // Accepts formats: +62812345678, 0812345678, 812345678, with or without spaces/dashes
    const phoneRegex = /^(\+62|62|0)?[\s-]?8[1-9]{1}[0-9]{1}[\s-]?[0-9]{3,4}[\s-]?[0-9]{3,4}$/;
    return phoneRegex.test(phone);
}

// Function to display form results
function displayResults(name, email, phone, message) {
    const resultContent = document.getElementById('result-content');
    const resultInfo = document.querySelector('.result-info');
    
    // Get current date and time
    const currentDate = new Date();
    const dateOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short'
    };
    const formattedDate = currentDate.toLocaleString('en-US', dateOptions);
    
    // Create the result HTML
    const resultHTML = `
        <div class="result-item">
            <div class="result-label">Current time</div>
            <div class="result-value">${formattedDate}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Name</div>
            <div class="result-value">${escapeHtml(name)}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Email</div>
            <div class="result-value">${escapeHtml(email)}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Phone Number</div>
            <div class="result-value">${escapeHtml(phone)}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Message</div>
            <div class="result-value">${escapeHtml(message)}</div>
        </div>
    `;
    
    // Display the results
    resultContent.innerHTML = resultHTML;
    resultContent.classList.add('show');
    
    // Hide the info text
    if (resultInfo) {
        resultInfo.style.display = 'none';
    }
    
    // Scroll to results on mobile
    if (window.innerWidth <= 768) {
        setTimeout(() => {
            document.getElementById('result-box').scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }, 100);
    }
}

// Function to escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Add smooth scrolling for all anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 100;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Add animation on scroll (optional enhancement)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe portfolio cards and other elements for fade-in animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.portfolio-card, .vision-card, .mission-card, .hq-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});
