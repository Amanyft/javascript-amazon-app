export const cart=[];

export function addToCart(ID){
    let matchingItem
  
       cart.forEach((item)=>{
    
        if(item.productID === ID)
            {matchingItem=item
            matchingItem.quantity = matchingItem.quantity+1}
       })
  
       if(matchingItem==null)
        
    {
       cart.push({
        productID:ID,
        quantity:1
       })
      
    }
    UpdateCartQuantity();
  }