import axios from "../utils/axios";
import setAuthToken from "../utils/setAuthToken";

import jwt_decode from "jwt-decode";

import {
  SET_CURRENT_USER,
  AUTH_ERROR,
  USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "./types";
import { returnErrors } from "./errorAction";

export const registerUser = (userData) => (dispatch) => {
  axios
    .post("/api/user/register", userData)
    .then((res) => {
      const authToken = res.headers["authorization"];
      localStorage.setItem("authToken", authToken);
      setAuthToken(authToken);
      const decodedToken = jwt_decode(authToken);
      dispatch({
        type: REGISTER_SUCCESS,
        payload: decodedToken,
      });
      window.location.href = "/";
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
      dispatch({
        type: REGISTER_FAIL,
      });
    });
};
export const loginUser = (userData) => (dispatch) => {
  dispatch({ type: USER_LOADING });
  axios
    .post("/api/user/login",userData)
    .then((res) => {
      const authToken = res.headers["authorization"];
      localStorage.setItem("authToken", authToken);
      setAuthToken(authToken);
      const decodedToken = jwt_decode(authToken);
      dispatch({
        type: LOGIN_SUCCESS,
        payload: decodedToken,
      });
      return true;
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
      dispatch({
        type: LOGIN_FAIL,
      });
      return false;
    });
};
export const loadUser = () => (dispatch) => {
  dispatch({ type: USER_LOADING });
  const token = localStorage.getItem("authToken") || "";
  setAuthToken(token);
  axios
    .get("/api/user/login")
    .then((res) => {
      const decodedToken = jwt_decode(token);
      dispatch({
        type: SET_CURRENT_USER,
        payload: decodedToken,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
      dispatch({
        type: AUTH_ERROR,
      });
    });
};

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS,
  };
};
