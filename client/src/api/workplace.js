import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/api'

// Fetch company data from avoindata API.
const fetchExternalCompanyData = async (businessID) => {
  console.log('businessID')
  const response = await fetch(`${baseURL}${middleURL}/business/${businessID}`);
  // const response = await fetch(`http://avoindata.prh.fi/opendata/bis/v1/2070414-4`);
  return response
};



// Fetch all workplaces from internal saukko database.
const fetchAllInternalWorkplaces = async () => {
  const response = await axios.get(`${baseURL}${middleURL}/workplace`)
  return response.data
}

// Fetch a workplace by id from internal saukko database.
const fetchInternalWorkplaceById = async id => {
  const response = await axios.get(`${baseURL}${middleURL}/workplace/${id}`)
  return response.data
}

// Post a workplace to internal saukko database.
const postWorkplace = async workplace => {
  const response = await axios.post(`${baseURL}${middleURL}/workplace`, workplace)
  return response.data
}

// Update a workplace in internal saukko database.
const updateWorkplace = async (id, workplace) => {
  const response = await axios.put(`${baseURL}${middleURL}/workplace/${id}`, workplace)
  return response.data
}

// Remove a workplace from internal saukko database.
const removeWorkplace = async (id) => {
  const response = await axios.delete(`${baseURL}${middleURL}/workplace/${id}`)
  return response.data
}

export {
  // external API routes:
  fetchExternalCompanyData,
  // Internal saukko database routes:
  fetchAllInternalWorkplaces, fetchInternalWorkplaceById,
  postWorkplace, updateWorkplace, removeWorkplace
}