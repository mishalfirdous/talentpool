function fetchLocalStorageData() {
  const experienceList = document.getElementById("experienceList");
  const localData = JSON.parse(localStorage.getItem("experiencedata"));
  localData.forEach((item) => {
    const parsItem = JSON.parse(item);

    const experienceEntry = document.createElement("p");
    experienceEntry.classList.add("experience-entry");
    experienceEntry.innerHTML = `
   <h2> <strong>${parsItem.companyName}</strong><br></h2>
    ${parsItem.startDate} - ${parsItem.endDate} <br>
    ${parsItem.description}

`;
    experienceList.appendChild(experienceEntry);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const experienceForm = document.getElementById("experienceForm");
  const saveButton = document.getElementById("saveButton");
  const experienceList = document.getElementById("experienceList");
  //store data in localStorage
  const dataValue = JSON.parse(localStorage.getItem("experiencedata")) || [];

  addButton.addEventListener("click", function () {
    event.preventDefault();
    experienceForm.style.display = "block";
  });

  saveButton.addEventListener("click", function () {
    event.preventDefault();
    const companyName = document.getElementById("companyName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;
    //object creation
    const experienceData = {
      companyName,
      startDate,
      endDate,
      description,
    };

    dataValue.push(JSON.stringify(experienceData));
    localStorage.setItem("experiencedata", JSON.stringify(dataValue));

    fetchLocalStorageData();

    document.getElementById("companyName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("description").value = "";

    experienceForm.style.display = "none";
  });
  fetchLocalStorageData();
});

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
      simulateAPI(userData);
    } else {
      successMessage.textContent = "";
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
