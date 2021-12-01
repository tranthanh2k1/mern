import React, { useEffect, useState } from 'react'
import { API } from '../../../config'

import { Link } from 'react-router-dom'
import axios from 'axios'

const HeaderAdmin = () => {
    const [orderProcessing, setOrderProcessing] = useState([])

    useEffect(() => {
        const getOrderProcessing = async () => {
            const { data } = await axios.post(`${API}/order/status`, {
                status: 'PROCESSING'
            })
            const { listOrderStatus } = data

            setOrderProcessing(listOrderStatus)
        }

        getOrderProcessing()
    }, [])

    return (
        <div className="header-admin__top">
            <div className="admin-container admin-flex">
                <button className="menu-btnn"><i className="bi bi-list"></i></button>
                <ul className="header-admin__list--menu" >
                    <li className="list-menu__item"><Link to="/admin/dashboard">Dashboard</Link></li>
                    <li className="list-menu__item"><Link to="/admin/user">Users</Link></li>
                    <li className="list-menu__item"><Link to="/admin/dashboard">Settings</Link></li>
                </ul>
                <div className="admin__header-top-right">
                    <div className='admin__header-notification'>
                        <i className="bi bi-bell"></i>
                        {orderProcessing.length > 0 && <span className='qty-notification'>{orderProcessing.length}</span>}
                        <div className='list-order-notification'>
                            {orderProcessing.map(item => (
                                <Link to={`/admin/order/detail/${item._id}`}>
                                    <p>{item.username}</p>
                                    <p>{item.address}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQb_LnZHO6pKxZ9u66AuGt_HzFkpdnrEnqFA&usqp=CAU" alt="avatar" className='admin__header-avatar' />
                    <i className="bi bi-three-dots"></i>
                </div>
            </div>
        </div>
    )
}

export default HeaderAdmin
