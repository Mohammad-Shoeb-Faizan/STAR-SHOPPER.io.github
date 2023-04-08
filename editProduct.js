import algoliasearch from "algoliasearch";
let productTitleInput = document.getElementById('productTitle');
let productDescriptionInput = document.getElementById('productDescription');
let productPriceInput = document.getElementById('productPrice');
let productDiscountInput = document.getElementById('productDiscount');
let productCategoryInput = document.getElementById('productCategory');
let productImageInput = document.getElementById('productImage');

// function to update the preview with edited product details
function updatePreview() {
  // update the product details in the preview section
  let productTitlePreview = document.getElementById('productTitlePreview');
  productTitlePreview.innerHTML = `<h1>${productTitleInput.value}</h1>`;

  let productPricePreview = document.getElementById('productPricePreview');
  let productDiscountPreview = document.getElementById('productDiscountPreview');
  let productDiscountedPricePreview = document.getElementById('productDiscountedPricePreview');

  productPricePreview.innerHTML = `₹${productPriceInput.value}/-`;
  productDiscountPreview.innerHTML = `${productDiscountInput.value}`;
  let discountedPrice = Math.round(productPriceInput.value * (100 - productDiscountInput.value) / 100);
  productDiscountedPricePreview.innerHTML = `₹${discountedPrice}/-`;

  let previewImage = document.getElementById('previewImage');
  previewImage.src = productImageInput.value;
}

// function to handle the form submission when editing a product
function editProduct(event) {
  event.preventDefault();

  // retrieve the product ID from the URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // retrieve the updated product details from the input fields
  let updatedProduct = {
    ...productId,
    title: productTitleInput.value,
    description: productDescriptionInput.value,
    price: parseFloat(productPriceInput.value),
    discount: parseFloat(productDiscountInput.value),
    category: productCategoryInput.value,
    image: productImageInput.value
  };

  const client = algoliasearch("GQF8WC2F2X", "115a1814282e32663493824b90088810");
const index = client.initIndex("STAR SHOPPER");

  index.partialUpdateObject({
    objectID: productId,
    ...updatedProduct
  })
  .then(({ objectID }) => {
    console.log(`Product ${objectID} updated successfully.`);
    window.location.href = './sellersPage.html';
  })
  .catch(error => {
    console.error('Error updating product:', error);
  });
}

productTitleInput.addEventListener('input', updatePreview);
productDescriptionInput.addEventListener('input', updatePreview);
productPriceInput.addEventListener('input', updatePreview);
productDiscountInput.addEventListener('input', updatePreview);
productCategoryInput.addEventListener('input', updatePreview);
productImageInput.addEventListener('input', updatePreview);

let updateButton = document.querySelector('.button');
updateButton.addEventListener('click', editProduct);

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');

const algoliaApplicationId = "GQF8WC2F2X";
const algoliaAPIKey = "115a1814282e32663493824b90088810";
const indexName = "STAR SHOPPER";
const client = algoliasearch(algoliaApplicationId, algoliaAPIKey);
const index = client.initIndex(indexName);

index.getObject(productId)
  .then(product => {
    productTitleInput.value = product.title;
    productDescriptionInput.value = product.description;
    productPriceInput.value = product.price.toFixed(2);
    productDiscountInput.value = product.discount.toFixed(2);
    productCategoryInput.value = product.category;
    productImageInput.value = product.image;

    updatePreview();
  })
  .catch(error => {
    console.error('Error retrieving product:', error);
  });

// Get the logout button element
const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", function () {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-4);
});