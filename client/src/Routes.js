import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
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

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/admin/:path?/:path?">
          <LayoutAdmin>
            <Switch>
              <Route exact path="/admin/category">
                <ListCategoryPage />
              </Route>
              <Route exact path="/admin/category/add">
                <AddCategoryPage />
              </Route>
              <Route exact path="/admin/category/edit/:id">
                <EditCategoryPage />
              </Route>
              <Route exact path="/admin/category/child">
                <ListCateChildPage />
              </Route>
              <Route exact path="/admin/product">
                <ListProductPage />
              </Route>
              <Route exact path="/admin/product/add">
                <AddProductPage />
              </Route>
              <Route exact path="/admin/product/edit/:id">
                <EditProductPage />
              </Route>
              <Route path="**">
                <NotFoundPage />
              </Route>
            </Switch>
          </LayoutAdmin>
        </Route>
        <Route path="/:path?">
          <LayoutWebsite>
            <Switch>
              <Route exact path="/login">
                <LoginPage />
              </Route>
              <Route exact path="/register">
                <RegisterPage />
              </Route>
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
