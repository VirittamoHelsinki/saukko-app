import axios from 'axios';

const eperusteetApiUrl = "https://saukko-dev-fn-cf2pynvwyijf4.azurewebsites.net/api";

const getPaginatedDegrees = async (page, resultsPerPage) => {
  const url = `${eperusteetApiUrl}/getDegrees?pageNumber=${page}&pageSize=${resultsPerPage}`;
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
  const url = `${eperusteetApiUrl}/getDegreeById?degreeId=${id}`;
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
