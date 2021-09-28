const initialState = {
  listCategory: [],
  message: "",
  error: "",
  success: null,
};

const cateParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        listCategory: [...state.listCategory, action.payload.data],
        message: action.payload.message,
        error: "",
        success: action.payload.success,
      };
    case "LIST_PARENT_CATEGORY":
      return {
        ...state,
        listCategory: action.payload,
        error: "",
      };
    case "API_FAIL":
      return {
        ...state,
        error: action.payload.error,
        message: "",
        success: action.payload.success,
      };
    case "REMOVE_CATEGORY":
      return {
        ...state,
        listCategory: state.listCategory.filter(
          (category) => category._id !== action.payload._id
        ),
        message: action.payload.message,
      };
    case "UPDATE_CATEGORY":
      return {
        ...state,
        listCategory: [...state.listCategory, action.payload],
        error: "",
      };
    default:
      return state;
  }
};

export default cateParentReducer;
