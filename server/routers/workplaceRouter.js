const workplaceRouter = require("express").Router();
const Workplace = require("../models/workplaceModel");

const requireAuth = require("../middleware/auth");

// From here on require authorization on all routes below.
workplaceRouter.all("*", requireAuth);

// Fetch all workplaces
workplaceRouter.get("/workplace", async (req, res) => {
  try {
    const workplaces =
      await Workplace.find({})
        .populate('supervisors', ['firstName', 'lastName', 'email'])
        .populate('departments.supervisors', ['firstName', 'lastName', 'email']);

    res.json(workplaces);

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to fetch workplace data" });
  }
});

// Fetch workplace data by workplaceId
workplaceRouter.get("/workplace/:id", async (req, res) => {
  try {
    const workplaceId = req.params.id;

    // Fetch the workplace data based on the provided workplaceId
    const workplace =
      await Workplace.findById(workplaceId)
        .populate('supervisors', ['firstName', 'lastName', 'email'])
        .populate('departments.supervisors', ['firstName', 'lastName', 'email']);

    if (!workplace) {
      console.log("Workplace not found");
      return res.status(404).json({ errorMessage: "Workplace not found" });
    }

    res.json(workplace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to fetch workplace data" });
  }
});

// Delete workplace by workplaceId
workplaceRouter.delete("/workplace/:id", async (req, res) => {
  try {
    const workplaceId = req.params.id;

    // Delete the workplace data based on the provided workplaceId
    const success = await Workplace.findByIdAndRemove(workplaceId);

    if (!success) return res.status(404).json({ error: "Workplace not found" });

    res.status(200).json({ message: "Workplace deleted successfully" });

  } catch (error) {
    f
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to delete workplace data" });
  }
});

// General update method that allows updating any field in the workplace document.
// Might want to replace this with more specific update methods.
workplaceRouter.put("/workplace/:id", async (req, res) => {
  try {
    const workplaceId = req.params.id;
    const { businessId, name, supervisors, departments } = req.body;

    if (!businessId && !name && !supervisors && !departments) {
      return res.status(400).json({
        errorMessage:
          "No fields provided. Please provide at least one field to update."
      });
    }

    const fields = { supervisors, departments }

    // Dont replace fields with empty strings.
    if (businessId) fields.businessId = businessId
    if (name) fields.name = name

    let updatedWorkplace = await Workplace.findByIdAndUpdate(
      workplaceId,
      fields,
      { new: true }
    );

    if (!updatedWorkplace) {
      return res.status(404).json({
        errorMessage: `No workplace found with id: ${workplaceId}`
      });
    }

    // Populate the supervisors and department supervisors fields with
    // basic user information.
    updatedWorkplace = await updatedWorkplace.populate(
      'supervisors', ['firstName', 'lastName', 'email']
    )
    updatedWorkplace = await updatedWorkplace.populate(
      'departments.supervisors', ['firstName', 'lastName', 'email']
    )

    res.json(updatedWorkplace)

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to update workplace data" });
  }
})

// Create a new workplace
workplaceRouter.post("/workplace", async (req, res) => {
  try {
    // Extract workplace data from the request body
    const { businessId, name, supervisors, departments } = req.body;

    // Create a new instance of the Workplace model
    const newWorkplace = new Workplace({
      businessId,
      name,
      supervisors,
      departments,
    })

    // Save the new workplace to the database
    let savedWorkplace = await newWorkplace.save()

    // Populate the supervisors and department supervisors fields with
    // basic user information.
    savedWorkplace = await savedWorkplace.populate(
      'supervisors', ['firstName', 'lastName', 'email']
    )
    savedWorkplace = await savedWorkplace.populate(
      'departments.supervisors', ['firstName', 'lastName', 'email']
    )

    res.status(201).json(savedWorkplace);

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to create a new workplace" });
  }
});

module.exports = workplaceRouter;

