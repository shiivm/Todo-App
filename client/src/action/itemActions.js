import axios from "../utils/axios";
import setAuthToken from "../utils/setAuthToken";

import {
  ADD_TODO,
  GET_TODO,
  GET_ALL_TODO,
  EDIT_TODO,
  DELETE_TODO,
} from "./types";
import { returnErrors } from "./errorAction";

export const getItemById = (todoId) => (dispatch) => {
  const token = localStorage.getItem('authToken') || '';
  setAuthToken(token);

  axios
    .get(`api/items/${todoId}`)
    .then((res) =>
      dispatch({
        type: GET_TODO,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};

export const getItems = () => (dispatch) => {
  const token = localStorage.getItem('authToken') || '';
  setAuthToken(token);

  axios
    .get("api/items")
    .then((res) =>
      dispatch({
        type: GET_ALL_TODO,
        payload: res.data,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};

export const addItem = (item) => (dispatch) => {
  const token = localStorage.getItem('authToken') || '';
  setAuthToken(token);

  axios
    .post("api/items", item)
    .then((res) => {
      dispatch({
        type: ADD_TODO,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};

export const updateItem = (item,todoId) => (dispatch) => {
  const token = localStorage.getItem('authToken') || '';
  setAuthToken(token);

  axios
    .put(`api/items/${todoId}`, item)
    .then((res) => {
      dispatch({
        type: EDIT_TODO,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};

export const deleteTodo = (todoId) => (dispatch) => {
  const token = localStorage.getItem('authToken') || '';
  setAuthToken(token);
  axios
    .delete(`/api/items/${todoId}`)
    .then((res) =>
      dispatch({
        type: DELETE_TODO,
        payload: res.data.id,
      })
    )
    .catch((err) => {
      dispatch(returnErrors(err.response.data.errorMsg, err.response.status));
    });
};
