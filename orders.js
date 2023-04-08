const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Create the parent container
const scrollableDiv = document.createElement("div");
scrollableDiv.classList.add("scrollable", "flex");


// Create the orders list div
const ordersListDiv = document.createElement("div");
ordersListDiv.classList.add("ordersList", "p-4");

// Create the total price div and h2 element
const totalPriceDiv = document.createElement("div");
totalPriceDiv.classList.add("totalPrice");

// Create the total price heading element
const totalPriceHeading = document.createElement("h2");
totalPriceHeading.textContent = "TOTAL COST : ";

// Create the span element for the total price
const totalPriceSpan = document.createElement("span");
totalPriceSpan.id = "totalPrice";

// Append the span element to the h2 heading element
totalPriceHeading.appendChild(totalPriceSpan);

// Append the h2 heading element to the total price div
totalPriceDiv.appendChild(totalPriceHeading);

// Append the total price div to the orders list div
ordersListDiv.appendChild(totalPriceDiv);

// Loop through the cartItems array and create a div for each item
let totalPrice = 0;
cartItems.forEach((item) => {
  // Get the image, title, and price of the item
  const image = item.image;
  const title = item.title;
  const price = item.price;

  // Create a div to hold the product details
  const productDiv = document.createElement("div");
  productDiv.classList.add("result");

  // Create an img element for the product image
  const imageElement = document.createElement("img");
  imageElement.src = image;
  imageElement.alt = title;
  imageElement.classList.add('imageElement');

  // Create a heading element for the product title
  const titleElement = document.createElement("h3");
  titleElement.textContent = title;

  // Create a span element for the product price
  const priceElement = document.createElement("span");
  priceElement.textContent = '₹' + price;

  // Append the product details to the product div
  productDiv.appendChild(imageElement);
  productDiv.appendChild(titleElement);
  productDiv.appendChild(priceElement);

  // Append the product div to the orders list div
  ordersListDiv.appendChild(productDiv);

  // Add the price of the item to the total price
  totalPrice += price;
});

// Set the total price in the span element
totalPriceSpan.textContent = '₹' + totalPrice;

// Append the orders list div to the parent container
scrollableDiv.appendChild(ordersListDiv);

// Append the parent container to the body
document.body.appendChild(scrollableDiv);

// Get the logout button element
const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", function () {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-6);
});