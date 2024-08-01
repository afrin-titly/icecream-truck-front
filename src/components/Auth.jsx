export const isLoggedIn = () => {
  const token = localStorage.getItem('jwtToken');
  return !!token;
};

export const isAdmin = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user.admin;
}
