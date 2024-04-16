import axios from 'axios';

// Fetch all degrees from ePerusteet.
const fetchDegreesFromEperusteet = async () => {
  const response = await axios.get(`/api/degrees`);
  return response;
};

// Fetch a degree by id from ePerusteet.
const fetchDegreeByIdFromEperusteet = async (id) => {
  if (!id) throw new Error("fetchDegreeByIdFromEperusteet, id is undefined")
  const response = await axios.get(`/api/degree/${id}`);
  return response;
};

// Fetch all degrees from internal saukko database.
const fetchInternalDegrees = async () => {
  const response = await axios.get(`/api/internal/degrees`);
  return response.data;
};

// Fetch a degree by id from internal saukko database.
const fetchInternalDegreeById = async (id) => {
  if (!id) throw new Error("fetchInternalDegreeById, id is undefined")
  const response = await axios.get(
    `/api/internal/degree/${id}`
  );
  return response.data;
};

// Post a degree to internal saukko database.
const postDegree = async (degree) => {
  const response = await axios.post(
    `/api/internal/degrees`,
    degree
  );
  return response.data;
};

// Update a degree
const updateDegree = async (id, degree) => {
  try {
    const response = await axios.put(
      `/api/internal/degree/${id}`,
      degree
    );
    return response.data;
  } catch (error) {
    console.log('Error updating degree:', error);
  }
};

export {
  // Eperusteet routes:
  fetchDegreesFromEperusteet,
  fetchDegreeByIdFromEperusteet,
  // Internal saukko database routes:
  fetchInternalDegrees,
  fetchInternalDegreeById,
  postDegree,
  updateDegree,
};
