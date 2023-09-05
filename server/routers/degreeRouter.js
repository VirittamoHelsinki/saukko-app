const degreeRouter = require("express").Router();
const Degree = require("../models/degreeModel");

// This file will be renamed.

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

  // POST a new degree
degreeRouter.post('/internal/degrees', async (req, res) => {
    try {
      const newDegreeData = req.body; // Assuming you're sending the degree data in the request body

      if (!newDegreeData.eduCodeNumber) {
        console.log("Name field empty")
        return res.status(400).json({ errorMessage: "Empty Field" });
      }

      const newDegree = new Degree(newDegreeData);
      await newDegree.save();
  
      res.status(201).json(newDegree);
    } catch (error) {
      console.error('Error creating a new degree:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = degreeRouter