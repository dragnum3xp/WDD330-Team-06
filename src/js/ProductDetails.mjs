import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export default class ProductDetails {

  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    // use the datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    this.product = await this.dataSource.findProductById(this.productId);
    // the product details are needed before rendering the HTML
    this.renderProductDetails();
    // once the HTML is rendered, add a listener to the Add to Cart button
    // Notice the .bind(this). This callback will not work if the bind(this) is missing. Review the readings from this week on "this" to understand why.
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    const cartItems = getLocalStorage("so-cart") || [];
    cartItems.push(this.product);
    setLocalStorage("so-cart", cartItems);
  }

  renderProductDetails() {
    productDetailsTemplate(this.product);
  }
}

function productDetailsTemplate(product) {
  const section = document.querySelector(".product-detail");

  const finalPrice = Number(product.FinalPrice);
  const retailPrice = Number(product.SuggestedRetailPrice);

  let priceHTML = `<span class="final-price">$${finalPrice.toFixed(2)}</span>`;

  if (retailPrice && retailPrice > finalPrice) {
    const discountPercent = Math.round(
      ((retailPrice - finalPrice) / retailPrice) * 100
    );

    priceHTML += `
      <span class="original-price">$${retailPrice.toFixed(2)}</span>
      <span class="discount-badge">Save ${discountPercent}%</span>
    `;
  }

  section.innerHTML = `
    <h2>${product.Brand.Name}</h2>
    <h3>${product.NameWithoutBrand}</h3>

    <img
      id="productImage"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />

    <p id="productPrice">${priceHTML}</p>
    <p><strong>Color:</strong> <span id="productColor">${product.Colors[0].ColorName}</span></p>

    <p id="productDesc">${product.DescriptionHtmlSimple}</p>

    <button id="addToCart" data-id="${product.Id}">
      Add to Cart
    </button>
  `;
}