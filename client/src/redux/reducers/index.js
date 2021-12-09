import { combineReducers } from "redux";
import cartReducer from "./cartProduct";
import cateChildReducer from "./categories/cateChild";
import cateParentReducer from "./categories/cateParent";
import orderAdminReducer from "./orderAdmin";
import productReducer from "./products/product";

const rootReducer = combineReducers({
  product: productReducer,
  listParentCate: cateParentReducer,
  listChildCate: cateChildReducer,
  cartProduct: cartReducer,
  orderAdmin: orderAdminReducer,
});

export default rootReducer;
