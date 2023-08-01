import axios from 'axios' 

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/api'

const fetchAll = async () => {
  const response = await axios.get(`${baseURL}${middleURL}/degrees`)
  return response
}

const fetchById = async (id) => {
  const response = await axios.get(`${baseURL}${middleURL}/degree/${id}`)
  return response;
};

export { fetchAll, fetchById }
