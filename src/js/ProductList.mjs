import { renderListWithTemplate } from "./utils.mjs";

// Template function for product cards
function productCardTemplate(product) {
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

  return `<li class="product-card">
    <a href="product_pages/?product=${product.Id}">
      <img src="${product.Image}" alt="Image of ${product.Name}">
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.NameWithoutBrand}</h3>
      <p class="product-card__price">${priceHTML}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    // You passed in this information to make the class as reusable as possible.
    // Being able to define these things when you use the class will make it very flexible
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    // the dataSource will return a Promise...so you can use await to resolve it.
    const list = await this.dataSource.getData();
    // Filter to only show products we have detail pages for
    const filteredList = this.filterProducts(list);
    // render the list
    this.renderList(filteredList);
  }

  filterProducts(list) {
    // Only show products we have detail pages for
    const validProductIds = ["880RR", "985RF", "985PR", "344YJ"];
    return list.filter((product) => validProductIds.includes(product.Id));
  }

  renderList(list) {
    renderListWithTemplate(productCardTemplate, this.listElement, list);
  }
}
