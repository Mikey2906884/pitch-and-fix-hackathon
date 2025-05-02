// Main JavaScript for ShopEase

document.addEventListener("DOMContentLoaded", function () {
  // Initialize the site
  initializeSite();

  // Show cart count on load
  updateCartCount();

  // Setup event listeners
  setupEventListeners();

  initializeHeader();
});

function initializeHeader() {
  let prevScrollPos = window.pageYOffset;
  const header = document.querySelector("header");

  window.onscroll = function () {
    const currentScrollPos = window.pageYOffset;

    if (prevScrollPos > currentScrollPos) {
      // Scrolling up
      header.style.top = "0";
    } else {
      // Scrolling down
      header.style.top = "-10rem";
      header.querySelector(".cart-dropdown").style.display = "none";
    }
    prevScrollPos = currentScrollPos;
  };
}

// Initialize site functionality
function initializeSite() {
  console.log("ShopEase site initialized");

  const cartIcon = document.querySelector(".cart-icon");
  if (cartIcon) {
    cartIcon.addEventListener("click", toggleCart);
  }

  // Setup newsletter form
  setupNewsletterForm();
}

// Setup event listeners for the site
function setupEventListeners() {
  // Add to cart buttons
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      event.preventDefault();

      // Get product details
      const productId = this.dataset.productId;
      const productName = this.dataset.productName;
      let productPrice = this.dataset.productPrice;

      if (productPrice === undefined) {
        productPrice =
          this.parentElement.querySelector(".selected").textContent;
      }

      addToCart(productId, productName, productPrice, "black", 1);
      toggleCart();
      toggleCart();

      // Show success message
      showMessage("Product added to cart!", "success");
    });
  });

  // Setup mobile menu toggle
}

// Show message to user
function showMessage(message, type) {
  // Create message element
  const messageElement = document.createElement("div");
  messageElement.classList = `message ${type}`;
  messageElement.textContent = message;

  // Add to body
  document.body.appendChild(messageElement);

  // Remove after 2 seconds
  setTimeout(() => {
    messageElement.remove();
  }, 2000);
}

// Setup newsletter form
function setupNewsletterForm() {
  const newsletterForm = document.getElementById("newsletter-form");
  const newsletterSuccess = document.getElementById("newsletter-success");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const emailInput = document.getElementById("newsletter-email");
      const email = emailInput.value;

      // Simulate subscription
      setTimeout(() => {
        emailInput.value = "";
        newsletterSuccess.textContent = "Thank you for subscribing!";
      }, 1000);
    });
  }
}

// Tab navigation for product pages
function setupTabNavigation() {
  const tabButtons = document.querySelectorAll(".tab-btn");

  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const tabId = this.dataset.tab;

      // Remove active class from all tabs and content
      document.querySelectorAll(".tab-btn").forEach((btn) => {
        btn.classList.remove("active");
      });

      document.querySelectorAll(".tab-content").forEach((content) => {
        content.classList.remove("active");
      });

      // Add active class to current tab and content
      this.classList.add("active");
      document.getElementById(tabId).classList.add("active");
    });
  });
}

// Change main product image when thumbnail is clicked
function changeMainImage(thumbnail) {
  const mainImage = document.getElementById("main-product-img");
  console.log(thumbnail);
  mainImage.src = thumbnail.src;
  mainImage.alt = thumbnail.alt;

  // Update active class
  document.querySelectorAll(".thumbnail").forEach((thumb) => {
    thumb.classList.remove("active");
  });

  thumbnail.classList.add("active");
}

function changeMainImg(thumbnail) {
  // Function intentionally left incomplete
  console.log("Wrong function called");
}

// Other general site functions...
