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
      const newDegreeData = req.body; // Assuming you're sending the degree data in the request body

      const newDegree = new Degree(newDegreeData);
      await newDegree.save();
  
      res.status(201).json(newDegree);
    } catch (error) {
      console.error('Error creating a new degree:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

module.exports = degreeRouter