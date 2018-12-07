export const getToken = () => localStorage.getItem("ID_TOKEN");
export const saveToken = (token) => localStorage.setItem("ID_TOKEN", token);
export const removeToken = () => localStorage.removeItem("ID_TOKEN");