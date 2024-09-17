export interface ISendEvaluationFormRequestContact {
  customerName: string;
  degreeName: string;
  unitName: string;
  supervisorName: string;
  teacherName: string;
}

export interface ISendEvaluationFormTeacherRequestContactMessageSupervisor extends ISendEvaluationFormRequestContact {
  vocationalCompetenceName: string;
}
export enum AssessmentStatus {
  READY = 'Valmis',
  IN_PROGRESS = 'Kesken'
}

export interface ISendEvaluationFormCustomerReadyMessageSupervisor {
  supervisorFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  customerAssessment: AssessmentStatus;
  supervisorAssessment: AssessmentStatus;
  additionalInfo: string;
}

export type IEvaluation = {
  degreeId?: {
    name?: {
      fi?: string;
    };
  };
  supervisorIds?: Array<{
    firstName: string;
    lastName: string;
    email: string;
  }>;
  customerId?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  teacherId?: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export enum EvaluationStatus {
  ACCEPTED = 'Kyllä',
  REJECTED = 'Ei'
}

export interface ISendEvaluationFormTeacherReadyMessageCustomer {
  customerFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  evaluationAccepted: EvaluationStatus;
  additionalInfo: string;
}

export interface ISendEvaluationFormTeacherReadyMessageSupervisor {
  supervisorFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  evaluationAccepted: EvaluationStatus;
  additionalInfo: string;
}

export interface ISendEvaluationRequiresAction {
  supervisorFirstName: string;
  customerName: string;
  supervisorName: string;
  degreeName: string;
  unitName: string;
  evaluationAccepted: EvaluationStatus;
  additionalInfo: string;
}

export interface ISelectedValues {
  pyydetaanYhteydenottoaOpettajalta: boolean,
  pyydetaanYhteydenottoaOhjaajalta: boolean,
  pyydetaanYhteydenottoaAsiakkaalta: boolean
  suoritusValmis: boolean
  valmisLahetettavaksi: boolean
}

export interface IEmails {
  customerEmail: string,
  teacherEmail: string,
  supervisorEmail: string
}


export enum UserRoleEnum {
  customer = 'customer',
  teacher = 'teacher',
  supervisor = 'supervisor'
}

export type UserRole = UserRoleEnum | null

export const isUserRole = (user: string): user is UserRoleEnum => {
  return Object.values(UserRoleEnum).map(u => u.toString()).includes(user)
}


