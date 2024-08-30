import axios from 'axios';

// Create evaluation
const createEvaluation = async (evaluation) => {
  console.log(evaluation);
  try {
    const response = await axios.post(`/api/evaluation/`, evaluation);
    return response.data;
  } catch (error) {
    console.log('Error creating evaluation:', error);
  }
};

/**
 * @description GET - Request to `/api/evaluation` to get all evaluations for the current teacher
 * @returns Evaluation[]
 */
const fetchAllEvaluations = async () => {
  try {
    const response = await axios.get(`/api/evaluation/`);
    console.log('RESPONSE', response.data);

    return response.data;
  } catch (error) {
    console.log('Error fetching all evaluations:', error);
  }
};

// Update evaluation by id
const updateEvaluationById = async (evaluationId, updatedData) => {
  try {
    const response = await axios.put(
      `/api/evaluation/${evaluationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching single evaluation:', error);
  }
};

const sendEmail = async (message) => {
  try {
    const response = await axios.post(`/api/evaluation/sendEmail`, message);
    return response.data;
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

const handleUserPerformanceEmails = async (evaluationId, updatedData) => {
  try {
    const response = await axios.put(
      `/api/evaluation/${evaluationId}`,
      updatedData
    );
    return response.data;
  } catch (error) {
    console.log('Error fetching single evaluation:', error);
  }
};

export {
  createEvaluation,
  fetchAllEvaluations,
  updateEvaluationById,
  sendEmail,
  handleUserPerformanceEmails,
};
