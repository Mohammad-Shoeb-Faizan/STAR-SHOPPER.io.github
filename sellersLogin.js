// Create Account Button Click Event
document.getElementById("createAccountButton").addEventListener("click", function() {
    document.getElementById("login").style.display = "none";
    document.getElementById("createAccountPopup").style.display = "block";
  });
  
  // Existing Account Button Click Event
  document.getElementById("existingAccountButton").addEventListener("click", function() {
    document.getElementById("login").style.display = "block";
    document.getElementById("createAccountPopup").style.display = "none";
  });
  
    // Prefix for shoppers keys
const SELLERS_PREFIX = "sellers_";

  // Create Account Button Click Event
  document.getElementById("createAccountPopup").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmpassword").value;
  
    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }
  
    // Check if email already exists
    const users = JSON.parse(localStorage.getItem(SELLERS_PREFIX + "users")) || [];
    const user = users.find(u => u.email === email);
    if (user) {
      alert("User with this email already exists. Please use a different email.");
      return;
    }
  
    // Add user to the list of users
    users.push({
      email: email,
      password: password
    });
  
    // Save users to localStorage
    localStorage.setItem(SELLERS_PREFIX + "users", JSON.stringify(users));
  
    // Display success message and switch back to login form
    alert("Account created successfully. Please login to continue.");
    document.getElementById("login").style.display = "block";
    document.getElementById("createAccountPopup").style.display = "none";
  });
  
  // Login Button Click Event
  document.getElementById("login").addEventListener("submit", function(e) {
    e.preventDefault();
    const email = document.querySelector(".login.email").value;
    const password = document.querySelector(".login.password").value;
  
    const user = getUser(email);
  
    if (!user || user.password !== password) {
      alert("Incorrect login details. Please try again.");
      return;
    }
  
    alert(`Logged in as ${user.email}.`);
    location.href = 'sellersPage.html';
  });
  
  function getUser(email) {
    const users = JSON.parse(localStorage.getItem(SELLERS_PREFIX + "users")) || [];
    return users.find(u => u.email === email);
  }
  