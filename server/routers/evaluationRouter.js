const evaluationRouter = require('express').Router();
const Evaluation = require('../models/evaluationModel');
const {
  sendNotificationMail,
  sendVerificationEmail,
  sendUserMail,
} = require('../mailer');
const User = require('../models/userModel');
const Degree = require('../models/degreeModel');

// Function to generate verification link for the supervisor
function generateVerificationLink(user) {
  const verificationToken = user.generateEmailVerificationToken();
  return `https://saukko.azurewebsites.net/verify-email/${verificationToken}`;
}

// Create a new evaluation
evaluationRouter.post('/evaluation/', async (req, res) => {
  const evaluationData = req.body;

  try {
    // Convert single supervisorId to an array of supervisorIds
    if (req.body.supervisorId) {
      req.body.supervisorIds = [req.body.supervisorId];
      delete req.body.supervisorId;
    }

    if (!evaluationData.units) {
      evaluationData.units = []; 
    }

    // Fetch the degree based on degreeId to include criteria details from the degree
    const degree = await Degree.findById(evaluationData.degreeId);
    if (!degree) {
      return res.status(404).send({ error: "Degree not found" });
    }

    
    evaluationData.units = evaluationData.units.map(unit => {
      const degreeUnit = degree.units.find(du => du._id.toString() === unit._id.toString());
      if (degreeUnit) {
        unit.assessments = unit.assessments.map(assessment => {
          const degreeAssessment = degreeUnit.assessments.find(da => da._id === assessment._id);
          if (degreeAssessment) {
            // Here we map criteria from the degree and add them to the evaluation's assessment
            assessment.criteria = degreeAssessment.criteria.map(criteria => {
              return {
                criterionId: criteria._id, 
                fi: criteria.fi, 
                sv: criteria.sv, 
                en: criteria.en  
              };
            });
          }
          return assessment;
        });
      }
      return unit;
    });

    const evaluation = new Evaluation(evaluationData);
    await evaluation.save();

    // Notify supervisors if any
    if (evaluation.supervisorIds && evaluation.supervisorIds.length > 0) {
      evaluation.supervisorIds.forEach(async (supervisorId) => {
        try {
          const supervisor = await User.findById(supervisorId);
          if (supervisor) {
            const verificationLink = generateVerificationLink(supervisor);
            sendVerificationEmail(supervisor, verificationLink);
          }
        } catch (userError) {
          console.error('Error fetching supervisor for notification: ', userError);
        }
      });
    }

    res.status(201).send(evaluation);
  } catch (error) {
    console.error('Error creating evaluation: ', error);
    res.status(400).send(error);
  }
});

// Get all evaluations
evaluationRouter.get('/evaluation/', async (req, res) => {
  try {
    const evaluations = await Evaluation.find()
      .populate('customerId', 'firstName lastName')
      .populate('teacherId', 'firstName lastName')
      .populate('supervisorIds', 'firstName lastName')
      .populate('workplaceId'); 

    res.send(evaluations);
  } catch (error) {
    console.error('Error occurred in GET /evaluation/: ', error);
    res.status(500).send({
      message: 'Failed to fetch evaluations',
      error: error.message,
    });
  }
});

// Get a single evaluation by id
evaluationRouter.get('/evaluation/:id', async (req, res) => {
  try {
    let evaluation = await Evaluation.findById(req.params.id)
      .populate('customerId', 'firstName lastName')
      .populate('teacherId', 'firstName lastName')
      .populate('supervisorIds', 'firstName lastName')
      .populate('workplaceId');

    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found.' });
    }

    const degree = await Degree.findById(evaluation.degreeId);
    if (!degree) {
      return res.status(404).send({ message: "Degree not found" });
    }

    // Convert evaluation document to a JavaScript object for modification
    evaluation = evaluation.toObject(); 

    for (let unit of evaluation.units) {
      const degreeUnit = degree.units.find(du => du._id.toString() === unit._id.toString());
      if (degreeUnit) {
        for (let assessment of unit.assessments) {
          const degreeAssessment = degreeUnit.assessments.find(da => da._id.toString() === assessment._id.toString());
          if (degreeAssessment) {
            for (let criterion of assessment.criteria) {
              const degreeCriterion = degreeAssessment.criteria.find(dc => dc._id.toString() === criterion.criterionId.toString());
              if (degreeCriterion) {
                criterion.details = {
                  fi: degreeCriterion.fi,
                  sv: degreeCriterion.sv,
                  en: degreeCriterion.en,
                };
              }
            }
          }
        }
      }
    }

    res.send(evaluation);
  } catch (error) {
    console.error('Error fetching evaluation: ', error);
    res.status(500).send({ message: 'Failed to fetch evaluation', error: error.message });
  }
});

// Update a evaluation by id
evaluationRouter.put('/evaluation/:id', async (req, res) => {
  try {
    const evaluation = await Evaluation.findById(req.params.id);

    if (!evaluation) {
      return res.status(404).send({ message: 'Evaluation not found' });
    }

    const updatedSupervisorIds = new Set(req.body.supervisorIds || []);
    const existingSupervisorIds = new Set(
      evaluation.supervisorIds.map((id) => id.toString())
    );

    // Identify new supervisors
    const newSupervisors = [...updatedSupervisorIds].filter(
      (id) => !existingSupervisorIds.has(id)
    );

    // Replace the entire supervisor list
    // evaluation.supervisorIds = Array.from(updatedSupervisorIds);
    if (req.body.supervisorIds) {
      const updatedSupervisorIds = new Set(req.body.supervisorIds);
      evaluation.supervisorIds = Array.from(updatedSupervisorIds);
    }

    // Handle new supervisors
    if (newSupervisors.length > 0) {
      const newSupervisorDetails = await User.find({
        _id: { $in: newSupervisors },
      });

      for (const supervisor of newSupervisorDetails) {
        const verificationLink = generateVerificationLink(supervisor);
        sendVerificationEmail(supervisor, verificationLink);
      }

      // Notify existing supervisors, the customer, and possibly the teacher about new additions
      const usersToNotifyIds = [
        ...existingSupervisorIds,
        evaluation.customerId,
      ];
      if (evaluation.teacherId) {
        usersToNotifyIds.push(evaluation.teacherId);
      }

      const usersToNotify = await User.find({
        _id: { $in: usersToNotifyIds },
      });

      for (const user of usersToNotify) {
        sendNotificationMail(
          user,
          newSupervisors.map((id) => id.toString())
        );
      }
    }


    evaluation.units = req.body.units.map((unit) => {
      let allAssessmentsCompleted = true;
      let anyAssessmentInProgress = false;

      // Check if any assessment is in progress or all assessments are completed and ready is true
      unit.assessments.forEach((assessment) => {
        const { answer, answerTeacher, answerSupervisor } = assessment;
        if (
          [answer, answerTeacher, answerSupervisor].some(
            (ans) => ans === 1 || ans === 2
          )
        ) {
          anyAssessmentInProgress = true;
        }
        if (
          [answer, answerTeacher, answerSupervisor].some((ans) => ans === 0)
        ) {
          allAssessmentsCompleted = false;
        }
      });

      if ((allAssessmentsCompleted && unit.ready) || unit.ready) {
        unit.status = 2; 
      } else if (anyAssessmentInProgress) {
        unit.status = 1; 
      }

      return unit;
    });

    // Update other fields of the evaluation as needed or add new in future
    evaluation.workTasks = req.body.workTasks || evaluation.workTasks;
    evaluation.workGoals = req.body.workGoals || evaluation.workGoals;
    evaluation.completed =
      req.body.completed !== undefined
        ? req.body.completed
        : evaluation.completed;
    evaluation.startDate = req.body.startDate || evaluation.startDate;
    evaluation.endDate = req.body.endDate || evaluation.endDate;
    evaluation.units = req.body.units || evaluation.units;

    await evaluation.save();
    res.send(evaluation);
  } catch (error) {
    console.error('Error updating evaluation: ', error);
    res
      .status(400)
      .send({ message: 'Error updating evaluation', error: error.message });
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

// Send email to teacher
evaluationRouter.post('/evaluation/sendEmail', async (req, res) => {
  try {
    if (!req.body.teacherId || !req.body.message) {
      return res
        .status(400)
        .send('Missing teacherId or message in the request body.');
    }

    const teacher = await User.findById(req.body.teacherId);

    if (!teacher) {
      return res.status(404).send('Teacher not found.');
    }

    sendUserMail(teacher, req.body.message);


    res.status(200).send('Email sent successfully.');
  } catch (error) {
    console.error('Error in sending email: ', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = evaluationRouter;
