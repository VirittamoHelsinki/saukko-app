import axios from 'axios'
import Uvc from 'universal-cookie'

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/auth'

const fetchCurrentUser = async () => axios.get('auth/get-current-user');

const registration = async (registrationData) => {
  const { firstName, lastName, email, password, role } = registrationData;
  try {
    const response = await axios.post('auth', {
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
  await axios.get('auth/logout');
}

const loginUser = async (loginData) => {
  console.log("login request URL", {
    baseURL,
    middleURL,
    endpoint: "/login",
    URL: baseURL + middleURL + '/login'
  });
  const response = await axios.post('auth/login', loginData)
  return response
}

const forgotPassword = async (email) => {
  const response = await axios.post('auth/forgot-password', {
    email: email,
  })
  return response
}

const tokenValidation = async (token) => {
  const response = await axios.post('auth/validate-token', {
    token: token,
  })
  return response
}

const resetPassword = async (newPassword) => {
  const response = await axios.post('auth/reset-password', {
    newPassword,
    withCredentials: true
  });
  return response;
}

const requestPasswordChangeTokenAsUser = async (password) =>
  await axios.post('auth/request-pwd-change-token', {
    password,
    withCredentials: true
  });

const requestEmailVerificationLinkAsync = async () => {
  // Because the client cannot access to http-only cookies, this is the "case" when we cannot use these
  // Cookie is send as header and handled in backend cookie-middleware.
  const uvc = new Uvc();
  const verificationToken = uvc.get("verification-token");

  const response = await axios.get('auth/resend-email-verification', {
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

  const response = await axios.get('auth/verify-email', {
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
