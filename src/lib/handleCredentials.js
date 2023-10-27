import jwt_decode from 'jwt-decode';

const handleCredentials = (token, apiClient) => {
  apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  localStorage.setItem('token', token);

  return jwt_decode(token);
};

export default handleCredentials;
