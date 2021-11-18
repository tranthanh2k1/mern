import React from 'react'
import { Link } from "react-router-dom"

const SideBarAdmin = () => {
    return (
        <div className="sidebarr">
            <div className="sidebarr__top">Trần Tiến Thành</div>
            <ul className="sidebarr__list" style={{ padding: "0px" }}>
                <li className="sidebarr__li"><Link to="/admin/dashboard" className="sidebarr__a"><i className="bi bi-speedometer2"></i>Dashboard</Link></li>
                <li className="sidebarr__li"><Link to="/admin/category" className="sidebarr__a"><i className="bi bi-columns-gap"></i>Category</Link></li>
                <li className="sidebarr__li"><Link to="/admin/product" className="sidebarr__a"><i className="bi bi-stop-circle"></i>Product</Link></li>
                <li className="sidebarr__li"><Link to="/admin/order/list" className="sidebarr__a"><i className="bi bi-person-bounding-box"></i>Order</Link></li>
                <li className="sidebarr__li"><Link to="/admin/user" className="sidebarr__a"><i className="bi bi-person-bounding-box"></i>User</Link></li>
            </ul>
            <div className="sidebarr__top"></div>
        </div>
    )
}

export default SideBarAdmin
