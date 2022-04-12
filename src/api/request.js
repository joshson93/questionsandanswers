import axios from 'axios';
const baseUrl = `https://app-hrsei-api.herokuapp.com/api/fec2/hr-rfe`;

const buildGetOptions = (endpoint, params = {}, data = {}) => {
  return {
    method: 'get',
    params,
    url: endpoint,
    baseURL: baseUrl,
  };
};

const buildPostOptions = (endpoint, params = {}, data = {}, method = 'POST') => {
  return {
    method,
    params,
    url: endpoint,
    baseURL: baseUrl,
    data: {
      ...data,
    },
  };
};

const getReqest = (endpoint, params) => {
  return axios(buildGetOptions(endpoint, params)).then((res) => res.data);
};

const postRequest = (endpoint, params, data) => {
  return axios(buildPostOptions(endpoint, params, data));
};

const request = {
  get: getReqest,
  post: postRequest,
};

export default request;
