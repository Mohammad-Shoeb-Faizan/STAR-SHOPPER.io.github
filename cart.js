const tableitemsDiv = document.querySelector(".tableitems");

// Get cart items from local storage
const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

// Get the cart table body element
const cartTableBody = document.getElementById("cart-table-body");

// Loop through the cart items and add rows to the table
let totalQuantity = 0;
let totalPrice = 0;
cartItems.forEach((item) => {
  // Create a new table row
  const newRow = document.createElement("tr");

  // Create table cells for product name, quantity, price and delete button
  const nameCell = document.createElement("td");
  const quantityCell = document.createElement("td");
  const priceCell = document.createElement("td");
  const deleteCell = document.createElement("td");

  // Fill the table cells with data
  nameCell.textContent = item.title;
  quantityCell.textContent = 1;
  priceCell.textContent = "₹" + item.price;
  totalQuantity += parseInt(quantityCell.textContent);
  totalPrice += parseInt(item.price);

  // Add the delete button to the delete cell
  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = "&times";
  deleteButton.id = 'closebutton';
  deleteButton.addEventListener("click", () => {
    const index = cartItems.indexOf(item);
    cartItems.splice(index, 1);
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    newRow.remove();
  });
  deleteCell.appendChild(deleteButton);

  // Add the table cells to the row
  newRow.appendChild(nameCell);
  newRow.appendChild(quantityCell);
  newRow.appendChild(priceCell);
  newRow.appendChild(deleteCell);

  // Add the row to the table body
  cartTableBody.appendChild(newRow);

  // Add normal price property to item
  item.normalPrice = item.price;
});

// Add a row for the total quantity and price
const totalRow = document.createElement("tr");
const totalHeadingCell = document.createElement("th");
const totalQuantityCell = document.createElement("td");
const totalPriceCell = document.createElement("td");

totalHeadingCell.textContent = "Total";
totalQuantityCell.textContent = totalQuantity;
totalPriceCell.textContent = "₹" + totalPrice;

totalRow.appendChild(totalHeadingCell);
totalRow.appendChild(totalQuantityCell);
totalRow.appendChild(totalPriceCell);

cartTableBody.appendChild(totalRow);

let checkout = document.createElement("button");
checkout.innerText = "Move To Checkout";
checkout.classList.add("checkoutButton");

// Add an event listener to the purchase button
checkout.addEventListener("click", () => {
  // Add the cart items to myOrders
  const myOrders = JSON.parse(localStorage.getItem("myOrders")) || [];
  const order = { items: cartItems, totalPrice: totalPrice };
  myOrders.push(order);
  localStorage.setItem("myOrders", JSON.stringify(myOrders));

  // Redirect to orders.html
  location.href = "orders.html";
});

tableitemsDiv.appendChild(checkout);

// Get the logout button element
const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", function () {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-5);
});