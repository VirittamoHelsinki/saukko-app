import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import degreeModel from '../models/degreeModel';
import evaluationModel from '../models/evaluationModel';
import workplaceModel from '../models/workplaceModel';
import userModel from '../models/userModel';
import { IEvaluation } from '../mailer/types';

const getAll = async (req: Request, res: Response) => {
  try {
    const degrees = await degreeModel.find({});
    res.status(200).json(degrees);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const getById = async (req: Request, res: Response) => {
  try {
    const degree = await degreeModel.findById(req.params.id);
    res.status(200).json(degree);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const haveErrorCode = (error: any) => {
  return error && typeof error === 'object' && 'code' in error
}

const create = async (req: Request, res: Response) => {
  try {
    const newDegreeData = { ...req.body };
    delete newDegreeData._id;

    console.info(JSON.stringify(newDegreeData))

    const newDegree = await degreeModel.create(newDegreeData)

    res.status(201).json(newDegree);
  } catch (error) {
    if (haveErrorCode(error) && (error as any).code === 1100) {
      res.status(400).json({ error: 'Duplicate key error: degree with this ID or unique field already exists' });
    } else {
      console.error('Error creating a new degree:', error);
      console.info("code:", (error as any)?.code)
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

const update = async (req: Request, res: Response) => {
  try {
    const updatedDegree = await degreeModel.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true, runValidators: true }
    );
    console.log("🚀 ~ degreeRouter.put ~ updatedDegree:", updatedDegree)

    if (!updatedDegree) {
      return res.status(400).send({ message: 'Degree not found' });
    }
    res.status(200).json(updatedDegree);
  } catch (error) {
    console.error('Error updating degree:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

const deleteById = async (req: Request, res: Response) => {
  const degreeId = req.params.id;

  try {
    // Find and delete evaluations and associated users
    const evaluations = await evaluationModel.find({ degreeId });
    const evaluationCount = evaluations.length;

    const evaluationDeletionPromises = evaluations.map(evaluation =>
      deleteEvaluationById(evaluation._id)
    );

    // Find and delete workplaces and associated users
    const workplaces = await workplaceModel.find({ degreeId });
    const workplaceCount = workplaces.length;

    const workplaceDeletionPromises = workplaces.map(workplace =>
      deleteWorkPlaceById(workplace._id)
    );

    // Wait for all evaluations and workplaces to be deleted
    await Promise.all([...evaluationDeletionPromises, ...workplaceDeletionPromises]);

    // Finally, delete the degree itself
    const degreeDeletionResult = await degreeModel.findByIdAndDelete(degreeId);
    if (!degreeDeletionResult) {
      console.log(`Degree with ID ${degreeId} not found or already deleted.`);
    } else {
      console.log(`Degree with ID ${degreeId} deleted.`);
    }

    console.log(`Deleted ${evaluationCount} evaluations and ${workplaceCount} workplaces associated with degree ID ${degreeId}.`);

    res.status(200).json({ message: 'Degree and associated data deleted successfully' });

  } catch (error) {
    console.error('Error deleting degree:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const deleteEvaluationById = async (evaluationId: string) => {
  try {
    // Delete users associated with the evaluation
    await deleteUsersAssociatedWithEvaluation(evaluationId);
    // Delete the evaluation
    const evaluationDeletionResult = await evaluationModel.findByIdAndDelete(evaluationId);
    if (!evaluationDeletionResult) {
      console.log(`Evaluation with ID ${evaluationId} not found or already deleted.`);
    } else {
      console.log(`Evaluation with ID ${evaluationId} deleted.`);
    }
  } catch (error) {
    console.error('Error deleting evaluation:', error);
  }
};

const deleteUsersAssociatedWithEvaluation = async (evaluationId: string) => {
  try {
    // Implement the logic to delete users associated with the evaluation
    const result = await userModel.deleteMany({ evaluationId });
    console.log(`Deleted ${result.deletedCount} users associated with evaluation ID ${evaluationId}.`);
  } catch (error) {
    console.error('Error deleting users associated with evaluation:', error);
  }
};

const deleteWorkPlaceById = async (workplaceId: string) => {
  try {
    // Delete users associated with the workplace
    await deleteUsersAssociatedWithWorkplace(workplaceId);
    // Delete the workplace
    const workplaceDeletionResult = await workplaceModel.findByIdAndDelete(workplaceId);
    if (!workplaceDeletionResult) {
      console.log(`Workplace with ID ${workplaceId} not found or already deleted.`);
    } else {
      console.log(`Workplace with ID ${workplaceId} deleted.`);
    }
  } catch (error) {
    console.error('Error deleting workplace:', error);
  }
};

const deleteUsersAssociatedWithWorkplace = async (workplaceId: string) => {
  try {
    // Implement the logic to delete users associated with the workplace
    const result = await userModel.deleteMany({ workplaceId });
    console.log(`Deleted ${result.deletedCount} users associated with workplace ID ${workplaceId}.`);
  } catch (error) {
    console.error('Error deleting users associated with workplace:', error);
  }
};

export default {
  create,
  getAll,
  getById,
  update,
  deleteById
}
