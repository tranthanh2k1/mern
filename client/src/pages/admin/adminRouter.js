import React from "react";
import { Redirect, Route } from "react-router";
import { isAuthenticated } from "../../redux/actions/auth";

const AdminRouter = ({ children }) => {
  return (
    <Route
      render={() => {
        return isAuthenticated() && isAuthenticated().user.role === 1 ? (
          children
        ) : (
          <Redirect to={{ pathname: "/register" }} />
        );
      }}
    />
  );
};

export default AdminRouter;
