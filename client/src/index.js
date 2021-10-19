import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import "./assets/css/main.css";
import "./pages/website/user/Login/login.css";
import "./pages/website/user/Register/register.css";
import "./layouts/layoutAdmin/layout-admin.css";
import "./pages/admin/categories/category.css";
import "./pages/admin/products/product.css";
import "./pages/website/home/home.css";
import "./pages/website/home/ListProduct/list-product.css";
import "./components/website/Footer/footer.css";
import "./pages/website/products/detailProduct/detail-product.css";
import "./pages/website/cart/cart.css";
import "bootstrap/dist/css/bootstrap.min.css";

import rootReducer from "./redux/reducers";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const middleware = [thunk];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
