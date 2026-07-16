const express = require("express");
const router = express.Router();

const {
    addEmployee,
    getEmployees,
    deleteEmployee,
    updateEmployee,
    getEmployeeById
} = require("../controllers/employeeController");

router.post("/employees", addEmployee);
router.get("/employees", getEmployees);
router.delete("/employees/:id", deleteEmployee);
router.put("/employees/:id", updateEmployee);
router.get("/employees/:id", getEmployeeById);

module.exports = router;