let cart = [];

// Loop through a list of products
let products = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
];

let productCount = 0;

products.forEach((product) => {
  let productName = `${product.name} - Cart Entry ${productCount++}`;

  let cartItem = {
    id: product.id,
    name: productName,
    quantity: 1,
    price: product.price,
  };

  cart.push(cartItem);
});

console.log(cart);