export const getToken = () => localStorage.getItem('token');
export const setToken = (token) => localStorage.setItem('token', token);
export const removeToken = () => localStorage.removeItem('token');

export const getUser = () => {
  try {
    const token = getToken();
    if (!token) return null;
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Check expiry
    if (payload.exp && Date.now() / 1000 > payload.exp) {
      removeToken();
      return null;
    }
    return payload; // { _id, email, firstname, lastname, phone, isAdmin }
  } catch {
    return null;
  }
};

export const isLoggedIn = () => !!getUser();
export const isAdmin = () => {
  const u = getUser();
  return u && u.isAdmin === true;
};

export const logout = () => {
  removeToken();
  localStorage.removeItem('user'); // legacy cleanup
};
