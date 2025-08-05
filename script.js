// JSCROOT Library Usage Examples for Featured Products
// ===================================================

// Wait for jscroot to be ready
function waitForJscroot() {
    return new Promise((resolve) => {
        if (window.jscroot) {
            resolve();
        } else {
            document.addEventListener('jscroot-ready', resolve);
        }
    });
}

// Featured Products Script with JSCROOT Integration
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

    // Example 1: API calls using jscroot
    async loadFeaturedProducts() {
        await waitForJscroot();

        try {
            // Show loading state
            const loadingElement = document.createElement('div');
            loadingElement.innerHTML = window.jscroot.loading;
            loadingElement.style.position = 'fixed';
            loadingElement.style.top = '50%';
            loadingElement.style.left = '50%';
            loadingElement.style.transform = 'translate(-50%, -50%)';
            loadingElement.style.zIndex = '9999';
            document.body.appendChild(loadingElement);

            // Use jscroot API functions
            const response = await new Promise((resolve) => {
                window.jscroot.getJSON(
                    `${this.apiBaseUrl}/products?featured=true`,
                    resolve
                );
            });

            // Hide loading
            document.body.removeChild(loadingElement);

            if (response.status === 200 && response.data.status === 'success') {
                this.products = response.data.data;
                this.renderProducts();

                // Set cookie to track product view
                window.jscroot.setCookieWithExpireHour('featured_products_viewed', 'true', 24);

                // Get browser info for analytics
                const browserInfo = {
                    isMobile: window.jscroot.isMobile()
                };

                console.log('Featured Products Browser Info:', browserInfo);

            } else {
                console.error('Failed to load featured products:', response.data.message);
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

    // Example 2: DOM manipulation using jscroot
    async renderProducts() {
        await waitForJscroot();

        const productGrid = window.jscroot.getElement('product-grid') || document.querySelector('.product-grid');
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

    // Example 3: URL parameter handling
    async handleProductUrlParameters() {
        await waitForJscroot();

        const queryString = window.jscroot.getQueryString();
        const productId = queryString.product;
        const category = queryString.category;

        if (productId) {
            console.log('Product ID from URL:', productId);
            // Could auto-show product detail
        }

        if (category) {
            console.log('Category from URL:', category);
            // Could filter products by category
        }
    }

    // Example 4: Cookie management for user preferences
    async loadUserPreferences() {
        await waitForJscroot();

        const viewedProducts = window.jscroot.getCookie('featured_products_viewed');
        const isMobile = window.jscroot.isMobile();

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

    // Example 5: Product detail with jscroot
    async showProductDetail(button) {
        await waitForJscroot();

        const productId = button.getAttribute('data-product-id');

        if (!productId) {
            console.error('No product ID found');
            return;
        }

        // Show loading
        const loadingElement = document.createElement('div');
        loadingElement.innerHTML = window.jscroot.loading;
        loadingElement.style.position = 'fixed';
        loadingElement.style.top = '50%';
        loadingElement.style.left = '50%';
        loadingElement.style.transform = 'translate(-50%, -50%)';
        loadingElement.style.zIndex = '9999';
        document.body.appendChild(loadingElement);

        try {
            // Use jscroot API to get product details
            const response = await new Promise((resolve) => {
                window.jscroot.getJSON(`${this.apiBaseUrl}/products/${productId}`, resolve);
            });

            document.body.removeChild(loadingElement);

            if (response.status === 200) {
                const product = response.data.data;
                this.displayProductModal(product);

                // Track product view
                window.jscroot.setCookieWithExpireHour(`product_viewed_${productId}`, 'true', 24);

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
        // Create modal content using jscroot
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

        // Create modal element using jscroot
        const modal = window.jscroot.createElement('div');
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
}

// Initialize jscroot features
async function initializeJscrootFeatures() {
    await waitForJscroot();

    // Initialize featured products
    const featuredProducts = new FeaturedProducts();

    // Handle URL parameters
    await featuredProducts.handleProductUrlParameters();

    // Load user preferences
    await featuredProducts.loadUserPreferences();

    // Log browser information
    console.log('Featured Products Is Mobile:', window.jscroot.isMobile());
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', async function () {
    try {
        await initializeJscrootFeatures();
    } catch (error) {
        console.error('Error initializing featured products:', error);
    }
});
