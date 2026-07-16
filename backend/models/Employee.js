const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  id: String,
  name: String,
  email: String,
  phone: String,
  department: String,
  designation: String,
  salary: Number,
  joiningDate: String,
  address: String
});

module.exports = mongoose.model("Employee", employeeSchema);