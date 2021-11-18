import {
  adminUpdateStatusOrderApi,
  getOrderDetailApi,
  listAllOrderAdminApi,
} from "../../../api/order";

export const listAllOrderAdminAction = () => async (dispatch) => {
  const data = await listAllOrderAdminApi();

  dispatch({
    type: "LIST_ALL_ORDER_ADMIN",
    payload: data.listOrder,
  });
};

export const getOrderDetailAction = (id) => async (dispatch) => {
  const data = await getOrderDetailApi(id);

  dispatch({
    type: "GET_ORDER_DETAIL",
    payload: data,
  });
};

export const adminUpdateStatusOrderAction =
  (dataRequest, id) => async (dispatch) => {
    const data = await adminUpdateStatusOrderApi(dataRequest, id);

    if (data.success) {
      dispatch({
        type: "ADMIN_UPDATE_STATUS",
        payload: {
          data: data.updatedStatusOrder,
          message: data.message,
        },
      });
    } else {
      dispatch({
        type: "ADMIN_UPDATE_STATUS_FAIL",
        payload: data.message,
      });
    }
  };
