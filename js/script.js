// DOM Elements
const darkModeIcon = document.querySelector('#darkMode-icon');
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');
const header = document.querySelector('.header');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');
const form = document.querySelector('#contact-form');
const backToTop = document.querySelector('.back-to-top');

// Toggle Dark Mode
darkModeIcon.addEventListener('click', () => {
    darkModeIcon.classList.toggle('bx-sun');
    document.body.classList.toggle('dark-mode');
    
    // Save user preference
    const isDarkMode = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode ? 'enabled' : 'disabled');
});

// Check dark mode preference on page load
document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        darkModeIcon.classList.add('bx-sun');
    }
});

// Toggle Mobile Menu
menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
});

// Close mobile menu when clicking nav links
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Sticky Header
window.addEventListener('scroll', () => {
    header.classList.toggle('sticky', window.scrollY > 100);
    
    // Active navigation links based on scroll position
    sections.forEach(sec => {
        const top = window.scrollY;
        const offset = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                const activeLink = document.querySelector(`header nav a[href*=${id}]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            });
        }
    });
    
    // Show/hide back to top button
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }
});

// Close mobile menu when scrolling
window.addEventListener('scroll', () => {
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');
});

// Scroll Reveal Animation
const scrollReveal = ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true
});

scrollReveal.reveal('.home-content, .heading', { origin: 'top' });
scrollReveal.reveal('.home-img, .services-container, .project-box, .testimonial-wrapper, .contact form', { origin: 'bottom' });
scrollReveal.reveal('.home-content h1, .about-img', { origin: 'left' });
scrollReveal.reveal('.home-content p, .about-content', { origin: 'right' });

// Swiper Initialization
const swiper = new Swiper('.testimonial-box', {
    cssMode: true,
    loop: true,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    mousewheel: true,
    keyboard: true,
});

// Form Validation and Submission
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const name = form.querySelector('input[type="text"]')?.value.trim();
        const email = form.querySelector('input[type="email"]')?.value.trim();
        const message = form.querySelector('textarea')?.value.trim();
        
        // Basic validation
        if (!name || !email || !message) {
            alert('Mohon isi semua field yang diperlukan!');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Mohon masukkan email yang valid!');
            return;
        }
        
        // Simulate form submission
        const submitBtn = form.querySelector('.btn');
        const originalText = submitBtn.value || submitBtn.textContent;
        
        submitBtn.textContent = 'Mengirim...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            alert(`Terima kasih ${name}! Pesan Anda telah dikirim. Saya akan segera merespon.`);
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Image Lazy Loading
const lazyImages = document.querySelectorAll('img[data-src]');

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Performance Optimization - Remove loading class when page is fully loaded
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Hide preloader after a short delay
    setTimeout(() => {
        document.querySelector('.preloader').classList.add('fade-out');
    }, 1000);
});

// Prevent form submission on Enter key in input fields
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        e.preventDefault();
    }
});

// Add animation classes to elements when they come into view
const animateElements = document.querySelectorAll('.services-box, .project-box, .testimonial-slide');

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, { threshold: 0.1 });

animateElements.forEach(element => {
    animationObserver.observe(element);
});

// Handle window resize for responsive adjustments
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        // Reinitialize swiper on resize if needed
        if (swiper) {
            swiper.update();
        }
    }, 250);
});

// Accessibility improvements
document.addEventListener('keydown', (e) => {
    // Close mobile menu with Escape key
    if (e.key === 'Escape' && navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    }
});

// Add focus styles for keyboard navigation
document.addEventListener('DOMContentLoaded', () => {
    const focusableElements = document.querySelectorAll('a, button, input, textarea');
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', () => {
            element.style.outline = '2px solid var(--main-color)';
            element.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', () => {
            element.style.outline = '';
        });
    });
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = performance.getEntriesByType('navigation')[0];
        console.log(`Page loaded in ${perfData.loadEventEnd - perfData.loadEventStart}ms`);
    });
}

// Typed.js for hero section
if (typeof Typed !== 'undefined') {
    new Typed('.multiple-text', {
        strings: ['Berlian Aldy Wiranatha', 'Web Developer', 'Designer', 'Programmer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

// Skills progress bar animation
const progressBars = document.querySelectorAll('.progress');
const skillSection = document.querySelector('.skills-container');

if (skillSection) {
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressBars.forEach(bar => {
                    const width = bar.dataset.width;
                    bar.style.width = width;
                });
            }
        });
    }, { threshold: 0.5 });

    skillObserver.observe(skillSection);
}

// Counter animation for stats
const counters = document.querySelectorAll('.counter');
const statsSection = document.querySelector('.stats-section');

if (statsSection) {
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.target);
                    const duration = 2000;
                    const increment = target / (duration / 16);
                    let current = 0;
                    
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            setTimeout(updateCounter, 16);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                });
            }
        });
    }, { threshold: 0.5 });

    counterObserver.observe(statsSection);
}

// Back to top button functionality
if (backToTop) {
    backToTop.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add loading animation to project boxes
const projectBoxes = document.querySelectorAll('.project-box');
projectBoxes.forEach((box, index) => {
    box.style.animationDelay = `${index * 0.1}s`;
});
