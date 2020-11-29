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
        toastr.error('Пользователь не авторизован', 'Ошибка авторизации!');
        break;

      case 403: 
        toastr.error('Вы не имеете прав для совершения данной операции', 'Ошибка авторизации!');
        break;

      default:
        toastr.error(error.response.data?.data);
    }

    return Promise.reject(error.response);
  }
);
