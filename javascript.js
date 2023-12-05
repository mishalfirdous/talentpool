//store data in local storage through this function
function fetchLocalStorageData() {
  const experienceList = document.getElementById("experienceList");
  experienceList.innerHTML = ""; // Clear previous content

  const localData = JSON.parse(localStorage.getItem("experiencedata")) || [];
  localData.forEach((singleExperience) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");

    //edit entity start over  here
    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.addEventListener("click", () =>
      editEntry(singleExperience, experienceEntry)
    );

    //edit function end here

    //delete entity here
    const deleteButton = document.createElement("button"); // create a delete button and assign variable to the
    deleteButton.innerText = "Delete"; // inner text is delete button inside the button
    deleteButton.addEventListener("click", () =>
      deleteEntry(singleExperience.id)
    );

    experienceEntry.innerHTML = `
      <h2><strong>${singleExperience.companyName}</strong><br></h2>
      <p>${singleExperience.startDate} - ${singleExperience.endDate} </p>
      <p>${singleExperience.description}</p>     
    `;

    experienceEntry.appendChild(editButton);
    experienceEntry.appendChild(deleteButton);
    experienceList.appendChild(experienceEntry);
  });
}

//EDIT FUNCTION
function editEntry(singleExperience, experienceEntry) {
  const form = document.createElement("form");
  //form.className = "editJobExperience";

  const companyNameInput = document.createElement("input");
  companyNameInput.type = "text";
  companyNameInput.value = singleExperience.companyName;

  const startDateInput = document.createElement("input");
  startDateInput.type = "date";
  startDateInput.value = singleExperience.startDate;

  const endDateInput = document.createElement("input");
  endDateInput.type = "date";
  endDateInput.value = singleExperience.endDate;

  const innerContainer = document.createElement("div");
  //innerContainer.className = "jobDescription";

  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = 5;
  descriptionInput.value = singleExperience.description;

  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.innerHTML = "Save";
  saveButton.onclick = (event) =>
    updateExperience(
      singleExperience,
      companyNameInput.value,
      startDateInput.value,
      endDateInput.value,
      descriptionInput.value,
      form,
      experienceEntry,
      event
    );

  form.appendChild(companyNameInput);
  form.appendChild(startDateInput);
  form.appendChild(endDateInput);
  innerContainer.appendChild(descriptionInput);
  innerContainer.appendChild(saveButton);
  form.appendChild(innerContainer);

  experienceEntry.replaceWith(form);
}
//save button function
function updateExperience(
  singleExperience,
  updatedCompanyName,
  updatedStartDate,
  updatedEndDate,
  updatedDescription,
  form,
  experienceEntry,
  event
) {
  event.preventDefault();

  singleExperience.companyName = updatedCompanyName;
  singleExperience.startDate = updatedStartDate;
  singleExperience.endDate = updatedEndDate;
  singleExperience.description = updatedDescription;

  let experiences = JSON.parse(localStorage.getItem("experiencedata"));
  const index = experiences.findIndex(
    (experience) => experience.id === singleExperience.id
  );
  experiences[index] = singleExperience;
  localStorage.setItem("experiencedata", JSON.stringify(experiences));

  fetchLocalStorageData();
  form.replaceWith(experienceEntry);
}

//delete function start over here
function deleteEntry(id) {
  let experiences = JSON.parse(localStorage.getItem("experiencedata"));
  const index = experiences.findIndex((experience) => experience.id === id);
  if (index !== -1) {
    experiences.splice(index, 1);
    localStorage.setItem("experiencedata", JSON.stringify(experiences));
  }
  fetchLocalStorageData();
}

//delete function end here

//here is the function we created on add button

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const experienceForm = document.getElementById("experienceForm");
  const saveButton = document.getElementById("saveButton");

  addButton.addEventListener("click", function (event) {
    event.preventDefault(); // it stop the default behaviour
    experienceForm.style.display = "block";
  });

  saveButton.addEventListener("click", function (event) {
    event.preventDefault();
    const companyName = document.getElementById("companyName").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;
    const description = document.getElementById("description").value;

    //generate id
    let id = Date.now() + Math.floor(Math.random() * 1000);

    const experienceData = {
      id,
      companyName,
      startDate,
      endDate,
      description,
    };

    const dataValue = JSON.parse(localStorage.getItem("experiencedata")) || [];
    dataValue.push(experienceData);
    localStorage.setItem("experiencedata", JSON.stringify(dataValue));

    fetchLocalStorageData();

    document.getElementById("companyName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("description").value = "";

    experienceForm.style.display = "none";
  });
  fetchLocalStorageData(); // Call this function on initial load
});

// Search filter functionality
const searchInput = document.getElementById("searchInput"); // here we are get element by id that we mention up there
searchInput.addEventListener("input", function () {
  // that input id we put function on that poarticular seaerch
  const filterValue = searchInput.value.toLowerCase();
  const experienceEntries = document.querySelectorAll(".experience-entry");

  experienceEntries.forEach((entry) => {
    const companyName = entry.querySelector("strong").textContent.toLowerCase();
    if (companyName.includes(filterValue)) {
      entry.style.display = "block"; // Show if matches the search criteria
    } else {
      entry.style.display = "none"; // Hide if doesn't match
    }
  });
});
