import { API } from "../config";
import { isAuthenticated } from "../redux/actions/auth";

const { token } = isAuthenticated();

export const listAllOrderAdminApi = (page) => {
  return fetch(`${API}/orderListAll?page=${page}`, {
    method: "GET",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const getOrderDetailApi = (id) => {
  return fetch(`${API}//order/detail/${id}`, {
    method: "GET",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const adminUpdateStatusOrderApi = (data, id) => {
  return fetch(`${API}/order/adminUpdateStatus/${id}`, {
    method: "PUT",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const adminListOrderStatusApi = (status) => {
  return fetch(`${API}/order/status`, {
    method: "POST",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(status),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
