import { jwtDecode } from 'jwt-decode';

export const isLoggedIn = () => {
  const token = localStorage.getItem('jwtToken');
  return !!token;
};

export const isAdmin = () => {
  if(localStorage.getItem('user') === null) {
    return false;
  }
  const user = JSON.parse(localStorage.getItem('user'));
  return user.admin === true ? true : false
}

export const isTokenExpired = () => {
  try {
    const token = localStorage.getItem('jwtToken');
    const pureToken = token.replace(/^Bearer\s+/i, '');
    const decoded = jwtDecode(pureToken);
    const currentTime = Date.now() / 1000;
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// const getUserFromLocalStorage = () => {
//   const user = localStorage.getItem('user');
//   return user ? JSON.parse(user) : null;
// };