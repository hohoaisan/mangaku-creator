import axios from 'axios';

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const config = {
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    withCredentials: true
  }
};

const AxiosClient = axios.create(config);

export default AxiosClient;
