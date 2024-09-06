import axios from 'axios';

// Fetch all degrees from internal saukko database.
const fetchInternalDegrees = async () => {
  const response = await axios.get(`/api/internal/degrees`);
  return response.data;
};

// Fetch a degree by id from internal saukko database.
const fetchInternalDegreeById = async (id) => {
  if (!id) throw new Error('fetchInternalDegreeById, id is undefined');
  const response = await axios.get(`/api/internal/degree/${id}`);
  return response.data;
};

// Post a degree to internal saukko database.
const postDegree = async (degree) => {
  const response = await axios.post(`/api/internal/degrees`, degree);
  return response.data;
};

// Update a degree
const updateDegree = async (id, degree) => {
  try {
    const response = await axios.put(`/api/internal/degree/${id}`, degree);
    return response.data;
  } catch (error) {
    console.log('Error updating degree:', error);
  }
};

export {
  fetchInternalDegrees,
  fetchInternalDegreeById,
  postDegree,
  updateDegree,
};
