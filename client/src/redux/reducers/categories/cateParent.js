const initialState = {
  listCategory: [],
  message: "",
  error: "",
};

const cateParentReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CATEGORY":
      return {
        ...state,
        listCategory: [...state.listCategory, action.payload],
        error: "",
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
        error: action.payload,
        message: "",
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
