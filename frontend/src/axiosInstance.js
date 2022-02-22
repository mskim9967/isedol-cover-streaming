import axios, { AxiosInstance } from 'axios';

export const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}/api`,
  headers: { 'Content-Type': 'application/json' },
});
