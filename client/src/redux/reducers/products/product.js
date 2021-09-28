const initialState = {
  listProduct: [],
  message: "",
  error: "",
  success: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_PRODUCT":
      return {
        ...state,
        listProduct: action.payload.data,
        message: action.payload.message,
        success: action.payload.success,
        error: "",
      };
    case "ADD_PRODUCT":
      return {
        ...state,
        listProduct: [...state.listProduct, action.payload.data],
        message: action.payload.message,
        success: action.payload.success,
        error: "",
      };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        listProduct: [...state.listProduct, action.payload],
        message: action.payload.message,
        error: "",
        success: action.payload.success,
      };
    case "REMOVE_PRODUCT":
      return {
        ...state,
        listProduct: state.listProduct.filter(
          (product) => product._id !== action.payload.data._id
        ),
        message: action.payload.message,
        error: "",
      };
    case "PRODUCT_API_FAIL":
      return {
        ...state,
        message: "",
        error: action.payload.error,
        success: action.payload.success,
      };
    default:
      return state;
  }
};

export default productReducer;
