import algoliasearch from "algoliasearch";

const client = algoliasearch("GQF8WC2F2X", "115a1814282e32663493824b90088810");
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
          // Update the data array with the results from Algolia
          data = resultsArray;
          renderProducts(resultsArray);
        });
      } else {
        removeElements();
        // Use the original data array when the search input is empty
        renderProducts(data);
      }
      
    });
  });

function renderProducts(products) {
  removeElements();
  products.forEach((product) => {
    renderSingleProduct(product);
  });
}




function renderSingleProduct(product) {
  let resultDiv = document.createElement("div");
  resultDiv.classList.add("result");
  resultDiv.setAttribute('data-product-id', product.objectID);
  let resultTitle = document.createElement("h4");
  let resultImage = document.createElement("img");
  let resultPrice = document.createElement("p");
  let editButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  resultImage.src = product.image;
  resultImage.classList.add("resultImage");
  resultTitle.innerText = product.title;
  resultPrice.innerText = "₹" + product.price;
  editButton.innerText = "Edit";
  deleteButton.innerText = "Delete";
  deleteButton.classList.add("deleteButton", "delete-product");
  deleteButton.setAttribute("data-product-id", product.objectID);
  editButton.classList.add("editButton");  
  editButton.setAttribute('id', 'edit-product-button');

  editButton.addEventListener("click", () => {
    const productId = resultDiv.getAttribute('data-product-id');
    window.location.href = `editProduct.html?id=${productId}`;
  });

  deleteButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this product?")) {
      const productId = deleteButton.getAttribute("data-product-id");

      // Use Algolia API client to remove product from index
      const index = client.initIndex("STAR SHOPPER");
      index.deleteObject(productId)
        .then(() => {
          // Product was successfully deleted from Algolia index
          alert("Product was successfully deleted");
          // Remove the product element from the DOM
          resultDiv.remove();
        })
        .catch((error) => {
          console.error(error);
          alert("An error occurred while deleting the product");
        });
    }
  });

  resultDiv.appendChild(resultImage);
  resultDiv.appendChild(resultTitle);
  resultDiv.appendChild(resultPrice);
  resultDiv.appendChild(editButton);
  resultDiv.appendChild(deleteButton);
  resultsRootElement.appendChild(resultDiv);
}








function removeElements() {
  document.querySelectorAll(".result").forEach((prod) => {
    prod.remove();
  });
}



// Get the logout button element
const logoutButton = document.getElementById("logoutButton");

// Add a click event listener to the logout button
logoutButton.addEventListener("click", function () {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-3);
});

// SCRIPT FOR BAR CHART 

window.onload = function () {

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Your Sales Performance"
        },
        axisX: {
            valueFormatString: "DDD"
        },
        axisY: {
            prefix: "$"
        },
        toolTip: {
            shared: true
        },
        legend:{
            cursor: "pointer",
            itemclick: toggleDataSeries
        },
        data: [{
            type: "stackedBar",
            name: "Grocery",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x: new Date(2022, 0, 30), y: 56 },
                { x: new Date(2022, 0, 31), y: 45 },
                { x: new Date(2022, 1, 1), y: 71 },
                { x: new Date(2022, 1, 2), y: 41 },
                { x: new Date(2022, 1, 3), y: 60 },
                { x: new Date(2022, 1, 4), y: 75 },
                { x: new Date(2022, 1, 5), y: 98 }
            ]
        },
        {
            type: "stackedBar",
            name: "Bags",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x: new Date(2022, 0, 30), y: 86 },
                { x: new Date(2022, 0, 31), y: 95 },
                { x: new Date(2022, 1, 1), y: 71 },
                { x: new Date(2022, 1, 2), y: 58 },
                { x: new Date(2022, 1, 3), y: 60 },
                { x: new Date(2022, 1, 4), y: 65 },
                { x: new Date(2022, 1, 5), y: 89 }
            ]
        },
        {
            type: "stackedBar",
            name: "Shirts",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x: new Date(2022, 0, 30), y: 48 },
                { x: new Date(2022, 0, 31), y: 45 },
                { x: new Date(2022, 1, 1), y: 41 },
                { x: new Date(2022, 1, 2), y: 55 },
                { x: new Date(2022, 1, 3), y: 80 },
                { x: new Date(2022, 1, 4), y: 85 },
                { x: new Date(2022, 1, 5), y: 83 }
            ]
        },
        {
            type: "stackedBar",
            name: "Electronics",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x: new Date(2022, 0, 30), y: 61 },
                { x: new Date(2022, 0, 31), y: 55 },
                { x: new Date(2022, 1, 1), y: 61 },
                { x: new Date(2022, 1, 2), y: 75 },
                { x: new Date(2022, 1, 3), y: 80 },
                { x: new Date(2022, 1, 4), y: 85 },
                { x: new Date(2022, 1, 5), y: 105 }
            ]
        },
        {
            type: "stackedBar",
            name: "OfficeSupplies",
            showInLegend: "true",
            xValueFormatString: "DD, MMM",
            yValueFormatString: "$#,##0",
            dataPoints: [
                { x: new Date(2022, 0, 30), y: 52 },
                { x: new Date(2022, 0, 31), y: 55 },
                { x: new Date(2022, 1, 1), y: 20 },
                { x: new Date(2022, 1, 2), y: 35 },
                { x: new Date(2022, 1, 3), y: 30 },
                { x: new Date(2022, 1, 4), y: 45 },
                { x: new Date(2022, 1, 5), y: 25 }
            ]
        }]
    });
    chart.render();
    
    function toggleDataSeries(e) {
        if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;
        }
        else {
            e.dataSeries.visible = true;
        }
        chart.render();
    }
    
    }


 document.querySelector('.addNewProduct').addEventListener('click', ()=>{location.href = "./addProduct.html"});

 