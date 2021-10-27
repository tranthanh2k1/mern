export const addCartProduct = (dataForm) => {
  return {
    type: "ADD_CART_PRODUCT",
    payload: dataForm,
  };
};

export const getCartProduct = () => {
  const data = JSON.parse(localStorage.getItem("cartProduct"));

  return {
    type: "GET_CART_PRODUCT_FROM_LOCALSTORAGE",
    payload: {
      data: data.listCartItem,
      totalQuantity: data.totalQuantity,
    },
  };
};

export const saveCartProduct = () => {
  return {
    type: "SAVE_CART_PRODUCT_LOCALSTORAGE",
  };
};

export const removeCartProdutItem = (item) => (dispatch) => {
  dispatch({
    type: "REMOVE_CART_PRODUCT_ITEM",
    payload: item,
  });
};

export const increase = (item) => (dispatch) => {
  dispatch({
    type: "INCREASE_QUANTITY_PRODUCT_ITEM",
    payload: item,
  });
};

export const decrease = (item) => (dispatch) => {
  dispatch({
    type: "DECREASE_QUANTITY_PRODUCT_ITEM",
    payload: item,
  });
};

export const removeAllCartProduct = () => {
  return {
    type: "REMOVE_ALL_CART_PRODUCT",
  };
};
