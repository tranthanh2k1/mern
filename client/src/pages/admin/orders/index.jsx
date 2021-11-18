import React, { useEffect, useState } from 'react'
import { API } from '../../../config'

import axios from 'axios'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { listAllOrderAdminAction } from '../../../redux/actions/orderAdmin';

const ListOrderPage = () => {
    const { listOrder } = useSelector(state => state.orderAdmin)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listAllOrderAdminAction())
    }, [])

    const convertStatusString = (status) => {
        if (status === 'PROCESSING') {
            return {
                content: 'Chờ xử lý',
                bgr: '#fcaf17'
            }
        } else if (status === 'DELIVERING') {
            return {
                content: 'Đang giao',
                bgr: '#2980b9'
            }
        } else if (status === 'RECEIVED') {
            return {
                content: 'Đã nhận',
                bgr: '#27ae60'
            }
        } else {
            return {
                content: 'Đã hủy',
                bgr: '#ee4d2d'
            }
        }
    }

    return (
        <div className="layout-content">
            <div className="layout-content-padding">
                <h3>Danh sách đơn hàng</h3>
                <table className="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Đơn hàng</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Trạng thái đơn hàng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrder && listOrder.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.username}</td>
                                <td>
                                    <Moment format="hh:mm DD/MM/YYYY ">
                                        {item.createdAt}
                                    </Moment>
                                </td>
                                <td>
                                    <p className='order-status-admin' style={{ backgroundColor: `${convertStatusString(item.status).bgr}` }}>{convertStatusString(item.status).content}</p>

                                </td>
                                <td>
                                    <Link to={`/admin/order/detail/${item._id}`} className="btn btn-success">Xem chi tiết</Link >
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ListOrderPage
