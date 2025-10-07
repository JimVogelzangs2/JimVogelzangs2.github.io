// DOM Elements
const navbar = document.querySelector('.navbar');
const navMenu = document.querySelector('.nav-menu');
const hamburger = document.querySelector('.hamburger');
const sections = document.querySelectorAll('.section');
const skillFills = document.querySelectorAll('.skill-fill');
const contactForm = document.querySelector('.contact-form');

// Navigation Toggle for Mobile
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 70;
            const elementPosition = target.offsetTop;
            const offsetPosition = elementPosition - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar Background Change on Scroll
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
});

// Active Navigation Link on Scroll
const navLinks = document.querySelectorAll('.nav-menu a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Intersection Observer for Section Animations
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Skill Bars Animation
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            skillFills.forEach((fill, index) => {
                setTimeout(() => {
                    fill.style.width = fill.style.width || '0%';
                }, index * 200);
            });
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}

// Screensaver-Style Background Effect
class ScreensaverBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.shapes = [];
        this.mouse = { x: null, y: null, radius: 200 };
        this.time = 0;

        this.init();
        this.createShapes();
        this.animate();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '-2';

        document.body.appendChild(this.canvas);

        this.resize();
        window.addEventListener('resize', () => this.resize());

        // Mouse movement
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createShapes() {
        this.shapes = [];

        // Create floating geometric shapes
        for (let i = 0; i < 15; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                rotation: 0,
                rotationSpeed: (Math.random() - 0.5) * 0.02,
                size: Math.random() * 60 + 20,
                type: Math.floor(Math.random() * 4), // 0: circle, 1: triangle, 2: square, 3: hexagon
                opacity: Math.random() * 0.3 + 0.1,
                pulse: Math.random() * Math.PI * 2,
                pulseSpeed: Math.random() * 0.02 + 0.01
            });
        }

        // Create floating particles
        for (let i = 0; i < 30; i++) {
            this.shapes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                size: Math.random() * 3 + 1,
                type: 4, // particle
                opacity: Math.random() * 0.6 + 0.2,
                trail: [],
                maxTrail: 10
            });
        }
    }

    animate() {
        this.time += 0.016; // ~60fps

        // Draw background gradient
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const gradient = this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);

        if (currentTheme === 'dark') {
            gradient.addColorStop(0, '#000000');
            gradient.addColorStop(1, '#1a1a1a');
        } else {
            gradient.addColorStop(0, '#f8f9fa');
            gradient.addColorStop(1, '#e9ecef');
        }

        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.shapes.forEach(shape => {
            // Update position
            shape.x += shape.vx;
            shape.y += shape.vy;
            shape.rotation += shape.rotationSpeed;

            // Wrap around edges
            if (shape.x < -shape.size) shape.x = this.canvas.width + shape.size;
            if (shape.x > this.canvas.width + shape.size) shape.x = -shape.size;
            if (shape.y < -shape.size) shape.y = this.canvas.height + shape.size;
            if (shape.y > this.canvas.height + shape.size) shape.y = -shape.size;

            // Mouse interaction
            if (this.mouse.x && this.mouse.y) {
                const dx = this.mouse.x - shape.x;
                const dy = this.mouse.y - shape.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.mouse.radius) {
                    const force = (this.mouse.radius - distance) / this.mouse.radius;
                    shape.x -= dx * force * 0.02;
                    shape.y -= dy * force * 0.02;
                }
            }

            // Update pulse
            if (shape.pulse !== undefined) {
                shape.pulse += shape.pulseSpeed;
            }

            // Update particle trail
            if (shape.type === 4) {
                shape.trail.push({ x: shape.x, y: shape.y });
                if (shape.trail.length > shape.maxTrail) {
                    shape.trail.shift();
                }
            }

            // Draw shape
            this.drawShape(shape, currentTheme);
        });

        // Draw connections between nearby shapes
        this.drawConnections(currentTheme);

        requestAnimationFrame(() => this.animate());
    }

    drawShape(shape, theme) {
        this.ctx.save();
        this.ctx.translate(shape.x, shape.y);
        this.ctx.rotate(shape.rotation);

        let scale = 1;
        if (shape.pulse !== undefined) {
            scale = 1 + Math.sin(shape.pulse) * 0.2;
        }
        this.ctx.scale(scale, scale);

        // Theme-based colors
        let colors;
        if (theme === 'dark') {
            colors = {
                primary: `rgba(255, 0, 0, ${shape.opacity})`,        // Bright red
                secondary: `rgba(255, 255, 255, ${shape.opacity * 0.7})`,
                accent: `rgba(255, 50, 50, ${shape.opacity * 0.9})`  // Lighter red
            };
        } else {
            colors = {
                primary: `rgba(0, 123, 255, ${shape.opacity})`,      // Bright blue
                secondary: `rgba(0, 0, 0, ${shape.opacity * 0.8})`,  // Black for contrast
                accent: `rgba(50, 150, 255, ${shape.opacity * 0.9})` // Lighter blue
            };
        }

        this.ctx.strokeStyle = colors.primary;
        this.ctx.fillStyle = colors.secondary;
        this.ctx.lineWidth = 2;

        switch (shape.type) {
            case 0: // Circle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, shape.size / 2, 0, Math.PI * 2);
                this.ctx.fill();
                this.ctx.stroke();
                break;

            case 1: // Triangle
                this.ctx.beginPath();
                this.ctx.moveTo(0, -shape.size / 2);
                this.ctx.lineTo(-shape.size / 2, shape.size / 2);
                this.ctx.lineTo(shape.size / 2, shape.size / 2);
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
                break;

            case 2: // Square
                this.ctx.fillRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                this.ctx.strokeRect(-shape.size / 2, -shape.size / 2, shape.size, shape.size);
                break;

            case 3: // Hexagon
                this.ctx.beginPath();
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI) / 3;
                    const x = Math.cos(angle) * (shape.size / 2);
                    const y = Math.sin(angle) * (shape.size / 2);
                    if (i === 0) this.ctx.moveTo(x, y);
                    else this.ctx.lineTo(x, y);
                }
                this.ctx.closePath();
                this.ctx.fill();
                this.ctx.stroke();
                break;

            case 4: // Particle with trail
                // Draw trail
                shape.trail.forEach((point, index) => {
                    const alpha = (index / shape.trail.length) * shape.opacity;
                    this.ctx.globalAlpha = alpha;
                    this.ctx.beginPath();
                    this.ctx.arc(point.x - shape.x, point.y - shape.y, shape.size * (index / shape.trail.length), 0, Math.PI * 2);
                    this.ctx.fillStyle = colors.accent;
                    this.ctx.fill();
                });
                this.ctx.globalAlpha = 1;

                // Draw main particle
                this.ctx.beginPath();
                this.ctx.arc(0, 0, shape.size, 0, Math.PI * 2);
                this.ctx.fillStyle = colors.primary;
                this.ctx.fill();
                break;
        }

        this.ctx.restore();
    }

    drawConnections(theme) {
        const connectionDistance = 150;
        const colors = theme === 'dark'
            ? { connection: 'rgba(255, 0, 0, 0.2)' }
            : { connection: 'rgba(0, 123, 255, 0.2)' };

        for (let i = 0; i < this.shapes.length; i++) {
            for (let j = i + 1; j < this.shapes.length; j++) {
                const shape1 = this.shapes[i];
                const shape2 = this.shapes[j];
                const dx = shape1.x - shape2.x;
                const dy = shape1.y - shape2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < connectionDistance) {
                    const opacity = (1 - distance / connectionDistance) * 0.3;
                    this.ctx.strokeStyle = colors.connection.replace('0.1', opacity.toString());
                    this.ctx.lineWidth = 1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(shape1.x, shape1.y);
                    this.ctx.lineTo(shape2.x, shape2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    updateTheme(theme) {
        // Theme is automatically handled in the animate loop
        // This method can be used for any theme-specific initialization if needed
    }
}

// Initialize screensaver background
const screensaverBg = new ScreensaverBackground();

// Typing Effect for Tagline
const tagline = document.querySelector('.tagline');
const originalText = tagline.textContent;
tagline.textContent = '';
let charIndex = 0;
let isTyping = true;

function typeWriter() {
    if (isTyping) {
        if (charIndex < originalText.length) {
            tagline.textContent += originalText.charAt(charIndex);
            charIndex++;
            setTimeout(typeWriter, 100);
        } else {
            isTyping = false;
            setTimeout(() => {
                isTyping = true;
                charIndex = 0;
                tagline.textContent = '';
                typeWriter();
            }, 3000);
        }
    }
}

setTimeout(typeWriter, 1000);

// Counter Animation for Hero Stats
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const count = parseInt(target.textContent.replace(/[^\d]/g, ''));
            animateCounter(target, 0, count, 2000);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    counterObserver.observe(stat);
});

function animateCounter(element, start, end, duration) {
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.textContent.includes('%') ? '%' : '+');
        if (progress < 1) {
            requestAnimationFrame(animation);
        }
    }

    requestAnimationFrame(animation);
}

// Contact form removed - no form handling needed

// Scroll Progress Indicator
const scrollProgress = document.createElement('div');
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.width = '0%';
scrollProgress.style.height = '4px';
scrollProgress.style.background = 'linear-gradient(45deg, var(--accent-color), var(--accent-hover))';
scrollProgress.style.zIndex = '1001';
scrollProgress.style.transition = 'width 0.3s ease';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.offsetHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrollPercent + '%';
});

// Profile Photo Upload Functionality
const profilePhoto = document.getElementById('profile-photo');
const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = 'image/*';
fileInput.style.display = 'none';
document.body.appendChild(fileInput);

profilePhoto.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            profilePhoto.src = e.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Initialize all animations on load
window.addEventListener('load', () => {
    // Trigger initial animations
    setTimeout(() => {
        sections.forEach(section => {
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    }, 100);
});

// Prevent right-click on images (optional)
document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Theme Switcher Functionality
const themeSwitcher = document.getElementById('theme-switcher');
const themeIcon = themeSwitcher.querySelector('i');

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', currentTheme);

// Update button icon based on current theme
if (currentTheme === 'dark') {
    themeIcon.className = 'fas fa-sun';
} else {
    themeIcon.className = 'fas fa-moon';
}

// Theme switcher event listener
themeSwitcher.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme;

    if (currentTheme === 'light') {
        newTheme = 'dark';
        themeIcon.className = 'fas fa-sun';
    } else {
        newTheme = 'light';
        themeIcon.className = 'fas fa-moon';
    }

    // Apply new theme
    document.documentElement.setAttribute('data-theme', newTheme);

    // Save theme preference
    localStorage.setItem('theme', newTheme);

    // Update navbar background for theme change
    updateNavbarBackground();

    // Update screensaver background theme
    if (screensaverBg && screensaverBg.updateTheme) {
        screensaverBg.updateTheme(newTheme);
    }
});

// Function to update navbar background based on theme and scroll
function updateNavbarBackground() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const scrolled = window.scrollY > 100;

    if (currentTheme === 'dark') {
        if (scrolled) {
            navbar.style.background = 'rgba(45, 45, 45, 0.98)';
        } else {
            navbar.style.background = 'rgba(45, 45, 45, 0.95)';
        }
    } else {
        if (scrolled) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
    }
}

// Update navbar background on scroll (modified to work with themes)
window.addEventListener('scroll', () => {
    updateNavbarBackground();
});

// Initialize navbar background on load
updateNavbarBackground();

// Add loading animation
window.addEventListener('beforeunload', () => {
    document.body.style.opacity = '0';
});