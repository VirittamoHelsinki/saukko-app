const workRouter = require("express").Router();
const Workplace = require("../models/workplaceModel");



// Fetch workplace data by workplaceId
workRouter.get("/workplace/:id", async (req, res) => {
  try {
    const workplaceId = req.params.id;

    // Fetch the workplace data based on the provided workplaceId
    const workplace = await Workplace.findById(workplaceId);

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
workRouter.delete("/workplace/:id", async (req, res) => {
  try {
    const workplaceId = req.params.id;

    // Delete the workplace data based on the provided workplaceId
    await Workplace.findByIdAndRemove(workplaceId);

    res.status(200).json({ message: "Workplace deleted successfully" });
  } catch (error) {f
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to delete workplace data" });
  }
});


// Create a new workplace
workRouter.post("/workplace", async (req, res) => {
  try {
    // Extract workplace data from the request body
    const { businessId, name, customerId, supervisors, departments } = req.body;

    // Create a new instance of the Workplace model
    const newWorkplace = new Workplace({
      businessId,
      name,
      customerId,
      supervisors,
      departments,
    });

    // Save the new workplace to the database
    const savedWorkplace = await newWorkplace.save();

    res.status(201).json(savedWorkplace);
  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to create a new workplace" });
  }
});


module.exports = workRouter;
