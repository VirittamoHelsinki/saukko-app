const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const workplaceSchema = new mongoose.Schema({
     // A unique identifier for the business
  businessId: {
    type: String,
    required: true,
    unique: true,
  },
   // Name of the workplace
  name: {
    type: String,
    required: true,
  },
  // Array of User IDs who are supervisors at the workplace
  supervisors: [
    {
      type: ObjectId,
      ref: 'User',
    },
  ],
  // Departments within the workplace
  departments: [
    // Name of the department
    {
      name: {
        type: String,
        required: true,
      },
       // User IDs of supervisors for this department
      supervisors: [
        {
          type: ObjectId,
          ref: 'User',
        },
      ],
    },
  ],
  degreeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Degree', // Degree._id
  },
  // The date when a particular regulation was established
  regulationDate: {
    type: Date,
    required: true,
  },
// The date when a transitional period ends
  transitionEnds: {
    type: Date,
    required: true,
  },
  // The date from which a particular policy or entity is valid
  validFrom: {
    type: Date,
    required: true,
  },
   // The expiration date of a particular policy or entity
  expiry: {
    type: Date,
    required: true,
  },
    // Units related to the workplace
  units: [
    // Unique identifier for the unit
    {
      _id: {
        type: Number,
        required: true,
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
            required: true,
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
        },
      ],
    },
  ],
});

const Workplace = mongoose.model('Workplace', workplaceSchema);

module.exports = Workplace;
