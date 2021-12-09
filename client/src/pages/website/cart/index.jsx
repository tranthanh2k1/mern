import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { convertNumber } from '../../../config'
import { decrease, increase, removeCartProdutItem } from '../../../redux/actions/cartProduct'

const CartProductPage = () => {
    const { cartProduct } = useSelector(state => state.cartProduct)

    const reRenderTotalQuantity = cartProduct.reduce((acc, item) => {
        return acc + item.qty
    }, 0)

    const totalMoney = cartProduct.reduce((acc, item) => {
        return acc + (item.price * item.qty)
    }, 0)

    const dispatch = useDispatch()

    const removeCartItem = (nameItem) => {
        dispatch(removeCartProdutItem(nameItem))
    }

    const decreaseQuantity = (name, qty) => {
        if (qty <= 1) return
        dispatch(decrease(name))
    }

    const increaseQuantity = (name, qty) => {
        if (qty >= 10) return
        dispatch(increase(name))
    }

    return (
        <div className='content-cart'>
            <div className="container">
                <div className='breadcrumb'>Trang chủ &gt;&#160; <span style={{ color: '#fcaf4f' }}>Giỏ hàng</span></div>
                {reRenderTotalQuantity > 0 ? (
                    <div className="cart">
                        <div className="cart__left">
                            {cartProduct.map((item, index) => (
                                <div className='cart__item' key={index}>
                                    <img src={item.image} alt="cart product item" className="cart__item-image" />
                                    <div className="cart__item-info">
                                        <p className='cart__item-name'>{item.name}</p>
                                        <Link to="#" onClick={() => removeCartItem(item.name)} className='cart_item-remove'>Xóa</Link>
                                    </div>
                                    <div className="cart__item-price">
                                        <p className='cart__item-price-buy'>{convertNumber(item.price)}</p>
                                        <p className='cart__item-price-default'>{convertNumber(item.price_default)}</p>
                                    </div>
                                    <div className="cart__item-quantity">
                                        <span onClick={() => decreaseQuantity(item.name, item.qty)}><i className="bi bi-dash-lg"></i></span>
                                        <input type="text" readOnly value={item.qty} className='cart_item-qty-input' />
                                        <span onClick={() => increaseQuantity(item.name, item.qty)}><i className="bi bi-plus-lg"></i></span>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="cart__right">
                            <p className='cart_qty-product-info'>Bạn đang có {reRenderTotalQuantity} sản phẩm trong giỏ hàng</p>
                            <div className="cart__money-into">
                                <span className='info-text'>Thành tiền</span>
                                <span className='info-money-into'>{convertNumber(totalMoney)}đ</span>
                            </div>
                            <div className='cart__ship'>
                                <span>Đơn hàng của bạn được freeship</span>
                            </div>
                            <div className='cart__button'>
                                <Link to="/cart/checkout" className="cart__order-button">
                                    Tiến hành đặt hàng
                                </Link>
                                <Link to="/" className="cart__keep-buy-button">
                                    Tiếp tục mua hàng
                                </Link>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className='cart__empty-product-item'>
                        <i className="bi bi-bag"></i>
                        Giỏ hàng của bạn hiện tại không có sản phẩm nào
                    </div>
                )}

            </div>
        </div>
    )
}

export default CartProductPage
