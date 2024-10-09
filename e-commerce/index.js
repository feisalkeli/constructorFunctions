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

function Inventory() {
  this.product = [];

  this.addProduct = function (product) {
    const addProduct = this.product.push(product);
    return addProduct;
  };
  this.removeProduct = function (productId) {
    const removeProduct = this.product.filter((prod) => prod.id !== productId);
    return removeProduct;
  };
  this.getProductById = function (productId) {
    return this.product.find((prod) => prod.id === productId);
  };

  this.getProductsByCategory = function (category) {
    return this.product.map((item) => item.category === category);
  };

  this.applyDiscountCategory = function (category, discountPercentage) {
    this.product.forEach((item) => {
      if (item.category === category) {
        item.price === item.price - item.price * (discountPercentage / 100);
      }
    });
  };
}

function SearchEngine() {
  this.search = function (inventory, query) {
    const newQueryString = query.toLowerCase();
    return inventory.filter((item) => {
      const foundName = item.name.toLowerCase().includes(newQueryString);
      const foundTags = item.tag.toLowerCase().includes(newQueryString);

      return foundName || foundTags;
    });
  };
}

function ShoppingCart() {
  this.products = [];
  this.quantity = [];

  this.addItem = function (product, quantity) {
    const existingProduct = this.products.find(
      (item) => item.product.id === product.id
    );
    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      this.products.push({ product, quantity });
    }
  };
  this.removeItem = function (productId) {
    return this.products.filter((item) => item.id !== productId);
  };
  this.updateQuantity = function (productId, newQuantity) {
    const product = this.products.find((item) => item.id === productId);

    if (product) {
      product.quantity = newQuantity;
      return product;
    }
  };
  this.getTotalPrice = function () {
    return this.products.reduce((total, product) => {
      return total + product.price;
    }, 0);
  };

  this.applyDiscountCode = function () {};
}
