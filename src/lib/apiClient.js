import axios from 'axios';

const axiosInstance = () => {
  const customAxios = axios.create({
    baseURL: 'http://localhost:4000',
  });

  return customAxios;
};

export default axiosInstance();
