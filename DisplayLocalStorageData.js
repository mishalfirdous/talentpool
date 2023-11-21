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