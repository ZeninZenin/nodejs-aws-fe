import Axios, { AxiosRequestConfig } from "axios";
import * as toastr from 'toastr';
import API_PATHS from "constants/apiPaths";

export const axios = Axios.create();

axios.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem('token');

  if (token && request.url === API_PATHS.import) {
      request.headers['Authorization'] = `Basic ${token}`;
  }
  return request;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    console.log(error)

    switch(error.response?.status) {
      case 401: 
        console.log(1)
        toastr.error('You are not authorized', 'Auth error!');
        break;

      case 403: 
        toastr.error('Not enough rights', 'Auth error!');
        break;

      default:
        toastr.error(error.response.data?.data);
    }

    return Promise.reject(error.response);
  }
);
