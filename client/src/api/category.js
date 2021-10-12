import { API } from "../config";

export const listParent = () => {
  return fetch(`${API}/categories`, {
    method: "GET",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const listChild = (id) => {
  return fetch(`${API}/categories?parent=${id}`, {
    method: "GET",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const detail = (id) => {
  return fetch(`${API}/category/${id}`, {
    method: "GET",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};

export const create = (token, data) => {
  return fetch(`${API}/category`, {
    method: "POST",
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

export const update = (data, id) => {
  return fetch(`${API}/category/${id}`, {
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

export const remove = (id) => {
  return fetch(`${API}/category/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "appliaction/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => console.log(error));
};
