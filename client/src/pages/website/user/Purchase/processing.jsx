import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { API, convertNumber, convertStatus } from '../../../../config'
import { isAuthenticated } from '../../../../redux/actions/auth'
import { Button, Modal } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom'

const ProcessingUserPage = () => {
    const [dataOrder, setDataOrder] = useState()

    const [show, setShow] = useState(false)
    const [orderId, setOrderId] = useState()

    const { token } = isAuthenticated()

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(`${API}/order/user/status`, { status: 'PROCESSING' }, {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    }
                })

                setDataOrder(data)
            } catch (error) {
                console.log("error", error.response)
            }
        }

        fetchData()
    }, [])

    const handleCancel = async (id) => {
        try {
            const { data } = await axios.put(`${API}/order/user/cancel/${id}`, { status: 'CANCELLED' }, {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            })

            if (data.success) {
                alert(data.message)
                history.push('/user/purchase/type4')
            }
        } catch (error) {
            console.log("error", error.response)
        }
    }

    return (
        <>
            {dataOrder && dataOrder.length > 0 ? dataOrder.map(itemData => (
                <div className='user__purchase-order-item'>
                    <div className='user__purchase-product'>
                        <div className='user__purchase-order-status'>
                            <span className='user__purchase-code-bill'>Mã đơn hàng: #{itemData.order.code_bill}</span>
                            <span>{convertStatus(itemData.order.status)}</span>
                        </div>
                        {itemData.cart.map(itemCart => (
                            <div className='user__purchase-product-item'>
                                <div className='user__purchase-flex'>
                                    <img src={itemCart.product_image} width={80} height={80} alt="ảnh sản phẩm" />
                                    <div className='user_purchase-product-info'>
                                        <span>{itemCart.product_name}</span>
                                        <div className='user__purchase-pro-qty'>x{itemCart.product_quantity}</div>
                                    </div>
                                </div>
                                <span className='user__purchase-product-price'>{convertNumber(itemCart.product_price)}đ</span>
                            </div>
                        ))}
                    </div>
                    <div className='div-height-0'></div>
                    <div style={{ backgroundColor: '#fffefb' }}>
                        <div className='user__purchase-total-price'>Tổng số tiền: <span className='span-purchase-total-price'>{convertNumber(itemData.order.intoMoney)}đ</span></div>
                        <div className='user__purchase-order-item-footer'>
                            <div className='user__purchase-contact'>Liên hệ cửa hàng</div>
                            {itemData.order.status === 'PROCESSING' && (
                                <div
                                    className='user__purchase-cancel cancel-mr'
                                    onClick={() => {
                                        setShow(true)
                                        setOrderId(itemData.order._id)
                                    }}
                                >
                                    Hủy đơn hàng
                                </div>
                            )}
                            <Link to={`/user/purchase/order/${itemData.order._id}`} className='user__purchase-cancel' >Chi tiết đơn hàng</Link>
                        </div>
                    </div>
                </div>
            )) : (
                <div className='user__purchase-wp'>
                    <div className='user__purchase-empty'></div>
                    <div>Chưa có đơn hàng</div>
                </div>
            )}
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Hủy đơn hàng</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có muốn hủy đơn hàng này?</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShow(false)}>
                        Trở lại
                    </Button>
                    <Button variant="danger" onClick={() => {
                        setShow(false)
                        handleCancel(orderId)
                    }}>
                        Hủy hàng
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ProcessingUserPage
