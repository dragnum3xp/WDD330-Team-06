import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
 
loadHeaderFooter();
 
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  const htmlItems = cartItems.map((item, index) =>
    cartItemTemplate(item, index)
  );

  document.querySelector(".product-list").innerHTML = htmlItems.join("");

  addRemoveItemListeners();
}
 
function cartItemTemplate(item, index) {
  return `
    <li class="cart-card divider">
      <a href="#" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="#">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0].ColorName}</p>
      <p class="cart-card__quantity">qty: 1</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
      <button class="remove-item" data-index="${index}">
        Remove
      </button>
    </li>
  `;
}

 



function addRemoveItemListeners() {
  const buttons = document.querySelectorAll(".remove-item");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const index = button.dataset.index;
      removeItemFromCart(index);
    });
  });
}

function removeItemFromCart(index) {
  const cartItems = getLocalStorage("so-cart") || [];

  cartItems.splice(index, 1);

  localStorage.setItem("so-cart", JSON.stringify(cartItems));

  renderCartContents();
  renderCartTotal();
}


function calculateCartTotal(cartItems) {
  return cartItems.reduce((sum, item) => {
    return sum + item.FinalPrice;
  }, 0);
}

function renderCartTotal() {
  const cartItems = getLocalStorage("so-cart") || [];
  const total = calculateCartTotal(cartItems);

  const totalElement = document.querySelector("#cart-total");
  totalElement.textContent = total.toFixed(2);
}

renderCartContents();
renderCartTotal();