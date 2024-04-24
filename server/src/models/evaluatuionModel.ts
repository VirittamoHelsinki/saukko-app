import mongoose, { Schema, Document, Types } from "mongoose";
import { IName } from './degreeModel';

export interface IEvaluation extends Document {
  degreeId: IDegree;
  customerId: IUser;
  teacherId: IUser;
  supervisorIds: IUser[];
  workplaceId: mongoose.Schema.Types.ObjectId;
  startDate: Date;
  endDate: Date;
  extensionEndDate: Date;
  workTasks: string;
  workGoals: string;
  completed: boolean;
  status: number;
  regulationDate: Date;
  transitionEnds: Date;
  validFrom: Date;
  expiry: Date;
  units: IUnit[];
}

interface IDegree {
  name: IName
  id: mongoose.Schema.Types.ObjectId;
}

interface IUser {
  firstName: string,
  lastName: string,
  email: string
  id: mongoose.Schema.Types.ObjectId;
}

interface IUnit {
  _id: number;
  status: number;
  ready: boolean;
  name: {
    fi: string;
    sv: string;
  };
  assessments: IAssessments[];
}

interface IAssessments {
  _id: number;
  name: {
    fi: string;
    sv: string;
  };
  answer: number;
  answerTeacher: number;
  answerSupervisor: number;
  // TODO: SA-307 - Tänne opettajan kommentti itselleen muistiin. "yhteenveto".........
  criteria: ICriteria[];
}

interface ICriteria {
  criterionId: number;
  fi: string;
  sv: string;
  en: string;
}

export type Evaluation = (Document<unknown, {}, IEvaluation & Document<any, any, any>> & IEvaluation & Document<any, any, any> & {
    _id: Types.ObjectId;
  });

const evaluationSchema = new Schema<IEvaluation>({
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
            ref: 'Degree', // Reference to the Degree mode
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
          criteria: [
            // list of criteria for this assessment
            {
              criterionId: {
                type: Number,
                ref: 'Degree', // Degree.unit.assessment.criterion._id
              },
              fi: {
                // criteria finnish name
                type: String,
                default: '',
              },
              sv: {
                // criteria swedish name
                type: String,
                default: '',
              },
              en: {
                // criteria english name
                type: String,
                default: '',
              },
            },
          ],
          comment: {
            text: {
              type: String,
              default: '',
            },
          },
        },
      ],
    },
  ],
});

evaluationSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    delete returnedObject.__v;
  },
});

export default mongoose.model<IEvaluation & Document>(
  'Evaluation',
  evaluationSchema
);
