import {products} from './shopping-Website-products.js';
import {cart} from './shopping-Website-cart.js'
let cartQuantity = 0; 
function generateHtml(){
products.forEach((product)=>{
   let generatedHtml = `
            <img src="${product.img}" alt="" width="70%"
            class="css-product-image">
            <h1 class="css-product-name js-product-name">${product.displayName}</h1>
            <h1 class="css-rating">
               <h2 class="css-rating-stars js-rating-stars">${product.rating.stars}</h2>
               <h2 class="css-rating-count js-rating-count">from ${product.rating.count}</h2>
            </h1>
            <h1 class="css-price js-price">$ ${product.price /100}</h1>
            <h1 class="message-js-${product.name} css-message"> </h1>
            <button class="css-buy-now-button js-buy-${product.name}" data-product-id="${product.id}">Add to cart</button>
   `;
   let productBox = document.createElement('div')
   productBox.innerHTML = generatedHtml;
   productBox.classList.add('css-product-box')
   productBox.classList.add(`js-product-${product.name}`)
   document.querySelector('.css-product-container').appendChild(productBox);
   document.querySelector('.js-buy-' + product.name).addEventListener('click', ()=> {
      document.querySelector('.message-js-' +product.name).innerText = 'Added to cart✅'
      setTimeout(()=> {
      document.querySelector('.message-js-' +product.name).innerText = ''
      },2000)
      let matchingItem;
      cart.forEach((item)=> {
         if(product.id === item.id){
            matchingItem = item;
         }
      })
      if(matchingItem){
         matchingItem.quantity+=1;
      }else{
         cart.push({
            name:product.name,
            displayName:product.displayName,
            id:product.id,
            price:product.price, 
            quantity:1
         }
         )
      }
      cartQuantity++;
      document.querySelector('.js-cart-quantity').innerText = cartQuantity;
      console.log(cart)
   })
})}
generateHtml();
let openWindowSave = 0;
document.querySelector('.js-cart').addEventListener('click', ()=> {
   if(openWindowSave === 0){
   document.querySelector('.js-cart-display').style.opacity = "1.0"
   document.querySelector('.js-cart-display').style.bottom = "20rem"
   openWindowSave ++;
   }
   else{
   document.querySelector('.js-cart-display').style.opacity = "0"
   document.querySelector('.js-cart-display').style.bottom = "0rem"
   openWindowSave --;
   }
   document.querySelector('.js-products-order-list').innerHTML = '';
   generateCartHtml();
})
function generateCartHtml(){
   
   let totalPrice = 0;
   let priceAfterTax =0;
   cart.forEach((cartEntry)=>{
   totalPrice = totalPrice + (cartEntry.price * cartEntry.quantity);
   })
   totalPrice = totalPrice /100;
   priceAfterTax = totalPrice * 1.1;
   if(document.querySelector('.js-checkout-price').innerText ==='Total Price(shipping included):$' &&  document.querySelector('.js-after-tax').innerText === 'After Tax(10%):'){
   document.querySelector('.js-checkout-price').innerText += totalPrice;
   console.log(totalPrice)
   document.querySelector('.js-after-tax').innerText += priceAfterTax.toFixed(2);
   console.log(totalPrice)
   }
   else{
   document.querySelector('.js-checkout-price').innerText = 'Total Price(shipping included):$';
   document.querySelector('.js-after-tax').innerText ='After Tax(10%):';
   document.querySelector('.js-checkout-price').innerText += totalPrice;
   console.log(totalPrice)
   document.querySelector('.js-after-tax').innerText += priceAfterTax.toFixed(2);
   console.log(totalPrice)
   }
   cart.forEach((element, index)=> {
      let cartItemHtml =`
                  <div class="css-order-list-item-prop">Name: ${element.displayName} </div>
                  <div class="css-order-list-item-prop">Price: ${element.price /100} | Quantity:${element.quantity}</div>
                  <div class="css-remove-item-container">
                     <button class="js-remove-${element.name} css-remove-item" data-index="${element.id}">X</button>
                  </div>
      `
      let cartItemDiv = document.createElement('div')
      cartItemDiv.innerHTML = cartItemHtml;
      cartItemDiv.classList.add('css-order-list-item')
      cartItemDiv.classList.add('js-order-list-'+ element.name)
      document.querySelector('.js-products-order-list').appendChild(cartItemDiv)
      document.querySelector('.js-remove-' + element.name).addEventListener('click', ()=>{
         console.log(cart[index])
         cart.forEach((e,index)=>{
            if(document.querySelector('.js-remove-'+ element.name).dataset.index === e.id){
               let currentItemQ = e.quantity;
               cartQuantity = cartQuantity - currentItemQ;
               cart.splice(index,1)
               document.querySelector('.js-cart-quantity').innerText = cartQuantity;
            }
         })
         document.querySelector('.js-cart').click()
         document.querySelector('.js-cart').click()
         console.log(cart)
      })
   })
}