import { GET_ERRORS, CLEAR_ERRORS } from '../action/types';

const initialState = {
  error : null,
  status : null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ERRORS:
      return {
        error : action.payload.errorMsg,
        status : action.payload.status 
      };
      case CLEAR_ERRORS:
      return {
        error : null,
        status : null
      };
    default:
      return state;
  }
};

export default reducer;
