import React, { useEffect, useRef, useState } from 'react'

import Moment from 'react-moment';
import { CSVLink } from "react-csv";
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { adminFilterDateOrderAction, adminListOrderStatusAction, listAllOrderAdminAction } from '../../../redux/actions/orderAdmin';

const ListOrderPage = () => {
    const [date, setDate] = useState('')

    const { listOrder, totalPage, error } = useSelector(state => state.orderAdmin)
    console.log("listorrder", listOrder)

    const dispatch = useDispatch()

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    let query = useQuery().get("page");

    useEffect(() => {
        if (query) {
            dispatch(listAllOrderAdminAction(query))
        } else {
            dispatch(listAllOrderAdminAction(1))
        }
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

    const dataOption = [
        {
            value: "PROCESSING",
            content: "Chờ xủ lý"
        },
        {
            value: "DELIVERING",
            content: "Đang giao"
        },
        {
            value: "RECEIVED",
            content: "Đã nhận"
        },
        {
            value: "CANCELLED",
            content: "Đã hủy"
        },
    ]

    const paginationRef = useRef(null)
    const inputDateRef = useRef(date)

    const handleSelectStatus = (e) => {
        if (e.target.value === '') {
            return
        }

        if (e.target.value === 'all') {
            // paginationRef.current.style.display = 'block'

            setDate('')
            inputDateRef.current.value = ""

            return dispatch(listAllOrderAdminAction(1))
        }

        const dataReq = {
            status: e.target.value
        }

        dispatch(adminListOrderStatusAction(dataReq))

        setDate('')
        inputDateRef.current.value = ""

        // paginationRef.current.style.display = 'none'
    }

    const handleDate = e => {
        setDate(e.target.value)
    }

    const handleFilterDateOrder = () => {
        dispatch(adminFilterDateOrderAction(date))
    }

    const headers = [
        { label: "Mã hóa đơn", key: "code_bill" },
        { label: "Họ và tên", key: "username" },
        { label: "Địa chỉ nhận hàng", key: "address" },
        { label: "Email", key: "email" },
        { label: "Số diện thoại", key: "phone" },
        { label: "Tổng doanh thu", key: "" }
    ];

    return (
        <div className="layout-content">
            {error && alert(error)}
            <div className="layout-content-padding">
                <h3>Danh sách đơn hàng</h3>
                <form action='/admin/order/search' className='my-4'>
                    <input type="text" placeholder='Tìm kiếm...' name="code" />
                    <button type='submit' className='btn btn-primary mx-2'>TÌm kiếm</button>
                </form>
                <div className='my-4'>
                    <h5>Lọc đơn hàng theo ngày: {date}</h5>
                    <input type="date" onChange={handleDate} ref={inputDateRef} />
                    <button onClick={handleFilterDateOrder} className='btn btn-success mx-2'>Lọc</button>
                </div>
                <select
                    className="form-select my-4"
                    name="status"
                    aria-label="Default select example"
                    onChange={handleSelectStatus}
                >
                    <option selected value="">---Lọc theo trạng thái---</option>
                    <option value="all">Tất cả</option>
                    {dataOption.map(item => (
                        <>
                            <option key={item.value} value={item.value}>{item.content}</option>
                        </>
                    ))}
                </select>
                <CSVLink className='btn btn-success w-2' data={listOrder && listOrder} headers={headers}>
                    Xuất ra excel
                </CSVLink>
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
                        {listOrder ? listOrder.map((item, index) => (
                            <tr key={index}>
                                <th scope="row">{item.code_bill}</th>
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
                        )) : 'không có đơn hàng nào'}
                    </tbody>
                </table>
                {totalPage && (
                    <nav aria-label="Page navigation example" ref={paginationRef}>
                        <ul className="pagination">
                            <li className="page-item">
                                {query > 1 && (
                                    <Link
                                        className='page-link'
                                        to={`/admin/order/list?page=${Number(query) - 1}`}
                                    >
                                        Previous
                                    </Link>
                                )}
                            </li>
                            {Array(totalPage).fill(1).map((item, index) => (
                                <li className="page-item" key={index}>
                                    <Link
                                        className="page-link"
                                        to={`/admin/order/list?page=${index + 1}`}
                                    >{index + 1}</Link>
                                </li>
                            ))}
                            <li className="page-item">
                                {query < totalPage && (
                                    <Link
                                        className="page-link"
                                        to={`/admin/order/list?page=${Number(query) + 1}`}
                                    >
                                        Next
                                    </Link>
                                )}
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </div>
    )
}

export default ListOrderPage
