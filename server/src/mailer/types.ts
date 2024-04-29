export interface ISendEvaluationFormRequestContact{
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