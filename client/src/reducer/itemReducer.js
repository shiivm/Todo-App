import {
  ADD_TODO,
  GET_TODO,
  GET_ALL_TODO,
  EDIT_TODO,
  DELETE_TODO,

} from "../action/types";
const initialState = {
  todoItems: [],
  isUpdated : false,
  isCreated : false,
  error : null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todoItems: action.payload.item,
        isCreated : true
      };
    case GET_TODO:
      return {
        ...state,
        isUpdated : false,
        isCreated : false,
        todoItem: action.payload,
        // loading: false,
      };
    case GET_ALL_TODO:
      return {
        ...state,
        todoItems: action.payload,
        loading: false,
        isUpdated : false,
        isCreated : false,
      };
    case EDIT_TODO:
      return {
        ...state,
        todoItems: action.payload.item,
        isUpdated : true
      };
    case DELETE_TODO:
      return {
        ...state,
        todoItems: state.todoItems.filter(
          (item) => item._id !== action.payload
        ),
      }; 
    default:
      return state;
  }
};

export default reducer;
