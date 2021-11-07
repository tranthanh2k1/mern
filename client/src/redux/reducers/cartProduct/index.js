const initialState = {
  cartProduct: [],
  totalQuantity: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_CART_PRODUCT":
      const productItem = action.payload;

      let isItemExist = state.cartProduct.find(
        (item) => item.name === productItem.name
      );

      if (isItemExist) {
        const newQuantity = (isItemExist.qty += action.payload.qty);

        isItemExist.qty = newQuantity;

        return {
          ...state,
          cartProduct: [...state.cartProduct],
        };
      } else {
        return {
          ...state,
          cartProduct: [...state.cartProduct, action.payload],
        };
      }
    case "SAVE_CART_PRODUCT_LOCALSTORAGE":
      const listCartProduct = [...state.cartProduct];
      const totalQuantity = listCartProduct.reduce(
        (acc, item) => acc + item.qty,
        0
      );
      const setCartProductLocalStorage = {
        listCartItem: state.cartProduct,
        totalQuantity,
      };

      if (listCartProduct) {
        localStorage.setItem(
          "cartProduct",
          JSON.stringify(setCartProductLocalStorage)
        );
      }

      return state;
    case "GET_CART_PRODUCT_FROM_LOCALSTORAGE":
      return {
        ...state,
        cartProduct: action.payload.data,
        totalQuantity: action.payload.totalQuantity,
      };
    case "REMOVE_CART_PRODUCT_ITEM":
      return {
        ...state,
        cartProduct: state.cartProduct.filter(
          (item) => item.name !== action.payload
        ),
      };
    case "INCREASE_QUANTITY_PRODUCT_ITEM":
      let itemIncrease = state.cartProduct.find(
        (item) => item.name === action.payload
      );

      itemIncrease.qty += 1;

      return {
        ...state,
        cartProduct: [...state.cartProduct],
      };
    case "DECREASE_QUANTITY_PRODUCT_ITEM":
      let itemDecrease = state.cartProduct.find(
        (item) => item.name === action.payload
      );

      itemDecrease.qty -= 1;

      return {
        ...state,
        cartProduct: [...state.cartProduct],
      };
    case "REMOVE_ALL_CART_PRODUCT":
      return {
        ...state,
        cartProduct: [],
        totalQuantity: 0,
      };
    default:
      return state;
  }
};

export default cartReducer;
