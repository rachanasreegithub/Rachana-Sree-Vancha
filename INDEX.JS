/**
 * Rachana Sree Vancha - Portfolio Interactive Scripts
 * DBA & Cyber Steel Blue Theme Functionality
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Initialize AOS (Animate On Scroll) Library
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        });
    }

    // 2. Dynamic Typing Effect for Hero Subtitle
    const typingElement = document.getElementById('typing-text');
    const roles = [
        "Data Analyst Specialist",
        "SQL Query Optimization",
        "Power BI Dashboard Developer",
        "Python Data Cleaning Engineer"
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 50;
    const delayBetweenRoles = 2000;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
        }

        let currentSpeed = isDeleting ? deletingSpeed : typingSpeed;

        if (!isDeleting && charIndex === currentRole.length) {
            currentSpeed = delayBetweenRoles;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            currentSpeed = 500;
        }

        setTimeout(typeEffect, currentSpeed);
    }

    if (typingElement) {
        typeEffect();
    }

    // 3. Mobile Hamburger Navigation Menu Toggle
    const hamburger = document.getElementById('hamburger-menu');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        document.querySelectorAll('.nav-item').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 4. Smooth Scrolling & Active Link Highlighting
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSection}`) {
                item.classList.add('active');
            }
        });
    });

    // 5. Testimonial Carousel Mechanics
    const track = document.getElementById('testimonialTrack');
    const prevBtn = document.getElementById('prevTestimonial');
    const nextBtn = document.getElementById('nextTestimonial');
    const dots = document.querySelectorAll('.carousel-indicators .dot');
    
    let currentSlide = 0;
    const totalSlides = dots.length;

    function updateCarousel(slideIndex) {
        if (!track) return;
        currentSlide = slideIndex;
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        dots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === currentSlide);
        });
    }

    if (nextBtn && prevBtn) {
        nextBtn.addEventListener('click', () => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            updateCarousel(nextIndex);
        });

        prevBtn.addEventListener('click', () => {
            const prevIndex = (currentSlide - 1 + totalSlides) % totalSlides;
            updateCarousel(prevIndex);
        });

        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                updateCarousel(index);
            });
        });

        // Auto slide carousel every 6 seconds
        setInterval(() => {
            const nextIndex = (currentSlide + 1) % totalSlides;
            updateCarousel(nextIndex);
        }, 6000);
    }

    // 6. Dynamic Copyright Year
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});

// 7. Contact Form Simulation
function handleFormSubmit(event) {
    event.preventDefault();
    const statusDiv = document.getElementById('formStatus');
    
    statusDiv.style.color = 'var(--accent-green)';
    statusDiv.textContent = '>> TRANSMISSION_SUCCESSFUL: Packet received.';

    setTimeout(() => {
        event.target.reset();
        statusDiv.textContent = '';
    }, 4000);
}