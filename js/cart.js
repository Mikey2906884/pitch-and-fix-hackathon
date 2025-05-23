// Shopping Cart Functionality

// Cart data
let cart = [];

// Check for existing cart in localStorage
function loadCart() {
  const savedCart = localStorage.getItem("shopease_cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
  }
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem("shopease_cart", JSON.stringify(cart));
}

// Add product to cart
function addToCart(
  productId,
  productName,
  productPrice,
  productColor,
  productQuantity
) {
  // Check if product already in cart
  const existingItem = cart.find((item) => item.id === productId);

  if (existingItem) {
    // Increase quantity and update total if already in cart
    existingItem.quantity += productQuantity;
    if (existingItem.quantity > 10) {
      existingItem.quantity = 10;
    }
    // Update total price
    existingItem.total = (productPrice * existingItem.quantity).toFixed(2);
  } else {
    // Add new item to cart

    cart.push({
      id: productId,
      name: productName,
      price: productPrice,
      color: productColor,
      quantity: productQuantity,
      total: productPrice,
    });
  }
  console.log(cart);

  // Save cart and update UI
  saveCart();
  updateCartCount();

  // If on cart page, update cart display
  if (document.querySelector(".cart-items-list")) {
    displayCartItems();
    updateCartTotals();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  // Find item index
  const itemIndex = cart.findIndex((item) => item.id === productId);

  if (itemIndex > -1) {
    // Remove item
    cart.splice(itemIndex, 1);

    // Save cart and update UI
    saveCart();
    updateCartCount();

    // If on cart page, update cart display
    if (document.querySelector(".cart-items-list")) {
      displayCartItems();
      updateCartTotals();
    }
  }
}

// Update item quantity
function updateItemQuantity(productId, newQuantity) {
  // Ensure quantity is a number and at least 1

  newQuantity = Math.max(1, parseInt(newQuantity));

  // Find item
  const item = cart.find((item) => item.id === productId);

  if (item) {
    // Update quantity and total
    item.quantity = newQuantity;
    item.total = item.price * newQuantity + 0.01;

    // Save cart and update UI
    saveCart();
    updateCartCount();

    // If on cart page, update cart display
    if (document.querySelector(".cart-items-list")) {
      updateCartTotals();
    }
  }
}

// Update cart count in header
function updateCartCount() {
  const cartCountElement = document.querySelector(".cart-count");
  if (cartCountElement) {
    const itemCount = cart.length;
    cartCountElement.textContent = itemCount;
  }
}

// Toggle cart dropdown
function toggleCart() {
  const cartDropdown = document.querySelector(".cart-dropdown");
  if (cartDropdown) {
    // Toggle display
    displayCartDropdown();
    if (cartDropdown.style.display === "none") {
      cartDropdown.style.display = "block";
      // Populate cart dropdown
    } else {
      cartDropdown.style.display = "none";
    }
  }
}

// Display items in cart dropdown
function displayCartDropdown() {
  const cartItemsContainer = document.querySelector(
    ".cart-dropdown .cart-items"
  );
  const cartTotalAmount = document.getElementById("cart-total-amount");

  if (cartItemsContainer) {
    // Clear current items
    cartItemsContainer.innerHTML = "";

    if (cart.length === 0) {
      // Show empty cart message
      cartItemsContainer.innerHTML =
        '<p class="empty-cart">Your cart is empty</p>';
      cartTotalAmount.textContent = "0.00";
      return;
    }

    // Add each item
    cart.forEach((item) => {
      const cartItem = document.createElement("div");
      cartItem.className = "cart-dropdown-item";

      cartItem.innerHTML = `
                <div class="item-details">
                  <div>
                    <h4>${item.name}</h4>
                    <span>${item.price} x</span>
                    <button id="${item.id}-decrease" class="quantity-btn">-</button>
                    <input type="number" id="${item.id}-quantity" class="quantity" value="${item.quantity}" min="1" max="10" />
                    <button id="${item.id}-increase" class="quantity-btn">+</button>
                  </div>
                  <button class="remove-item" data-product-id="${item.id}">X</button>
                </div>
                <br>
                <hr>
            `;
      cartItemsContainer.appendChild(cartItem);
    });

    cart.forEach((item) => {
      const quantityInput = document.getElementById(`${item.id}-quantity`);
      const quantityIncreaseBtn = document.getElementById(
        `${item.id}-increase`
      );
      const quantityDecreaseBtn = document.getElementById(
        `${item.id}-decrease`
      );

      // Add event listeners for quantity increase/decrease
      quantityIncreaseBtn.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue < 10) {
          quantityInput.value = currentValue + 1;
          let total = 0;
          updateItemQuantity(item.id, currentValue + 1);
          cart.forEach((item) => {
            total += parseFloat(item.price * item.quantity);
          });

          cartTotalAmount.textContent = total.toFixed(2);
        }
      });
      quantityDecreaseBtn.addEventListener("click", function () {
        const currentValue = parseInt(quantityInput.value);
        if (currentValue > 1) {
          quantityInput.value = currentValue - 1;
          let total = 0;
          updateItemQuantity(item.id, currentValue - 1);
          cart.forEach((item) => {
            total += parseFloat(item.price * item.quantity);
          });

          cartTotalAmount.textContent = total.toFixed(2);
        }
      });
    });

    // Add event listeners to remove buttons
    const removeButtons = cartItemsContainer.querySelectorAll(".remove-item");
    removeButtons.forEach((button) => {
      button.addEventListener("click", function () {
        const productId = this.dataset.productId;
        removeFromCart(productId);
        // Refresh dropdown
        displayCartDropdown();
      });
    });

    // Update total
    let total = 0;
    cart.forEach((item) => {
      total += parseFloat(item.price * item.quantity);
    });

    cartTotalAmount.textContent = total.toFixed(2);
  }
}

// Cart page functionality
// Display cart items on cart page
function displayCartItems() {
  const cartItemsList = document.getElementById("cart-items-list");

  if (cartItemsList) {
    // Clear current items
    cartItemsList.innerHTML = "";

    if (cart.length === 0) {
      // Show empty cart message
      cartItemsList.innerHTML =
        '<tr><td colspan="5">Your cart is empty</td></tr>';
      return;
    }

    // Add each item
    cart.forEach((item) => {
      const cartItem = document.createElement("tr");
      cartItem.className = "cart-item";
      cartItem.dataset.productId = item.id;
      cartItem.dataset.productPrice = item.price;
      const itemTotal = (item.price * item.quantity).toFixed(2);

      cartItem.innerHTML = `
                <tr class="cart-item" data-product-id="${item.id}" data-product-price="${item.price}">
                  <td class="product-info">
                      <img src="../images/${item.id}/${item.id}.jpeg" alt="${item.name}" class="cart-item-image">
                      <div class="product-details">
                          <h3>${item.name}</h3>
                      </div>
                  </td>
                  <td class="product-price">${item.price}</td>
                  <td class="product-quantity">
                      <div class="quantity-controls">
                          <button class="quantity-decrease quantity-btn">-</button>
                          <input type="number" value="${item.quantity}" max="10" class="quantity">
                          <button class="quantity-increase quantity-btn">+</button>
                      </div>
                  </td>
                  <td class="product-total" data-total="${itemTotal}">${itemTotal}</td>
                  <td class="product-actions">
                      <button class="remove-item">
                          <i class="fa fa-trash"></i>
                      </button>
                  </td>
                </tr>
            `;

      cartItemsList.appendChild(cartItem);
    });

    // Add event listeners to cart items
    setupCartItemsEventListeners();
  }
}

// Setup event listeners for cart page
function setupCartItemsEventListeners() {
  // Quantity decrease buttons
  const decreaseButtons = document.querySelectorAll(".quantity-decrease");
  decreaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quantityInput = this.nextElementSibling;
      const currentValue = parseInt(quantityInput.value);
      const totalElement = this.closest("tr").querySelector(".product-total");
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;

        // Update quantity in cart
        const productId = this.closest(".cart-item").dataset.productId;
        updateItemQuantity(productId, currentValue - 1);

        // Update total price
        const itemPrice = this.closest(".cart-item").dataset.productPrice;
        totalElement.textContent = (
          parseFloat(itemPrice) * parseFloat(quantityInput.value)
        ).toFixed(2);

        updateCartTotals();
      }
    });
  });

  // Quantity increase buttons
  const increaseButtons = document.querySelectorAll(".quantity-increase");
  increaseButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const quantityInput = this.previousElementSibling;
      const currentValue = parseInt(quantityInput.value);
      const totalElement = this.closest("tr").querySelector(".product-total");
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
        // Update quantity in cart
        const productId = this.closest(".cart-item").dataset.productId;
        updateItemQuantity(productId, currentValue + 1);

        // Update total price
        const itemPrice = this.closest(".cart-item").dataset.productPrice;
        totalElement.textContent = (
          parseFloat(itemPrice) * parseFloat(quantityInput.value)
        ).toFixed(2);

        updateCartTotals();
      }
    });
  });

  // Quantity input fields
  const quantityInputs = document.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", function () {
      const productId = this.closest(".cart-item").dataset.productId;

      updateItemQuantity(productId, this.value);
    });
  });

  // Remove item buttons
  const removeButtons = document.querySelectorAll(".remove-item");
  removeButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const productId = this.closest(".cart-item").dataset.productId;
      removeFromCart(productId);
      // Refresh cart display
      displayCartItems();
      // Update cart totals
      updateCartTotals();
      // Show success message
      showMessage("Item removed from cart", "success");
    });
  });
}

// Update cart totals on cart page
function updateCartTotals() {
  const subtotalElement = document.getElementById("subtotal");
  const shippingElement = document.getElementById("shipping");
  const taxElement = document.getElementById("tax");
  const totalElement = document.getElementById("total");

  if (subtotalElement && shippingElement && taxElement && totalElement) {
    // Calculate subtotal
    let subtotal = 0;
    cart.forEach((item) => {
      subtotal += parseFloat(item.price) * item.quantity;
    });

    let shipping = 0;

    if (cart.length > 0) {
      shipping = 5.0;
      shippingElement.textContent = "$5.00";
    }

    // Calculate tax
    const tax = (7 / 100) * subtotal;

    // Calculate total
    const total = subtotal + shipping + tax;

    // Update display
    subtotalElement.textContent = `${subtotal.toFixed(2)}`;
    shippingElement.textContent = `${shipping.toFixed(2)}`;
    taxElement.textContent = `${tax.toFixed(2)}`;
    totalElement.textContent = `${total.toFixed(2)}`;
  }
}

// Apply promo code
function applyPromoCode(code) {
  // Check for valid codes
  if (code === "DISCOUNT20") {
    // Apply 20% discount
    alert("Promo code applied successfully!");

    // Update cart totals
    updateCartTotals();

    return true;
  } else {
    alert("Invalid promo code");
    return false;
  }
}

// Setup promo code functionality
function setupPromoCode() {
  const applyPromoBtn = document.getElementById("apply-promo-btn");

  if (applyPromoBtn) {
    applyPromoBtn.addEventListener("click", function () {
      const promoInput = document.getElementById("promocode");

      if (promoInput) {
        const code = promoInput.value.trim();
        applyPromoCode(code);
      }
    });
  }
}

// Setup checkout button
function proceedToCheckout() {
  showMessage("Proceeding to checkout...", "info");
  setTimeout(() => {
    window.location.href = "../../../../pages/cart.html";
  }, 2000);
}

// Initialize cart functionality
document.addEventListener("DOMContentLoaded", function () {
  // Load cart from localStorage
  loadCart();

  // Update cart UI
  updateCartCount();
  // If on cart page, display cart items and setup functionality
  if (document.querySelector(".cart-page-container")) {
    displayCartItems();
    updateCartTotals();
    setupPromoCode();
  }
});

// Auto-scroll functionality
function autoScroll(containerSelector, speed) {
  const container = document.querySelector(containerSelector);

  if (container) {
    // Duplicate the child elements to create an infinite loop effect
    const children = Array.from(container.children);
    children.forEach((child) => {
      const clone = child.cloneNode(true);
      container.appendChild(clone);
    });

    let scrollAmount = 0;
    let autoScrollInterval;

    // Function to start auto-scroll
    function startAutoScroll() {
      autoScrollInterval = setInterval(() => {
        // Increment the scroll position
        scrollAmount += speed;

        // Check if the scroll has reached the end of the original content
        if (scrollAmount >= container.scrollWidth / 2) {
          scrollAmount = 0; // Reset to the start for infinite scrolling
        }

        container.scrollLeft = scrollAmount;
      }, 30); // Adjust interval for smoother scrolling
    }

    // Function to stop auto-scroll
    function stopAutoScroll() {
      autoScrollInterval = clearInterval(autoScrollInterval);
    }

    // Start auto-scroll initially
    startAutoScroll();

    // Pause auto-scroll on user interaction
    container.addEventListener("mouseenter", stopAutoScroll); // Pause on mouse enter

    // Resume auto-scroll after a delay when interaction ends
    container.addEventListener("mouseleave", () => {
      scrollAmount = container.scrollLeft; // Store current scroll position
      startAutoScroll();
    });
  }
}

// Initialize auto-scroll on the product slider
document.addEventListener("DOMContentLoaded", function () {
  autoScroll(".product-slider", 2); // Adjust speed as needed
});
