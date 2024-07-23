export const cart=[{
    productID:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2
},{
    productID:"15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
}
];

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