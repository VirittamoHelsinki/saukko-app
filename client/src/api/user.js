import axios from 'axios'
import Uvc from 'universal-cookie'

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/auth'

const fetchCurrentUser = async () => axios.get(baseURL + middleURL + '/get-current-user');

const registration = async (registrationData) => {
  const { firstName, lastName, email, password, role } = registrationData;
  try {
    const response = await axios.post(baseURL + middleURL, {
      firstName,
      lastName,
      email,
      password,
      role,

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

const resetPassword = async (newPassword) => {
  const response = await axios.post(baseURL + middleURL + '/reset-password', {
    newPassword,
    withCredentials: true
  });
  return response;
}

const requestPasswordChangeTokenAsUser = async (password) =>
  await axios.post(baseURL + middleURL + '/request-pwd-change-token', {
    password,
    withCredentials: true
  });

const requestEmailVerificationLinkAsync = async () => {
  // Because the client cannot access to http-only cookies, this is the "case" when we cannot use these
  // Cookie is send as header and handled in backend cookie-middleware.
  const uvc = new Uvc();
  const verificationToken = uvc.get("verification-token");

  const response = await axios.get(baseURL + middleURL + '/resend-email-verification', {
    headers: {
      "verification-token": verificationToken,
    },
    withCredentials: true
  });

  return response;
}

const verifyEmail = async () => {
  // Because the client cannot access to http-only cookies, this is the "case" when we cannot use these
  // Cookie is send as header and handled in backend cookie-middleware.
  const uvc = new Uvc();
  const verificationToken = uvc.get("verification-token");

  if (!verificationToken) {
    throw new Error("verification-token missing.")
  }

  const response = await axios.get(`${baseURL}${middleURL}/verify-email`, {
    headers: {
      "verification-token": verificationToken,
    },
    withCredentials: true,
  })

  return response;
};

export {
  forgotPassword,
  fetchCurrentUser,
  logoutUser,
  loginUser,
  tokenValidation,
  resetPassword,
  registration,
  verifyEmail,

  // This is medicine if email-verification-link are expired
  requestEmailVerificationLinkAsync,
  // The user must request a password reset token before the user can change the password
  requestPasswordChangeTokenAsUser,
}
