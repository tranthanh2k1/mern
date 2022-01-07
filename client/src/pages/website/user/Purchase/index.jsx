import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { isAuthenticated } from '../../../../redux/actions/auth'

const PurchaseUserPage = ({ children }) => {
    const { user } = isAuthenticated()

    return (
        <div className='bg-content-user'>
            <div className='container'>
                <div className='user'>
                    <div className='user__account'>
                        <div className="user__account-header">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQO2ThSL47M4qy6mjDZXofO9lIC8a7kj2nUzA&usqp=CAU" alt="account avatar" />
                            <div className='user__account-header-info'>
                                <p className='user__account-username'>{user.username}</p>
                                <p className='user__account-edit-profile'><i class="bi bi-pencil-fill"></i>Sửa hồ sơ</p>
                            </div>
                        </div>
                        <div className='user__account-sidebar'>
                            <div className='user__account-sidebar-ct'>
                                <NavLink to="" className="user__sidebar-link">
                                    <img src="https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4" alt="account" />
                                    <span>Tài khoản của tôi</span>
                                </NavLink>
                            </div>
                            <div className='user__account-sidebar-ct'>
                                <NavLink to="/user/purchase" activeStyle={{ color: '#ee4d2d' }} className="user__sidebar-link">
                                    <img src="https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078" alt="purchase" />
                                    <span>Đơn mua</span>
                                </NavLink>
                            </div>
                            <div className='user__account-sidebar-ct'>
                                <NavLink to="" className="user__sidebar-link">
                                    <img src="https://cf.shopee.vn/file/e10a43b53ec8605f4829da5618e0717c" alt="notification" />
                                    <span>Thông báo</span>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                    <div className='user__purchase'>
                        <div className="user__purchase-header">
                            <ul className='user__purchase-header-ul'>
                                <li>
                                    <NavLink exact activeStyle={{ color: '#ee4d2d', borderBottom: '2px solid #ee4d2d' }} to='/user/purchase'>
                                        <span>Tất cả</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact activeStyle={{ color: '#ee4d2d', borderBottom: '2px solid #ee4d2d' }} to='/user/purchase/type1'>
                                        <span>Chờ xử lý</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact activeStyle={{ color: '#ee4d2d', borderBottom: '2px solid #ee4d2d' }} to='/user/purchase/type2'>
                                        <span>Đang giao</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact activeStyle={{ color: '#ee4d2d', borderBottom: '2px solid #ee4d2d' }} to='/user/purchase/type3'>
                                        <span>Đã nhận</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink exact activeStyle={{ color: '#ee4d2d', borderBottom: '2px solid #ee4d2d' }} to='/user/purchase/type4'>
                                        <span>Đã hủy</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </div>
                        <div className="user__purchase-content">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PurchaseUserPage
