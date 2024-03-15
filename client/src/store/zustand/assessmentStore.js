import {create} from 'zustand';

const useAssessmentStore = create((set) => ({
    assessments:{}, // Initialize with an empty object
    setAssessments:(assessments)=>set({assessments}), // Methos to set assessments

}));

// Selector function to get assessment parameters by ID
/* export const useAssessmentParameters = () => {
    const assessments = useAssessmentsStore((state)=>state.assessments);

    // Function to get assessment parameters by assessment id
    const getAssessmentParametersById = (assessmentId) => {
        const assessment=assessments[assessmentId];
        if(!assessment) return null; //Assessment not found

        const {_id, name, answer, answerTeacher, answerSupervisor} = assessment;
        return { _id, name, answer, answerTeacher, answerSupervisor };
    };

    return { assessments, getAssessmentParametersById };
}; */

// Selector function to get assessment parameters by ID
export const useAssessmentParameters = () => {
    return useAssessmentStore((state) => ({
      getAssessmentParametersById: (assessmentId) => {
        const assessment = state.assessments[assessmentId];
        if (!assessment) return null; // If assessment not found, return null
  
        return {
          _id: assessment._id,
          name: assessment.name,
          answer: assessment.answer,
          answerSupervisor: assessment.answerSupervisor,
          answerTeacher: assessment.answerTeacher,
        };
      },
    }));
  };

export default useAssessmentStore;