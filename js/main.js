document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 300,  // Increased number of particles for a denser effect
                    density: {
                        enable: true,
                        value_area: 1500  // Adjusted to spread particles more evenly over the screen
                    }
                },
                color: {
                    value: '#00ff00'  // Bright green color for particles
                },
                shape: {
                    type: 'circle',
                    stroke: {
                        width: 0,
                        color: '#000000'
                    }
                },
                opacity: {
                    value: 0.7,  // Increased opacity for clearer visibility
                    random: true,
                    anim: {
                        enable: true,
                        speed: 1.5,  // Smooth animation for opacity changes
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 4,  // Slightly larger particles for a more visible effect
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 1,  // Ensure particles aren't too small
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#00ff00',  // Maintain the same bright green color for the lines
                    opacity: 0.5,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 4,  // Faster movement for a dynamic feel
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'window',  // Detect interactions based on window size
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'  // Particles move towards the mouse (grab mode)
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true,
                    onmousemove: {
                        enable: true,  // Enable mousemove event
                        distance: 120  // Set a comfortable distance for particle movement with the mouse
                    }
                },
                modes: {
                    grab: {
                        distance: 120,  // The closer the mouse is, the stronger the attraction
                        line_linked: {
                            opacity: 1
                        }
                    },
                    bubble: {
                        distance: 400,
                        size: 40,
                        duration: 2,
                        opacity: 8,
                        speed: 3
                    },
                    attract: {
                        distance: 120,  // Adjust distance for attraction to mouse cursor
                        duration: 0.4
                    },
                    push: {
                        particles_nb: 4
                    },
                    remove: {
                        particles_nb: 2
                    }
                }
            },
            retina_detect: true
        });
    }

    // The rest of your existing code...
    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll indicators
    const sections = ['home', 'about', 'services', 'work', 'testimonials', 'contact'];
    const scrollIndicators = document.querySelectorAll('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 150 && rect.bottom >= 150) {
                    current = section;
                }
            }
        });
        
        scrollIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (sections[index] === current || 
                (current === '' && index === 0 && window.scrollY < 100)) {
                indicator.classList.add('active');
            }
        });
    });

    // Add click events to scroll indicators
    scrollIndicators.forEach((indicator, index) => {
        indicator.addEventListener('click', function() {
            const section = document.getElementById(sections[index]);
            if (section) {
                window.scrollTo({
                    top: section.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Contact form handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const projectInput = document.getElementById('project');
            const messageInput = document.getElementById('message');
            
            // Basic form validation
            let isValid = true;
            
            if (!nameInput.value.trim()) {
                highlightInvalidField(nameInput);
                isValid = false;
            } else {
                resetField(nameInput);
            }
            
            if (!emailInput.value.trim() || !isValidEmail(emailInput.value)) {
                highlightInvalidField(emailInput);
                isValid = false;
            } else {
                resetField(emailInput);
            }
            
            if (isValid) {
                // Here you would typically send the form data to your server
                // For demonstration, we'll just show a success message
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
    }

    // Helper function for form validation
    function highlightInvalidField(field) {
        field.style.border = '1px solid #ff3860';
    }

    function resetField(field) {
        field.style.border = '1px solid #00ff00';  // Changed to green
    }

    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email.toLowerCase());
    }

    // Add animations for elements when they come into view
    const animateOnScroll = function() {
        const animatedElements = document.querySelectorAll('.service-card, .work-card, .about-image');
        
        animatedElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
            
            if (elementPosition < viewportHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Set initial styles for animated elements
    document.querySelectorAll('.service-card, .work-card, .about-image').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    // Run once on page load
    animateOnScroll();
});
