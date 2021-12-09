import React, { useState, useEffect } from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import MenuMain from './MenuMain'
import { isAuthenticated } from '../../../redux/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getCartProduct, removeCartProdutItem, saveCartProduct } from '../../../redux/actions/cartProduct'
import { convertNumber } from '../../../config'

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

    // cart
    const { cartProduct, totalQuantity } = useSelector(state => state.cartProduct)

    const reRenderTotalQuantity = cartProduct.reduce((acc, item) => {
        return acc + item.qty
    }, 0)

    const totalMoney = cartProduct.reduce((acc, item) => {
        return acc + (item.price * item.qty)
    }, 0)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getCartProduct())
    }, [])

    useEffect(() => {
        dispatch(saveCartProduct())
    }, [cartProduct, totalQuantity])

    const removeCartItem = (idCartItem) => {
        dispatch(removeCartProdutItem(idCartItem))
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
                    <form action="/search" className="w-header-form-search">
                        <div>
                            <input type="text" placeholder="Tìm kiếm sản phẩm" name="name" />
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
                                    })} className="mx-2">Đăng xuất</Link>
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
                            <span>{reRenderTotalQuantity} Sản phẩm</span>
                            <i className="bi bi-caret-down"></i>

                            {reRenderTotalQuantity === 0 ? (<div className='w-header-cart-empty'>Giỏ hàng của bạn trống</div>) : ''}

                            {reRenderTotalQuantity > 0 && (
                                <div className="header__cart">
                                    <div className="wrapper-header-cart">
                                        {cartProduct && cartProduct.map((item, index) => (
                                            <div className="header__cart-item" key={index}>
                                                <img src={item.image} alt="" />
                                                <div className="header__cart-item-info">
                                                    <p className='header__cart-item-name'>{item.name} x{item.qty}</p>
                                                    <p className='header__cart-item-price'>{convertNumber(item.price)}Đ</p>
                                                </div>
                                                <i className="bi bi-x-circle-fill" onClick={() => removeCartItem(item.name)}></i>
                                            </div>
                                        ))}
                                    </div>
                                    <div className='header__cart-into-money'>
                                        <span className='into-money'>Thành tiền</span>
                                        <span className='total-money'>{convertNumber(totalMoney)}Đ</span>
                                    </div>
                                    <div className="header__cart-btn">
                                        <Link to="/cart" ><button className='cart-button'>Giỏ hàng</button></Link>
                                        <Link to="/cart/checkout"><button className='payment-button'>Thanh toán</button></Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <MenuMain />
        </div>
    )
}

export default Header
