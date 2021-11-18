const initialState = {
  listOrder: [],
  orderDetail: null,
  message: "",
  error: "",
};

const orderAdminReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case "LIST_ALL_ORDER_ADMIN":
      return {
        ...state,
        listOrder: payload,
        message: "",
        error: "",
      };
    case "GET_ORDER_DETAIL":
      return {
        ...state,
        orderDetail: payload,
        message: "",
        error: "",
      };
    case "ADMIN_UPDATE_STATUS":
      return {
        ...state,
        listOrder: [...state.listOrder, payload.data],
        message: payload.message,
        error: "",
      };
    case "ADMIN_UPDATE_STATUS_FAIL":
      return {
        ...state,
        message: "",
        error: payload,
      };
    default:
      return state;
  }
};

export default orderAdminReducer;
