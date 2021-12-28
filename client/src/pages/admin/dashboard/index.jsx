import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../../../config'
import { CSVLink } from "react-csv";
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { convertNumber } from '../../../config';

const AdminDashboard = () => {
    const [totalAllOrder, setTotalAllOrder] = useState([])
    const [date, setDate] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')

    const [choseFilter, setChoseFilter] = useState('Thống kê theo ngày')

    const dataChoseFilter = ['Thống kê theo ngày', 'Thống kê theo nhiều ngày']

    const handleSelectFilter = e => {
        setChoseFilter(e.target.value)
        setTotalAllOrder([])
        setDate('')
        setDateStart('')
        setDateEnd('')
    }

    const handleDate = e => {
        setDate(e.target.value)
    }

    const handleDateStart = e => {
        setDateStart(e.target.value)
    }

    const handleDateEnd = e => {
        setDateEnd(e.target.value)
    }

    const revenueDay = async () => {
        try {
            const { data } = await axios.post(`${API}/order/revenueByDay`, { date })

            setTotalAllOrder(data)
        } catch (error) {
            console.log("error", error.response)
        }
    }

    const revenueByDays = async () => {
        try {
            const { data } = await axios.post(`${API}/order/revenueByDays`, { dateStart, dateEnd })

            setTotalAllOrder(data)
        } catch (error) {
            console.log("error", error.response)
        }
    }


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

    // function returnObj() {
    //     totalAllOrder && totalAllOrder.map(item => {
    //         let dataHeader = []

    //         item.product.map((it, index) => {
    //             const ele = {
    //                 label: "Sản phẩm" + index + 1,
    //                 key: it.product_name
    //             }

    //             dataHeader.push(ele)
    //         })

    //         console.log(dataHeader)
    //     })

    //     // return dataHeader
    // }

    const totalRevenue = totalAllOrder && totalAllOrder.reduce((acc, item) => {
        return acc + item.order.intoMoney
    }, 0)

    // function checkTotalMoney() {
    //     if (totalAllOrder.length > 0) {
    //         const Obj = {
    //             totalMoney: totalRevenue(totalAllOrder)
    //         }

    //         totalAllOrder.push(Obj)
    //     }
    // }

    const headers = [
        { label: "Mã hóa đơn", key: "order.code_bill" },
        { label: "Họ và tên", key: "order.username" },
        { label: "Địa chỉ nhận hàng", key: "order.address" },
        { label: "Email", key: "order.email" },
        { label: "Số diện thoại", key: "order.phone" },
        { label: "Tổng sản phẩm", key: "product.length" },
        { label: "Tổng doanh thu", key: "" }
    ];

    return (
        <div className="layout-content">
            {/* {totalAllOrder && (returnObj())} */}
            {/* {totalAllOrder && checkTotalMoney()} */}
            <div className="layout-content-padding">
                <h3>Thống kê doanh thu</h3>
                {totalAllOrder && (
                    <h6>Tống tất cả đơn hàng: <span>{totalAllOrder.length}</span></h6>
                )}

                <select
                    className="form-select my-4"
                    name="status"
                    aria-label="Default select example"
                    onChange={handleSelectFilter}
                >
                    {dataChoseFilter.map(item => (
                        <>
                            <option
                                key={item}
                                value={item}
                                selected={choseFilter === item}
                            >
                                {item}
                            </option>
                        </>
                    ))}
                </select>

                {choseFilter === 'Thống kê theo ngày' && (
                    <>
                        <h5>Thống kê doanh thu của ngày: <span>{date}</span> là: {totalAllOrder && convertNumber(convertNumber(totalRevenue))}đ</h5>
                        <div>
                            <input type="date" onChange={handleDate} />
                            <button onClick={revenueDay} className='btn btn-success mx-2'>Lọc</button>
                        </div>
                    </>
                )}

                {choseFilter === 'Thống kê theo nhiều ngày' && (
                    <>
                        <h5>Thống kê doanh thu từ ngày: <span>{dateStart || '...'}</span> đến ngày: <span>{dateEnd || '...'} là: {totalAllOrder && convertNumber(convertNumber(totalRevenue))}đ</span></h5>
                        <div>
                            <input type="date" onChange={handleDateStart} />
                            <input type="date" onChange={handleDateEnd} />
                            <button onClick={revenueByDays} className='btn btn-success mx-2'>Lọc</button>
                        </div>
                    </>
                )}

                {totalAllOrder.length > 0 && (
                    <>
                        <table className="table caption-top">
                            <thead>
                                <tr>
                                    <th scope="col">Mã</th>
                                    <th scope="col">Đơn hàng</th>
                                    <th scope="col">Thời gian thanh toán</th>
                                    <th scope="col">Trạng thái đơn hàng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {totalAllOrder.map((item, index) => (
                                    <tr key={index}>
                                        <th scope="row">{item.order.code_bill}</th>
                                        <td>{item.order.username}</td>
                                        <td>
                                            <Moment format="hh:mm DD/MM/YYYY ">
                                                {item.order.updated_received}
                                            </Moment>
                                        </td>
                                        <td>
                                            <p className='order-status-admin' style={{ backgroundColor: `${convertStatusString(item.order.status).bgr}` }}>{convertStatusString(item.order.status).content}</p>
                                        </td>
                                        <td>
                                            <Link to={`/admin/order/detail/${item.order._id}`} className="btn btn-success">Xem chi tiết</Link >
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>Tổng doanh thu:</td>
                                    <td>{totalAllOrder && convertNumber(totalRevenue)}đ</td>
                                </tr>
                            </tfoot>
                        </table>

                        <CSVLink
                            data={totalAllOrder}
                            headers={headers}
                            filename='data'
                            className="btn btn-primary my-4"
                            onClick={() => {
                                if (totalAllOrder.length === 0) {
                                    alert('Không có dữ liệu')
                                    return false
                                }
                            }}
                        >
                            Xuất ra file excel
                        </CSVLink>
                    </>
                )}

                {totalAllOrder.length === 0 && 'Không tìm thấy dữ liệu'}
                {/* <ExportToExcel apiData={totalAllOrder} fileName={fileName} /> */}
            </div>
        </div >
    )
}

export default AdminDashboard
