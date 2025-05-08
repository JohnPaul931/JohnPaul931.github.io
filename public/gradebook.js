function fetchGradeData() {
  console.log("Fetching grade data...");

  let xhr = new XMLHttpRequest();
  let apiRoute = "/api/grades"; // Adjust as needed

  xhr.onreadystatechange = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status !== 200) {
        console.error("Could not get grades. Status:", xhr.status);
        return;
      }

      populateGradebook(JSON.parse(xhr.responseText));
    }
  };

  xhr.open("GET", apiRoute, true);
  xhr.send();
}

function populateGradebook(data) {
  console.log("Populating gradebook with data:", data);

  let tableBody = document.getElementById("gradebook").getElementsByTagName("tbody")[0];
  tableBody.innerHTML = ""; // Clear any existing rows

  data.forEach(function (student) {
    let row = document.createElement("tr");

    // Column 1: Student Name
    let nameCell = document.createElement("td");
    nameCell.textContent = `${student.last_name}, ${student.first_name}`;
    row.appendChild(nameCell);

    // Columns 2+: Assignment grades (Assignment 1, 2, 3, etc.)
    // This assumes student.assignments is an array like: [85, 90, 78]
    student.assignments.forEach(function (grade) {
      let gradeCell = document.createElement("td");
      gradeCell.textContent = grade;
      row.appendChild(gradeCell);
    });

    tableBody.appendChild(row);
  });
}

// Fetch data on page load
document.addEventListener("DOMContentLoaded", fetchGradeData);
