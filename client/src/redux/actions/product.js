import axios from "axios";

export const createProduct = (id) => {
  return async (dispatch) => {
    const { data } = await axios.get(
      `https://600bdbc738fd25001702cc27.mockAPI.io/products/${id}`
    );

    console.log("dataaction", data);

    dispatch({
      type: "CREATE",
      payload: data,
    });
  };
};
