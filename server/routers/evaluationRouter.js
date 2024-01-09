const evaluationRouter = require("express").Router();
const Evaluation = require('../models/evaluationModel');
const { sendNotificationMail} = require('../mailer');
const { sendVerificationEmail } = require('../mailer'); 
const User = require('../models/userModel');

// Function to generate verification link for the supervisor
function generateVerificationLink(user) {
  const verificationToken = user.generateEmailVerificationToken();
  return `http://localhost:5000/verify-email/${verificationToken}`;
}

// Create a new evaluation
evaluationRouter.post('/evaluation/', async (req, res) => {
  const evaluationData = req.body;

  try {
    // Check if single supervisorId is provided and convert it to an array
    if (req.body.supervisorId) {
      req.body.supervisorIds = [req.body.supervisorId];
      delete req.body.supervisorId; // Optional: Remove the original supervisorId field
    }


    if (!evaluationData.units) {
      evaluationData.units = []; // Default units array
    }

    evaluationData.units.forEach(unit => {
      if (!unit.assessments || unit.assessments.length === 0) {
        unit.assessments = [{ }];
      }
    });

    const evaluation = new Evaluation(evaluationData);
    await evaluation.save();

    console.log(evaluation)

    // Check if supervisorIds array has IDs and send email to each
    if (evaluation.supervisorIds && evaluation.supervisorIds.length > 0) {
      evaluation.supervisorIds.forEach(async (supervisorId) => {
        try {
          const supervisor = await User.findById(supervisorId);
          if (supervisor) {
            const verificationLink = generateVerificationLink(supervisor);
            sendVerificationEmail(supervisor, verificationLink); // Assuming this function is implemented
          }
        } catch (userError) {
          console.error("Error fetching supervisor for notification: ", userError);
        }
      });
    }

    console.log("Evaluation created and supervisors notified (if applicable)");
    res.status(201).send(evaluation);
  } catch (error) {
    res.status(400).send(error);
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
evaluationRouter.put('/evaluation/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);
    if (!evaluation) {
      return res.status(404).send({ message: "Evaluation not found" });
    }

    const updatedSupervisorIds = new Set(req.body.supervisorIds || []);
    const existingSupervisorIds = new Set(evaluation.supervisorIds.map(id => id.toString()));

    // Identify new supervisors
    const newSupervisors = [...updatedSupervisorIds].filter(id => !existingSupervisorIds.has(id));

    // Replace the entire supervisor list
    evaluation.supervisorIds = Array.from(updatedSupervisorIds);

    // Handle new supervisors
    if (newSupervisors.length > 0) {
      const newSupervisorDetails = await User.find({
        '_id': { $in: newSupervisors }
      });

      for (const supervisor of newSupervisorDetails) {
        const verificationLink = generateVerificationLink(supervisor);
        sendVerificationEmail(supervisor, verificationLink);
      }

      // Notify existing supervisors, the customer, and possibly the teacher about new additions
      const usersToNotifyIds = [...existingSupervisorIds, evaluation.customerId];
      if (evaluation.teacherId) {
        usersToNotifyIds.push(evaluation.teacherId);
      }

      const usersToNotify = await User.find({
        '_id': { $in: usersToNotifyIds }
      });

      for (const user of usersToNotify) {
        sendNotificationMail(user, newSupervisors.map(id => id.toString()));
      }
    }

    // Update other fields of the evaluation as needed or add new in future
    evaluation.workTasks = req.body.workTasks || evaluation.workTasks;
    evaluation.workGoals = req.body.workGoals || evaluation.workGoals;
    evaluation.completed = req.body.completed !== undefined ? req.body.completed : evaluation.completed;
    evaluation.startDate = req.body.startDate || evaluation.startDate;
    evaluation.endDate = req.body.endDate || evaluation.endDate;
    evaluation.units = req.body.units || evaluation.units;

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
