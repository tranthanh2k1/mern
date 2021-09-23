import React from "react";
import HeaderAdmin from "../../components/admin/Header";
import SideBarAdmin from "../../components/admin/Sidebar";

const LayoutAdmin = ({ children }) => {
  return (
    <div className="layout-admin">
      <SideBarAdmin />
      <div>
        <HeaderAdmin />
        <div className="wrapper-children-change">
          <div className="page-main">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default LayoutAdmin;
