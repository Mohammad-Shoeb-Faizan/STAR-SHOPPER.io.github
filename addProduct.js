import algoliasearch from "algoliasearch";
import { v4 as uuidv4 } from "uuid";

// Algolia credentials
const client = algoliasearch("GQF8WC2F2X", "115a1814282e32663493824b90088810");
const index = client.initIndex("STAR SHOPPER");

// Use the `saveObjects` function on the `index` object to add a new object to the Algolia search index
index
  .saveObjects([
    {
      title: "Product Title",
      description: "Product Description",
      price: "Product Price",
      discount: "Product Discount",
      category: "Product Category",
      image: "Product Image URL",
    },
  ])
  .then(({ objectIDs }) => {
    console.log("Object IDs:", objectIDs);
  })
  .catch((error) => {
    console.error("Error:", error);
  });

// Add event listener to the add product button
const addButton = document.querySelector(".button");
addButton.addEventListener("click", addProduct);
const productImageInput = document.getElementById("productImage");
const productImagePreview = document.getElementById("previewImage");

productImageInput.addEventListener("input", (event) => {
  productImagePreview.src = event.target.value;
});
// Function to add product to Algolia index
function addProduct() {
  // Get product data from input fields
  const productTitle = document.getElementById("productTitle").value;
  const productDescription =
    document.getElementById("productDescription").value;
  const productPrice = document.getElementById("productPrice").value;
  const productDiscount = document.getElementById("productDiscount").value;
  const productCategory = document.getElementById("productCategory").value;
  const productImage = document.getElementById("productImage").value;

  // Create a new object with the product data
  const product = {
    title: productTitle,
    description: productDescription,
    price: parseFloat(productPrice),
    discount: parseFloat(productDiscount),
    category: productCategory,
    image: productImage,
  };

  // Add the product to the Algolia index with auto-generated object ID
  delete product.objectID; // Remove objectID field before adding to index
  index
    .saveObjects([product], { autoGenerateObjectIDIfNotExist: true })
    .then(({ objectIDs }) => {
      console.log("Product added with ObjectID:", objectIDs[0]);
    })
    .catch((err) => {
      console.error(err);
    });

  // Clear input fields after adding the product
  document.getElementById("productTitle").value = "";
  document.getElementById("productDescription").value = "";
  document.getElementById("productPrice").value = "";
  document.getElementById("productDiscount").value = "";
  document.getElementById("productCategory").value = "";
  document.getElementById("productImage").value = "";
}

//   preview for right side of the page
const productTitleInput = document.getElementById("productTitle");
const productPriceInput = document.getElementById("productPrice");
const productDiscountInput = document.getElementById("productDiscount");

const productTitlePreview = document.getElementById("productTitlePreview");
const productPricePreview = document.getElementById("productPricePreview");
const productDiscountPreview = document.getElementById(
  "productDiscountPreview"
);

productTitleInput.addEventListener("input", (event) => {
  productTitlePreview.innerHTML = `<h1>${event.target.value}</h1>`;
});

productPriceInput.addEventListener("input", (event) => {
  productPricePreview.innerHTML = `₹${event.target.value}/-`;
});

productDiscountInput.addEventListener("input", (event) => {
  productDiscountPreview.innerHTML = `${event.target.value} `;
});

// discount 

function updateProductPreview() {
    const productTitle = document.getElementById("productTitle").value;
    const productPrice = document.getElementById("productPrice").value;
    const productDiscount = document.getElementById("productDiscount").value;
    const productImage = document.getElementById("productImage").value;
  
    const discountedPrice = productPrice * (1 - productDiscount / 100);
    const formattedDiscount = `${productDiscount}`;
  
    const productTitlePreview = document.getElementById("productTitlePreview");
    const productPricePreview = document.getElementById("productPricePreview");
    const productDiscountPreview = document.getElementById("productDiscountPreview");
    const productDiscountedPricePreview = document.getElementById("productDiscountedPricePreview");
  
    productTitlePreview.innerHTML = `<h1>${productTitle}</h1>`;
    productPricePreview.innerHTML = `₹${productPrice}/-`;
    productDiscountPreview.innerHTML = formattedDiscount;
    productDiscountedPricePreview.innerHTML = `₹${discountedPrice.toFixed(2)}/-`;
  
    if (productDiscount > 0) {
      productPricePreview.style.textDecoration = "line-through";
    } else {
      productPricePreview.style.textDecoration = "none";
    }
  }
  
  productDiscountInput.addEventListener("input", updateProductPreview);
  
// Get the logout button element
const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", function () {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-4);
});