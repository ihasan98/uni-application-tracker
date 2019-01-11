import axios from "axios";

// Get Currently Logged in User.
export function getCurrentUser() {
  if(!localStorage.getItem('accessToken')) {
      return Promise.reject("No access token set.");
  }
  return apiCall("GET" ,"/api/login/data");
}

export function setTokenHeader(token) {
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
}

export function apiCall(method, path, data) {
  return new Promise((resolve, reject) => {
    return axios[method.toLowerCase()](path, data)
      .then(res => {
        return resolve(res.data);
      })
      .catch(err => {
        return reject(err.response.data);
      });
  });
}