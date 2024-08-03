import {cart, removeFromCart,
  calculateCartQuantity} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from './utils/money.js';

updateCartQuantity();

let cartSummaryHTML = '';
cart.forEach((cartItem) => {
  const productId = cartItem.productId;
  const productQuantity = cartItem.quantity;
  let matchingItem;
  updateCartQuantity();
  products.forEach((product) => {
    if(product.id === productId){
      matchingItem = product;
    }
  });

  cartSummaryHTML += `
    <div class="cart-item-container 
      js-cart-item-container-${matchingItem.id}">
      <div class="delivery-date">
        Delivery date: Tuesday, June 21
      </div>

      <div class="cart-item-details-grid">
        <img class="product-image"
          src="${matchingItem.image}">

        <div class="cart-item-details">
          <div class="product-name">
            ${matchingItem.name}
          </div>
          <div class="product-price">
          $${formatCurrency(matchingItem.priceCents)}
          </div>
          <div class="product-quantity">
            <span>
              Quantity: <span class="quantity-label">${productQuantity}</span>
            </span>
            <span class="update-quantity-link link-primary">
              Update
            </span>
            <span class="delete-quantity-link link-primary
             js-delete-link" data-product-id="${matchingItem.id}">
              Delete
            </span>
          </div>
        </div>

        <div class="delivery-options">
          <div class="delivery-options-title">
            Choose a delivery option:
          </div>
          <div class="delivery-option">
            <input type="radio" checked
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Tuesday, June 21
              </div>
              <div class="delivery-option-price">
                FREE Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Wednesday, June 15
              </div>
              <div class="delivery-option-price">
                $4.99 - Shipping
              </div>
            </div>
          </div>
          <div class="delivery-option">
            <input type="radio"
              class="delivery-option-input"
              name="delivery-option-${matchingItem.id}">
            <div>
              <div class="delivery-option-date">
                Monday, June 13
              </div>
              <div class="delivery-option-price">
                $9.99 - Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div> 
  `;
});

document.querySelector('.js-order-summary')
  .innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () =>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      const contaier = document.querySelector(`.js-cart-item-container-${productId}`);
      contaier.remove();
      updateCartQuantity();
    })
  })
  
  
function updateCartQuantity(){

 const cartQuantity = calculateCartQuantity()

  if (!cartQuantity) {
   document.querySelector('.js-checkout-cart-quantity')
    .innerHTML =`Checkout (<a class="return-to-home-link" href="amazon.html"></a>)`
  } else {
    document.querySelector('.js-checkout-cart-quantity')
    .innerHTML =`Checkout (<a class="return-to-home-link" href="amazon.html">${cartQuantity} items</a>)`
  }
};
