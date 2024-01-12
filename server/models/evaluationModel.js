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
  supervisorIds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  workplaceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workplace', // Workplace._id
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
  extensionEndDate: {
    type: Date,
  },
  workTasks: {
    type: String,
  },
  workGoals: {
    type: String,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  status: {
    type: Number,
    default: 0,
    enum: [0, 1, 2],
  },
  degreeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Degree', // Degree._id
  },
  // The date when a particular regulation was established
  regulationDate: {
    type: Date,
  },
  // The date when a transitional period ends
  transitionEnds: {
    type: Date,
  },
  // The date from which a particular policy or entity is valid
  validFrom: {
    type: Date,
  },
  // The expiration date of a particular policy or entity
  expiry: {
    type: Date,
  },
  // Units related to the workplace
  units: [
    // Unique identifier for the unit
    {
      _id: {
        type: Number,
      },
      //Status for the evaluation
      status: {
        type: Number,
        default: 0,
        enum: [0, 1, 2, 3],
      },
      ready: {
        type: Boolean,
        default: false,
      },
      // Name of the unit in Finnish and Swedish
      name: {
        fi: {
          type: String,
          default: '',
        },
        sv: {
          type: String,
          default: '',
        },
      },
      // Assessments related to the unit
      assessments: [
        {
          // Unique identifier for the assessment
          _id: {
            type: Number,
          },
          // Name of the assessment in Finnish and Swedish
          name: {
            fi: {
              type: String,
              default: '',
            },
            sv: {
              type: String,
              default: '',
            },
          },
          answer: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3],
          },
          answerTeacher: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3],
          },
          answerSupervisor: {
            type: Number,
            default: 0,
            enum: [0, 1, 2, 3],
          },
        },
      ],
    },
  ],
});

/* Keeping this for later fixes.
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
          answer: {
            type: Number,
            default: null,
            enum: [null, 1, 2],
          },
          answerTeacher: {
            type: Number,
            default: null,
            enum: [null, 1, 2],
          },
          answerSupervisor: {
            type: Number,
            default: null,
            enum: [null, 1, 2],
          }
        }
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
})*/

evaluationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    delete returnedObject.__v;
  },
});

const Evaluation = mongoose.model('Evaluation', evaluationSchema);

module.exports = Evaluation;
