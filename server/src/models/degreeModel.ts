import mongoose, { Schema, Document } from "mongoose";

// Define the interface representing the merged properties of IDegree and Document
export interface IDegree extends Document {
  diaryNumber: string; // registration number
  eduCodeValue: string; // education code number
  name: IName;  // translated names of degree
  description: IDescription; // translated descriptions of degree
  archived: boolean; // boolean for checking if degree is archived or not
  infoURL: string; // link to degree info page on ePerusteet
  regulationDate: Date; // The date when a particular regulation was established
  transitionEnds: Date; // The date when a transitional period ends
  validFrom: Date; // The date from which a particular policy or entity is valid
  expiry: Date; // The expiration date of a particular policy or entity
  units: IUnit[];
}

export interface IName {
  fi?: string; // degree finnish name
  sv?: string; // degree swedish name
  en?: string; // degree english name
  enum: string[];
}

interface IDescription {
  fi?: string;
  sv: string;
  en: string;
  enum: string[];
}

interface ICriteria {
  _id: number,
  fi: string,
  sv: string,
  en: string,
}

interface IAssesment {
  _id: number;
  name: IName;
  criteria: ICriteria[];
}

interface IUnit {
  _id: number;
  name: IName;
  assessments: IAssesment[];
}

// Create a Mongoose schema for the degree entity with specified properties and their types
const degreeSchema = new Schema<IDegree>({
  diaryNumber: {
    type: String,
  },
  eduCodeValue: {
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
  archived: {
    type: Boolean,
  },
  infoURL: {
    type: String,
  },
  regulationDate: {
    type: Date,
  },
  transitionEnds: {
    type: Date,
  },
  validFrom: {
    type: Date,
  },
  expiry: {
    type: Date,
  },
  units: [
    {
      _id: { // unit id
        type: Number,
        required: true,
        //unique: true,
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
            //unique: true,
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
          },

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
          ]
        }
      ]
    }
  ]
})

export default mongoose.model<IDegree & Document>("Degree", degreeSchema);
