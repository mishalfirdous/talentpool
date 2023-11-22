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