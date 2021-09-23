import { combineReducers } from "redux";
import authReducer from "./auth";
import cateChildReducer from "./categories/cateChild";
import cateParentReducer from "./categories/cateParent";
import productReducer from "./product";

const rootReducer = combineReducers({
  auth: authReducer,
  product: productReducer,
  listParentCate: cateParentReducer,
  listChildCate: cateChildReducer,
});

export default rootReducer;
