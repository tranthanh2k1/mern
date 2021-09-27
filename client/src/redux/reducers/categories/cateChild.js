const initialState = {
  listChildCate: [],
  error: "",
};

const cateChildReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LIST_CHILD_CATE":
      return {
        ...state,
        listChildCate: action.payload,
        error: "",
      };
    case "REMOVE_CHILD_CATE":
      return {
        ...state,
        listChildCate: state.listChildCate.filter(
          (cate) => cate._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export default cateChildReducer;
