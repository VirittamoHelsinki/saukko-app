import axios from 'axios'

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/auth'

const fetchLoggedIn = async () => {
  const response = await axios.get(baseURL + middleURL + '/loggedIn')
  return response
}
const registration = async (registrationData) => {
  const { firstName, lastName, email, password, role } = registrationData;
  try {
    const response = await axios.post(baseURL + middleURL, {
      firstName,
      lastName,
      email,
      password,
      role,
      // passwordVerify,
    });
    console.log('Registration response:', response.data);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};
const logoutUser = async () => {
  await axios.get(baseURL + middleURL + '/logout');
}

const loginUser = async (loginData) => {
  const response = await axios.post(baseURL + middleURL + '/login', loginData)
  return response
}

const forgotPassword = async (email) => {
  const response = await axios.post(baseURL + middleURL + '/forgot-password', {
    email: email,
  })
  return response
}

const tokenValidation = async (token) => {
  const response = await axios.post(baseURL + middleURL + '/validate-token', {
    token: token,
  })
  return response
}

const resetPassword = async (token, newPassword) => {
  const response = await axios.post(baseURL + middleURL + '/reset-password', {
    token: token,
    newPassword: newPassword,
  })
  return response
}

export { forgotPassword, fetchLoggedIn, logoutUser, loginUser, tokenValidation, resetPassword, registration }

