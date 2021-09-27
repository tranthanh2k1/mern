const initialState = {
  listProduct: [],
  error: "",
  loading: false,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case "CREATE":
      return {
        ...state,
        listProduct: [...state.listProduct, action.payload],
      };
    default:
      return state;
  }
};

export default productReducer;
