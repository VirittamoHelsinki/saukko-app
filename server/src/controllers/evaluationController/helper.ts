import DegreeModel from '../../models/degreeModel';
import UserModel, { User } from '../../models/userModel';
import config from '../../utils/config';
import { Response } from 'express';

export const responseWithError = (res: Response, statusCode: number, err: any, optionalMessage?: string) => {
  const errorMessage = err.message ?? optionalMessage ?? 'Unknown error';
  console.error(errorMessage);
  res.status(statusCode).json({ errorMessage });
};

export const generateVerificationLink = (user: User) => {
  const verificationToken = user.generateEmailVerificationToken();
  return `${config.APP_URL}/verify-email/${verificationToken}`;
};

export const fetchDegree = async (degreeId: any) => {
  const degree = await DegreeModel.findById(degreeId);
  if (!degree) {
    throw new Error('Degree not found');
  }
  return degree;
};

export const mapCriteria = (unit: any, degree: any) => {
  const degreeUnit = degree.units.find((du: any) => du._id.toString() === unit._id.toString());
  if (degreeUnit) {
    unit.assessments = unit.assessments.map((assessment: any) => {
      const degreeAssessment = degreeUnit.assessments.find((da: any) => da._id === assessment._id);
      if (degreeAssessment) {
        assessment.criteria = degreeAssessment.criteria.map((criteria: any) => ({
          criterionId: criteria._id,
          fi: criteria.fi,
          sv: criteria.sv,
          en: criteria.en,
        }));
      }
      return assessment;
    });
  }
  return unit;
};