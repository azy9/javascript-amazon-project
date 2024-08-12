import {cart, calculateCartQuantity} from "../../data/cart.js";

export function renderCheckoutHeader() {
  const checkoutHeader = document.querySelector('.js-checkout-cart-quantity');
  const cartQuantity = calculateCartQuantity();
  if (!cartQuantity) {
    checkoutHeader.innerHTML =`Checkout (<a class="return-to-home-link" href="amazon.html"></a>)`
  } else {
    checkoutHeader
      .innerHTML = `Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`
  }
}