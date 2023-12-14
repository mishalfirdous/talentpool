document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const passwordError = document.getElementById("passwordError");
  const successMessage = document.getElementById("successMessage");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    // Name validation
    if (nameInput.value.trim() === "") {
      isValid = false;
      nameError.textContent = "Name is required";
      nameInput.style.borderColor = "red";
    } else {
      nameError.textContent = "";
      nameInput.style.borderColor = "";
    }

    // Email validation
    if (emailInput.value.trim() === "" || !emailInput.value.includes("@")) {
      isValid = false;
      emailError.textContent = 'Email is required and must contain "@"';
      emailInput.style.borderColor = "red";
    } else {
      emailError.textContent = "";
      emailInput.style.borderColor = "";
    }

    // Password validation
    if (passwordInput.value.trim() === "" || passwordInput.value.length < 8) {
      isValid = false;
      passwordError.textContent =
        "Password is required and must be at least 8 characters";
      passwordInput.style.borderColor = "red";
    } else {
      passwordError.textContent = "";
      passwordInput.style.borderColor = "";
    }

    if (isValid) {
      // Prepare user data
      const userData = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };

      // Simulate API call
      simulateAPI(userData); // check false or true.
    } else {
      successMessage.textContent = ""; // no validation it will clear the message
    }
  });

  // Simulate API call function
  async function simulateAPI(userData) {
    const registrationStatus = document.getElementById("registrationStatus");

    const response = await fetch("https://dummyjson.com/users/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });

    if (response.status === 200) {
      registrationStatus.textContent = "Registration successful";
      registrationStatus.style.display = "block";
    } else {
      registrationStatus.textContent = "Registration failed";
      registrationStatus.style.display = "block";
    }
  }
});
