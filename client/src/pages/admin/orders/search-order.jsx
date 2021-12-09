import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Moment from 'react-moment'
import { Link, useLocation } from 'react-router-dom'
import { API } from '../../../config'
import { isAuthenticated } from '../../../redux/actions/auth'

const SearchOrderAdmin = () => {
    const [order, setOrder] = useState({})
    const [error, setError] = useState('')

    const { token } = isAuthenticated()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery().get("code");

    useEffect(() => {
        const getOrderSearch = async () => {
            try {
                const { data } = await axios.get(`${API}/order/admin/search`, {
                    params: {
                        code: query
                    },
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                })
                console.log(data)

                setOrder(data.orderSearch)
            } catch (error) {
                setError(error.response.data.message)
            }
        }

        getOrderSearch()
    }, [query])

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
            {error && alert(error)}
            <div className="layout-content-padding">
                <h3>Danh sách đơn hàng</h3>
                <form>
                    <input type="text" placeholder='Tìm kiếm...' name="code" />
                    <button type='submit'>Tìm kiếm</button>
                </form>
                <table className="table caption-top">
                    <thead>
                        <tr>
                            <th scope="col">Mã</th>
                            <th scope="col">Đơn hàng</th>
                            <th scope="col">Ngày tạo</th>
                            <th scope="col">Trạng thái đơn hàng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {order ? (
                            <tr>
                                <th scope="row">{order.code_bill}</th>
                                <td>{order.username}</td>
                                <td>
                                    <Moment format="hh:mm DD/MM/YYYY ">
                                        {order.createdAt}
                                    </Moment>
                                </td>
                                <td>
                                    <p className='order-status-admin' style={{ backgroundColor: `${convertStatusString(order.status).bgr}` }}>{convertStatusString(order.status).content}</p>
                                </td>
                                <td>
                                    <Link to={`/admin/order/detail/${order._id}`} className="btn btn-success">Xem chi tiết</Link >
                                </td>
                            </tr>
                        ) : ''}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SearchOrderAdmin
