document.addEventListener('DOMContentLoaded', function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarLinks = document.querySelector('.navbar-links');
    const cartBtn = document.querySelector('.cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const closeCartBtn = document.getElementById('close-cart');
    const overlay = document.querySelector('.overlay');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.product-main-img');
    const decreaseBtn = document.querySelector('.decrease-btn');
    const increaseBtn = document.querySelector('.increase-btn');
    const quantityElement = document.querySelector('.quantity');
    const addToCartBtn = document.querySelector('.add-to-cart');
    const cartItemsContainer = document.querySelector('.cart-items');
    const cartCount = document.querySelector('.cart-count');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let cart = [];
    let currentQuantity = 1;
    
    const productImages = [
      'images/image-product-1.jpg',
      'images/image-product-2.jpg',
      'images/image-product-3.jpg',
      'images/image-product-4.jpg'
    ];
    
    let currentImageIndex = 0;
    
    navbarToggle.addEventListener('click', function() {
      this.classList.toggle('active');
      navbarLinks.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    
    cartBtn.addEventListener('click', function() {
      cartSidebar.classList.toggle('active');
      overlay.classList.toggle('active');
    });
    
    closeCartBtn.addEventListener('click', function() {
      cartSidebar.classList.remove('active');
      overlay.classList.remove('active');
    });
    
    overlay.addEventListener('click', function() {
      cartSidebar.classList.remove('active');
      navbarLinks.classList.remove('active');
      navbarToggle.classList.remove('active');
      this.classList.remove('active');
    });
    
    thumbnails.forEach((thumbnail, index) => {
      thumbnail.addEventListener('click', function() {
        thumbnails.forEach(thumb => thumb.classList.remove('active'));
        
        this.classList.add('active');
        
        mainImage.src = this.dataset.image;
        currentImageIndex = index;
      });
    });

    prevBtn.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex - 1 + productImages.length) % productImages.length;
      updateMainImage();
    });
    
    nextBtn.addEventListener('click', function() {
      currentImageIndex = (currentImageIndex + 1) % productImages.length;
      updateMainImage();
    });
    
    function updateMainImage() {
      mainImage.src = productImages[currentImageIndex];
      
      thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
      });
    }
    
    decreaseBtn.addEventListener('click', function() {
      if (currentQuantity > 1) {
        currentQuantity--;
        quantityElement.textContent = currentQuantity;
      }
    });
    
    increaseBtn.addEventListener('click', function() {
      currentQuantity++;
      quantityElement.textContent = currentQuantity;
    });
    
    addToCartBtn.addEventListener('click', function() {
      const product = {
        id: 1,
        name: 'Fall Limited Edition Sneakers',
        price: 125.00,
        quantity: currentQuantity,
        image: 'images/image-product-1-thumbnail.jpg'
      };
      
      const existingItemIndex = cart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex !== -1) {
        cart[existingItemIndex].quantity += product.quantity;
      } else {
        cart.push(product);
      }
      
      updateCartUI();
      
      cartCount.classList.add('active');
      
      this.innerHTML = '<img src="images/icon-cart.svg" alt="" width="15" height="16"><span>Added to cart</span>';
      this.style.backgroundColor = '#4CAF50';
      
      setTimeout(() => {
        this.innerHTML = '<img src="images/icon-cart.svg" alt="" width="15" height="16"><span>Add to cart</span>';
        this.style.backgroundColor = '';
      }, 2000);
    });
    
    function updateCartUI() {
      const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
      cartCount.textContent = totalItems;
      
      if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        cartCount.classList.remove('active');
      } else {
        cartItemsContainer.innerHTML = cart.map(item => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-info">
              <p class="cart-item-title">${item.name}</p>
              <p class="cart-item-price">$${item.price.toFixed(2)} x ${item.quantity} <span class="cart-item-total">$${(item.price * item.quantity).toFixed(2)}</span></p>
            </div>
            <button class="remove-item" data-id="${item.id}" aria-label="Remover item">
              <img src="images/icon-delete.svg" alt="Remover">
            </button>
          </div>
        `).join('');
        
        document.querySelectorAll('.remove-item').forEach(btn => {
          btn.addEventListener('click', function() {
            const itemId = parseInt(this.dataset.id);
            removeFromCart(itemId);
          });
        });
      }
    }
    
    function removeFromCart(id) {
      cart = cart.filter(item => item.id !== id);
      updateCartUI();
    }
    
    updateCartUI();
  });