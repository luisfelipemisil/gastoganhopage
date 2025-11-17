// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.feature-card, .step, .faq-item, .flow-step');
    animatedElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });

    // Slide in animations for sections
    const slideLeftElements = document.querySelectorAll('.hero-text, .notification-text, .demo-text');
    slideLeftElements.forEach(el => {
        el.classList.add('slide-in-left');
        observer.observe(el);
    });

    const slideRightElements = document.querySelectorAll('.hero-image, .notification-demo, .demo-screenshots');
    slideRightElements.forEach(el => {
        el.classList.add('slide-in-right');
        observer.observe(el);
    });

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const originalText = stat.textContent;
        const target = parseInt(originalText.replace('+', '').replace('R$ ', ''));
        
        const statObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(stat, target, originalText);
                    statObserver.unobserve(entry.target);
                }
            });
        });
        
        statObserver.observe(stat);
    });

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.style.opacity = '1';
        document.body.style.transition = 'opacity 0.3s ease';
        
        // Remove loading class if any
        document.body.classList.remove('loading');
    });

    // Add pulse animation to download buttons
    const downloadButtons = document.querySelectorAll('.store-btn');
    downloadButtons.forEach(btn => {
        btn.classList.add('pulse');
    });

    // Mobile menu toggle (if needed in future)
    initMobileMenu();

    // Add click animation to buttons
    initButtonAnimations();
});

// Counter animation function
function animateCounter(element, target, originalText) {
    let current = 0;
    const increment = target / 50;
    const hasPlus = originalText.includes('+');
    const hasCurrency = originalText.includes('R$');
    
    const updateCount = () => {
        if (current < target) {
            current += increment;
            if (hasPlus) {
                element.textContent = '+' + Math.floor(current);
            } else if (hasCurrency) {
                element.textContent = 'R$ ' + Math.floor(current);
            } else {
                element.textContent = Math.floor(current);
            }
            requestAnimationFrame(updateCount);
        } else {
            element.textContent = originalText;
        }
    };
    
    updateCount();
}

// Mobile menu initialization
function initMobileMenu() {
    // This can be expanded for mobile menu functionality
    const nav = document.querySelector('.nav');
    // Future mobile menu implementation
}

// Button animations
function initButtonAnimations() {
    const buttons = document.querySelectorAll('.btn, .store-btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                transform: scale(0);
                animation: ripple 600ms linear;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Form handling for future newsletter signup
function handleNewsletterSignup(email) {
    // Implement your newsletter signup logic here
    console.log('Newsletter signup:', email);
    
    // Show success message
    const message = document.createElement('div');
    message.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--old-money-green);
        color: white;
        padding: 1rem 2rem;
        border-radius: 8px;
        box-shadow: var(--shadow-lg);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    message.textContent = 'Obrigado por se inscrever! Em breve teremos novidades.';
    
    document.body.appendChild(message);
    
    setTimeout(() => {
        message.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => message.remove(), 300);
    }, 3000);
}

// Add slide animations to CSS
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyle);

// Error tracking
window.addEventListener('error', function(e) {
    console.error('Error occurred:', e.error);
});

// Performance monitoring
window.addEventListener('load', function() {
    // Log page load time
    if (window.performance) {
        const navigation = performance.getEntriesByType('navigation')[0];
        console.log('Page load time:', navigation.loadEventEnd - navigation.fetchStart, 'ms');
    }
});