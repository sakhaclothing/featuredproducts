// Featured Products Script with Native JavaScript
// =============================================

class FeaturedProducts {
    constructor() {
        this.apiBaseUrl = 'https://asia-southeast2-ornate-course-437014-u9.cloudfunctions.net/sakha';
        this.products = [];
        this.initializeEventListeners();
        this.loadFeaturedProducts();
    }

    initializeEventListeners() {
        // Detail button click handlers
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('btnDetail')) {
                this.showProductDetail(e.target);
            }
        });
    }

    // API calls using native fetch
    async loadFeaturedProducts() {
        // Show loading state
        const loadingElement = document.createElement('div');
        loadingElement.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 10px;
                "></div>
                <p>Loading products...</p>
            </div>
            <style>
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
            </style>
        `;
        document.body.appendChild(loadingElement);

        try {
            // Use native fetch API
            const response = await fetch(`${this.apiBaseUrl}/products?featured=true`);
            const data = await response.json();

            // Hide loading
            document.body.removeChild(loadingElement);

            if (response.status === 200 && data.status === 'success') {
                this.products = data.data;
                this.renderProducts();

                // Set cookie to track product view
                this.setCookie('featured_products_viewed', 'true', 24);

                // Get browser info for analytics
                const browserInfo = {
                    isMobile: this.isMobile()
                };

                console.log('Featured Products Browser Info:', browserInfo);

            } else {
                console.error('Failed to load featured products:', data.message);
                this.loadFallbackProducts();
            }
        } catch (error) {
            if (document.body.contains(loadingElement)) {
                document.body.removeChild(loadingElement);
            }
            console.error('Error loading featured products:', error);
            this.loadFallbackProducts();
        }
    }

    // DOM manipulation using native JavaScript
    async renderProducts() {
        const productGrid = document.getElementById('product-grid') || document.querySelector('.product-grid');
        if (!productGrid) return;

        // Clear existing content
        productGrid.innerHTML = '';

        if (this.products.length === 0) {
            const noProductsElement = document.createElement('div');
            noProductsElement.className = 'col-span-full text-center py-8';
            noProductsElement.innerHTML = '<p class="text-gray-500">No featured products available at the moment.</p>';
            productGrid.appendChild(noProductsElement);
            return;
        }

        this.products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';
            productCard.innerHTML = `
                <img src="${product.image_url || 'images/produk lain 2.jpg'}" class="product-image" alt="${product.name}"/>
                <div class="product-info">
                    <p class="product-name">${product.name}</p>
                </div>
                <div class="product-footer">
                    <a class="detail-btn btnDetail" data-product-id="${product.id}">Detail</a>
                    <span class="price">Rp.${product.price.toLocaleString()}</span>
                </div>
            `;
            productGrid.appendChild(productCard);
        });
    }

    // URL parameter handling
    async handleProductUrlParameters() {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('product');
        const category = urlParams.get('category');

        if (productId) {
            console.log('Product ID from URL:', productId);
            // Could auto-show product detail
        }

        if (category) {
            console.log('Category from URL:', category);
            // Could filter products by category
        }
    }

    // Cookie management for user preferences
    async loadUserPreferences() {
        const viewedProducts = this.getCookie('featured_products_viewed');
        const isMobile = this.isMobile();

        if (viewedProducts === 'true') {
            console.log('User has viewed featured products before');
        }

        if (isMobile) {
            // Adjust layout for mobile
            console.log('Mobile device detected, adjusting layout');
        }
    }

    loadFallbackProducts() {
        // Fallback to static products if API fails
        const fallbackProducts = [
            {
                id: 1,
                name: "KAOS SABLON PREMIUM",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 2,
                name: "JAKET SABLON PREMIUM",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 3,
                name: "CUSTOM SWEATER SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 4,
                name: "CUSTOM SPORT SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 5,
                name: "CUSTOM SPORT SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 6,
                name: "CUSTOM SPORT SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 7,
                name: "CUSTOM SPORT SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            }
        ];

        this.products = fallbackProducts;
        this.renderProducts();
    }

    // Product detail with native JavaScript
    async showProductDetail(button) {
        const productId = button.getAttribute('data-product-id');

        if (!productId) {
            console.error('No product ID found');
            return;
        }

        // Show loading
        const loadingElement = document.createElement('div');
        loadingElement.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 9999;
                background: rgba(0,0,0,0.8);
                color: white;
                padding: 20px;
                border-radius: 10px;
                text-align: center;
            ">
                <div style="
                    width: 40px;
                    height: 40px;
                    border: 4px solid #f3f3f3;
                    border-top: 4px solid #3498db;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 10px;
                "></div>
                <p>Loading product details...</p>
            </div>
        `;
        document.body.appendChild(loadingElement);

        try {
            // Use native fetch API to get product details
            const response = await fetch(`${this.apiBaseUrl}/products/${productId}`);
            const data = await response.json();

            document.body.removeChild(loadingElement);

            if (response.status === 200) {
                const product = data.data;
                this.displayProductModal(product);

                // Track product view
                this.setCookie(`product_viewed_${productId}`, 'true', 24);

            } else {
                throw new Error('Failed to load product details');
            }
        } catch (error) {
            if (document.body.contains(loadingElement)) {
                document.body.removeChild(loadingElement);
            }
            console.error('Error loading product details:', error);

            // Show fallback product detail
            const product = this.products.find(p => p.id == productId);
            if (product) {
                this.displayProductModal(product);
            }
        }
    }

    displayProductModal(product) {
        // Create modal content
        const modalContent = `
            <div class="product-modal">
                <div class="modal-header">
                    <h3>${product.name}</h3>
                    <button class="close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${product.image_url || 'images/produk lain 2.jpg'}" alt="${product.name}"/>
                    <div class="product-details">
                        <p class="price">Rp.${product.price.toLocaleString()}</p>
                        <p class="description">${product.description || 'Deskripsi produk tidak tersedia.'}</p>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="order-btn">Pesan Sekarang</button>
                </div>
            </div>
        `;

        // Create modal element
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = modalContent;

        // Add to body
        document.body.appendChild(modal);

        // Add event listeners
        modal.querySelector('.close-btn').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.order-btn').addEventListener('click', () => {
            // Handle order button click
            window.open('https://api.whatsapp.com/send?phone=6285759790334&text=Saya ingin memesan ' + product.name, '_blank');
            modal.remove();
        });

        // Close on overlay click
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Native cookie functions
    setCookie(name, value, hours) {
        const d = new Date();
        d.setTime(d.getTime() + (hours * 60 * 60 * 1000));
        let expires = "expires=" + d.toUTCString();
        document.cookie = encodeURIComponent(name) + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
    }

    getCookie(name) {
        let nameEQ = encodeURIComponent(name) + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(nameEQ) === 0) {
                return decodeURIComponent(c.substring(nameEQ.length, c.length));
            }
        }
        return "";
    }

    // Native mobile detection
    isMobile() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}

// Initialize featured products
async function initializeFeaturedProducts() {
    // Initialize featured products
    const featuredProducts = new FeaturedProducts();

    // Handle URL parameters
    await featuredProducts.handleProductUrlParameters();

    // Load user preferences
    await featuredProducts.loadUserPreferences();

    // Log browser information
    console.log('Featured Products Is Mobile:', featuredProducts.isMobile());
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await initializeFeaturedProducts();
    } catch (error) {
        console.error('Error initializing featured products:', error);
    }
});
