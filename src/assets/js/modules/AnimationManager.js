export class AnimationManager {
    constructor() {
        this.observers = [];
        this.isMobile = window.innerWidth < 768;
        this.init();
    }

    init() {
        this.initScrollAnimations();
        // Only animate skill tags on non-mobile or reduce animations on mobile
        if (!this.isMobile || window.innerWidth > 480) {
            this.initSkillTags();
        }
        this.initBackToTop();
    }

    initScrollAnimations() {
        const observerOptions = {
            threshold: this.isMobile ? 0.05 : 0.1,
            rootMargin: this.isMobile ? '0px 0px -30px 0px' : '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    // Add staggered animation for grid items only on larger screens
                    if ((entry.target.classList.contains('portfolio-item') || 
                        entry.target.classList.contains('blog-card')) && !this.isMobile) {
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
            // Reduce stagger delay on mobile
            const delay = this.isMobile ? index * 50 : index * 100;
            setTimeout(() => {
                child.classList.add('fade-in-up');
            }, delay);
        });
    }

    initSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        const skillObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const skillTag = entry.target;
                    // Reduce animation complexity on mobile
                    if (this.isMobile) {
                        skillTag.style.animation = `skillTagSlide 0.4s ease-out forwards`;
                    } else {
                        skillTag.style.animation = `skillTagSlide 0.6s ease-out forwards, skillTagBounce 0.8s ease-out 0.6s`;
                    }
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
            // Use passive listener for scroll performance
            window.addEventListener('scroll', () => {
                if (window.scrollY > 300) {
                    backToTopBtn.classList.add('visible');
                } else {
                    backToTopBtn.classList.remove('visible');
                }
            }, { passive: true });

            backToTopBtn.addEventListener('click', () => {
                // Use instant scroll on mobile for better performance
                const behavior = this.isMobile ? 'auto' : 'smooth';
                window.scrollTo({
                    top: 0,
                    behavior: behavior
                });
            });
        }
    }
}
