const evaluationRouter = require("express").Router();
const Evaluation = require('../models/evaluationModel');

// Create a new evaluation
evaluationRouter.post('/evaluation/', async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    await evaluation.save();
    res.status(201).send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all evaluations
evaluationRouter.get('/evaluation/', async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
    .populate('customerId teacherId supervisorId', 'firstName lastName');
    res.send(evaluations);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a single evaluation by id
evaluationRouter.get('/evaluation/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id)
    .populate('customerId teacherId supervisorId', 'firstName lastName');
    if (!evaluation) {
      return res.status(404).send();
    }
    res.send(evaluation);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a evaluation by id
evaluationRouter.patch('/evaluation/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!evaluation) {
      return res.status(404).send();
    }
    res.send(evaluation);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a evaluation by id
evaluationRouter.delete('/evaluation/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findByIdAndDelete(req.params.id);
    if (!evaluation) {
      return res.status(404).send();
    }
    res.send(evaluation);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = evaluationRouter;