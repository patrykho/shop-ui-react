export const getToken = () => {
  const token = localStorage.getItem('accessToken');
  return token;
};

export const setToken = (token: string) => {
  return localStorage.setItem('accessToken', token);
};

export const removeToken = () => {
  localStorage.removeItem('accessToken');
};
