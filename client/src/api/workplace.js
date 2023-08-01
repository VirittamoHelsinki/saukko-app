import axios from 'axios' 

const baseURL = process.env.REACT_APP_BACKEND_URL

const middleURL = '/api'

const fetchCompanyData = async (businessID) => {
  const response = await fetch(`${baseURL}${middleURL}/business/${businessID}`);
  return response
};

export { fetchCompanyData }