// import UserModel, { User } from '../models/userModel';
// import EvaluationModel from '../models/evaluatuionModel';
// import degreeModel from '../models/degreeModel';
// import { Response } from 'express';
// import { Request } from '../types/requestType';
// import { sendVerificationEmail } from '../mailer/templates/newUserVerification';
// import {
//   ISendNewCustomerAddedEmail,
//   ISendNewSupervisorAddedEmail,
//   ISendOldSupervisorAddedEmail,
//   sendNewCustomerAddedEmail,
//   sendNewSupervisorAddedEmail,
//   sendOldSupervisorAddedEmail,
// } from '../mailer/templates/addingUserToAgreement';
// import {
//   sendEvaluationFormCustomerReadyMessageSupervisor,
//   sendEvaluationFormCustomerReadyMessageTeacher,
//   sendEvaluationFormCustomerRequestContact,
//   sendEvaluationFormSupervisorReadyMessageCustomer,
//   sendEvaluationFormSupervisorReadyMessageTeacher,
//   sendEvaluationFormSupervisorRequestContact,
//   sendEvaluationFormTeacherReadyMessageCustomer,
//   sendEvaluationFormTeacherReadyMessageSupervisor,
//   sendEvaluationFormTeacherRequestContactMessageCustomer,
//   sendEvaluationFormTeacherRequestContactMessageSupervisor,
// } from '../mailer/templates/EvaluationForm';
// import { AssessmentStatus, EvaluationStatus, ISendEvaluationFormRequestContact } from '../mailer/types';
//
// const _generateVerificationLink = (user: User) => {
//   const verificationToken = user.generateEmailVerificationToken();
//   return `https://saukko.azurewebsites.net/verify-email/${verificationToken}`; // TODO: move to env
// };
//
// const _responseWithError = (res: Response, statusCode: number, err: any, optionalMessage?: string) => {
//   if (err.message) {
//     console.log(err.message);
//     res.status(statusCode).json({ errorMessage: err.message });
//   } else {
//     res.status(statusCode).json({ errorMessage: optionalMessage ?? 'unknown error' });
//   }
// };
//
// const create = async (req: Request, res: Response) => {
//   const evaluationData = req.body;
//
//   try {
//     // Convert single supervisorId to an array of supervisorIds
//     if (req.body.supervisorId) {
//       req.body.supervisorIds = [req.body.supervisorId];
//       delete req.body.supervisorId;
//     }
//
//     if (!evaluationData.units) {
//       evaluationData.units = [];
//     }
//
//     // Fetch the degree based on degreeId to include criteria details from the degree
//     const degree = await degreeModel.findById(evaluationData.degreeId);
//     if (!degree) {
//       return res.status(404).send({ error: 'Degree not found' });
//     }
//
//
//     evaluationData.units = evaluationData.units.map((unit: any) => {
//       const degreeUnit = degree.units.find(du => du._id.toString() === unit._id.toString());
//       if (degreeUnit) {
//         unit.assessments = unit.assessments.map((assessment: any) => {
//           const degreeAssessment = degreeUnit.assessments.find(da => da._id === assessment._id);
//           if (degreeAssessment) {
//             // Here we map criteria from the degree and add them to the evaluation's assessment
//             assessment.criteria = degreeAssessment.criteria.map(criteria => {
//               return {
//                 criterionId: criteria._id,
//                 fi: criteria.fi,
//                 sv: criteria.sv,
//                 en: criteria.en,
//               };
//             });
//           }
//           return assessment;
//         });
//       }
//       return unit;
//     });
//
//     const evaluation = new EvaluationModel(evaluationData);
//     await evaluation.save();
//
//     // Notify supervisors if any
//     if (evaluation.supervisorIds && evaluation.supervisorIds.length > 0) {
//       evaluation.supervisorIds.forEach(async (supervisorId) => {
//         try {
//           const supervisor = await UserModel.findById(supervisorId);
//           if (supervisor) {
//             const verificationLink = _generateVerificationLink(supervisor);
//             sendVerificationEmail({ userEmail: supervisor.email, verificationLink, recipentUserId: supervisor._id });
//           }
//         } catch (userError) {
//           console.error('Error fetching supervisor for notification: ', userError);
//         }
//       });
//     }
//
//     res.status(201).send(evaluation);
//   } catch (error) {
//     console.error('Error creating evaluation: ', error);
//     res.status(400).send(error);
//   }
// };
//
// /**
//  * 
//  * @deprecated use getAllForCurrentUser instead
//  */
// const getAll = async (req: Request, res: Response) => {
//   try {
//     const evaluations = await EvaluationModel.find()
//       .populate('customerId', 'firstName lastName email')
//       .populate('teacherId', 'firstName lastName')
//       .populate('supervisorIds', 'firstName lastName email')
//       .populate('workplaceId');
//
//     res.send(evaluations);
//   } catch (error) {
//     return _responseWithError(res, 500, error, 'Failed to fetch evaluations');
//   }
// };
//
// const getAllForCurrentUser = async (req: Request, res: Response) => {
//   try {
//     const user = (req.user as User) ?? (() => { throw new Error("User is not defined") })
//
//     const getFilter = () => {
//       switch (user.role) {
//         case 'customer':
//           return { customerId: user.id };
//         case 'teacher':
//           return { teacherId: user.id };
//         case 'supervisor':
//           return { supervisorIds: { '$in': [user.id] } };
//         default:
//           throw new Error('Unknown role');
//       }
//     };
//
//     const evaluations = await EvaluationModel
//       .find(getFilter())
//       .populate('customerId', 'firstName lastName email')
//       .populate('teacherId', 'firstName lastName')
//       .populate('supervisorIds', 'firstName lastName email')
//       .populate('workplaceId');
//
//     res.send(evaluations);
//   } catch (error) {
//     return _responseWithError(res, 500, error, 'Failed to fetch evaluations');
//   }
// };
//
// const getById = async (req: Request, res: Response) => {
//   try {
//     let evaluation = await EvaluationModel.findById(req.params.id)
//       .populate('customerId', 'firstName lastName')
//       .populate('teacherId', 'firstName lastName')
//       .populate('supervisorIds', 'firstName lastName')
//       .populate('workplaceId');
//
//     if (!evaluation) {
//       return res.status(404).send({ message: 'Evaluation not found.' });
//     }
//
//     const degree = await degreeModel.findById(evaluation.degreeId);
//     if (!degree) {
//       return res.status(404).send({ message: 'Degree not found' });
//     }
//
//     // Convert evaluation document to a JavaScript object for modification
//     evaluation = evaluation.toObject();
//
//     // TODO: What is reason of that????
//     // COMMENTED OUT, seems like that is pointless
//
//     // for (let unit of evaluation.units) {
//     //   const degreeUnit = degree.units.find(du => du._id.toString() === unit._id.toString());
//     //   if (degreeUnit) {
//     //     for (let assessment of unit.assessments) {
//     //       const degreeAssessment = degreeUnit.assessments.find(da => da._id.toString() === assessment._id.toString());
//     //       if (degreeAssessment) {
//     //         for (let criterion of assessment.criteria) {
//     //           const degreeCriterion = degreeAssessment.criteria.find(dc => dc._id.toString() === criterion.criterionId.toString());
//     //           if (degreeCriterion) {
//
//     //             // BUG: This was there before the server was translated to TypeScript. "criterion" does not have details propery so that was a problem
//     //             // I'll let that here if something gone broken
//     //             criterion.details = {
//     //               fi: degreeCriterion.fi,
//     //               sv: degreeCriterion.sv,
//     //               en: degreeCriterion.en,
//     //             };
//
//     //             // FIX: not tested but it will work
//     //             criterion.en = 
//     //           }
//     //         }
//     //       }
//     //     }
//     //   }
//     // }
//
//     res.status(200).send(evaluation);
//   } catch (error) {
//     _responseWithError(res, 500, error);
//     // console.error('Error fetching evaluation: ', error);
//     // res.status(500).send({ message: 'Failed to fetch evaluation', error: error.message });
//   }
// };
//
// const update = async (req: Request, res: Response) => {
//   try {
//     const evaluation = await EvaluationModel.findById(req.params.id)
//       .populate({
//         path: 'degreeId',
//         select: 'name',
//       })
//       .populate('customerId')
//       .populate('teacherId')
//       .populate('supervisorIds');
//     console.log('degree info: ', evaluation!.degreeId.name.fi);
//     if (!evaluation) {
//       return res.status(404).send({ message: 'Evaluation not found' });
//     }
//
//     const updatedSupervisorIds = new Set(req.body.supervisorIds || []);
//     const existingSupervisorIds = new Set(
//       evaluation.supervisorIds.map((id) => id.toString())
//     );
//
//     // Identify new supervisors
//     const newSupervisors = [...updatedSupervisorIds].filter(
//       (id) => !existingSupervisorIds.has(id as any)
//     );
//
//     // Replace the entire supervisor list
//     // evaluation.supervisorIds = Array.from(updatedSupervisorIds);
//     if (req.body.supervisorIds) {
//       const updatedSupervisorIds = new Set(req.body.supervisorIds);
//       // evaluation.supervisorIds = Array.from(updatedSupervisorIds);
//       evaluation.supervisorIds = req.body.supervisorIds;
//     }
//
//     // Handle new supervisors
//     if (newSupervisors.length > 0) {
//       const newSupervisorDetails = await UserModel.find({
//         _id: { $in: newSupervisors },
//       });
//
//       for (const supervisor of newSupervisorDetails) {
//         const verificationLink = _generateVerificationLink(supervisor);
//         sendVerificationEmail({ userEmail: supervisor.email, verificationLink, recipentUserId: supervisor._id });
//       }
//
//       // Notify existing supervisors, the customer, and possibly the teacher about new additions
//       const usersToNotifyIds = [
//         ...existingSupervisorIds,
//         evaluation.customerId,
//       ];
//       if (evaluation.teacherId) {
//         usersToNotifyIds.push(evaluation.teacherId);
//       }
//
//       const usersToNotify = await UserModel.find({
//         _id: { $in: usersToNotifyIds },
//       });
//       // TODO: refactor objects
//       const customerParams: ISendNewCustomerAddedEmail = {
//         degreeName: 'degreeName',
//         supervisorName: 'supervisorName',
//         teacherName: 'teacherName',
//         verificationLink: 'verificationLink',
//         userEmail: 'userEmail',
//       };
//
//       const newSupervisorParams: ISendNewSupervisorAddedEmail = {
//         userEmail: 'userEmail',
//         customerName: 'customerName',
//         degreeName: 'degreeName',
//         supervisorName: 'supervisorName',
//         verificationLink: 'verificationLink'
//       };
//
//       const oldSupervisorParams: ISendOldSupervisorAddedEmail = {
//         userFirstName: 'userFirstName',
//         userEmail: 'userEmail',
//         customerName: 'customerName',
//         degreeName: 'degreeName',
//         teacherName: 'teacherName',
//       };
//
//       for (const user of usersToNotify) {
//
//         if (user.role === 'customer') {
//           sendNewCustomerAddedEmail(customerParams);
//         } else if (user.role === 'supervisor') {
//           sendNewSupervisorAddedEmail(newSupervisorParams);
//         } else if (user.role === 'teacher') {
//           sendOldSupervisorAddedEmail(oldSupervisorParams);
//         }
//       }
//     }
//
//
//     evaluation.units = req.body.units.map((unit: any) => {
//       let allAssessmentsCompleted = true;
//       let anyAssessmentInProgress = false;
//
//       // Check if any assessment is in progress or all assessments are completed and ready is true
//       unit.assessments.forEach((assessment: any) => {
//         const { answer, answerTeacher, answerSupervisor } = assessment;
//         if (
//           [answer, answerTeacher, answerSupervisor].some(
//             (ans) => ans === 1 || ans === 2
//           )
//         ) {
//           anyAssessmentInProgress = true;
//         }
//         if (
//           [answer, answerTeacher, answerSupervisor].some((ans) => ans === 0)
//         ) {
//           allAssessmentsCompleted = false;
//         }
//       });
//
//       if ((allAssessmentsCompleted && unit.ready) || unit.ready) {
//         unit.status = 2;
//       } else if (anyAssessmentInProgress) {
//         unit.status = 1;
//       }
//
//       return unit;
//     });
//
//     // Update other fields of the evaluation as needed or add new in future
//     evaluation.workTasks = req.body.workTasks || evaluation.workTasks;
//     evaluation.workGoals = req.body.workGoals || evaluation.workGoals;
//     evaluation.completed =
//       req.body.completed !== undefined
//         ? req.body.completed
//         : evaluation.completed;
//     evaluation.startDate = req.body.startDate || evaluation.startDate;
//     evaluation.endDate = req.body.endDate || evaluation.endDate;
//     evaluation.units = req.body.units || evaluation.units;
//
//     await evaluation.save();
//     res.send(evaluation);
//   } catch (error) {
//     return _responseWithError(res, 400, error);
//     // console.error('Error updating evaluation: ', error, 'Error updating evaluation');
//     // res
//     //   .status(400)
//     //   .send({ message: 'Error updating evaluation', error: error.message });
//   }
// };
//
// const deleteById = async (req: Request, res: Response) => {
//   try {
//     const evaluation = await EvaluationModel.findByIdAndDelete(req.params.id);
//     if (!evaluation) {
//       return res.status(404).send();
//     }
//     res.send(evaluation);
//   } catch (error) {
//     res.status(500).send(error);
//   }
// };
//
// // TODO, this would be fit better to own controller
// const sendEmailToTeacher = async (req: Request, res: Response) => {
//   try {
//     if (!req.body.teacherId || !req.body.message) {
//       return res
//         .status(400)
//         .send('Missing teacherId or message in the request body.');
//     }
//
//     const teacher = await UserModel.findById(req.body.teacherId);
//
//     if (!teacher) {
//       return res.status(404).send('Teacher not found.');
//     }
//
//     //TODO: Implement correct function
//
//     // sendUserMail(teacher, req.body.message);
//
//
//     res.status(200).send('Email sent successfully.');
//   } catch (error) {
//     console.error('Error in sending email: ', error);
//     res.status(500).send('Internal Server Error');
//   }
// };
//
// const handleUserPerformanceEmails = async (req: Request, res: Response) => {
//   try {
//     const evaluation = await EvaluationModel.findById(req.params.id)
//       .populate({
//         path: 'degreeId',
//         select: 'name.fi',
//       })
//       .populate('customerId')
//       .populate('teacherId')
//       .populate('supervisorIds')
//       .populate('units');
//
//
//     if (!evaluation) {
//       return res.status(404).send({ message: 'Evaluation not found' });
//     }
//
//     const user = req.user as User;
//
//     interface IFormIsReadyParams {
//       degreeName: string;
//       unitName: string;
//       supervisorName: string;
//       customerName: string;
//       additionalInfo: string;
//     }
//
//     const formIsReadyParams: IFormIsReadyParams = {
//       degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
//       unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
//       supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
//       customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
//       additionalInfo: req.body.additionalInfo,
//     };
//
//     const customerEmail: string = evaluation.customerId?.email || 'Unknown Customer Email';
//     const teacherEmail: string = evaluation.teacherId?.email || 'Unknown Teacher Email';
//     const supervisorEmail: string = evaluation.supervisorIds?.[0]?.email || 'Unknown Supervisor Email';
//
//     const selectedValues = req.body.selectedValues;
//
//     if (selectedValues.suoritusValmis) {
//       // suoritus valmis
//       switch (user.role) {
//         case 'supervisor':
//           sendEvaluationFormSupervisorReadyMessageCustomer(
//             {
//               ...formIsReadyParams,
//               customerFirstName: evaluation.customerId?.firstName || 'Unknown Customer First Name',
//               customerAssessment: AssessmentStatus.READY,
//               supervisorAssessment: AssessmentStatus.READY,
//             },
//             'TPO:n valmis lomake', customerEmail);
//           sendEvaluationFormSupervisorReadyMessageTeacher(
//             {
//               ...formIsReadyParams,
//               teacherFirstName: evaluation.teacherId?.firstName || 'Unknown Customer First Name',
//               customerAssessment: AssessmentStatus.READY,
//               supervisorAssessment: AssessmentStatus.READY,
//             },
//             'TPO:n valmis lomake', teacherEmail);
//           break;
//         case 'customer':
//           sendEvaluationFormCustomerReadyMessageSupervisor({
//             ...formIsReadyParams,
//             supervisorFirstName: evaluation.supervisorIds?.[0]?.firstName,
//             customerAssessment: AssessmentStatus.READY,
//             supervisorAssessment: AssessmentStatus.READY,
//           }, 'Asiakkaan valmis lomake', supervisorEmail);
//           sendEvaluationFormCustomerReadyMessageTeacher({
//             ...formIsReadyParams,
//             teacherFirstName: evaluation.teacherId?.firstName,
//             customerAssessment: AssessmentStatus.READY,
//             supervisorAssessment: AssessmentStatus.READY,
//
//           }, 'Asiakkaan valmis lomake', supervisorEmail);
//           break;
//         case 'teacher':
//           sendEvaluationFormTeacherReadyMessageSupervisor({
//             ...formIsReadyParams,
//             supervisorFirstName: evaluation.supervisorIds?.[0]?.firstName,
//             evaluationAccepted: EvaluationStatus.ACCEPTED,
//
//           }, 'opettajan valmis lomake', supervisorEmail);
//           sendEvaluationFormTeacherReadyMessageCustomer({
//             ...formIsReadyParams,
//             customerFirstName: evaluation.customerId?.firstName,
//             evaluationAccepted: EvaluationStatus.ACCEPTED,
//
//           }, 'opettajan valmis lomake', customerEmail);
//           break;
//       }
//     }
//     const requestContactParams: ISendEvaluationFormRequestContact = {
//       degreeName: evaluation.degreeId?.name?.fi || 'Unknown Degree',
//       unitName: req.body.units?.[0]?.name?.fi || 'Unknown Unit',
//       teacherName: evaluation.teacherId?.firstName + ' ' + evaluation.teacherId?.lastName,
//       customerName: evaluation.customerId?.firstName + ' ' + evaluation.customerId?.lastName || 'Unknown Customer',
//       supervisorName: evaluation.supervisorIds?.[0]?.firstName + ' ' + evaluation.supervisorIds?.[0]?.lastName || 'Unknown Supervisor',
//     };
//
//     // yhteydenottopyynnöt
//     if (selectedValues.pyydetaanYhteydenottoaOpettajalta && user.role === 'customer') {
//       sendEvaluationFormCustomerRequestContact({
//         ...requestContactParams,
//       }, teacherEmail);
//     }
//
//     if (selectedValues.pyydetaanYhteydenottoaOpettajalta && user.role === 'supervisor') {
//       sendEvaluationFormSupervisorRequestContact({
//         ...requestContactParams,
//       }, teacherEmail);
//     }
//
//     if (selectedValues.pyydetaanYhteydenottoaAsiakkaalta && user.role === 'teacher') {
//       sendEvaluationFormTeacherRequestContactMessageCustomer({
//         ...requestContactParams,
//       }, customerEmail);
//     }
//     if (selectedValues.pyydetaanYhteydenottoaOhjaajalta && user.role === 'teacher') {
//       sendEvaluationFormTeacherRequestContactMessageSupervisor({
//         ...requestContactParams,
//         vocationalCompetenceName: evaluation.units[0].assessments[0].name.fi,
//       }, supervisorEmail);
//     }
//
//     evaluation.units = req.body.units.map((unit: any) => {
//       let allAssessmentsCompleted = true;
//       let anyAssessmentInProgress = false;
//
//       // Check if any assessment is in progress or all assessments are completed and ready is true
//       unit.assessments.forEach((assessment: any) => {
//         const { answer, answerTeacher, answerSupervisor } = assessment;
//         if (
//           [answer, answerTeacher, answerSupervisor].some(
//             (ans) => ans === 1 || ans === 2,
//           )
//         ) {
//           anyAssessmentInProgress = true;
//         }
//         if (
//           [answer, answerTeacher, answerSupervisor].some((ans) => ans === 0)
//         ) {
//           allAssessmentsCompleted = false;
//         }
//       });
//
//       if ((allAssessmentsCompleted && unit.ready) || unit.ready) {
//         unit.status = 2;
//       } else if (anyAssessmentInProgress) {
//         unit.status = 1;
//       }
//
//       return unit;
//     });
//
//     // Update other fields of the evaluation as needed or add new in future
//     evaluation.workTasks = req.body.workTasks || evaluation.workTasks;
//     evaluation.workGoals = req.body.workGoals || evaluation.workGoals;
//     evaluation.completed =
//       req.body.completed !== undefined
//         ? req.body.completed
//         : evaluation.completed;
//     evaluation.startDate = req.body.startDate || evaluation.startDate;
//     evaluation.endDate = req.body.endDate || evaluation.endDate;
//     evaluation.units = req.body.units || evaluation.units;
//
//     await evaluation.save();
//     res.send(evaluation);
//     // res.status(200).send({ message: 'Emails handled successfully' });
//   } catch
//   (error) {
//     console.log(error);
//     res.status(500).send({ message: 'Internal server error' });
//   }
// };
//
// export default {
//   create,
//   getAll,
//   getAllForCurrentUser,
//   getById,
//   update,
//   deleteById,
//   sendEmailToTeacher,
//   handleUserPerformanceEmails,
// };
