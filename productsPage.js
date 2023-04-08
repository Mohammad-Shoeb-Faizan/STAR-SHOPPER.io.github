import algoliasearch from "algoliasearch";

const client = algoliasearch("GQF8WC2F2X", "a1ef18706b77edbfae941fe9c3e9b473");
const index = client.initIndex("STAR SHOPPER");

let data = [];

let resultsRootElement = document.querySelector(".results");

fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    console.log(data);

    renderProducts(data);

    document.querySelector("#searchInput").addEventListener("keyup", (event) => {
      console.log("user typing");
      const inputVal = event.target.value;
      console.log(inputVal);
    });

    document.querySelector("#searchInput").addEventListener("input", (event) => {
      let searchTerm = event.target.value;
      let resultsArray = [];

      if (searchTerm && searchTerm.trim().length > 0) {
        index.search(searchTerm).then((res) => {
          resultsArray = res.hits;
          renderProducts(resultsArray);
        });
      } else {
        removeElements();
        renderProducts(data);
      }
    });

    document.querySelector("#minPriceInput").addEventListener("input", (event) => {
      let minPrice = event.target.value;
      filterProducts(minPrice, document.querySelector("#maxPriceInput").value);
    });

    document.querySelector("#maxPriceInput").addEventListener("input", (event) => {
      let maxPrice = event.target.value;
      filterProducts(document.querySelector("#minPriceInput").value, maxPrice);
    });

    document.querySelector(".pulldown").addEventListener("change", (event) => {
      const sortBy = event.target.value;
      const sortedData = sortProducts(data, sortBy);
      renderProducts(sortedData);
    });
  });

function sortProducts(products, sortBy) {
  switch (sortBy) {
    case "price":
      return products.sort((a, b) => a.price - b.price);
    case "discount":
      return products.sort((a, b) => b.discount - a.discount);
    case "a-z":
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case "z-a":
      return products.sort((a, b) => b.title.localeCompare(a.title));
    default:
      return products;
  }
}

function renderProducts(products) {
  removeElements();
  products.forEach((product) => {
    renderSingleProduct(product);
  });
}

let cartItems = [];



function renderSingleProduct(product) {
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result");
  let resultTitle = document.createElement("h4");
  let resultImage = document.createElement("img");
  let resultPrice = document.createElement("p");
  let purchaseButton = document.createElement("button");

  resultImage.src = product.image;
  resultImage.classList.add("resultImage");
  resultTitle.innerText = product.title;
  resultPrice.innerText = "₹" + product.price;
  purchaseButton.innerText = "Add To Cart";
  purchaseButton.classList.add("purchaseButton");
  // Add an event listener to the purchase button
  purchaseButton.addEventListener("click", () => {
    // Check if cartItems exists in local storage and set it to the cartItems array
if (localStorage.getItem("cartItems")) {
  cartItems = JSON.parse(localStorage.getItem("cartItems"));
}
    // Add the current product to the cart items
    cartItems.push(product);
    // Store the updated cart items in local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    // Alert the user that the product has been added to the cart
    alert("Product added to cart!");
    console.log(cartItems);
  });

  resultDiv.appendChild(resultImage);
  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultPrice);
  resultDiv.appendChild(purchaseButton);
  resultsRootElement.appendChild(resultDiv);
}

function removeElements() {
  document.querySelectorAll(".result").forEach((prod) => {
    prod.remove();
  });
}

function filterProducts(minPrice, maxPrice) {
  const filteredProducts = data.filter((product) => {
    if (minPrice && maxPrice) {
      return product.price >= minPrice && product.price <= maxPrice;
    } else if (minPrice) {
      return product.price >= minPrice;
    } else if (maxPrice) {
      return product.price <= maxPrice;
    } else {
      return true;
    }
  });
  renderProducts(filteredProducts);
}



// Get the logout button element
const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", function () {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-3);
});

// categorizing with button elements 
document.querySelector("#grocery").addEventListener("click", () => {
  filterByCategory("grocery");
});

document.querySelector("#bags").addEventListener("click", () => {
  filterByCategory("bags");
});

document.querySelector("#electronics").addEventListener("click", () => {
  filterByCategory("electronics");
});

document.querySelector("#shirts").addEventListener("click", () => {
  filterByCategory("shirts");
});

document.querySelector("#pants").addEventListener("click", () => {
  filterByCategory("pants");
});

document.querySelector("#officesupplies").addEventListener("click", () => {
  filterByCategory("office supplies");
});

function filterByCategory(category) {
  const filteredProducts = data.filter((product) => {
    return product.category === category;
  });

  if (filteredProducts.length === 0) {
    alert(`No products found in ${category} category.`);
  } else {
    renderProducts(filteredProducts);
  }
}
// go to cart button 
document.querySelector('.goToCart').addEventListener('click', ()=> location.href = 'cart.html');