export class ContactFormManager {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.init();
    }

    init() {
        if (this.form) {
            this.bindEvents();
        }
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        
        // Add real-time validation
        const inputs = this.form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearValidationError(input));
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        
        if (this.validateForm()) {
            this.submitForm(e);
        }
    }

    validateForm() {
        let isValid = true;
        const inputs = this.form.querySelectorAll('input, textarea');
        
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
        this.clearValidationError(field);

        // Validation rules
        switch (fieldName) {
            case 'name':
                if (value.length < 2) {
                    errorMessage = 'Name must be at least 2 characters';
                    isValid = false;
                }
                break;
            case 'email':
                const emailRegex = /^[^S@]+@[^S@]+\.[^S@]+$/;
                if (!emailRegex.test(value)) {
                    errorMessage = 'Please enter a valid email address';
                    isValid = false;
                }
                break;
            case 'subject':
                if (value.length < 3) {
                    errorMessage = 'Subject must be at least 3 characters';
                    isValid = false;
                }
                break;
            case 'message':
                if (value.length < 10) {
                    errorMessage = 'Message must be at least 10 characters';
                    isValid = false;
                }
                break;
        }

        if (!isValid) {
            this.showValidationError(field, errorMessage);
        }

        return isValid;
    }

    showValidationError(field, message) {
        field.classList.add('error');
        
        let errorElement = field.parentNode.querySelector('.error-message');
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            field.parentNode.appendChild(errorElement);
        }
        
        errorElement.textContent = message;
        errorElement.style.color = 'var(--semantic-error)';
        errorElement.style.fontSize = '14px';
        errorElement.style.marginTop = '4px';
    }

    clearValidationError(field) {
        field.classList.remove('error');
        const errorElement = field.parentNode.querySelector('.error-message');
        if (errorElement) {
            errorElement.remove();
        }
    }

    async submitForm(event) {
        event.preventDefault(); // Prevent default form submission
        
        const submitBtn = this.form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        
        // Show loading state
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening Email Client...';
        submitBtn.disabled = true;

        try {
            // Create mailto link with form data
            const formData = new FormData(this.form);
            const name = formData.get('Name');
            const email = formData.get('Email');
            const subject = formData.get('Subject');
            const message = formData.get('Message');
            
            const mailtoSubject = encodeURIComponent(subject || 'Message from Portfolio Website');
            const mailtoBody = encodeURIComponent(
                `Name: ${name}\n` + 
                `Email: ${email}\n\n` + 
                `Message:\n${message}\n\n` + 
                `---\n` + 
                `Sent from Shamrat's Portfolio Website`
            );
            
            const mailtoLink = `mailto:shamrat.r.h@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
            
            // Open email client
            window.location.href = mailtoLink;
            
            // Show success message
            this.showSuccessMessage();
            
            // Reset form after a short delay
            setTimeout(() => {
                this.form.reset();
            }, 1000);
            
        } catch (error) {
            this.showErrorMessage();
        } finally {
            // Reset button state
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        }
    }

    showSuccessMessage() {
        this.showMessage('Your email client should now be open with the message. If it didn\'t open, please email directly to shamrat.r.h@gmail.com', 'success');
    }

    showErrorMessage() {
        this.showMessage('Please try again or email directly to shamrat.r.h@gmail.com', 'error');
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
        
        // Style the message
        messageElement.style.padding = '12px 16px';
        messageElement.style.marginTop = '16px';
        messageElement.style.borderRadius = '8px';
        messageElement.style.fontSize = '14px';
        messageElement.style.fontWeight = '500';
        
        if (type === 'success') {
            messageElement.style.backgroundColor = 'var(--semantic-success)';
            messageElement.style.color = 'white';
        } else {
            messageElement.style.backgroundColor = 'var(--semantic-error)';
            messageElement.style.color = 'white';
        }

        this.form.appendChild(messageElement);

        // Auto remove after 5 seconds
        setTimeout(() => {
            messageElement.remove();
        }, 5000);
    }
}
