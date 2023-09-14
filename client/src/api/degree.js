import axios from 'axios' 

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/api'

// Fetch all degrees from ePerusteet.
const fetchAll = async () => {
  const response = await axios.get(`${baseURL}${middleURL}/degrees`)
  return response
}

// Fetch a degree by id from ePerusteet.
const fetchById = async id => {
  const response = await axios.get(`${baseURL}${middleURL}/degree/${id}`)
  return response;
}

// Fetch all degrees from internal saukko database.
const fetchAllInternalDegrees = async () => {
  const response = await axios.get(`${baseURL}${middleURL}/internal/degrees`)
  return response.data
}

// Fetch a degree by id from internal saukko database.
const fetchInternalDegreeById = async id => {
  const response = await axios.get(`${baseURL}${middleURL}/internal/degree/${id}`)
  return response.data
}

// Post a degree to internal saukko database.
const postDegree = async degree => {
  const response = await axios.post(`${baseURL}${middleURL}/internal/degrees`, degree)
  return response.data
}

export {
  // Eperusteet routes:
  fetchAll, fetchById, 
  // Internal saukko database routes:
  fetchAllInternalDegrees, fetchInternalDegreeById,
  postDegree
}