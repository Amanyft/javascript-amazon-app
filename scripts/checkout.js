import {cart, removeFromCart,updateDeliveryOption} from '../data/cart.js';
import { deliveryOptions } from '../data/deliveryOptions.js';
import {products}from'../data/products.js';
import {formatCurrency} from './utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

const today=dayjs();
function renderOrderSummary(){
  let cartHTML='';
  cart.forEach((cartItem) => {
  
    const productId = cartItem.productId;

    let matchingProduct;
  
    products.forEach((product) => {
   
      if (product.id == productId) {
        matchingProduct = product;
      }
    });

    const deliveryOption=cartItem.deliveryOptionsId;

    let matchingOption;
    deliveryOptions.forEach((option)=>{
         if(option.id==deliveryOption)
            matchingOption=option
       
    });

    

    let deliveryDate=today.add(matchingOption.deliveryDays,'days');

    deliveryDate=deliveryDate.format('dddd, MMMM D');
    function renderOrderSummary(){
      
    }

    const html=`<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${deliveryDate}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src=${matchingProduct.image}>

              <div class="cart-item-details">
                <div class="product-name">
                ${matchingProduct.name}
                </div>
                <div class="product-price">
                  $ ${formatCurrency(matchingProduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary">
                    Update
                  </span>
                  <span class="delete-quantity-link link-primary js-item-delete" data-product-id="${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               ${deliveryOptionsHTML(matchingProduct,cartItem)}
                
                
              </div>
            </div>
          </div>`;
    cartHTML+=html;

})
function deliveryOptionsHTML(matchingProduct,cartItem){
  let html='';
  deliveryOptions.forEach((option)=>{
    const today=dayjs();
    const deliveryDate=today.add(option.deliveryDays,'days');
    const DateString=deliveryDate.format('dddd, MMMM D');

    const priceString=option.priceCents===0 ? 'FREE':`$${formatCurrency(option.priceCents)}-`;

    const checked=(option.id==cartItem.deliveryOptionsId);

    html+=`<div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${option.id}">
                  <input type="radio"
                    ${checked ?'checked':''}
                    class="delivery-option-input"
                    name="delivery-option-${matchingProduct.id}">
                  <div>
                    <div class="delivery-option-date">
                      ${DateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} Shipping
                    </div>
                  </div>
                </div>`;

  });
  return html;
}
document.querySelector('.js-order').innerHTML=cartHTML;

document.querySelectorAll('.js-item-delete')
    .forEach((link)=>{
        link.addEventListener('click',()=>{
          const productId=link.dataset.productId;
          removeFromCart(productId);

          const container = document.querySelector(
            `.js-cart-item-container-${productId}`
          );
          container.remove();
        });
    });

document.querySelectorAll('.js-delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {

        const {productId, deliveryOptionId} = element.dataset;
        updateDeliveryOption(productId, deliveryOptionId);
        renderOrderSummary();
      });
    });
   
}

renderOrderSummary();
