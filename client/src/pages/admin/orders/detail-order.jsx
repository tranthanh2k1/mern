import React, { useEffect, useState } from 'react'

import { Link, useHistory, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminUpdateStatusOrderAction, getOrderDetailAction } from '../../../redux/actions/orderAdmin'
import { convertNumber } from '../../../config'

const DetailOrderPage = () => {
    const [isDisableProcessing, setIsDisableProcessing] = useState('true')
    const [isDisableDelivering, setIsDisableDelivering] = useState('true')
    const [isDisableReceived, setIsDisableReceived] = useState('true')
    const [isDisableCelled, setIsDisableCelled] = useState('true')

    const { pathname } = useLocation()
    const arrayPathname = pathname.split("/")
    const id = arrayPathname[arrayPathname.length - 1]

    const { orderDetail, error, message } = useSelector(state => state.orderAdmin)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(getOrderDetailAction(id))
    }, [])

    useEffect(() => {
        const checkStatus = () => {
            if (orderDetail && orderDetail.infoOrder.status === 'PROCESSING') {
                setIsDisableProcessing('')
                setIsDisableDelivering('')
            }

            if (orderDetail && orderDetail.infoOrder.status === 'DELIVERING') {
                setIsDisableDelivering('')
                setIsDisableReceived('')
            }

            if (orderDetail && orderDetail.infoOrder.status === 'RECEIVED') {
                setIsDisableReceived('')
            }

            if (orderDetail && orderDetail.infoOrder.status === 'CANCELLED') {
                setIsDisableCelled('')
            }
        }

        checkStatus()
    }, [orderDetail, isDisableProcessing, isDisableDelivering, isDisableReceived, isDisableCelled])

    const handleUpdateStatus = (status) => {
        alert("Bạn có muốn cập nhật trạng thái cho đơn hàng này")

        const dataRequest = {
            status
        }
        dispatch(adminUpdateStatusOrderAction(dataRequest, id))
    }

    const checkMessage = () => {
        if (message) {
            history.push('/admin/order/list')
        }
    }

    const totalPriceItem = (price, qty) => {
        return price * qty
    }

    const totalMoney = orderDetail && orderDetail.detailOrder.reduce((acc, item) => {
        return acc + (item.product_price * item.product_quantity)
    }, 0)

    return (
        <div className="layout-content">
            {error && alert(error)}
            {message && alert(message)}
            {checkMessage()}
            {orderDetail && (
                <div className="layout-content-padding">
                    <div className='grid-col-2'>
                        <h3 className='admin__order-titile-page'>Chi tiết đơn hàng</h3>
                        <Link to='/admin/order/list' className='btn btn-success'>Danh sách đơn đặt lịch</Link>
                    </div>
                    <div className='grid-col-2 admin__order'>
                        <div className="admin__order-bill">
                            <h5 className='admin__order-heading'>Hóa đơn</h5>
                            <p>Họ tên: <span className='span-content-order'>{orderDetail.infoOrder.username}</span></p>
                            <p>Email: <span className='span-content-order'><Link to="#">{orderDetail.infoOrder.email}</Link></span></p>
                            <p>Số điện thoại: <span className='span-content-order'><Link to="#">{orderDetail.infoOrder.phone}</Link></span></p>
                        </div>
                        <div className="admin__order-general">
                            <h5 className='admin__order-heading'>Tổng quan</h5>
                            <p>Ngày tạo: <span className='span-content-order'>{orderDetail.infoOrder.createdAt}</span></p>
                            <p>Địa chỉ nhận hàng: <span className='span-content-order'>{orderDetail.infoOrder.address}</span></p>
                            <p>Phương thức thanh toán: <span className='span-content-order'>{orderDetail.infoOrder.paymentMethod}</span></p>
                        </div>
                    </div>
                    <div className="admin__order-status">
                        <h5 className='admin__order-heading'>Trạng thái đơn hàng: <span className='admin__order-status-now'>{orderDetail && orderDetail.infoOrder.status}</span></h5>
                        <button
                            className='btn-order-status'
                            style={{ backgroundColor: '#fcaf17', color: '#fff', opacity: `${isDisableProcessing === '' ? '1' : '0.3'}` }}
                            disabled={isDisableProcessing}
                            onClick={() => handleUpdateStatus('PROCESSING')}
                        >
                            PROCESSING
                        </button>
                        <button
                            className='btn-order-status btn-status-ml'
                            style={{ backgroundColor: '#2980b9', color: '#fff', opacity: `${isDisableDelivering === '' ? '1' : '0.3'}` }}
                            disabled={isDisableDelivering}
                            onClick={() => handleUpdateStatus('DELIVERING')}
                        >
                            DELIVERING
                        </button>
                        <button
                            className='btn-order-status btn-status-ml'
                            style={{ backgroundColor: '#27ae60', color: '#fff', opacity: `${isDisableReceived === '' ? '1' : '0.3'}` }}
                            disabled={isDisableReceived}
                            onClick={() => handleUpdateStatus('RECEIVED')}
                        >
                            RECEIVED
                        </button>
                        <button
                            className='btn-order-status btn-status-ml'
                            style={{ backgroundColor: '#ee4d2d', color: '#fff', opacity: `${isDisableCelled === '' ? '1' : '0.3'}` }}
                            disabled={isDisableCelled}
                            onClick={() => handleUpdateStatus('CANCELLED')}
                        >
                            CANCELLED
                        </button>
                    </div>
                    <div>
                        <h5 className='admin__order-heading'>Sản phẩm</h5>
                        <table className="table caption-top">
                            <thead>
                                <tr>
                                    <th scope="col">Ảnh</th>
                                    <th scope="col">Tên</th>
                                    <th scope="col">Giá</th>
                                    <th scope="col">Số lượng</th>
                                    <th scope="col">Tổng giá</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {orderDetail.detailOrder.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">
                                            <img className="product__admin--image" src={item.product_image} alt="product-item" />
                                        </th>
                                        <td>{item.product_name}</td>
                                        <td>{item.product_price}đ</td>
                                        <td>{item.product_quantity}</td>
                                        <td>{convertNumber(totalPriceItem(item.product_price, item.product_quantity))}đ</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Tổng tiền:</td>
                                    <td>{convertNumber(totalMoney)}đ</td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                </div>
            )}
        </div >
    )
}

export default DetailOrderPage
