import { listChild, remove } from "../../../api/category";

export const listChildCategory = (id) => async (dispatch) => {
  const data = await listChild(id);

  if (data.success) {
    dispatch({
      type: "LIST_CHILD_CATE",
      payload: data.listCatetegory,
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: data.message,
    });
  }
};

export const removeChildCategory = (id) => async (dispatch) => {
  const data = await remove(id);

  if (data.success) {
    dispatch({
      type: "REMOVE_CHILD_CATE",
      payload: data.categoryRemove,
    });
  } else {
    dispatch({
      type: "API_FAIL",
      payload: data.message,
    });
  }
};
