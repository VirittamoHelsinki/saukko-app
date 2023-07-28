import axios from 'axios' 

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/auth'

const fetchLoggedIn = async () => {
  const response = await axios.get(baseURL + middleURL + '/loggedIn')
  return response
}

const logoutUser = async () => {
  await axios.get(baseURL + middleURL + '/logout');
};

export { fetchLoggedIn, logoutUser }