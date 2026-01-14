export class NavigationManager {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.hamburger = document.getElementById('hamburger');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.previousScrollY = window.scrollY;
        this.isHidden = false;
        this.isMobile = window.innerWidth < 768;
        this.scrollTimeout = null;
        this.lastScrollTime = 0;
        this.scrollThrottle = this.isMobile ? 50 : 30; // Throttle more aggressively on mobile
        
        // "Virtual Pages" - Sections on the homepage that look like pages
        // Portfolio is deliberately EXCLUDED so it acts as a real page
        this.virtualRoutes = ['about', 'experience', 'skills', 'featured-projects', 'contact'];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.handleScroll();
        this.initNavigationLogic();
        this.handleInitialLoad();
    }

    bindEvents() {
        if (this.hamburger) {
            this.hamburger.addEventListener('click', () => this.toggleMobileMenu());
        }

        // Close mobile menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => this.closeMobileMenu());
        });

        // Throttled scroll listener for better performance
        window.addEventListener('scroll', () => this.throttledHandleScroll(), { passive: true });

        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    throttledHandleScroll() {
        const now = Date.now();
        if (now - this.lastScrollTime >= this.scrollThrottle) {
            this.lastScrollTime = now;
            this.handleScroll();
        }
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
        this.handleNavbarVisibility(scrollY);
        this.updateActiveNavLink();
    }

    handleNavbarVisibility(currentScrollY) {
        const scrollDifference = currentScrollY - this.previousScrollY;
        const threshold = 10;
        
        if (Math.abs(scrollDifference) < threshold) return;

        if (this.navMenu.classList.contains('active')) {
            this.previousScrollY = currentScrollY;
            return;
        }

        if (scrollDifference > 0 && !this.isHidden) {
            this.navbar.classList.add('navbar-hidden');
            this.isHidden = true;
        } else if (scrollDifference < 0 && this.isHidden) {
            this.navbar.classList.remove('navbar-hidden');
            this.isHidden = false;
        }

        this.previousScrollY = currentScrollY;
    }

    updateActiveNavLink() {
        const currentPath = window.location.pathname;
        const normalizedPath = currentPath.replace(/^\/|\/$/g, '');
        const scrollPos = window.scrollY + 100;
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            
            // Check for data-nav match (e.g. Portfolio page, Blog page)
            const dataNav = link.getAttribute('data-nav');
            if (dataNav && currentPath.includes(`/${dataNav}`)) {
                link.classList.add('active');
                return;
            }

            // Homepage Section Spy
            if (currentPath === '/' || this.virtualRoutes.includes(normalizedPath)) {
                // Extract ID from href (e.g. "/#about" -> "about")
                const targetId = href.replace(/^#/, '').replace(/^\//, '');
                
                if (targetId && this.virtualRoutes.includes(targetId)) {
                    const section = document.getElementById(targetId);
                    if (section) {
                        const top = section.offsetTop;
                        const bottom = top + section.offsetHeight;
                        if (scrollPos >= top && scrollPos <= bottom) {
                            link.classList.add('active');
                        }
                    }
                } else if (href === '/' && window.scrollY < 500) {
                    link.classList.add('active');
                }
            }
        });
    }

    initNavigationLogic() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                
                // Allow direct navigation for /blog, /portfolio page, or external links
                if (href.startsWith('/blog') || href === '/portfolio' || href === '/portfolio/') {
                    return;
                }

                // Handle anchor links (e.g., /#about, /#contact, /#featured-projects)
                if (href.startsWith('/#')) {
                    e.preventDefault();
                    const targetId = href.substring(2); // Remove "/#"
                    this.scrollToSection(targetId);
                    if (history.pushState) history.pushState(null, null, href);
                    return;
                }

                // Home link
                if (href === '/') {
                    e.preventDefault();
                    this.scrollToSection('home');
                    if (history.pushState) history.pushState(null, null, '/');
                    return;
                }
            });
        });
    }

    handleInitialLoad() {
        const path = window.location.pathname.replace(/^\/|\/$/g, '');
        if (this.virtualRoutes.includes(path)) {
            setTimeout(() => {
                this.scrollToSection(path);
            }, 100);
        }
    }

    scrollToSection(id) {
        const element = document.getElementById(id);
        if (element) {
            const offsetTop = element.offsetTop - 72;
            // Use instant scroll on mobile for better performance, smooth on desktop
            const behavior = this.isMobile ? 'auto' : 'smooth';
            window.scrollTo({
                top: offsetTop,
                behavior: behavior
            });
        }
    }
}