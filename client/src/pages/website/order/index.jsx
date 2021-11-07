import React, { useEffect, useState } from 'react'
import { Link, Redirect, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { isAuthenticated } from '../../../redux/actions/auth'
import { API, convertNumber } from '../../../config'
import axios from 'axios'
import { removeAllCartProduct } from '../../../redux/actions/cartProduct'

const CheckoutPage = () => {
    const paymentMethod = ['Thanh toán khi nhận hàng(COD)', 'Thanh toán qua VNPAY (ATM/ VISA/ MASTER/ QR Code)']

    const [checked, setChecked] = useState('Thanh toán khi nhận hàng(COD)')

    const [values, setvalues] = useState({
        username: '',
        phone: '',
        address: ''
    })
    const { username, phone, address } = values

    const handleChange = (name) => (e) => {
        setvalues({ ...values, [name]: e.target.value })
    }

    const { cartProduct } = useSelector(state => state.cartProduct)

    const totalMoney = cartProduct.reduce((acc, item) => {
        return acc + (item.price * item.qty)
    }, 0)

    const discountMoney = cartProduct.reduce((acc, item) => {
        return acc + (item.price_default - item.price)
    }, 0)

    const history = useHistory()

    const checkProductCart = () => {
        if (totalMoney && totalMoney === 0) {
            return <Redirect to='/' />
        }
    }

    const { user } = isAuthenticated()

    const dispatch = useDispatch()

    const onSubmitOrder = async () => {
        if (!isAuthenticated()) {
            alert('Bạn cần đăng nhập vào hệ thống để tiếp tục mua hàng')
            return history.push('/login')
        }

        if (username === '' || phone === '' || address === '') {
            return alert('Bạn điền đầy đủ thông tin và tiếp tục mua hàng')
        }

        const dataOrder = {
            username,
            phone,
            address,
            paymentMethod: checked,
            cartProduct: cartProduct,
            intoMoney: totalMoney,
            user_id: user && user._id
        }

        const { data } = await axios.post(`${API}/order`, dataOrder)
        if (data.success) {
            alert(data.message)
            dispatch(removeAllCartProduct())
            history.push('/')
        }
    }

    return (
        <div className='checkout'>
            <div className="container">
                <div className='breadcrumb'>Trang chủ &gt;&#160; <span style={{ color: '#fcaf4f' }}>Thanh toán</span></div>
                <div className="grid-col-2">
                    <div className="checkout__main">
                        {checkProductCart()}
                        <h4>Thông tin giao hàng</h4>
                        {!isAuthenticated() && (
                            <div className="remind-login">
                                <span>Đăng nhập ngay để nhận ưu đãi</span>
                                <Link to="/login" className='checkout__url-login'>Đăng nhập</Link>
                            </div>
                        )}
                        <form action="" className="checkout__form">
                            <div className='checkout__form-group'>
                                <input
                                    type="text"
                                    placeholder='Họ tên'
                                    autoFocus
                                    className='checkout__form-input'
                                    value={username}
                                    onChange={handleChange("username")}
                                />
                            </div>
                            <div className='checkout__form-group'>
                                <input
                                    type="text"
                                    placeholder='Số điện thoại'
                                    className='checkout__form-input'
                                    value={phone}
                                    onChange={handleChange("phone")}
                                />
                            </div>
                            <div className='checkout__form-group'>
                                <input
                                    type="text"
                                    placeholder='Địa chỉ'
                                    className='checkout__form-input'
                                    value={address}
                                    onChange={handleChange("address")}
                                />
                            </div>
                        </form>
                        <h4>Phương thức thanh toán</h4>
                        <div className='checkout__payment'>
                            {paymentMethod.map(item => (
                                <div className='checkout__payment-type' key={item} >
                                    <input
                                        type="radio"
                                        checked={checked === item}
                                        onChange={() => setChecked(item)}
                                    />
                                    <span htmlFor="">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="checkout__sidebar">
                        <div className='checkout__sidebar-top'>
                            <div className="checkout__sidebar-list-product">
                                {cartProduct.map((item, index) => (
                                    <div className="checkout__product-item" key={index}>
                                        <img src={item.image} alt="product item" className='checkout__product-img' />
                                        <div className='checkout__product-info'>
                                            <p className='checkout__product-info-name'>{item.name}</p>
                                            <p className='checkout__product-info-qty'>Số lượng: {item.qty}</p>
                                        </div>
                                        <div className="checkout__product-price">
                                            <p className='checkout__product-into-money'>{convertNumber(item.price)}đ</p>
                                            <p className='checlout__product-price-default'>{convertNumber(item.price_default)}đ</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="checkout__coupon">
                                <div className="checkout__coupon-title">
                                    Bạn có mã giảm giá? Vui lòng nhập tại đây!
                                </div>
                                <div className="checkout__coupon-field">
                                    <input type="text" placeholder='Mã giảm giá' className='checkout__coupon-input' />
                                    <button className='checkout__cuopon-btn'>Sử dụng</button>
                                </div>
                            </div>
                            <div className="checkout__summary-subtotal">
                                <div className="summary-subtotal-item">
                                    <div>Tạm tính</div>
                                    <div>{convertNumber(totalMoney)}đ</div>
                                </div>
                                <div className="summary-subtotal-item">
                                    <div>Chiết khấu</div>
                                    <div>-{convertNumber(discountMoney)}đ</div>
                                </div>
                                <div className="summary-subtotal-item">
                                    <div>Phí vận chuyển</div>
                                    <div></div>
                                </div>
                                <div className="summary-subtotal-item">
                                    <div>Cần thanh toán</div>
                                    <div className='checkout__total-money'>{convertNumber(totalMoney)}đ</div>
                                </div>
                            </div>
                        </div>
                        <textarea name="" id="" cols="30" rows="10" placeholder='Lời nhắn cho chúng tôi (nếu có)' className='checkout__textarea-meg'></textarea>
                        <button type='submit' onClick={onSubmitOrder} className='accept-order'>Hoàn tất đơn hàng</button>
                        <p>Sau <span style={{ textIndent: 10 }}>khi&nbsp;</span><strong style={{ textIndent: 10 }}>Hoàn tất đặt hàng&nbsp;</strong>khoảng&nbsp;60 đến 90 phút (trong giờ hành chính),<b> </b>YODY sẽ nhanh chóng gọi điện&nbsp;xác nhận lại thời gian giao hàng với bạn. Love you!</p>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default CheckoutPage
