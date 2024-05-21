import axios from 'axios';
import environment from '../utils/environment';

const getPaginatedDegrees = async (page, resultsPerPage, searchParam) => {
  const search = searchParam ? `&s=${searchParam}` : '';
  const url = `${environment.eperusteetDataUrl}/getDegrees?pageNumber=${page}&pageSize=${resultsPerPage}${search}`;
  console.log(url)
  try {
    const response = (await axios.get(url)).data;
    return {
      data: response.data,
      sivu: response.pagination.pageNumber,
      empty: !response.data.length,
      sivuja: response.pagination.totalPages,
      sivukoko: response.pagination.totalResults,
      kokonaismaara: response.pagination.totalResults,
    }
  } catch (error) {
    console.info(error);
    throw error;
  }
}

const getDegreeById = async (id) => {
  const url = `${environment.eperusteetDataUrl}/getDegreeById?degreeId=${id}`;
  console.log(url);
  try {
    const response = (await axios.get(url)).data;
    console.log("HÄRREGUU", response)
    return {
      data: response.data
    }
  } catch (error) {
    console.info(error);
    throw error;
  }
}

export default {
  getPaginatedDegrees,
  getDegreeById
};
