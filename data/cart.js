// Retrieve the cart data from local storage
let storedCart = localStorage.getItem('my_cart');

// Check if storedCart is null or empty, and initialize cart accordingly
export let cart = storedCart ? JSON.parse(storedCart) : [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity: 2,
    deliveryOptionsId: '1'
  }, {
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1,
    deliveryOptionsId: '2'
  }];


function UpdateCartQuantity(){
    let cart_quantity=0
    cart.forEach((item)=>{cart_quantity+=item.quantity;})
    console.log(cart_quantity);
    document.querySelector('.cart-quantity').innerHTML=cart_quantity;
  }


  function saveToStorage() {
    localStorage.setItem('my_cart', JSON.stringify(cart));
  }
  
export function addToCart(ID){
    let matchingItem=null;
  
       cart.forEach((item)=>{
    
        if(item.productId == ID)
            {matchingItem=item
            matchingItem.quantity = matchingItem.quantity+1}
       });
  
       if(matchingItem==null)
        
    {
    cart.push({
        productId: ID,
        quantity: 1,
        deliveryOptionsId:'1'
    });
  }
  UpdateCartQuantity();
  saveToStorage();
}

export function removeFromCart(productId) {
  const newCart = [];

  cart.forEach((cartItem) => {
    if (cartItem.productId != productId) {
      newCart.push(cartItem);
    }
  });

  cart = newCart;
  saveToStorage();

}
export function updateDeliveryOption(productId, deliveryOptionId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
      matchingItem = cartItem;
    }
  });

  matchingItem.deliveryOptionsId = deliveryOptionId;

  saveToStorage();
} 