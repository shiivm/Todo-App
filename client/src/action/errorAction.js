import { GET_ERRORS, CLEAR_ERRORS } from './types';

export const returnErrors = (errorMsg, status) => {
  return {
    type: GET_ERRORS,
    payload: { errorMsg, status }
  };
};

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
