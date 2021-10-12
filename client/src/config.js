export const API = "http://localhost:4000/api";

export const convertNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
