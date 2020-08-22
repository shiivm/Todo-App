import {
  SET_CURRENT_USER,
  AUTH_ERROR,
  USER_LOADING,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
} from "../action/types";

const initialState = {
  isAuthenticated: false,
  userInfo: [],
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_USER:
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      return {
        ...state,
        isAuthenticated:
          action.payload && Object.keys(action.payload).length > 0
            ? true
            : false,
        userInfo: action.payload,
        loading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case LOGOUT_SUCCESS:
      localStorage.removeItem("authToken");
      return {
        ...state,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default reducer;
