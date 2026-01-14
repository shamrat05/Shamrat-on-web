export class AutoLogoTransitionManager {
    constructor() {
        this.logoText = document.getElementById('logo-text');
        this.logoImage = document.getElementById('logo-image');
        this.animatedLogo = document.querySelector('.animated-logo');
        this.init();
    }
    
    init() {
        this.startAutoTransition();
    }
    
    startAutoTransition() {
        setInterval(() => {
            this.transitionToImage();
            setTimeout(() => {
                this.transitionToText();
            }, 3000);
        }, 8000);
    }
    
    transitionToImage() {
        if (this.animatedLogo) {
            this.animatedLogo.classList.add('show-image');
        }
    }
    
    transitionToText() {
        if (this.animatedLogo) {
            this.animatedLogo.classList.remove('show-image');
        }
    }
}
