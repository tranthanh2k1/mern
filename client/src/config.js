export const API = "http://localhost:4000/api";

export const convertNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const convertStatus = (status) => {
  if (status === "PROCESSING") {
    return "Chờ xử lý";
  } else if (status === "DELIVERING") {
    return "Đang giao";
  } else if (status === "RECEIVED") {
    return "Đã nhận";
  } else if (status === "CANCELLED") {
    return "Đã hủy";
  } else {
    return "Trạng thái không phù hợp";
  }
};
