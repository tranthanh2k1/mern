import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { API, convertNumber, convertStatus } from '../../../../config'
import moment from 'moment'

const DetailOrderUserPage = () => {
    const [orderDetail, setOrderDetail] = useState()
    console.log("order", orderDetail)

    const { pathname } = useLocation()
    const arrayPathname = pathname.split("/")
    const id = arrayPathname[arrayPathname.length - 1]

    const history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`${API}/order/detail/${id}`)

                setOrderDetail(data)
            } catch (error) {
                console.log("error", error.response)
            }
        }

        fetchData()
    }, [])

    return (
        <div>
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pixeden-stroke-7-icon@1.2.3/pe-icon-7-stroke/dist/pe-icon-7-stroke.min.css" />
            <div className="container padding-bottom-3x mb-1 p-0 pt-2">
                <div className="card mb-3">
                    {orderDetail && (
                        <>
                            <div className='goback-ft'>
                                <div className='p-4 pb-0 pt-2 fs-4 text text-goback' onClick={() => history.goBack()}>
                                    <i className="bi bi-chevron-left icon-goback"></i>
                                    Trở lại
                                </div>
                                <h4 className='fs-6 pt-2 ml-4 code-id-order-detail'>Mã đơn hàng: #{orderDetail.infoOrder.code_bill} | <span className='text-danger'>{convertStatus(orderDetail.infoOrder.status)}</span></h4>
                            </div>
                            <div className="card-body">
                                <div className="steps d-flex flex-wrap flex-sm-nowrap justify-content-between padding-top-2x padding-bottom-1x">
                                    {orderDetail.infoOrder.createdAt && (
                                        <div className="step completed">
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-cart" /></div>
                                            </div>
                                            <h4 className="step-title">Chờ xử lý</h4>
                                            <span>{moment(new Date(orderDetail.infoOrder.createdAt)).format("h:mm A L")}</span>
                                        </div>
                                    )}
                                    {orderDetail.infoOrder.updated_delivering && (
                                        <div className="step completed">
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-car" /></div>
                                            </div>
                                            <h4 className="step-title">Đang giao</h4>
                                            <span>{moment(new Date(orderDetail.infoOrder.updated_delivering)).format("h:mm A L")}</span>
                                        </div>
                                    )}
                                    {orderDetail.infoOrder.updated_received && (
                                        <div className="step completed">
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-home"></i></div>
                                            </div>
                                            <h4 className="step-title">Đã nhận</h4>
                                            <span>{moment(new Date(orderDetail.infoOrder.updated_received)).format("h:mm A L")}</span>
                                        </div>
                                    )}
                                    {orderDetail.infoOrder.updated_cancelled && (
                                        <div className="step completed">
                                            <div className="step-icon-wrap">
                                                <div className="step-icon"><i className="pe-7s-medal" /></div>
                                            </div>
                                            <h4 className="step-title">Đã hủy</h4>
                                            <span>{moment(new Date(orderDetail.infoOrder.updated_cancelled)).format("h:mm A L")}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className='hr-bg'></div>
                            <div className='order-detail-user'>
                                <h4 className='order-detail-info-user'>Địa chỉ nhận hàng</h4>
                                <p className='order-detail-username'>{orderDetail.infoOrder.username}</p>
                                <p className='order-detail-phone'>{orderDetail.infoOrder.phone}</p>
                                <p className='order-detail-address'>{orderDetail.infoOrder.address}</p>
                            </div>
                            <div>
                                {orderDetail && orderDetail.detailOrder.map(itemCart => (
                                    <div className='user__purchase-order-item'>
                                        <div className='user__purchase-product'>
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
                                        </div>
                                    </div>
                                ))}
                                <div className='p-4'>
                                    <div className='order-detail-user-footer'>
                                        <span>Tổng số tiền: </span>
                                        <span style={{ color: '#ee4d2d', fontSize: '1.3rem' }}>{convertNumber(orderDetail.infoOrder.intoMoney)}đ</span>
                                    </div>
                                    <div className='order-detail-user-footer'>
                                        <span>Phương thức thanh toán:</span>
                                        <span>{orderDetail.infoOrder.paymentMethod}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div >

    )
}

export default DetailOrderUserPage
