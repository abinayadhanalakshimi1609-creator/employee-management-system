const Employee = require("../models/Employee");

// Add Employee
exports.addEmployee = async (req, res) => {
    try {
        const employee = new Employee(req.body);
        await employee.save();

        res.json({
            success: true,
            message: "Employee Added Successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Get All Employees
exports.getEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};




// Delete Employee
exports.deleteEmployee = async (req, res) => {

    try {

        await Employee.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Employee Deleted Successfully"
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};





// Update Employee
exports.updateEmployee = async (req, res) => {

    try {

        const updatedEmployee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            success: true,
            message: "Employee Updated Successfully",
            employee: updatedEmployee
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};




// Get Single Employee
exports.getEmployeeById = async (req, res) => {

    try {

        const employee = await Employee.findById(req.params.id);

        res.json(employee);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};