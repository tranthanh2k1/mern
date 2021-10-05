import { API } from "../config";

export const create = (data) => {
  return fetch(`${API}/product`, {
    method: "POST",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const list = () => {
  return fetch(`${API}/products`, {
    method: "GET",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const remove = (id) => {
  return fetch(`${API}/product/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const update = (data, id) => {
  return fetch(`${API}/product/${id}`, {
    method: "PUT",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
