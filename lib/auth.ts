import { jwtDecode } from 'jwt-decode';

interface DecodedUser {
  user_id: number;
  username: string;
}

export const getLoggedInUser = () => {

  const token = getToken();
  if (!token) return null;

  try {
    return jwtDecode<DecodedUser>(token);
  } catch (err) {
    console.log(err)
    return null;
  }
};

export const getToken = () => {
  try {
    return localStorage.getItem("token")
  } catch (err) {
    console.log(err)
    return null
  }
}

export const deleteToken = () => {
  localStorage.removeItem("token");
}