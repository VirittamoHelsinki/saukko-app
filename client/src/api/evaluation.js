import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL
const middleURL = '/api'

// Create evaluation
const createEvaluation = async evaluation => {
  try {
    const response = await axios.post(`${baseURL}${middleURL}/evaluation/`, evaluation)
    return response.data
  } catch (error) {
    console.log('Error creating evaluation:', error)
  }
}

// Fetch all evaluations
const fetchAllEvaluations = async () => {
  try {
    const response = await axios.get(`${baseURL}${middleURL}/evaluation/`)
    return response.data
  } catch (error) {
    console.log('Error fetching all evaluations:', error)
  }
}

// Fetch evaluation by id
const fetchEvaluationById = async (evaluationId) => {
  try {
    const response = await axios.get(`${baseURL}${middleURL}/evaluation/${evaluationId}`)
    return response.data
  } catch (error) {
    console.log('Error fetching single evaluation:', error)
  }
}

export { createEvaluation, fetchAllEvaluations, fetchEvaluationById }