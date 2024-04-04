import axios from 'axios';

const baseURL = process.env.REACT_APP_BACKEND_URL;
const middleURL = '/api';

// Create evaluation
const createEvaluation = async (evaluation) => {
  console.log(evaluation);
  try {
    const response = await axios.post(
      `${baseURL}${middleURL}/evaluation/`,
      evaluation
    );
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
    const response = await axios.get(`${baseURL}${middleURL}/evaluation/`);
    return response.data;
  } catch (error) {
    console.log('Error fetching all evaluations:', error);
  }
};

// Update evaluation by id
const updateEvaluationById = async (evaluationId, updatedData) => {
  try {
    const response = await axios.put(`${baseURL}${middleURL}/evaluation/${evaluationId}`, updatedData)
    return response.data
  } catch (error) {
    console.log('Error fetching single evaluation:', error)
  }
}

const sendEmail = async (message) => {
  try {
    const response = await axios.post(
      `${baseURL}${middleURL}/evaluation/sendEmail`,
      message
    );
    return response.data;
  } catch (error) {
    console.log('Error sending email:', error);
  }
};

export {
  createEvaluation,
  fetchAllEvaluations,
  updateEvaluationById,
  sendEmail,
};
