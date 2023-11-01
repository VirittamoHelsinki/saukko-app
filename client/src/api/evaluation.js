import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/api'

// Create evaluation
const createEvaluation = async evaluation => {
  try {
    const response = await axios.post(`${baseURL}${middleURL}/evaluation/`, evaluation)
    return response.data
  } catch (error) {
    console.log('API call error:', error)
  }
}

export { createEvaluation }