import axios from 'axios'

// Fetch company data from avoindata API.

const fetchExternalCompanyData = async (businessId) => {
  console.log(businessId);

  try {
    const response = await axios.get(`/api/business/${businessId}`);
    // console.log('data ----->', response.data);

    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch  data');
  }
};



// Fetch all workplaces from internal saukko database.
const fetchAllInternalWorkplaces = async () => {
  const response = await axios.get(`/api/workplace`)
  return response.data
}

// Fetch a workplace by id from internal saukko database.
const fetchInternalWorkplaceById = async id => {
  const response = await axios.get(`/api/workplace/${id}`)
  return response.data
}

// Post a workplace to internal saukko database.
const postWorkplace = async workplace => {
  const response = await axios.post(`/api/workplace`, workplace)
  return response
}

// Update a workplace in internal saukko database.
const updateWorkplace = async (id, workplace) => {
  const response = await axios.put(`/api/workplace/${id}`, workplace)
  return response.data
}

// Remove a workplace from internal saukko database.
const removeWorkplace = async (id) => {
  const response = await axios.delete(`/api/workplace/${id}`)
  return response.data
}

export {
  // external API routes:
  fetchExternalCompanyData,
  // Internal saukko database routes:
  fetchAllInternalWorkplaces, fetchInternalWorkplaceById,
  postWorkplace, updateWorkplace, removeWorkplace
}




