import { combineReducers } from "redux";
import cateChildReducer from "./categories/cateChild";
import cateParentReducer from "./categories/cateParent";
import productReducer from "./products/product";

const rootReducer = combineReducers({
  product: productReducer,
  listParentCate: cateParentReducer,
  listChildCate: cateChildReducer,
});

export default rootReducer;
