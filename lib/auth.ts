import {jwtDecode} from 'jwt-decode';

export const getLoggedInUser = () => {
  
    const token = getToken();
    if (!token) return null;
  
    try {
      return jwtDecode(token);
    } catch (err) {
      return null;
    }
  };
  
export const getToken = () => {
    try {
		return localStorage.getItem("token")
	} catch (err) {
		return null
	}
}