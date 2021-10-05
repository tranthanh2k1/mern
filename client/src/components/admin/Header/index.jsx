import React from 'react'
import { Link } from 'react-router-dom'

const HeaderAdmin = () => {
    return (
        <div className="header-admin__top">
            <div className="admin-container admin-flex">
                <button className="menu-btnn"><i className="bi bi-list"></i></button>
                <ul className="header-admin__list--menu" >
                    <li className="list-menu__item"><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li className="list-menu__item"><Link to="/admin/user">Users</Link></li>
                    <li className="list-menu__item"><Link to="/admin/dashboard">Settings</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default HeaderAdmin
