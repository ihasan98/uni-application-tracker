import { apiCall, setTokenHeader } from "../../services/api";
import { SET_CURRENT_USER } from "../actionTypes";
import { addAlert, removeAlert } from "./alerts";

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function setAuthorizationToken(token) {
  setTokenHeader(token);
}

export function logout() {
  return dispatch => {
    localStorage.clear();
    dispatch(setCurrentUser({}));
  };
}

export function authUser(userData) {
  return dispatch => {
    // wrap our thunk in a promise so we can wait for the API call
    return new Promise((resolve, reject) => {
        return apiCall("POST", "/api/login/", userData)
        .then((response) => {
            localStorage.setItem('accessToken', response.auth);
            setAuthorizationToken(localStorage.accessToken);
            dispatch(setCurrentUser(response.user));
            dispatch(removeAlert());
            resolve(response.user); // indicate that the API call succeeded, and sends in user
        })
        .catch(err => {
          if(err.status === 401) {
            dispatch(addAlert("error", "Wrong email or password!"));
          } else {
            dispatch(addAlert("error", err.message));
          }
          reject(); // indicate the API call failed
        });
    });
  };
}