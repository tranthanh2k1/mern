import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import MenuMain from './MenuMain'
import { isAuthenticated } from '../../../redux/actions/auth'

const Header = () => {
    const [isLogged, setIsLogged] = useState(false)

    const { user } = isAuthenticated()

    const history = useHistory()
    const pathname = useLocation()

    useEffect(() => {
        isAuthenticated() && setIsLogged(true)
    }, [pathname, isLogged])

    const signout = (next) => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('user');
        }
        next()
    }

    return (
        <div className="full-width w-header">
            <div className="container">
                <div className="w-header-top">
                    <ul className="w-header-top-lh">
                        <li><Link to="#">Tra cứu đơn hàng</Link></li>
                        <li><Link to="#">Tạp chí thời trang</Link></li>
                        <li><Link to="#">Liên hệ</Link></li>
                        <li className="w-header-top-li"><Link to="#">HỆ THỐNG CỬA HÀNG TOÀN QUỐC</Link></li>
                        <li className="w-header-top-lastchild"><Link to="#">Tuyển dụng</Link></li>
                    </ul>
                    <p className="w-header-top-lh">Hotline: <Link to="">0866892060</Link></p>
                </div>
                <div className="w-header-main">
                    <Link to="/">
                        <img className="w-header-logo" src="https://storage.googleapis.com/cdn.nhanh.vn/store/3138/logo_1615426885_logo-yody.png" alt="logo" />
                    </Link>
                    <form action="" className="w-header-form-search">
                        <div>
                            <input type="text" placeholder="Tìm kiếm sản phẩm" />
                        </div>
                        <button><i className="bi bi-search"></i></button>
                    </form>
                    <div className="w-header-main-user">
                        <div className="w-header-main-account w-header-account-has">
                            <i className="bi bi-person"></i>
                            <div className="div-separate"></div>
                            <span>Tài khoản</span>
                            <i className="bi bi-caret-down"></i>
                            {pathname !== 'login' && isLogged ?
                                (<div className="w-header-account-login">
                                    <Link className="mx-2">{user.username}</Link>
                                    <Link to="" onClick={() => signout(() => {
                                        setIsLogged(false)
                                        history.push('/')
                                    })} className="mx-2">Đăng suất</Link>
                                </div>)
                                :
                                (<div className="w-header-account-unlogin">
                                    <Link to="/login" className="mx-2">Đăng nhập</Link>
                                    <Link to="/register" className="mx-2">Đăng ký</Link>
                                </div>)
                            }
                        </div>
                        <div className="w-header-main-cart">
                            <i className="bi bi-cart3"></i>
                            <div className="div-separate"></div>
                            <span>0 Sản phẩm</span>
                            <i className="bi bi-caret-down"></i>
                        </div>
                    </div>
                </div>
            </div>
            <MenuMain />
        </div>
    )
}

export default Header
