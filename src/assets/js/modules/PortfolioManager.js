export class PortfolioManager {
    constructor() {
        this.filterBtns = document.querySelectorAll('.filter-btn');
        this.portfolioItems = document.querySelectorAll('.portfolio-item');
        this.init();
    }

    init() {
        this.bindEvents();
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
        
        // First, hide all items smoothly
        this.portfolioItems.forEach(item => {
            item.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            item.style.opacity = '0';
            item.style.transform = 'scale(0.7) translateY(30px)';
        });
        
        // Then show visible items with staggered animation
        setTimeout(() => {
            visibleItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1) translateY(0)';
                    item.classList.add('show');
                    
                    // Remove show class after animation completes
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
}
