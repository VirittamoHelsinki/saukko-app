const mongoose = require('mongoose');

const evaluationSchema = mongoose.Schema({
  degreeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Degree', // Degree._id
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User._id
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User._id
  },
  supervisorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // User._id
  },
  workplaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workplace', // Workplace._id
  },
  completed: {
    type: Boolean,
    default: false,
  },
  units: [
    {
      unitId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Degree', // Degree.unit._id
      },
      status: {
        type: Number,
        default: null,
        enum: [null, 0, 1, 2, 3, 4, 5],
      },
      assessments: [
        {
          assessmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Degree', // Degree.unit.assessment._id
          },
          criteria: [
            {
              criterionId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Degree', // Degree.unit.assessment.criterion._id
              },
              answer: {
                type: Number,
                default: null,
                enum: [null, 1, 2],
              },
              attachments: [
                {
                  attachmentId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Attachment', // Attachment._id
                  }
                }
              ]
            }
          ]
        }
      ],
      messages: [
        {
          messageId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Message', // Message._id
          },
          replies: [
              {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Message', // Message._id
              },
          ]
        }
      ],
      comments: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Comment', // Comment._id
        }
      ]
    }
  ]
})

evaluationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
