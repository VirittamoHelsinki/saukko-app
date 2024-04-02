import { Request, Response } from 'express';
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

const create = async (req: Request, res: Response) => {
  try {
    const newDegreeData = req.body;

    const newDegree = new degreeModel(newDegreeData);
    await newDegree.save();

    res.status(201).json(newDegree);
  } catch (error) {
    console.error('Error creating a new degree:', error);
    res.status(500).json({ error: 'Internal server error' });
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
