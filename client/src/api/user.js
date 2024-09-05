import axios from 'axios';
import Uvc from 'universal-cookie';

const fetchCurrentUser = async () => axios.get('/auth/get-current-user');

const fetchUserById = async (id) => {
  if (!id) throw new Error('fetchUserById, id is undefined');
  const response = await axios.get(`/auth/users/${id}`);
  return response.data;
};

const addTeacher = async (registrationData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    workplaceId,
    evaluationId,
    permissions,
    degrees,
  } = registrationData;
  try {
    const response = await axios.post('/auth/add-teacher', {
      firstName,
      lastName,
      email,
      password,
      role,
      workplaceId,
      evaluationId,
      permissions,
      degrees,
    });
    console.log('Registration response:', response.data);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const registration = async (registrationData) => {
  const {
    firstName,
    lastName,
    email,
    password,
    role,
    workplaceId,
    evaluationId,
  } = registrationData;
  try {
    const response = await axios.post('/auth/register-user', {
      firstName,
      lastName,
      email,
      password,
      role,
      workplaceId,
      evaluationId,
    });
    console.log('Registration response:', response.data);
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    throw error;
  }
};

const fetchAllTeachers = async () => {
  const response = await axios.get('/auth/teachers');
  return response;
};

const logoutUser = async () => {
  await axios.get('/auth/logout');
};

const loginUser = async (loginData) => {
  const response = await axios.post('/auth/login', loginData);
  return response;
};

const refreshAuthToken = async () => {
  const response = await axios.get('/auth/renew-token');
  return response;
};

const forgotPassword = async (email) => {
  const response = await axios.post('/auth/forgot-password', {
    email: email,
  });
  return response;
};

// const tokenValidation = async (token) => {
//   const response = await axios.post('/auth/validate-token', {
//     token: token,
//   })
//   return response
// }

const resetPassword = async (newPassword, token) => {
  const response = await axios.post('/auth/reset-password', {
    newPassword,
    headers: {
      'change-token': token,
    },
    withCredentials: true,
  });
  return response;
};

const requestPasswordChangeTokenAsUser = async (password) =>
  await axios.post('/auth/request-pwd-change-token', {
    password,
    withCredentials: true,
  });

const requestEmailVerificationLinkAsync = async () => {
  // Because the client cannot access to http-only cookies, this is the "case" when we cannot use these
  // Cookie is send as header and handled in backend cookie-middleware.
  const uvc = new Uvc();
  const verificationToken = uvc.get('verification-token');

  const response = await axios.get('/auth/resend-email-verification', {
    headers: {
      'verification-token': verificationToken,
    },
    withCredentials: true,
  });

  return response;
};

const verifyEmail = async () => {
  // Because the client cannot access to http-only cookies, this is the "case" when we cannot use these
  // Cookie is send as header and handled in backend cookie-middleware.
  const uvc = new Uvc();
  const verificationToken = uvc.get('verification-token');

  if (!verificationToken) {
    throw new Error('verification-token missing.');
  }

  const response = await axios.get('/auth/verify-email', {
    headers: {
      'verification-token': verificationToken,
    },
    withCredentials: true,
  });

  return response;
};

const updateUser = async (userId, updatedData) => {
  try {
    const response = await axios.put(`/auth/users/${userId}`, updatedData);
    return response.data;
  } catch (error) {
    console.log('Error fetching single evaluation:', error);
  }
};

export {
  forgotPassword,
  fetchCurrentUser,
  logoutUser,
  loginUser,
  // tokenValidation,
  resetPassword,
  registration,
  verifyEmail,
  refreshAuthToken,
  updateUser,
  // This is medicine if email-verification-link are expired
  requestEmailVerificationLinkAsync,
  // The user must request a password reset token before the user can change the password
  requestPasswordChangeTokenAsUser,
  fetchAllTeachers,
  addTeacher,
  fetchUserById,
};
