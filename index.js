function DisplayLocalStorageData() {
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
  DisplayLocalStorageData();

  document.addEventListener("DOMContentLoaded", function () {
    const addButton = document.getElementById("addButton");
    const experienceForm = document.getElementById("experienceForm");
    const saveButton = document.getElementById("saveButton");
    const experienceList = document.getElementById("experienceList");
    //store data in localStorage
    const dataValue =
      JSON.parse(localStorage.getItem("experiencedata")) || [];

    addButton.addEventListener("click", function () {
      experienceForm.style.display = "block";
    });

    saveButton.addEventListener("click", function () {
      const companyName = document.getElementById("companyName").value;
      const startDate = document.getElementById("startDate").value;
      const endDate = document.getElementById("endDate").value;
      const description = document.getElementById("description").value;
      const experienceData = {
        companyName,
        startDate,
        endDate,
        description,
      };

      dataValue.push(JSON.stringify(experienceData));
      localStorage.setItem("experiencedata", JSON.stringify(dataValue));
      
      DisplayLocalStorageData();

      document.getElementById("companyName").value = "";
      document.getElementById("startDate").value = "";
      document.getElementById("endDate").value = "";
      document.getElementById("description").value = "";

      experienceForm.style.display = "none";
    });
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
      if (
        emailInput.value.trim() === "" ||
        !emailInput.value.includes("@")
      ) {
        isValid = false;
        emailError.textContent = 'Email is required and must contain "@"';
        emailInput.style.borderColor = "red";
      } else {
        emailError.textContent = "";
        emailInput.style.borderColor = "";
      }

      // Password validation
      if (
        passwordInput.value.trim() === "" ||
        passwordInput.value.length < 8
      ) {
        isValid = false;
        passwordError.textContent =
          "Password is required and must be at least 8 characters";
        passwordInput.style.borderColor = "red";
      } else {
        passwordError.textContent = "";
        passwordInput.style.borderColor = "";
      }

      if (isValid) {
        successMessage.textContent = "Registration successful 🙂";
      } else {
        successMessage.textContent = "";
      }
    });
  });