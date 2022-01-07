import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import LayoutAdmin from "./layouts/layoutAdmin";
import LayoutWebsite from "./layouts/layoutWebsite";
import ListCateChildPage from "./pages/admin/categories/cateChild";
import ListCategoryPage from "./pages/admin/categories/cateParent";
import AddCategoryPage from "./pages/admin/categories/cateParent/add-category";
import EditCategoryPage from "./pages/admin/categories/cateParent/edit-category";
import AddProductPage from "./pages/admin/products/add-product";
import EditProductPage from "./pages/admin/products/edit-product";
import ListProductPage from "./pages/admin/products";
import NotFoundPage from "./pages/not-found";
import LoginPage from "./pages/website/user/Login";
import RegisterPage from "./pages/website/user/Register";
import HomePage from "./pages/website/home";
import ProductCateChildPage from "./pages/website/products/productCateChild";
import ProductCateParentPage from "./pages/website/products/productCateParent";
import AdminRouter from "./pages/admin/adminRouter";
import AdminDashboard from "./pages/admin/dashboard";
import DetailProductPage from "./pages/website/products/detailProduct";
import CartProductPage from "./pages/website/cart";
import SearchProduct from "./pages/website/products/searchProduct";
import CheckoutPage from "./pages/website/order";
import ListOrderPage from "./pages/admin/orders";
import DetailOrderPage from "./pages/admin/orders/detail-order";
import SearchOrderAdmin from "./pages/admin/orders/search-order";
import PurchaseUserPage from "./pages/website/user/Purchase";
import ListAllOrderUser from "./pages/website/user/Purchase/listAllUser";
import ProcessingUserPage from "./pages/website/user/Purchase/processing";
import DeliveringUserPage from "./pages/website/user/Purchase/delivering";
import ReceivedUserPae from "./pages/website/user/Purchase/received";
import CancelledUserPage from "./pages/website/user/Purchase/cancelled";
import DetailOrderUserPage from "./pages/website/user/Purchase/detailOrderUser";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/:path?/:path?">
          <LayoutAdmin>
            <Switch>
              <Route exact path="/admin">
                <Redirect to="/admin/dashboard" />
              </Route>
              <AdminRouter path="/admin/dashboard">
                <AdminDashboard />
              </AdminRouter>
              <AdminRouter exact path="/admin/category">
                <ListCategoryPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/category/add">
                <AddCategoryPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/category/edit/:id">
                <EditCategoryPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/category/child">
                <ListCateChildPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/product">
                <ListProductPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/product/add">
                <AddProductPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/product/edit/:id">
                <EditProductPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/order/list">
                <ListOrderPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/order/detail/:orderId">
                <DetailOrderPage />
              </AdminRouter>
              <AdminRouter exact path="/admin/order/search">
                <SearchOrderAdmin />
              </AdminRouter>
              <Route path="**">
                <NotFoundPage />
              </Route>
            </Switch>
          </LayoutAdmin>
        </Route>
        <Route path="/:path?">
          <LayoutWebsite>
            <Switch>
              <Route exact path="/">
                <HomePage />
              </Route>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
              <Route exact path="/product/catechild/:id">
                <ProductCateChildPage />
              </Route>
              <Route exact path="/product/cateparent/:id">
                <ProductCateParentPage />
              </Route>
              <Route exact path="/product/detail/:id">
                <DetailProductPage />
              </Route>
              <Route exact path="/search">
                <SearchProduct />
              </Route>
              <Route exact path="/cart">
                <CartProductPage />
              </Route>
              <Route exact path="/cart/checkout">
                <CheckoutPage />
              </Route>
              {/* <Route exact path="/thanh/order/:id">
                <StepperOrder />
              </Route> */}
              <PurchaseUserPage>
                <Route
                  exact
                  path="/user/purchase"
                  component={ListAllOrderUser}
                />
                <Route
                  exact
                  path="/user/purchase/type1"
                  component={ProcessingUserPage}
                />
                <Route
                  exact
                  path="/user/purchase/type2"
                  component={DeliveringUserPage}
                />
                <Route
                  exact
                  path="/user/purchase/type3"
                  component={ReceivedUserPae}
                />
                <Route
                  exact
                  path="/user/purchase/type4"
                  component={CancelledUserPage}
                />
                <Route
                  exact
                  path="/user/purchase/order/:id"
                  component={DetailOrderUserPage}
                />
              </PurchaseUserPage>
              <Route path="**">
                <NotFoundPage />
              </Route>
            </Switch>
          </LayoutWebsite>
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
