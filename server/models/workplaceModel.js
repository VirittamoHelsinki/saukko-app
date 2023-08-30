const mongoose = require("mongoose");

// Define the departments subdocument schema
const departmentSchema = new mongoose.Schema({
  id: String,
  name: String,
  supervisors: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User" 
  }]
});

// Define the main workplace schema
const workplaceSchema = new mongoose.Schema({
  workplaceId: mongoose.Schema.Types.ObjectId,
  businessId: String,
  name: String,
  customerId: String,
  departments: [departmentSchema]
});

// Create the Workplace model
const Workplace = mongoose.model("Workplace", workplaceSchema);

module.exports = Workplace;