import mongoose, { Schema, Document, mongo } from "mongoose";

export interface IDegreeDocument extends IDegree, Document { }

export interface IDegree {
  degree_id: number;
  diaryNumber: string;
  eduCodeValue: string;
  examInfoURL: string;
  expiry: number|null;
  validFrom: number|null;
  transitionEnds: number|null;
  regulationDate: number|null;
  name: IName;
  description: IDescription;
  units: IUnit[]|null;
}

export interface IName {
  fi?: string;
  sv?: string;
  en?: string;
}

export interface IDescription {
  fi?: string;
  sv: string;
  en: string;
}

export interface IUnit {
  _id:  number;
  name: {
    fi?: string;
    sv?: string;
    en?: string;
  }
}

const degreeSchema = new Schema<IDegreeDocument>({
  degree_id: {
    type: Number
  },
  diaryNumber: {
    type: String,
  },
  eduCodeValue: {
    type: String,
  },
  examInfoURL: {
    type: String,
  },
  expiry: {
    type: Number,
    required: false,
  },
  validFrom: {
    type: Number,
    required: false,
  },
  transitionEnds: {
    type: Number,
    required: false,
  },
  regulationDate: {
    type: Number,
    required: false,
  },
  name: {
    fi: {
      type: String,
      default: ""
    },
    en: {
      type: String,
      default: ""
    },
    sv: {
      type: String,
      default: ""
    },
  },
  description: {
    fi: {
      type: String,
      default: ""
    },
    sv: {
      type: String,
      default: ""
    },
    en: {
      type: String,
      default: ""
    },
  },
  units: [
    {
      _id: {
        type: Number,
      },
      name: {
        fi: {
          type: String,
          default: ""
        },
        sv: {
          type: String,
          default: ""
        },
        en: {
          type: String,
          default: ""
        },
      }
    }
  ]
})

export default mongoose.model<IDegreeDocument & Document>("Degree", degreeSchema);
