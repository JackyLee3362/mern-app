import http from "./httpService";
import config from "../config.json";
import jwtDecode from "jwt-decode"; // 9.11

const apiEndpoint = config.apiUrl + "/auth";
const tokenKey = "token";

http.setJwt(getJwt());

export async function login(email, password) {
  const res = await http.post(apiEndpoint, { email, password });
  const jwt = res.headers["x-auth-token"];
  localStorage.setItem(tokenKey, jwt);
}
export function loginWithJwt(jwt) {
  // 9.14
  localStorage.setItem(tokenKey, jwt);
}
export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    //9.11
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  logout,
  loginWithJwt,
  getCurrentUser,
  getJwt,
};
