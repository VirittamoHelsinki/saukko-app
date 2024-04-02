import { Request, Response } from 'express';
import workplaceModel from "../models/workplaceModel"

const getAllWorkplaces = async (req: Request, res: Response) => {
  try {
    const workplaces =
      await workplaceModel.find({})
        .populate('supervisors', ['firstName', 'lastName', 'email'])
        .populate('departments.supervisors', ['firstName', 'lastName', 'email']);

    res.json(workplaces);

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to fetch workplace data" });
  }
}

const getWorkplaceById = async (req: Request, res: Response) => {
  try {
    const workplaceId = req.params.id;

    // Fetch the workplace data based on the provided workplaceId
    const workplace =
      await workplaceModel.findById(workplaceId)
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
}

const deleteWorkplaceById = async (req: Request, res: Response) => {
  try {
    const workplaceId = req.params.id;

    // Delete the workplace data based on the provided workplaceId
    const success = await workplaceModel.findByIdAndDelete(workplaceId);

    if (!success) return res.status(404).json({ error: "Workplace not found" });

    res.status(200).json({ message: "Workplace deleted successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to delete workplace data" });
  }
}

// General update method that allows updating any field in the workplace document.
// Might want to replace this with more specific update methods.
const updateWorkplace = async (req: Request, res: Response) => {
  try {
    const workplaceId = req.params.id;
    const { businessId, name, supervisors, departments } = req.body;

    if (!businessId && !name && !supervisors && !departments) {
      return res.status(400).json({
        errorMessage:
          "No fields provided. Please provide at least one field to update."
      });
    }

    const fields: {
      supervisors: any;
      departments: any;
      businessId?: any;
      name?: any;
    } = { supervisors, departments }

    // Dont replace fields with empty strings.
    if (businessId) fields.businessId = businessId
    if (name) fields.name = name

    let updatedWorkplace = await workplaceModel.findByIdAndUpdate(
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
}

const createWorkplace = async (req: Request, res: Response) => {
  try {
    // Extract workplace data from the request body
    const { businessId, name, supervisors, departments, units, degreeId } = req.body;

    // Check if a workplace with the same businessId already exists
    const existingWorkplace = await workplaceModel.findOne({ businessId });

    if (existingWorkplace) {
      // A workplace with the same businessId already exists
      //  choosing to update the existing document with the new data
      existingWorkplace.name = name;
      existingWorkplace.supervisors = supervisors;
      existingWorkplace.departments = departments;
      existingWorkplace.units = units;
      existingWorkplace.degreeId = degreeId;
      await existingWorkplace.save();
      console.log(" workplace updated successfully");
      //  returning the updated document as a response
      return res.status(200).json(existingWorkplace);

    }

    // If no duplicate is found, create a new instance of the Workplace model
    const newWorkplace = new workplaceModel({
      businessId,
      name,
      supervisors,
      departments,
      units,
      degreeId
    });

    // Save the new workplace to the database
    let savedWorkplace = await newWorkplace.save();

    // Populate the supervisors and department supervisors fields with
    // basic user information.
    savedWorkplace = await savedWorkplace.populate(
      'supervisors', ['firstName', 'lastName', 'email']
    );
    savedWorkplace = await savedWorkplace.populate(
      'departments.supervisors', ['firstName', 'lastName', 'email']
    );
    // Log a success message

    console.log("New workplace created successfully");

    res.status(201).json(savedWorkplace);

  } catch (error) {
    console.error(error);
    res.status(500).json({ errorMessage: "Failed to create a new workplace" });
  }
}

export default {
  getAllWorkplaces,
  getWorkplaceById,
  deleteWorkplaceById,
  updateWorkplace,
  createWorkplace,
}
