// Product constructor
function Product(id, name, price, category, tags) {
  this.id = id;
  this.name = name;
  this.price = price;
  this.category = category;
  this.tags = tags;

  this.applyDiscount = function (percentage) {
    return this.price - this.price * (percentage / 100);
  };
}

// Inventory constructor
function Inventory() {
  this.products = [];

  this.addProduct = function (product) {
    this.products.push(product);
    return this.products;
  };

  this.removeProduct = function (productId) {
    this.products = this.products.filter((prod) => prod.id !== productId);
    return this.products;
  };

  this.getProductById = function (productId) {
    return this.products.find((prod) => prod.id === productId);
  };

  this.getProductsByCategory = function (category) {
    return this.products.filter((item) => item.category === category);
  };

  this.applyDiscountCategory = function (category, discountPercentage) {
    this.products.forEach((item) => {
      if (item.category === category) {
        item.price = item.applyDiscount(discountPercentage);
      }
    });
  };
}

function ShoppingCart() {
  this.items = [];

  this.addItem = function (product, quantity) {
    const existingProduct = this.items.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.items.push({ product, quantity });
    }
  };

  this.removeItem = function (productId) {
    this.items = this.items.filter((item) => item.product.id !== productId);
  };

  this.getTotalPrice = function () {
    return this.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
  };
}

// Initialize inventory and cart
const inventory = new Inventory();
const cart = new ShoppingCart();

const prod1 = new Product(1, "Laptop", 1000, "Electronics", ["tech", "work"]);
const prod2 = new Product(2, "Phone", 500, "Electronics", ["mobile", "gadget"]);
const prod3 = new Product(3, "T-Shirt", 20, "Clothing", ["fashion", "casual"]);
inventory.addProduct(prod1);
inventory.addProduct(prod2);
inventory.addProduct(prod3);

function updateInventoryDisplay() {
  const inventoryDiv = document.getElementById("inventory");
  inventoryDiv.innerHTML = ""; // Clear previous content
  inventory.products.forEach((product) => {
    const productInfo = `
      <div>
        <span>Id: ${product.id}, Name: ${product.name}, Price: $${product.price}, Category: ${product.category}</span>
        <button onclick="addToCart(${product.id})">Add to Cart</button>
      </div>
    `;
    inventoryDiv.innerHTML += productInfo;
  });
}

// Add product to cart
function addToCart(productId) {
  const product = inventory.getProductById(productId);
  const quantity = parseInt(prompt("Enter quantity:"), 10);
  if (product && quantity > 0) {
    cart.addItem(product, quantity);
    updateCartDisplay();
  }
}

// Update cart display
function updateCartDisplay() {
  const cartDiv = document.getElementById("cart");
  const totalPriceDiv = document.getElementById("total-price");
  cartDiv.innerHTML = ""; // Clear previous content
  cart.items.forEach((item) => {
    const cartInfo = `
      <div>
        <span>Name: ${item.product.name}, Price: $${item.product.price}, Quantity: ${item.quantity}</span>
        <button onclick="removeFromCart(${item.product.id})">Remove</button>
      </div>
    `;
    cartDiv.innerHTML += cartInfo;
  });

  // Update total price
  totalPriceDiv.textContent = cart.getTotalPrice();
}

// Remove product from cart
function removeFromCart(productId) {
  cart.removeItem(productId);
  updateCartDisplay();
}

// Initially display the inventory
updateInventoryDisplay();
