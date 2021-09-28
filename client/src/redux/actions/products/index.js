import { create, list, remove, update } from "../../../api/product";

export const listProduct = () => async (dispatch) => {
  const data = await list();

  if (data.success) {
    dispatch({
      type: "LIST_PRODUCT",
      payload: {
        data: data.listProduct,
        message: data.message,
        success: data.success,
      },
    });
  } else {
    dispatch({
      type: "PRODUCT_API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};

export const createProduct = (dataForm) => async (dispatch) => {
  const data = await create(dataForm);

  if (data.success) {
    dispatch({
      type: "ADD_PRODUCT",
      payload: {
        data: data.product,
        message: data.message,
        success: data.success,
      },
    });
  } else {
    dispatch({
      type: "PRODUCT_API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};

export const removeProduct = (id) => async (dispatch) => {
  const data = await remove(id);

  if (data.success) {
    dispatch({
      type: "REMOVE_PRODUCT",
      payload: {
        data: data.product,
        message: data.message,
        success: data.success,
      },
    });
  } else {
    dispatch({
      type: "PRODUCT_API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};

export const updateProduct = (dataForm, id) => async (dispatch) => {
  const data = await update(dataForm, id);

  if (data.success) {
    dispatch({
      type: "UPDATE_PRODUCT",
      payload: {
        data: data.updateProduct,
        message: data.message,
        success: data.success,
      },
    });
  } else {
    dispatch({
      type: "PRODUCT_API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};
