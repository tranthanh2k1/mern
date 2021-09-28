import React from "react";
import HeaderAdmin from "../../components/admin/Header";
import SideBarAdmin from "../../components/admin/Sidebar";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="layout-admin">
      <SideBarAdmin />
      <div>
        <div className="header-admin">
          <HeaderAdmin />
          <div className="header-admin__bottom">
            <div className="admin-container">Home / </div>
          </div>
        </div>
        <div className="wrapper-children-change">
          <div className="page-main">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
