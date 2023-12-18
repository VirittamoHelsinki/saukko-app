const evaluationRouter = require("express").Router();
const Evaluation = require('../models/evaluationModel');
const { sendNotificationMail} = require('../mailer');
const User = require('../models/userModel');

// Create a new evaluation
evaluationRouter.post('/evaluation/', async (req, res) => {
  try {
    const evaluation = new Evaluation(req.body);
    console.log("This is evaluation ----> : ",evaluation)
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
    .populate('customerId', 'firstName lastName')
    .populate('teacherId', 'firstName lastName')
    .populate('supervisorIds', 'firstName lastName') // Changed to support multiple supervisors
    .populate('workplaceId'); // Add any other fields you need to populate

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
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).send({ message: "Evaluation not found" });
    }

    let newSupervisorsAdded = [];

    if (Array.isArray(req.body.supervisorIds)) {
      const existingSupervisors = new Set(evaluation.supervisorIds.map(id => id.toString()));
      const newSupervisors = req.body.supervisorIds.filter(id => !existingSupervisors.has(id));

      if (newSupervisors.length > 0) {
        newSupervisorsAdded = newSupervisors;
        evaluation.supervisorIds.push(...newSupervisors);

        // Send email notifications for new supervisors
        try {
          const newSupervisorDetails = await User.find({
            '_id': { $in: newSupervisors }
          });

          const newSupervisorNames = newSupervisorDetails.map(sup => `${sup.firstName} ${sup.lastName}`);

          // Notify existing supervisors, teachers, and the customer about the new supervisors
          const usersToNotify = await User.find({
            '_id': { $in: [evaluation.customerId, evaluation.teacherId, ...evaluation.supervisorIds] }
          });

          usersToNotify.forEach(user => {
            sendNotificationMail(user, newSupervisorNames);
          });

          // Send verification email to new supervisors
          newSupervisorDetails.forEach(supervisor => {
            const verificationLink = generateVerificationLink(supervisor); // Ensure this function exists
            sendVerificationEmail(supervisor, verificationLink);
          });

        } catch (userError) {
          console.error("Error fetching users for notification: ", userError);
        }
      }
    }

    // Update other fields of the evaluation as needed
    // ...

    // Save the updated evaluation
    await evaluation.save();
    res.send(evaluation);
  } catch (error) {
    console.error("Error updating evaluation: ", error);
    res.status(400).send({ message: "Error updating evaluation", error: error.message });
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