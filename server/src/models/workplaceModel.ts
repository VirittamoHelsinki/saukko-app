import mongoose, { Schema, Document, Types } from "mongoose";

export interface IWorkplace extends Document {
  businessId: string;
  name: string;
  info: string;
  supervisors: Types.ObjectId[];
  departments: IDepartment[];
  degreeId: Types.ObjectId;
  regulationDate: Date;
  transitionEnds: Date;
  validFrom: Date;
  expiry: Date;
  units: IUnit[];
}

interface IDepartment {
  name: string;
  supervisors: Types.ObjectId[];
}

interface IName {
  fi: string;
  sv: string
}

interface ICriteria {
  _id: number;
  fi: string;
  sv: string;
  en: string;
}

interface IAssessment {
  _id: number;
  name: IName;
  criteria: ICriteria[];
}

interface IUnit {
  _id: number;
  name: IName;
  assessments: IAssessment[];
}

export type Workplace = (Document<unknown, {}, IWorkplace & Document<any, any, any>> & IWorkplace & Document<any, any, any> & {
  _id: Types.ObjectId;
});

const workplaceSchema = new Schema<IWorkplace>({
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
    // Name of the workplace
    info: {
      type: String,
    },
    // Array of User IDs who are supervisors at the workplace
    supervisors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    // Departments within the workplace
    departments: [
      // Name of the department
      {
        name: {
          type: String,
        },
        // User IDs of supervisors for this department
        supervisors: [
          {
            type: mongoose.Schema.Types.ObjectId,
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
              ref: 'Degree',// Reference to the Degree model
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
            //Criteria related to the assessment
            criteria: [ 
            {
              _id: { // criteria id
                type: Number,
                ref: 'Degree',
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
          },
        ],
      },
    ],
});

export default mongoose.model<IWorkplace & Document>("Workplace", workplaceSchema);
