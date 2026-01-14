export class TypewriterManager {
    constructor() {
        this.typedWordElement = document.querySelector('.typed-word');
        this.words = ['Excellence', 'Innovation', 'Leadership', 'Growth', 'Success'];
        this.currentWordIndex = 0;
        this.currentCharIndex = 0;
        this.isDeleting = false;
        this.typeSpeed = 100;
        this.deleteSpeed = 50;
        this.pauseDuration = 2000;
        this.init();
    }

    init() {
        if (this.typedWordElement) {
            this.typedWordElement.textContent = '';
            this.typeWriter();
        }
    }

    typeWriter() {
        const currentWord = this.words[this.currentWordIndex];
        
        if (this.isDeleting) {
            // Deleting
            this.typedWordElement.textContent = currentWord.substring(0, this.currentCharIndex - 1);
            this.currentCharIndex--;
            
            if (this.currentCharIndex === 0) {
                this.isDeleting = false;
                this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;
                setTimeout(() => this.typeWriter(), 500); // Small pause before typing next word
            } else {
                setTimeout(() => this.typeWriter(), this.deleteSpeed);
            }
        } else {
            // Typing
            this.typedWordElement.textContent = currentWord.substring(0, this.currentCharIndex + 1);
            this.currentCharIndex++;
            
            if (this.currentCharIndex === currentWord.length) {
                this.isDeleting = true;
                setTimeout(() => this.typeWriter(), this.pauseDuration);
            } else {
                setTimeout(() => this.typeWriter(), this.typeSpeed);
            }
        }
    }
}