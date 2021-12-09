import axios from "axios";
import {
  adminListOrderStatusApi,
  adminUpdateStatusOrderApi,
  getOrderDetailApi,
  listAllOrderAdminApi,
} from "../../../api/order";
import { API } from "../../../config";

export const listAllOrderAdminAction = (page) => async (dispatch) => {
  const data = await listAllOrderAdminApi(page);

  dispatch({
    type: "LIST_ALL_ORDER_ADMIN",
    payload: {
      listOrder: data.listOrder,
      totalPage: data.totalPage,
    },
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

export const adminListOrderStatusAction = (status) => async (dispatch) => {
  const data = await adminListOrderStatusApi(status);

  if (data.success) {
    dispatch({
      type: "ADMIN_LIST_ORDER_STATUS",
      payload: data.listOrderStatus,
    });
  } else {
    dispatch({
      type: "ADMIN_UPDATE_STATUS_FAIL",
      payload: data.message,
    });
  }
};

export const adminFilterDateOrderAction = (date) => async (dispatch) => {
  try {
    const { data } = await axios.post(`${API}/order/filterByDate`, { date });

    dispatch({
      type: "ADMIN_FILTER_DATE_ORDER",
      payload: data.order,
    });
  } catch (error) {
    dispatch({
      type: "ADMIN_UPDATE_STATUS_FAIL",
      payload: error.response.data.message,
    });
  }
};
