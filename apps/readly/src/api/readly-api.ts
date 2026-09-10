import axios from 'axios';
import Cookies from 'js-cookie';

export const readlyApiAxiosInstance = () => {
  const accessToken = Cookies.get('access_token') || '';
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_READLY_API_URL,
    headers: accessToken
      ? { Authorization: `Bearer ${accessToken}` }
      : undefined,
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        Cookies.remove('access_token');
      }

      return Promise.reject(error);
    },
  );

  return instance;
};
