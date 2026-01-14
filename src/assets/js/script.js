import { ThemeManager } from './modules/ThemeManager.js';
import { NavigationManager } from './modules/NavigationManager.js';
import { AnimationManager } from './modules/AnimationManager.js';
import { PortfolioManager } from './modules/PortfolioManager.js';
import { AutoLogoTransitionManager } from './modules/AutoLogoTransitionManager.js';
import { ContactFormManager } from './modules/ContactFormManager.js';
import { ParticleManager } from './modules/ParticleManager.js';
import { PerformanceManager } from './modules/PerformanceManager.js';
import { TypewriterManager } from './modules/TypewriterManager.js';
import { debounce } from './modules/Utils.js';

// ===============================================
// Main Application
// ===============================================

class ShamratWebsite {
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
            this.managers.theme = new ThemeManager();
            this.managers.navigation = new NavigationManager();
            this.managers.animation = new AnimationManager();
            this.managers.portfolio = new PortfolioManager();

            this.managers.autoLogo = new AutoLogoTransitionManager();
            this.managers.contact = new ContactFormManager();
            // this.managers.particles = new ParticleManager(); // DISABLED for performance
            this.managers.performance = new PerformanceManager();
            
            this.managers.typewriter = new TypewriterManager();

            // Connect theme changes to navbar updates
            this.connectThemeAndNavigation();

            // Add loading complete class
            document.body.classList.add('loaded');

            console.log('Shamrat Website initialized successfully');
        } catch (error) {
            console.error('Error initializing website:', error);
        }
    }

    connectThemeAndNavigation() {
        // Theme switching is now handled entirely by CSS variables
        // No JavaScript intervention needed
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
}

// ===============================================
// Event Listeners and Initialization
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
        window.managers.particles.destroy();
        window.managers.particles.init();
    }
}, 250));

// Initialize the website
const website = new ShamratWebsite();

// Make managers accessible globally for debugging
window.managers = website.managers;
window.ShamratWebsite = ShamratWebsite;

// ===============================================
// Additional Features
// ===============================================

// Add smooth reveal animation for elements
function addRevealAnimation() {
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
}

// Initialize reveal animations
addRevealAnimation();

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        website.managers.navigation?.closeMobileMenu();
    }
    
    // Enter key on buttons
    if (e.key === 'Enter' && e.target.classList.contains('btn')) {
        e.target.click();
    }
});

// Add print styles optimization
window.addEventListener('beforeprint', () => {
    // Optimize for printing
    document.body.classList.add('printing');
});

window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
});

// ===============================================
// Service Worker registration (for future PWA features)
// ===============================================

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Service worker can be added here for offline functionality
        console.log('Service Worker support detected');
    });
}