import React, { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import axios from 'axios'
import { API } from '../../../../config'

const MenuMain = () => {
    const [cateParent, setCateParent] = useState([])
    const [cateChild, setCateChild] = useState([])
    const [cateChildItem, setCateChildItem] = useState([])

    useEffect(() => {
        const getCateParent = async () => {
            const { data } = await axios.get(`${API}/categories`)
            setCateParent(data.listCategory)
        }

        getCateParent()
    }, [])

    useEffect(() => {
        const getCateChild = async () => {
            const { data } = await axios.get(`${API}/categories/child`)
            setCateChild(data)
        }

        getCateChild()
    }, [])

    const onMouseOverHover = (idCate) => {
        const arrayCateChild = cateChild && cateChild.filter(cate => cate && cate.parent_id === idCate)

        setCateChildItem(arrayCateChild)
    }

    return (
        <div className="header__nav">
            <div className="container">
                <nav className="header__menu">
                    <ul className="header__menu-main">
                        <li><NavLink to="/" exact activeStyle={{ color: '#fcaf4f' }}>TRANG CHỦ</NavLink></li>
                        {cateParent && cateParent.map(cate => (
                            <li key={cate._id} className="header__menu-cate">
                                <NavLink to={`/product/cateparent/${cate._id}`} exact activeStyle={{ color: '#fcaf4f' }} onMouseOver={() => onMouseOverHover(cate._id)}>
                                    {cate.name}
                                </NavLink>
                                <ul className="header__submenu">
                                    {cateChildItem && cateChildItem.map(cateItem => <li key={cateItem._id}><Link to={`/product/catechild/${cateItem._id}`}>{cateItem.name}</Link></li>)}
                                </ul>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div >
    )
}

export default MenuMain
