function fetchExperienceList() {
  return JSON.parse(localStorage.getItem("experiencedata")) || [];
} //retrive data from the localstorage

function renderExperienceList() {
  const experienceList = document.getElementById("experienceList");

  experienceList.innerHTML = ""; // Clear previous content

  const localData = fetchExperienceList();
  localData.forEach((singleExperience) => {
    const experienceEntry = document.createElement("div");
    experienceEntry.classList.add("experience-entry");

    const editButton = document.createElement("button");
    editButton.innerText = "edit";
    editButton.addEventListener("click", () =>
      editEntry(singleExperience, experienceEntry)
    );

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", () =>
      deleteExperience(singleExperience.id)
    );

    experienceEntry.innerHTML = `
      <h2>${singleExperience.companyName}<br></h2>
      <p>${singleExperience.startDate} - ${singleExperience.endDate} </p>
      <p>${singleExperience.description}</p>     
    `;

    experienceEntry.appendChild(editButton);
    experienceEntry.appendChild(deleteButton);
    experienceList.appendChild(experienceEntry);
  });
}

function editEntry(singleExperience, experienceEntry) {
  const form = document.createElement("form");

  const companyNameInput = document.createElement("input");
  companyNameInput.type = "text";
  companyNameInput.value = singleExperience.companyName;

  const startDateInput = document.createElement("input");
  startDateInput.type = "date";
  startDateInput.value = singleExperience.startDate;

  const endDateInput = document.createElement("input");
  endDateInput.type = "date";
  endDateInput.value = singleExperience.endDate;

  const descriptionInput = document.createElement("textarea");
  descriptionInput.rows = 5;
  descriptionInput.value = singleExperience.description;
  const saveButton = document.createElement("button");
  saveButton.type = "submit";
  saveButton.innerHTML = "Save";

  // Add a class or identifier for this button to differentiate from other buttons if needed
  saveButton.classList.add("save-button");

  // Assuming there's a form referenced by the 'form' variable
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent default form submission behavior

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

    // Additional actions after processing form data, if needed
  });

  form.appendChild(companyNameInput);
  form.appendChild(startDateInput);
  form.appendChild(endDateInput);
  form.appendChild(descriptionInput);
  form.appendChild(saveButton);

  experienceEntry.innerHTML = ""; // Clear previous content
  experienceEntry.appendChild(form);
}

//end here
//save button
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

  renderExperienceList(); // Update the list
}

//delete button
function deleteExperience(id) {
  let experiences = JSON.parse(localStorage.getItem("experiencedata"));
  const deleteExperience = experiences.find(
    (experience) => experience.id === id
  );
  if (deleteExperience) {
    experiences = experiences.filter((experience) => experience.id !== id);
    localStorage.setItem("experiencedata", JSON.stringify(experiences));
  }
  renderExperienceList(); // Update the list
  return deleteExperience;
}
//delete button

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.getElementById("addButton");
  const experienceForm = document.getElementById("experienceForm");
  const saveButton = document.getElementById("saveButton");

  addButton.addEventListener("click", function (event) {
    event.preventDefault();
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

    let dataValue = JSON.parse(localStorage.getItem("experiencedata")) || [];
    dataValue.push(experienceData);
    localStorage.setItem("experiencedata", JSON.stringify(dataValue));

    renderExperienceList(); // Update the list with the new experience

    document.getElementById("companyName").value = "";
    document.getElementById("startDate").value = "";
    document.getElementById("endDate").value = "";
    document.getElementById("description").value = "";

    experienceForm.style.display = "none";
  });
  //put function over here
  renderExperienceList(); // Call this function on initial load
});
fetchExperienceList();
renderExperienceList();

// Search filter
const searchInput = document.getElementById("searchInput"); // here we are get element by id that we mention up there
searchInput.addEventListener("input", function () {
  // that input id we put function on that poarticular seaerch
  const filterValue = searchInput.value.toLowerCase();
  const experienceEntries = document.querySelectorAll(".experience-entry");

  experienceEntries.forEach((entry) => {
    const companyName = entry.querySelector("h2").textContent.toLowerCase();
    if (companyName.includes(filterValue)) {
      entry.style.display = "block"; // Show if matches the search criteria
    } else {
      entry.style.display = "none"; // Hide if doesn't match
    }
  });
});
