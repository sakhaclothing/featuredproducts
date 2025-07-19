// Featured Products Script
class FeaturedProducts {
    constructor() {
        this.apiBaseUrl = 'https://sakhaclothing.shop'; // Update with your actual backend URL
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

    async loadFeaturedProducts() {
        try {
            const response = await fetch(`${this.apiBaseUrl}/products?featured=true`);
            const data = await response.json();

            if (data.status === 'success') {
                this.products = data.data;
                this.renderProducts();
            } else {
                console.error('Failed to load featured products:', data.message);
                this.loadFallbackProducts();
            }
        } catch (error) {
            console.error('Error loading featured products:', error);
            this.loadFallbackProducts();
        }
    }

    renderProducts() {
        const productGrid = document.querySelector('.product-grid');
        if (!productGrid) return;

        productGrid.innerHTML = '';

        if (this.products.length === 0) {
            productGrid.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-gray-500">No featured products available at the moment.</p>
                </div>
            `;
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
            },
            {
                id: 8,
                name: "CUSTOM SPORT SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            },
            {
                id: 9,
                name: "CUSTOM SPORT SABLON",
                price: 75000,
                image_url: "images/produk lain 2.jpg"
            }
        ];

        this.products = fallbackProducts;
        this.renderProducts();
    }

    showProductDetail(button) {
        const productId = button.getAttribute('data-product-id');
        const product = this.products.find(p => p.id == productId);

        if (product) {
            // Create modal for product detail
            const modal = document.createElement('div');
            modal.className = 'product-modal';
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
            `;

            modal.innerHTML = `
                <div class="product-modal-content" style="
                    background: white;
                    padding: 2rem;
                    border-radius: 8px;
                    max-width: 500px;
                    width: 90%;
                    position: relative;
                ">
                    <button class="close-modal" style="
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        background: none;
                        border: none;
                        font-size: 24px;
                        cursor: pointer;
                        color: #666;
                    ">&times;</button>
                    
                    <div class="product-detail">
                        <img src="${product.image_url || 'images/produk lain 2.jpg'}" 
                             alt="${product.name}" 
                             style="width: 100%; height: 300px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">
                        
                        <h3 style="font-size: 1.5rem; font-weight: bold; margin-bottom: 0.5rem;">${product.name}</h3>
                        
                        <p style="color: #666; margin-bottom: 1rem;">${product.description || 'Produk berkualitas tinggi dengan desain yang menarik.'}</p>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
                            <span style="font-size: 1.25rem; font-weight: bold; color: #000;">Rp.${product.price.toLocaleString()}</span>
                            <span style="color: #666;">Stock: ${product.stock || 'Tersedia'}</span>
                        </div>
                        
                        <div style="text-align: center;">
                            <a href="https://wa.me/6281234567890?text=Halo, saya tertarik dengan produk ${product.name}" 
                               target="_blank"
                               style="
                                   display: inline-block;
                                   background: #25D366;
                                   color: white;
                                   padding: 12px 24px;
                                   text-decoration: none;
                                   border-radius: 6px;
                                   font-weight: bold;
                               ">
                                <i class="fab fa-whatsapp" style="margin-right: 8px;"></i>
                                Pesan via WhatsApp
                            </a>
                        </div>
                    </div>
                </div>
            `;

            document.body.appendChild(modal);

            // Close modal functionality
            modal.addEventListener('click', (e) => {
                if (e.target === modal || e.target.classList.contains('close-modal')) {
                    document.body.removeChild(modal);
                }
            });
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FeaturedProducts();
});
