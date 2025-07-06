// SAKHA COLLECTION - Interactive Features
document.addEventListener('DOMContentLoaded', function () {

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function () {
            this.style.transform = 'translateY(-15px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function () {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Detail button interactions
    const detailButtons = document.querySelectorAll('.btnDetail');
    detailButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();

            // Create a ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');

            this.appendChild(ripple);

            // Remove ripple after animation
            setTimeout(() => {
                ripple.remove();
            }, 600);

            // Show product details (you can customize this)
            showProductDetails(this);
        });
    });

    // Scroll reveal animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, observerOptions);

    // Observe elements for scroll reveal
    const scrollElements = document.querySelectorAll('.product-card, .catalogue-title, .info-section');
    scrollElements.forEach(el => {
        el.classList.add('scroll-reveal');
        observer.observe(el);
    });

    // Parallax effect for banner
    const banner = document.querySelector('.banner-section img');
    if (banner) {
        window.addEventListener('scroll', function () {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            banner.style.transform = `translateY(${rate}px)`;
        });
    }

    // Simple image error handling
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function () {
            console.log('Image failed to load:', this.src);
            // Show a placeholder
            this.style.display = 'none';
            const errorDiv = document.createElement('div');
            errorDiv.style.cssText = `
                width: 100%;
                height: 250px;
                background: linear-gradient(45deg, #f0f0f0, #e0e0e0);
                display: flex;
                align-items: center;
                justify-content: center;
                color: #666;
                font-size: 14px;
                border-radius: 8px;
            `;
            errorDiv.textContent = 'Gambar tidak dapat dimuat';
            this.parentNode.insertBefore(errorDiv, this);
        });
    });

    // Add CSS for ripple effect
    const style = document.createElement('style');
    style.textContent = `
        .detail-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Remove conflicting img styles - handled by CSS file */
        
        .product-card {
            cursor: pointer;
        }
        
        .product-card:hover .product-name {
            color: var(--accent-color);
        }
        
        .price {
            position: relative;
        }
        
        .price::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, var(--accent-color), var(--secondary-color));
            border-radius: 4px;
            z-index: -1;
            opacity: 0;
            transition: opacity 0.3s ease;
        }
        
        .product-card:hover .price::before {
            opacity: 0.2;
        }
    `;
    document.head.appendChild(style);

    // Product details modal function
    function showProductDetails(button) {
        const card = button.closest('.product-card');
        const productName = card.querySelector('.product-name').textContent;
        const price = card.querySelector('.price').textContent;
        const image = card.querySelector('.product-image').src;

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-overlay">
                <div class="modal-content">
                    <button class="modal-close">&times;</button>
                    <div class="modal-body">
                        <img src="${image}" alt="${productName}" class="modal-image">
                        <div class="modal-info">
                            <h3>${productName}</h3>
                            <p class="modal-price">${price}</p>
                            <p class="modal-description">
                                Produk berkualitas tinggi dengan desain eksklusif. 
                                Tersedia dalam berbagai ukuran dan warna.
                            </p>
                            <div class="modal-actions">
                                <button class="btn-whatsapp">Order via WhatsApp</button>
                                <button class="btn-close">Tutup</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        // Add modal styles
        const modalStyle = document.createElement('style');
        modalStyle.textContent = `
            .product-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }
            
            .modal-overlay {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 20px;
            }
            
            .modal-content {
                background: white;
                border-radius: 12px;
                max-width: 500px;
                width: 100%;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                animation: slideUp 0.3s ease;
            }
            
            .modal-close {
                position: absolute;
                top: 15px;
                right: 15px;
                background: none;
                border: none;
                font-size: 24px;
                cursor: pointer;
                color: #666;
                z-index: 1;
            }
            
            .modal-body {
                padding: 20px;
            }
            
            .modal-image {
                width: 100%;
                height: 300px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            
            .modal-info h3 {
                color: var(--primary-color);
                margin-bottom: 10px;
            }
            
            .modal-price {
                font-size: 1.5rem;
                font-weight: 700;
                color: var(--accent-color);
                margin-bottom: 15px;
            }
            
            .modal-description {
                color: var(--text-light);
                line-height: 1.6;
                margin-bottom: 20px;
            }
            
            .modal-actions {
                display: flex;
                gap: 10px;
                flex-wrap: wrap;
            }
            
            .btn-whatsapp {
                background: #25d366;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                flex: 1;
            }
            
            .btn-whatsapp:hover {
                background: #128c7e;
                transform: translateY(-2px);
            }
            
            .btn-close {
                background: var(--text-light);
                color: white;
                border: none;
                padding: 0 24px;
                border-radius: 25px;
                cursor: pointer;
                font-weight: 500;
                transition: all 0.3s ease;
                min-width: 90px;
                text-align: center;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1rem;
                height: 44px;
                white-space: normal;
                overflow: visible;
            }
            
            .btn-close:hover {
                background: var(--text-dark);
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            @keyframes slideUp {
                from { transform: translateY(50px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            
            @media (max-width: 768px) {
                .modal-content {
                    margin: 10px;
                }
                
                .modal-actions {
                    flex-direction: column;
                }
            }
        `;
        document.head.appendChild(modalStyle);

        // Add modal to page
        document.body.appendChild(modal);

        // Close modal functionality
        const closeModal = () => {
            modal.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                modal.remove();
            }, 300);
        };

        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.btn-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-overlay').addEventListener('click', function (e) {
            if (e.target === this) closeModal();
        });

        // WhatsApp button functionality
        modal.querySelector('.btn-whatsapp').addEventListener('click', function () {
            const message = `Halo! Saya tertarik dengan produk ${productName} (${price}). Bisa tolong berikan informasi lebih lanjut?`;
            const whatsappUrl = `https://wa.me/6285759790334?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        });

        // Add fadeOut animation
        const fadeOutStyle = document.createElement('style');
        fadeOutStyle.textContent = `
            @keyframes fadeOut {
                from { opacity: 1; }
                to { opacity: 0; }
            }
        `;
        document.head.appendChild(fadeOutStyle);
    }

    // Add some interactive features
    console.log('SAKHA COLLECTION website loaded successfully! 🎉');

    // Add loading indicator
    window.addEventListener('load', function () {
        document.body.style.opacity = '1';
        document.body.style.transform = 'translateY(0)';
    });

    // Initialize body styles for loading animation
    document.body.style.opacity = '0';
    document.body.style.transform = 'translateY(20px)';
    document.body.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});
