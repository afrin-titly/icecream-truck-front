export const isLoggedIn = () => {
  const token = localStorage.getItem('jwtToken');
  return !!token;
};
