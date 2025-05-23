// Product Detail Page Functionality
let recentlyViewedProducts = [];

function loadRecentlyViewedProducts() {
  const storedProducts = localStorage.getItem("recentlyViewedProducts");
  if (storedProducts) {
    recentlyViewedProducts = JSON.parse(storedProducts);
  }

  // Add list of recently viewed products to the page
  const recentlyViewedContainer = document.querySelector(".recently-viewed");
  if (recentlyViewedContainer && recentlyViewedProducts.length > 1) {
    recentlyViewedContainer.innerHTML = `
      <h2>Recently Viewed Products</h2>
      <div class="product-grid"></div>
  `;
  }

  // Loop through recently viewed products and create elements
  const productFlexList = document.querySelector(
    ".recently-viewed .product-grid"
  );
  if (productFlexList) {
    productFlexList.style.gridTemplateColumns = `repeat(${
      recentlyViewedProducts.length - 1
    }, 1fr)`;
    productFlexList.style.padding = "0 2rem";
    for (
      let product = 0;
      product < recentlyViewedProducts.length - 1;
      product++
    ) {
      let productCard = document.createElement("div");
      productFlexList.appendChild(productCard);
      productCard.outerHTML =
        "<div class='product-card' onclick='addToRecentlyViewed(this)'></div>";

      productCard = document.querySelectorAll(
        ".recently-viewed .product-grid .product-card"
      )[product];
      productCard.innerHTML = recentlyViewedProducts[product];
    }
  }
}

function saveRecentlyViewedProducts() {
  localStorage.setItem(
    "recentlyViewedProducts",
    JSON.stringify(recentlyViewedProducts)
  );
}

function addToRecentlyViewed(div) {
  if (recentlyViewedProducts.includes(div.innerHTML)) {
    const itemIndex = recentlyViewedProducts.findIndex(
      (product) => product === div.innerHTML
    );
    recentlyViewedProducts.splice(itemIndex, 1);
  }
  // Add the product to the list if it is not already there
  recentlyViewedProducts.push(div.innerHTML);

  // Limit to 5 products
  if (recentlyViewedProducts.length > 5) {
    recentlyViewedProducts.shift(); // Remove the oldest product
  }

  // Save to local storage
  saveRecentlyViewedProducts();
}

document.addEventListener("DOMContentLoaded", function () {
  // Initialize product detail functionality
  initializeProductDetail();

  // Setup tab navigation
  setupTabNavigation();

  // Setup quantity controls
  setupQuantityControls();

  // Setup add to cart button
  setupAddToCart();

  // Setup color selection
  setupColorSelection();

  // Load recently viewed products
  loadRecentlyViewedProducts();
});

// Initialize product detail functionality
function initializeProductDetail() {
  console.log("Product detail page initialized");

  // Setup thumbnail gallery
  setupThumbnailGallery();
}

// Setup thumbnail gallery
function setupThumbnailGallery() {
  const thumbnails = document.querySelectorAll(".thumbnail");

  thumbnails.forEach((thumbnail) => {});
}

// Setup tab navigation
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get tab id from data attribute
      const tabId = this.getAttribute("data-tab");

      // Remove active class from all buttons and content
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to current button and content
      this.classList.add("active");

      const activeContent = document.getElementById(tabId);
      activeContent.classList.add("active");
    });
  });
}

// Setup quantity controls
function setupQuantityControls() {
  const decreaseBtn = document.getElementById("decrease-quantity");
  const increaseBtn = document.getElementById("increase-quantity");
  const quantityInput = document.getElementById("quantity");

  if (decreaseBtn && quantityInput) {
    decreaseBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue > 1) {
        quantityInput.value = currentValue - 1;
      }
    });
  }

  if (increaseBtn && quantityInput) {
    increaseBtn.addEventListener("click", function () {
      let currentValue = parseInt(quantityInput.value);
      if (currentValue < 10) {
        quantityInput.value = currentValue + 1;
      }
    });
  }

  if (quantityInput) {
    quantityInput.addEventListener("change", function () {
      // Ensure value is at least 1
      if (this.value < 1) {
        this.value = 1;
      }
    });
  }
}

// Setup add to cart button
function setupAddToCart() {
  const addToCartBtn = document.getElementById("add-to-cart");

  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", function () {
      // Get product details
      const productId = this.dataset.productId;
      const productName = this.dataset.productName;
      let productPrice = this.dataset.productPrice;

      if (productPrice === undefined) {
        productPrice =
          this.parentElement.querySelector(".selected").textContent;
      }
      // Get selected color
      const selectedColor = getSelectedColor();

      // Get quantity
      const quantity = parseInt(document.getElementById("quantity").value);

      addToCart(productId, productName, productPrice, selectedColor, quantity);
      toggleCart();
      toggleCart();

      // Show success message
      showMessage("Product added to cart!", "success");
    });
  }
}

// Get selected color
function getSelectedColor() {
  const selectedColorElement = document.querySelector(".color-option.selected");

  if (selectedColorElement) {
    return selectedColorElement.dataset.color;
  }

  return null;
}

// Show add to cart success message
function showAddToCartMessage() {
  // Create message element
  const messageElement = document.createElement("div");
  messageElement.className = "add-to-cart-message";
  messageElement.textContent = "Product added to cart!";

  // Add to body
  document.body.appendChild(messageElement);

  // Show message
  setTimeout(() => {
    messageElement.classList.add("show");
  }, 10);

  // Remove after 3 seconds
  setTimeout(() => {
    messageElement.classList.remove("show");

    // Remove from DOM after animation
    setTimeout(() => {
      messageElement.remove();
    }, 300);
  });
}

// Setup color selection
function setupColorSelection() {
  const colorOptions = document.querySelectorAll(".color-option");

  colorOptions.forEach((option) => {
    option.addEventListener("click", function () {
      // Remove selected class from all options
      colorOptions.forEach((opt) => opt.classList.remove("selected"));

      // Add selected class to clicked option
      this.classList.add("selected");
    });
  });
}
