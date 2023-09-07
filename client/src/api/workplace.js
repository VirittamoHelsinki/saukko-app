import axios from 'axios' 

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/api'

// Fetch company data from the an external API.
const fetchCompanyData = async (businessID) => {
  const response = await fetch(`${baseURL}${middleURL}/business/${businessID}`);
  return response
};

// Fetch all workplaces from internal saukko database.
const fetchAllInternal = async () => {
  const response = await axios.get(`${baseURL}${middleURL}/workplace`)
  return response
}

// Fetch a workplace by id from internal saukko database.
const fetchInternalById = async id => {
  const response = await axios.get(`${baseURL}${middleURL}/workplace/${id}`)
  return response;
}

// Post a workplace to internal saukko database.
const post = async workplace => {
  const response = await axios.post(`${baseURL}${middleURL}/workplace`, workplace)
  return response
}

// Update a workplace in internal saukko database.
const update = async (id, workplace) => {
  const response = await axios.put(`${baseURL}${middleURL}/workplace/${id}`, workplace)
  return response
}

// Remove a workplace from internal saukko database.
const remove = async (id) => {
  const response = await axios.delete(`${baseURL}${middleURL}/workplace/${id}`)
  return response
}

export { fetchCompanyData, fetchAllInternal, fetchInternalById, post, update, remove }