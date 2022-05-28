import axios from "axios";
import { toast } from "react-toastify";

export function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt; // 9.15
}

// 8.11 无论在哪里获得错误，这个都在catch块前被调用
axios.interceptors.response.use(null, (error) => {
  // 8.10 Expectd (404:not found, 400: bad request) - CLIENT ERRORS
  // - Display a specific error message.
  // 8.10 Unexpected (network down, server down, db down, bug)
  // - Log them
  // - Display a generic and friendly error message

  const expectError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectError) {
    console.log("Logging the error", error);
    // logger.log(error);
    toast("An unexpected error occurred.");
    // 8.14
  }
  return Promise.reject(error);
});
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
