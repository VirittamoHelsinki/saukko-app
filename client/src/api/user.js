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

const forgotPassword = async (email) => {
    const response = await axios.post(`${baseURL}${middleURL}/forgot-password`, {
      email: email,
    });
    return response;
};

export { forgotPassword, fetchLoggedIn, logoutUser }