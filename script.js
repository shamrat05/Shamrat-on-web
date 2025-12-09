// ===============================================
// Enhanced Theme Management System
// ===============================================

class EnhancedThemeManager {
    constructor() {
        this.theme = localStorage.getItem('theme') || 'dark';
        this.init();
    }

    init() {
        this.setTheme(this.theme);
        this.bindEvents();
        this.updateAllComponents();
    }

    setTheme(theme) {
        this.theme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            const icon = themeToggle.querySelector('i');
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
        
        // Update all theme-dependent components
        this.updateAllComponents();
    }

    toggle() {
        this.setTheme(this.theme === 'dark' ? 'light' : 'dark');
    }

    bindEvents() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => this.toggle());
        }
        
        // Listen for system theme changes
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                if (!localStorage.getItem('theme')) {
                    this.setTheme(e.matches ? 'dark' : 'light');
                }
            });
        }
    }

    updateAllComponents() {
        // Force theme updates on all components
        this.updateNavigationTheme();
        this.updateButtonThemes();
        this.updateFormThemes();
        this.updateCardThemes();
        this.updateContactTheme();
    }

    updateNavigationTheme() {
        const navbar = document.getElementById('navbar');
        const navLinks = document.querySelectorAll('.nav-link');
        const themeToggle = document.querySelector('.theme-toggle');
        
        if (navbar) {
            // Ensure navbar background is properly themed
            navbar.style.backgroundColor = 'var(--bg-surface)';
        }
        
        navLinks.forEach(link => {
            link.style.color = 'var(--text-primary)';
        });
    }

    updateButtonThemes() {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            if (button.classList.contains('btn-primary')) {
                button.style.backgroundColor = 'var(--primary-500)';
                button.style.color = 'white';
            } else if (button.classList.contains('btn-secondary')) {
                button.style.backgroundColor = 'transparent';
                button.style.color = 'var(--text-primary)';
                button.style.borderColor = 'var(--border-default)';
            }
        });
    }

    updateFormThemes() {
        const inputs = document.querySelectorAll('input, textarea');
        const forms = document.querySelectorAll('.contact-form, .form-group');
        
        inputs.forEach(input => {
            input.style.backgroundColor = 'var(--bg-page)';
            input.style.borderColor = 'var(--border-default)';
            input.style.color = 'var(--text-primary)';
        });
        
        forms.forEach(form => {
            form.style.backgroundColor = 'var(--bg-surface)';
            form.style.borderColor = 'var(--border-default)';
        });
    }

    updateCardThemes() {
        const cards = document.querySelectorAll('.portfolio-card, .blog-card, .contact-item, .timeline-content, .cert-item, .stat-item, .highlight-item');
        cards.forEach(card => {
            card.style.backgroundColor = 'var(--bg-surface)';
            card.style.borderColor = 'var(--border-default)';
        });
    }

    updateContactTheme() {
        const emailElements = document.querySelectorAll('.email-link, .protected-email');
        emailElements.forEach(element => {
            element.style.color = 'var(--text-secondary)';
        });
    }
}

// ===============================================
// Enhanced Navigation Management
// ===============================================

class EnhancedNavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.initSmoothScroll();
    }

    bindEvents() {
        // Mobile menu toggle
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Scroll events with throttling
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        this.hamburger.classList.toggle('active');
        this.navMenu.classList.toggle('active');
        document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
    }

    closeMobileMenu() {
        this.hamburger.classList.remove('active');
        this.navMenu.classList.remove('active');
        document.body.style.overflow = '';
    }

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Navbar background and shadow
        if (this.navbar) {
            if (scrollY > 50) {
                this.navbar.classList.add('scrolled');
                this.navbar.style.background = 'var(--bg-overlay)';
                this.navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                this.navbar.classList.remove('scrolled');
                this.navbar.style.background = 'var(--bg-surface)';
                this.navbar.style.boxShadow = 'none';
            }
        }

        // Update active nav link
        this.updateActiveNavLink();
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const top = section.offsetTop;
            const bottom = top + section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos <= bottom) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    initSmoothScroll() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 72;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
}

// ===============================================
// Enhanced Animation Manager
// ===============================================

class EnhancedAnimationManager {
    constructor() {
        this.observers = [];
        this.init();
    }

    init() {
        this.initScrollAnimations();
        this.initSkillTags();
        this.initBackToTop();
        this.initRevealAnimations();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Add staggered animation for grid items
                    if (entry.target.classList.contains('portfolio-item') || 
                        entry.target.classList.contains('blog-card')) {
                        this.staggerChildren(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe elements for animation
        const animatedElements = document.querySelectorAll(`
            .timeline-item,
            .skill-category,
            .portfolio-item,
            .blog-card,
            .contact-item,
            .cert-item,
            .stat-item,
            .highlight-item
        `);

        animatedElements.forEach(el => observer.observe(el));
        this.observers.push(observer);
    }

    staggerChildren(container) {
        const children = container.children;
        Array.from(children).forEach((child, index) => {
            setTimeout(() => {
                child.classList.add('fade-in-up');
            }, index * 100);
        });
    }

    initSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillTag = entry.target;
                    // Add bounce effect when view
                    skill skill tags come intoTag.style.animation = `skillTagSlide 0.6s ease-out forwards, skillTagBounce 0.8s ease-out 0.6s`;
                    skillObserver.unobserve(skillTag);
                }
            });
        }, { threshold: 0.3 });

        skillTags.forEach(tag => skillObserver.observe(tag));
        this.observers.push(skillObserver);
    }

    initBackToTop() {
        const backToTopBtn = document.getElementById('back-to-top');
        
        if (backToTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            });

            backToTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    initRevealAnimations() {
        const reveals = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15
        });

        reveals.forEach(reveal => {
            revealObserver.observe(reveal);
        });
        
        this.observers.push(revealObserver);
    }

    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers = [];
    }
}

// ===============================================
// Enhanced Portfolio Manager with Smart Image Loading
// ===============================================

class EnhancedPortfolioManager {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.imageObserver = null;
        this.init();
    }

    init() {
        this.setupImageObserver();
        this.setupImageErrorHandling();
        this.bindEvents();
    }

    setupImageObserver() {
        const imageOptions = {
            threshold: 0.1,
            rootMargin: '50px'
        };

        this.imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.loadImage(entry.target);
                    this.imageObserver.unobserve(entry.target);
                }
            });
        }, imageOptions);

        // Observe all portfolio images
        const portfolioImages = document.querySelectorAll('.portfolio-image img');
        portfolioImages.forEach(img => {
            this.imageObserver.observe(img);
        });
    }

    loadImage(img) {
        const src = img.dataset.src || img.src;
        const newImg = new Image();
        
        newImg.onload = () => {
            img.src = src;
            img.classList.add('loaded');
            img.parentElement.classList.remove('loading');
        };
        
        newImg.onerror = () => {
            this.handleImageError(img);
        };
        
        newImg.src = src;
    }

    setupImageErrorHandling() {
        const portfolioImages = document.querySelectorAll('.portfolio-image img');
        portfolioImages.forEach(img => {
            img.addEventListener('error', () => {
                this.handleImageError(img);
            });
        });
    }

    handleImageError(img) {
        img.classList.add('error');
        img.parentElement.classList.add('error');
        
        // Create fallback content
        const fallback = document.createElement('div');
        fallback.className = 'image-fallback';
        fallback.innerHTML = `
            <i class="fas fa-image" style="font-size: 48px; color: var(--text-tertiary);"></i>
            <p style="color: var(--text-tertiary); margin-top: 8px;">Image not available</p>
        `;
        fallback.style.cssText = `
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100%;
            background: var(--bg-page);
        `;
        
        img.parentElement.appendChild(fallback);
        img.style.display = 'none';
    }

    bindEvents() {
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const filter = btn.getAttribute('data-filter');
                
                // Add click animation
                btn.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    btn.style.transform = '';
                    this.filterPortfolio(filter);
                    this.updateActiveFilter(btn);
                }, 150);
            });
        });
    }

    filterPortfolio(filter) {
        const visibleItems = [];
        const hiddenItems = [];
        
        // Categorize items
        this.portfolioItems.forEach(item => {
            const category = item.getAttribute('data-category');
            if (filter === 'all' || category === filter) {
                visibleItems.push(item);
            } else {
                hiddenItems.push(item);
            }
        });
        
        // Hide all items first
        this.portfolioItems.forEach(item => {
            item.classList.add('hidden');
        });
        
        // Show visible items with staggered animation
        setTimeout(() => {
            visibleItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('hidden');
                    item.classList.add('show');
                    
                    // Remove show class after animation
                    setTimeout(() => {
                        item.classList.remove('show');
                    }, 600);
                }, index * 120);
            });
        }, 200);
    }

    updateActiveFilter(activeBtn) {
        this.filterBtns.forEach(btn => btn.classList.remove('active'));
        activeBtn.classList.add('active');
    }

    destroy() {
        if (this.imageObserver) {
            this.imageObserver.disconnect();
        }
    }
}

// ===============================================
// Simple Email Manager
// ===============================================

class SimpleEmailManager {
    constructor() {
        this.emailAddress = 'shamrat.r.h@gmail.com';
        this.init();
    }

    init() {
        this.setupEmailLinks();
    }

    setupEmailLinks() {
        // Handle direct email links
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.openEmailClient();
            });
        });

        // Handle protected email elements
        const protectedEmails = document.querySelectorAll('.protected-email, .email-link');
        protectedEmails.forEach(element => {
            // Make them clickable
            element.style.cursor = 'pointer';
            element.style.textDecoration = 'none';
            element.style.color = 'var(--text-secondary)';
            
            element.addEventListener('click', (e) => {
                e.preventDefault();
                this.openEmailClient();
            });

            // Add hover effect
            element.addEventListener('mouseenter', () => {
                element.style.color = 'var(--primary-500)';
                element.style.backgroundColor = 'rgba(10, 132, 255, 0.1)';
            });

            element.addEventListener('mouseleave', () => {
                element.style.color = 'var(--text-secondary)';
                element.style.backgroundColor = 'transparent';
            });
        });

        // Handle contact form submission
        const contactForm = document.getElementById('contact-form');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactForm(e);
            });
        }
    }

    openEmailClient() {
        window.location.href = `mailto:${this.emailAddress}`;
        
        // Show feedback
        this.showEmailFeedback('Opening email client...');
    }

    handleContactForm(event) {
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const name = formData.get('Name');
        const email = formData.get('Email');
        const subject = formData.get('Subject');
        const message = formData.get('Message');
        
        // Validate form
        if (!this.validateForm(form)) {
            return;
        }
        
        // Create email content
        const emailSubject = encodeURIComponent(subject || 'Message from Portfolio Website');
        const emailBody = encodeURIComponent(
            `Name: ${name}\n` +
            `Email: ${email}\n\n` +
            `Message:\n${message}\n\n` +
            `---\n` +
            `Sent from Shamrat's Portfolio Website`
        );
        
        const mailtoLink = `mailto:${this.emailAddress}?subject=${emailSubject}&body=${emailBody}`;
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Show success message
        this.showFormSuccess();
        
        // Reset form
        setTimeout(() => {
            form.reset();
        }, 1000);
    }

    validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input, textarea');
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';

        // Remove existing error
        this.clearFieldError(field);

        // Validation rules
        switch (fieldName) {
            case 'Name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            case 'Email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'Subject':
                if (value.length < 3) {
                    errorMessage = 'Subject must be at least 3 characters';
                    isValid = false;
                }
                break;
            case 'Message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showFieldError(field, errorMessage);
        }

        return isValid;
    }

    showFieldError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
    }

    clearFieldError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    showEmailFeedback(message) {
        this.showMessage(message, 'success');
    }

    showFormSuccess() {
        this.showMessage('Email client opened with your message!', 'success');
    }

    showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }

        // Create new message
        const messageElement = document.createElement('div');
        messageElement.className = `form-message ${type}`;
        messageElement.textContent = message;

        const form = document.getElementById('contact-form');
        if (form) {
            form.appendChild(messageElement);

            // Auto remove after 5 seconds
            setTimeout(() => {
                messageElement.remove();
            }, 5000);
        }
    }
}

// ===============================================
// Auto Logo Transition Manager
// ===============================================

class EnhancedAutoLogoTransitionManager {
    constructor() {
        this.logoText = document.getElementById('logo-text');
        this.logoImage = document.getElementById('logo-image');
        this.animatedLogo = document.querySelector('.animated-logo');
        this.transitionInterval = null;
        this.init();
    }
    
    init() {
        this.startAutoTransition();
    }
    
    startAutoTransition() {
        // Clear any existing interval
        if (this.transitionInterval) {
            clearInterval(this.transitionInterval);
        }
        
        this.transitionInterval = setInterval(() => {
            this.transitionToImage();
            setTimeout(() => {
                this.transitionToText();
            }, 3000);
        }, 8000);
    }
    
    transitionToImage() {
        if (this.animatedLogo) {
            this.animatedLogo.classList.add('show-image', 'auto-transition');
        }
    }
    
    transitionToText() {
        if (this.animatedLogo) {
            this.animatedLogo.classList.remove('show-image', 'auto-transition');
        }
    }
    
    destroy() {
        if (this.transitionInterval) {
            clearInterval(this.transitionInterval);
        }
        if (this.animatedLogo) {
            this.animatedLogo.classList.remove('show-image', 'auto-transition');
        }
    }
}

// ===============================================
// Enhanced Particle Manager
// ===============================================

class EnhancedParticleManager {
    constructor() {
        this.container = document.querySelector('.hero-particles');
        this.particles = [];
        this.init();
    }

    init() {
        if (this.container) {
            this.createParticles();
            this.animateParticles();
        }
    }

    createParticles() {
        const particleCount = window.innerWidth < 768 ? 15 : 30;
        
        for (let i = 0; i < particleCount; i++) {
            this.createParticle();
        }
    }

    createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 4 + 1;
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const opacity = Math.random() * 0.5 + 0.1;
        const duration = Math.random() * 20 + 10;
        
        // Style the particle
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--primary-500);
            border-radius: 50%;
            opacity: ${opacity};
            left: ${x}%;
            top: ${y}%;
            animation: float ${duration}s linear infinite;
        `;
        
        this.container.appendChild(particle);
        this.particles.push(particle);
    }

    animateParticles() {
        // Add CSS animation if not already added
        if (!document.querySelector('#particle-styles')) {
            const style = document.createElement('style');
            style.id = 'particle-styles';
            style.textContent = `
                @keyframes float {
                    0% {
                        transform: translateY(100vh) rotate(0deg);
                        opacity: 0;
                    }
                    10% {
                        opacity: 1;
                    }
                    90% {
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(-100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    destroy() {
        this.particles.forEach(particle => particle.remove());
        this.particles = [];
    }

    recreate() {
        this.destroy();
        this.init();
    }
}

// ===============================================
// Enhanced Performance Manager
// ===============================================

class EnhancedPerformanceManager {
    constructor() {
        this.init();
    }

    init() {
        this.optimizeImages();
        this.lazyLoadElements();
        this.optimizeAnimations();
        this.setupIntersectionObserver();
    }

    optimizeImages() {
        // Add loading="lazy" to images
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
        });
    }

    lazyLoadElements() {
        // Lazy load non-critical content
        const lazyElements = document.querySelectorAll('[data-lazy]');
        
        const lazyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const src = element.getAttribute('data-lazy');
                    if (src) {
                        element.setAttribute('src', src);
                        element.removeAttribute('data-lazy');
                    }
                    lazyObserver.unobserve(element);
                }
            });
        });

        lazyElements.forEach(el => lazyObserver.observe(el));
    }

    optimizeAnimations() {
        // Respect user's motion preferences
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.style.setProperty('--transition-normal', '0ms');
            document.documentElement.style.setProperty('--transition-slow', '0ms');
            
            // Disable animations for users who prefer reduced motion
            const style = document.createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                }
            `;
            document.head.appendChild(style);
        }
    }

    setupIntersectionObserver() {
        // Intersection Observer for better performance
        if ('IntersectionObserver' in window) {
            const observerOptions = {
                root: null,
                rootMargin: '50px',
                threshold: 0.1
            };

            const performanceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('in-view');
                    } else {
                        entry.target.classList.remove('in-view');
                    }
                });
            }, observerOptions);

            // Observe performance-critical elements
            const performanceElements = document.querySelectorAll('.portfolio-item, .blog-card, .skill-tag');
            performanceElements.forEach(el => performanceObserver.observe(el));
        }
    }
}

// ===============================================
// Keyboard Navigation Manager
// ===============================================

class KeyboardNavigationManager {
    constructor() {
        this.init();
    }

    init() {
        document.addEventListener('keydown', (e) => this.handleKeyDown(e));
    }

    handleKeyDown(e) {
        switch (e.key) {
            case 'Escape':
                this.closeMobileMenu();
                break;
            case 'Enter':
                if (e.target.classList.contains('btn')) {
                    e.target.click();
                }
                break;
            case ' ':
                if (e.target.classList.contains('filter-btn')) {
                    e.preventDefault();
                    e.target.click();
                }
                break;
        }
    }

    closeMobileMenu() {
        if (window.managers?.navigation) {
            window.managers.navigation.closeMobileMenu();
        }
    }
}

// ===============================================
// Enhanced Main Application
// ===============================================

class EnhancedShamratWebsite {
    constructor() {
        this.managers = {};
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeManagers());
        } else {
            this.initializeManagers();
        }
    }

    initializeManagers() {
        try {
            // Initialize all managers
            this.managers.theme = new EnhancedThemeManager();
            this.managers.navigation = new EnhancedNavigationManager();
            this.managers.animation = new EnhancedAnimationManager();
            this.managers.portfolio = new EnhancedPortfolioManager();
            this.managers.email = new SimpleEmailManager();
            this.managers.autoLogo = new EnhancedAutoLogoTransitionManager();
            this.managers.particles = new EnhancedParticleManager();
            this.managers.performance = new EnhancedPerformanceManager();
            this.managers.keyboard = new KeyboardNavigationManager();

            // Add loading complete class
            document.body.classList.add('loaded');

            console.log('Enhanced Shamrat Website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
        }
    }

    // Public methods for external access
    toggleTheme() {
        this.managers.theme?.toggle();
    }

    scrollToSection(sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
            const offsetTop = element.offsetTop - 72;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    }

    destroy() {
        // Clean up all managers
        Object.values(this.managers).forEach(manager => {
            if (manager.destroy) {
                manager.destroy();
            }
        });
    }
}

// ===============================================
// Utility Functions
// ===============================================

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Smooth scroll to element
function smoothScrollTo(element, offset = 72) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
}

// ===============================================
// Global Event Listeners and Initialization
// ===============================================

// Global error handling
window.addEventListener('error', (e) => {
    console.error('Global error:', e.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled promise rejection:', e.reason);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
});

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate layouts if needed
    if (window.managers?.particles) {
        window.managers.particles.recreate();
    }
}, 250));

// Handle orientation change on mobile
window.addEventListener('orientationchange', () => {
    setTimeout(() => {
        if (window.managers?.particles) {
            window.managers.particles.recreate();
        }
    }, 500);
});

// Initialize the enhanced website
const website = new EnhancedShamratWebsite();

// Make managers accessible globally for debugging
window.managers = website.managers;
window.EnhancedShamratWebsite = EnhancedShamratWebsite;

// ===============================================
// Additional Features
// ===============================================

// Add loading screen
window.addEventListener('load', () => {
    document.body.classList.add('page-loaded');
    
    // Remove loading screen after animations
    setTimeout(() => {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }, 1000);
});

// Add print styles optimization
window.addEventListener('beforeprint', () => {
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// Service Worker registration for future PWA features
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here for offline functionality
        console.log('Service Worker support detected');
    });
}

// Add touch support for mobile devices
if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
    
    // Add touch event handlers for better mobile interaction
    document.addEventListener('touchstart', (e) => {
        // Handle touch events
    }, { passive: true });
}

// Add performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Page load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        }, 0);
    });
}

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        EnhancedShamratWebsite,
        EnhancedThemeManager,
        EnhancedNavigationManager,
        EnhancedAnimationManager,
        EnhancedPortfolioManager,
        SimpleEmailManager,
        EnhancedPerformanceManager
    };
}
