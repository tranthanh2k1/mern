import { create, listParent, remove, update } from "../../../api/category";

export const listParentCategory = () => async (dispatch) => {
  const data = await listParent();

  if (data.success) {
    dispatch({
      type: "LIST_PARENT_CATEGORY",
      payload: data.listCategory,
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};

export const addCategory = (token, dataForm) => async (dispatch) => {
  const data = await create(token, dataForm);

  if (data.success) {
    dispatch({
      type: "ADD_CATEGORY",
      payload: {
        data: data.category,
        message: data.message,
        success: data.success,
      },
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};

export const removeCategory = (id) => async (dispatch) => {
  const data = await remove(id);

  if (data.success) {
    dispatch({
      type: "REMOVE_CATEGORY",
      payload: data.categoryRemove,
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};

export const updateCategory = (dataForm, id) => async (dispatch) => {
  const data = await update(dataForm, id);

  if (data.success) {
    dispatch({
      type: "UPDATE_CATEGORY",
      payload: data.updateCategory,
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: { error: data.message, success: data.success },
    });
  }
};
