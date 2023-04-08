document.addEventListener("DOMContentLoaded", function () {
  // Define an array of image URLs and corresponding headings
  const images = [
    {
      url: "./assets/women.png",
      heading: "CONFIDENCE",
    },
    {
      url: "./assets/capstone/man.png",
      heading: "STYLE",
    },
    {
      url: "./assets/capstone/child.png",
      heading: "DISCOUNT",
    },
  ];

  // Get the image and heading elements
  const imgElement = document.querySelector(".foreground");
  const headingElement = document.querySelector(".dynamicHeading");

  // Set the initial image and heading
  let currentImageIndex = 0;
  imgElement.src = images[currentImageIndex].url;
  headingElement.textContent = images[currentImageIndex].heading;

  // Add click event listeners to the arrow elements
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");
  leftArrow.addEventListener("click", changeLeft);
  rightArrow.addEventListener("click", changeRight);

  // Define the changeLeft function
  function changeLeft() {
    // Update the image source and heading text
    currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
    imgElement.src = images[currentImageIndex].url;
    headingElement.textContent = images[currentImageIndex].heading;
  }

  // Define the changeRight function
  function changeRight() {
    // Update the image source and heading text
    currentImageIndex = (currentImageIndex + 1) % images.length;
    imgElement.src = images[currentImageIndex].url;
    headingElement.textContent = images[currentImageIndex].heading;
  }

  // Get the logout button element
const logoutButton = document.getElementById('logoutButton');

// Add a click event listener to the logout button
logoutButton.addEventListener('click', function() {
  alert("SESSION EXPIRED");
  // Delete two items from the browser history
  history.go(-2);
});


});


