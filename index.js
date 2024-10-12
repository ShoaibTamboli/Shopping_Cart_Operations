const express = require('express');
const { resolve } = require('path');
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3000;

/* 
Shopping Cart Operations

Objective

In the previous chapters, we created a cart page for FlipDeal where we dealt with various API calls to calculate the cart amount based on various factors. Since, the APIs ran well, FlipDeal is now expecting to also give its customers the ability to add items to the cart, edit the quantity, delete items, and also read the current state of the cart page.
They have added some new items to their Product Listing Page:
Laptop
Mobile
Tablet
Cart Data
*/
const cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

/*
Endpoint 1: Add an Item to the Cart
Objective: Add a new item to the cart using the provided details.
Endpoint: /cart/add
Query Parameters:
productId: The ID of the product (integer).
name: The name of the product (string).
price: The price of the product (float).
quantity: The quantity of the product (integer).
Your Task: Create a function that will add a new item to the cart using the details provided in the query parameters.
Example Call:
http://localhost:3000/cart/add?productId=3&name=Tablet&price=15000&quantity=1
Expected Output:
{
	cartItems: [
	  { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
	  { 'productId': 3, 'name': 'Tablet', 'price': 15000, 'quantity': 1 }
	]
}

*/

function addItemsToCart(cart, productId, name, price, quantity) {
  cart.push({ productId, name, price, quantity });
  return cart;
}

app.get('/cart/add', (req, res) => {
  const productId = parseInt(req.query.productId);
  const name = req.query.name;
  const price = parseInt(req.query.price);
  const quantity = parseInt(req.query.quantity);
  const cartItems = addItemsToCart(cart, productId, name, price, quantity);
  res.json({ cartItems });
});

/* 
Endpoint 2: Edit Quantity of an Item in the Cart
Objective: Edit the quantity of an existing item in the cart based on the product ID.
Endpoint: /cart/edit
Query Parameters:
productId: The ID of the product (integer).
quantity: The new quantity of the product (integer).
Your Task: Create a function that will update the quantity of an item in the cart based on the product ID.
Example Call:
http://localhost:3000/cart/edit?productId=2&quantity=3
Expected Output:

{
	cartItems: [
	  { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 3 }
	]
}

*/

function editCartItems(cart, productId, quantity) {
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].productId === productId) {
      cart[i].quantity = quantity;
      break;
    }
  }
  return cart;
}

app.get('/cart/edit', (req, res) => {
  const productId = parseInt(req.query.productId);
  const quantity = parseInt(req.query.quantity);
  const carItems = editCartItems(cart, productId, quantity);
  res.json({ carItems });
});

/*
Endpoint 3: Delete an Item from the Cart
Objective: Delete an item from the cart based on the product ID.
Endpoint: /cart/delete
Query Parameters:
productId: The ID of the product to be deleted (integer).
Note: You’ll have to update the original array with the results of .filter() method. For example cart = cart.filter(...)
Your Task: Create a function that will remove an item from the cart based on the product ID.
Example Call:
http://localhost:3000/cart/delete?productId=1
Expected Output:

{
	cartItems: [
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 }
	]
}
*/

function removeItemFromCart(elem, productId) {
  return elem.productId !== productId;
}

app.get('/cart/delete', (req, res) => {
  const productId = parseInt(req.query.productId);
  const cartItems = cart.filter((e) => removeItemFromCart(e, productId));
  res.json({ cartItems });
});

/* 
Endpoint 4: Read Items in the Cart
Objective: Return the current list of items in the cart.
Endpoint: /cart
Your Task: Create a function that will return the current state of the cart.
Example Call:
http://localhost:3000/cart
Expected Output:
{
	cartItems: {
          { 'productId': 1, 'name': 'Laptop', 'price': 50000, 'quantity': 1 },
	  { 'productId': 2, 'name': 'Mobile', 'price': 20000, 'quantity': 2 },
	]
}
*/

function getAllCartItems(cart) {
  return cart;
}

app.get('/cart', (req, res) => {
  const cartItems = getAllCartItems(cart);
  res.json({ cartItems });
});

/*
Endpoint 5: Calculate Total Quantity of Items in the Cart
Objective: Calculate and return the total quantity of items in the cart.
Endpoint: /cart/total-quantity
Your Task: Create a function that will calculate the total quantity of items in the cart.
Example Call:
http://localhost:3000/cart/total-quantity
Expected Output:
{ 'totalQuantity': 3 }
*/

function calculateCartLength(cart) {
  let totalquantity = 0;
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].quantity) {
      totalquantity += cart[i].quantity;
    }
  }
  return totalquantity;
}

app.get('/cart/total-quantity', (req, res) => {
  const totalQuantity = calculateCartLength(cart);
  res.json({ totalQuantity });
});

/* 
Endpoint 6: Calculate Total Price of Items in the Cart
Objective: Calculate and return the total price of items in the cart based on their quantities and individual prices.
Endpoint: /cart/total-price
Your Task: Create a function that will calculate the total price of items in the cart.
Example Call:
http://localhost:3000/cart/total-price
Expected Output:
{ 'totalPrice': 90000 }
*/

function calculateTotalPrice(cart) {
  let totalPrice = 0;
  for (let i = 0; i < cart.length; i++) {
    totalPrice += cart[i].price * cart[i].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  const totalPrice = calculateTotalPrice(cart);
  res.json({ totalPrice });
});

/*
A few hints to help you out:

Add an Item to the Cart:
Use the push method to add a new item to the cart array.

Edit Quantity of an Item in the Cart:
Use a for loop to iterate over the cart array and update the quantity of the item with the matching productId.

Delete an Item from the Cart:
Use the filter method to remove the item with the matching productId from the cart array.

Read Items in the Cart:
Simply return the cart array as the response.

Calculate Total Quantity of Items in the Cart:
Use a for loop to iterate over the cart array and sum up the quantity of each item.

Calculate Total Price of Items in the Cart:
Use a for loop to iterate over the cart array and calculate the total price by summing up the product of price and quantity for each item.
*/

/* 
Summary

In this lesson, you will implement a series of endpoints to manage a shopping cart. You will:

Add items to the cart using the GET /cart/add endpoint.

Edit the quantity of items in the cart using the GET /cart/edit endpoint.

Delete items from the cart using the GET /cart/delete endpoint.

Read the current state of the cart using the GET /cart endpoint.

Calculate the total quantity of items in the cart using the GET /cart/total-quantity endpoint.

Calculate the total price of items in the cart using the GET /cart/total-price endpoint.

How to integrate the Backend APIs with FlipDeal’s Frontend UI?

Deploy your StackBlitz project to Vercel by following the steps in this document.
Copy the Vercel URL.

Once done, go to this link: https://bd-3-assignment.vercel.app/

Paste your Vercel URL to the Server URL text box.

Once you click “Save Changes”, it will show the Product Listing page with various filters and sorting parameters.

By the end of this lesson, you should be comfortable performing basic CRUD operations and calculations on an array of objects. Good luck and happy coding!
*/
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
