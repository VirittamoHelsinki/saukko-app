import { Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';
import degreeModel from '../models/degreeModel';

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

    const newDegree = await degreeModel.create(newDegreeData)
    // const newDegree = new degreeModel(newDegreeData);
    // await newDegree.save();

    res.status(201).json(newDegree);
  } catch (error) {
    if (haveErrorCode(error) && (error as any).code === 1100 ) {
      res.status(400).json({ error: 'Duplicate key error: degree with this ID or unique field already exists' });
    } else {
      console.error('Error creating a new degree:', error);
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

export default {
  create,
  getAll,
  getById,
  update,
}
