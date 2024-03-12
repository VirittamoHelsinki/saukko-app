const degreeRouter = require("express").Router();
const Degree = require("../models/degreeModel");

const requireAuth = require("../middleware/auth");

// From here on require authorization on all routes below.
degreeRouter.all("*", requireAuth);

// GET all degrees
degreeRouter.get('/internal/degrees', async (req, res) => {
    try {
      const degrees = await Degree.find({});
      res.status(200).json(degrees);
    } catch (error) {
      console.error('Error fetching degrees:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // GET all degrees
degreeRouter.get('/internal/degree/:id', async (req, res) => {
  try {
    const degree = await Degree.findById(req.params.id);
    res.status(200).json(degree);
  } catch (error) {
    console.error('Error fetching degrees:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

  // POST a new degree
degreeRouter.post('/internal/degrees', async (req, res) => {
    try {
      const newDegreeData = req.body;

      const newDegree = new Degree(newDegreeData);
      await newDegree.save();
  
      res.status(201).json(newDegree);
    } catch (error) {
      console.error('Error creating a new degree:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // PUT update a degree
degreeRouter.put('/internal/degree/:id', async (req, res) => {
    try {
      const updatedDegreeData = await Degree.findById(req.params.id);
      console.log("🚀 ~ degreeRouter.put ~ updatedDegreeData:", updatedDegreeData)

      if(!updatedDegreeData) {
        return res.status(400).send({ message: 'Degree not found' });
      }
      const updatedDegree = Object.assign(updatedDegreeData, req.body);
      console.log("🚀 ~ degreeRouter.put ~ updatedDegree:", updatedDegree)
      await updatedDegree.save();

  
      res.status(200).json(updatedDegree);
    } catch (error) {
      console.error('Error updating degree:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = degreeRouter
