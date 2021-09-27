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
      payload: data.message,
    });
  }
};

export const addCategory = (dataForm) => async (dispatch) => {
  const data = await create(dataForm);

  if (data.success) {
    dispatch({
      type: "ADD_CATEGORY",
      payload: data,
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: data.message,
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
      payload: data.message,
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
  }
};
