const mongoose = require('mongoose');

const degreeSchema = new mongoose.Schema({
  diaryNumber: { // registration number
    type: String,
  },
  eduCodeNumber: { // education code number
    type: String,
  },
  name: { 
    fi: { // degree finnish name
      type: String,
      default: ""
    },
    sv: { // degree swedish name
      type: String,
      default: ""
    },
    en: { // degree english name
      type: String,
      default: ""
    },
    enum: ["fi", "sv", "en"],
  },
  description: { 
    fi: { // degree finnish description
      type: String,
      default: ""
    },
    sv: { // degree swedish description
      type: String,
      default: ""
    },
    en: { // degree english description
      type: String,
      default: ""
    },
    enum: ["fi", "sv", "en"],
  },
  archived: { // boolean for checking if degree is archived or not
    type: Boolean,
  },
  infoURL: { // link to degree info page on ePerusteet
    type: String,
  },
  units: [
    {
      _id: { // unit id
        type: Number,
        required: true,
        unique: true,
      },
      name: { // unit name
        fi: { // unit finnish name
          type: String,
          default: ""
        },
        sv: { // unit swedish name
          type: String,
          default: ""
        },
        en: { // unit english name
          type: String,
          default: ""
        },
        enum: ["fi", "sv", "en"],
      },
      assessments: [ // list of assessments for this unit
        {
          _id: { // assessment id
            type: Number,
            required: true,
            unique: true,
          },
          name: { // assessment name
            fi: { // assessment finnish name
              type: String,
              default: ""
            },
            sv: { // assessment swedish name
              type: String,
              default: ""
            },
            en: { // assessment english name
              type: String,
              default: ""
            },
            enum: ["fi", "sv", "en"],
          },/*
          criteria: [ // list of criteria for this assessment
            {
              _id: { // criteria id
                type: Number,
                required: true,
                unique: true,
              },
              fi: { // criteria finnish name
                type: String,
                default: ""
              },
              sv: { // criteria swedish name
                type: String,
                default: ""
              },
              en: { // criteria english name
                type: String,
                default: ""
              },
            }
          ]*/
        }
      ]
    }
  ]
})

const Degree = mongoose.model('Degree', degreeSchema);

module.exports = Degree;

