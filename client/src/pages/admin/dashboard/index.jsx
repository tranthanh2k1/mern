import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API } from '../../../config'
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import { convertNumber } from '../../../config';
import moment from 'moment'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [totalAllOrder, setTotalAllOrder] = useState([])
    const [date, setDate] = useState('')
    const [dateStart, setDateStart] = useState('')
    const [dateEnd, setDateEnd] = useState('')

    const [businessResults, setBusinessResults] = useState()
    const [revenueDays, setrevenueDays] = useState()

    const [choseFilter, setChoseFilter] = useState('Thống kê theo ngày')

    const dataChoseFilter = ['Thống kê theo ngày', 'Thống kê theo nhiều ngày']

    const optionBusinessResults = [
        {
            value: `${moment().format("YYYY-MM-DD")}`,
            content: "Hôm nay"
        },
        // {
        //     value: `${moment().subtract(1, 'days').format("YYYY-MM-DD")}`,
        //     content: "Hôm qua"
        // },
        {
            value: `${moment().subtract(2, 'days').format("YYYY-MM-DD")}`,
            content: "3 ngày gần đây"
        },
        {
            value: `${moment().subtract(6, 'days').format("YYYY-MM-DD")}`,
            content: "7 ngày gần đây"
        },
        {
            value: `${moment().subtract(29, 'days').format("YYYY-MM-DD")}`,
            content: "30 ngày gần đây"
        },
    ]

    const [choseBusinessResult, setChoseBusinessResult] = useState(`${moment().format("YYYY-MM-DD")}`)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.post(`${API}/order/businessResults`, { dateStart: `${choseBusinessResult}` })

                setBusinessResults(data)
            } catch (error) {
                console.log("error", error.response)
            }
        }

        fetchData()
    }, [choseBusinessResult])

    const handleSelectChoseBusinessResult = e => {
        setChoseBusinessResult(e.target.value)
    }

    const handleSelectFilter = e => {
        setChoseFilter(e.target.value)
        setTotalAllOrder([])
        setDate('')
        setDateStart('')
        setDateEnd('')
        setrevenueDays()
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
            const { data } = await axios.post(`${API}/order/revenueByDays`, { dateStart: date, dateEnd: date })

            setrevenueDays(data)
        } catch (error) {
            console.log("error", error.response)
        }
    }

    const revenueByDays = async () => {
        try {
            const { data } = await axios.post(`${API}/order/revenueByDays`, { dateStart, dateEnd })
            console.log("data", data)

            setrevenueDays(data)
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

    const totalRevenue = totalAllOrder && totalAllOrder.reduce((acc, item) => {
        return acc + item.order.intoMoney
    }, 0)

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: "'top' as const",
            },
            title: {
                display: true,
                // text: `${choseFilter === 'Thống kê theo ngày' ? 'Thống kê doanh thu theo ngày' : 'Thống kê doanh thu theo nhiều ngày'}`,
            },
        },
    };

    const labels = revenueDays && revenueDays.arrayDate;

    const data = {
        labels,
        datasets: [
            {
                label: 'Tổng tiền',
                data: revenueDays && revenueDays.arrayMoney,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <div className="layout-content">
            <div>
                <div className='p-4'>
                    <h3 className=''>Kết quả kinh doanh theo ngày</h3>
                    <select
                        className="form-select mt-4"
                        name="status"
                        style={{ width: '20%' }}
                        aria-label="Default select example"
                        onChange={handleSelectChoseBusinessResult}
                    >
                        {optionBusinessResults.map(item => (
                            <>
                                <option
                                    key={item.content}
                                    value={item.value}
                                    selected={choseBusinessResult === item.content}
                                >
                                    {item.content}
                                </option>
                            </>
                        ))}
                    </select>
                </div>
                {businessResults && (
                    <div className="row px-4">
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Doanh thu</h5>
                                            <span className="h2 font-weight-bold mb-0">{convertNumber(businessResults.revenue)}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                                                <i className="ni ni-active-40" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up" /> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">
                                {/* Card body */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Đơn đặt</h5>
                                            <span className="h2 font-weight-bold mb-0">{businessResults.processingOrder}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-orange text-white rounded-circle shadow">
                                                <i className="ni ni-chart-pie-35" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up" /> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">
                                {/* Card body */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Đơn đã giao</h5>
                                            <span className="h2 font-weight-bold mb-0">{businessResults.recceivedOrder}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                                                <i className="ni ni-money-coins" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up" /> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card card-stats">
                                {/* Card body */}
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">
                                            <h5 className="card-title text-uppercase text-muted mb-0">Đơn hủy</h5>
                                            <span className="h2 font-weight-bold mb-0">{businessResults.cancelOrder}</span>
                                        </div>
                                        <div className="col-auto">
                                            <div className="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                                                <i className="ni ni-chart-bar-32" />
                                            </div>
                                        </div>
                                    </div>
                                    {/* <p className="mt-3 mb-0 text-sm">
                                        <span className="text-success mr-2"><i className="fa fa-arrow-up" /> 3.48%</span>
                                        <span className="text-nowrap">Since last month</span>
                                    </p> */}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="layout-content-padding">
                <h3>Biểu đồ doanh thu</h3>
                <select
                    className="form-select my-4"
                    name="status"
                    aria-label="Default select example"
                    style={{ width: '30%' }}
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
                        <h5>Tổng doanh thu của ngày: <span>{date}</span> là: {revenueDays && convertNumber(revenueDays.totalMoney)}đ</h5>
                        <div style={{ marginBottom: '100px' }}>
                            <input type="date" onChange={handleDate} />
                            <button onClick={revenueDay} className='btn btn-success mx-2'>Lọc</button>
                        </div>
                    </>
                )}

                {choseFilter === 'Thống kê theo nhiều ngày' && (
                    <>
                        <h5>Tổng doanh thu từ ngày: <span>{dateStart || '...'}</span> đến ngày: <span>{dateEnd || '...'} là: {revenueDays && convertNumber(revenueDays.totalMoney)}đ</span></h5>
                        <div style={{ marginBottom: '100px' }}>
                            <input type="date" onChange={handleDateStart} />
                            <input className='mx-1' type="date" onChange={handleDateEnd} />
                            <button onClick={revenueByDays} className='btn btn-success mx-1'>Lọc</button>
                        </div>
                    </>
                )}

                {revenueDays && (
                    <Bar className="mt-[30px]" options={options} data={data} />
                )}

                {/* {totalAllOrder.length === 0 && 'Không tìm thấy dữ liệu'} */}
                {/* <ExportToExcel apiData={totalAllOrder} fileName={fileName} /> */}
            </div>
        </div >
    )
}

export default AdminDashboard
