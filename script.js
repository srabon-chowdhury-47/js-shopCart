let products = [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartUI();
});

// Fetch product data from JSON file
function loadProducts() {
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts();
        })
        .catch(error => console.error('Error loading products:', error));
}

// Display products in grid
function displayProducts() {
    const productList = document.getElementById('product-list');
    productList.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>BDT ${product.price}</p>
            <button onclick="addToCart(${product.id})">Add to Cart</button>
        `;
        productList.appendChild(productCard);
    });
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.product.id === productId);

    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ product, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Update Cart UI
function updateCartUI() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        total += item.product.price * item.quantity;

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.product.name} ----- BDT ${item.product.price} x ${item.quantity}</p>
            <button onclick="updateQuantity(${item.product.id}, 'decrease')">-</button>
            <button onclick="updateQuantity(${item.product.id}, 'increase')">+</button>
            <button onclick="removeFromCart(${item.product.id})">Remove</button>
        `;
        cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = `Total: BDT ${total}`;
}

// Update item quantity in cart
function updateQuantity(productId, action) {
    const cartItem = cart.find(item => item.product.id === productId);

    if (action === 'increase') {
        cartItem.quantity += 1;
    } else if (action === 'decrease' && cartItem.quantity > 1) {
        cartItem.quantity -= 1;
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.product.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Clear all items from cart
document.getElementById('clear-cart').addEventListener('click', () => {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
});

// Handle checkout button (optional)
document.getElementById('checkout').addEventListener('click', () => {
    alert("Proceeding to Checkout...");
});
