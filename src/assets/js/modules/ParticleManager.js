export class ParticleManager {
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
        // Drastically reduce particles on mobile for performance
        const particleCount = window.innerWidth < 768 ? 6 : 20;
        
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
        // Add CSS animation
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
}
