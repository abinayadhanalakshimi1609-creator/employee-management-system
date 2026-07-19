// Get Employee Form
const employeeForm = document.getElementById("employeeForm");

if(employeeForm){

employeeForm.addEventListener("submit", async function(e){

    e.preventDefault();

    const employee = {
        id: document.getElementById("employeeId").value,
        name: document.getElementById("employeeName").value,
        email: document.getElementById("employeeEmail").value,
        phone: document.getElementById("employeePhone").value,
        department: document.getElementById("department").value,
        designation: document.getElementById("designation").value,
        salary: document.getElementById("salary").value,
        joiningDate: document.getElementById("joiningDate").value,
        address: document.getElementById("address").value
    };


    const editEmployeeId = localStorage.getItem("editEmployeeId");

const url = editEmployeeId
    ? `https://employee-management-q9zb.onrender.com/api/employees/${editEmployeeId}`
    : "https://employee-management-q9zb.onrender.com/api/employees";

const method = editEmployeeId ? "PUT" : "POST";

const response = await fetch(url, {
    method: method,
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(employee)
});

const data = await response.json();

alert(data.message);

localStorage.removeItem("editEmployeeId");

employeeForm.reset();

window.location.href = "employeeList.html";



});

}




const employeeTableBody = document.getElementById("employeeTableBody");

if (employeeTableBody) {

    fetch("https://employee-management-q9zb.onrender.com/api/employees")
        .then(response => response.json())
        .then(employees => {

            employeeTableBody.innerHTML = "";

            employees.forEach((employee) => {

                employeeTableBody.innerHTML += `
                <tr>
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.department}</td>
                    <td>${employee.designation}</td>
                    <td>₹${employee.salary}</td>
                    <td>
                        <button onclick="editEmployee('${employee._id}')">Edit</button>
                        <button onclick="deleteEmployee('${employee._id}')">Delete</button>
                    </td>
                </tr>
                `;

            });

        })
        .catch(error => console.log(error));

}




async function deleteEmployee(id) {

    if (!confirm("Are you sure you want to delete this employee?")) {
        return;
    }

    try {

        const response = await fetch(`https://employee-management-q9zb.onrender.com/api/employees/${id}`, {
            method: "DELETE"
        });

        console.log(response.status);

        const data = await response.json();

        console.log(data);

        alert(data.message);

        location.reload();

    } catch (error) {

        console.log("DELETE ERROR:", error);

        alert("Error deleting employee");

    }

}




const searchBox = document.getElementById("searchBox");

if (searchBox) {

    searchBox.addEventListener("keyup", function () {

        const searchValue = searchBox.value.toLowerCase();

        const rows = document.querySelectorAll("#employeeTableBody tr");

        rows.forEach((row) => {

            const text = row.textContent.toLowerCase();

            if (text.includes(searchValue)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });

}





const totalEmployees = document.getElementById("totalEmployees");

if (totalEmployees) {

    let employees = JSON.parse(localStorage.getItem("employees")) || [];

    totalEmployees.textContent = employees.length;

}





function editEmployee(id){

    localStorage.setItem("editEmployeeId", id);

    window.location.href = "addEmployee.html";

}




// Load Employee Data for Edit

if (employeeForm) {

    const editEmployeeId = localStorage.getItem("editEmployeeId");

    if (editEmployeeId) {

        fetch(`https://employee-management-q9zb.onrender.com/api/employees/${editEmployeeId}`)
        .then(response => response.json())
        .then(employee => {

            document.getElementById("employeeId").value = employee.id;
            document.getElementById("employeeName").value = employee.name;
            document.getElementById("employeeEmail").value = employee.email;
            document.getElementById("employeePhone").value = employee.phone;
            document.getElementById("department").value = employee.department;
            document.getElementById("designation").value = employee.designation;
            document.getElementById("salary").value = employee.salary;
            document.getElementById("joiningDate").value = employee.joiningDate;
            document.getElementById("address").value = employee.address;

        });

    }

}




// Dashboard Statistics

const dashboardTotalEmployees = document.getElementById("totalEmployees");
const dashboardTotalDepartments = document.getElementById("totalDepartments");
const dashboardNewEmployees = document.getElementById("newEmployees");
const dashboardPendingRequests = document.getElementById("pendingRequests");

if (dashboardTotalEmployees) {

    fetch("https://employee-management-q9zb.onrender.com/api/employees")
        .then(response => response.json())
        .then(employees => {

            // Total Employees
            dashboardTotalEmployees.textContent = employees.length;

            // Total Departments
            const departments = [...new Set(employees.map(emp => emp.department))];
            dashboardTotalDepartments.textContent = departments.length;

            // New Employees
            dashboardNewEmployees.textContent = employees.length;

            // Pending Requests (Temporary)
            dashboardPendingRequests.textContent = 0;

        })
        .catch(error => console.log(error));

}





function logout() {

    localStorage.removeItem("isLoggedIn");

    alert("Logout Successful");
    window.location.href = "index.html";

}