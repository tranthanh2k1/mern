import React, { useState, useEffect } from 'react'
import HomePolicy from '../../../components/website/Content/HomePolicy'
import { API } from '../../../config'
import ListProduct from './ListProduct'
import Slider from './Slider'
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomePage = () => {
    const [productSale, setProductSale] = useState([])
    const [products, setProducts] = useState([])
    const [listProductFashionWomen, setListProductFashionWomen] = useState([])
    const [listProductFashionMen, setListProductFashionMen] = useState([])

    useEffect(() => {
        const getProductSale = async () => {
            const { data } = await axios.get(`${API}/products/sale`)
            setProductSale(data.product)
        }

        getProductSale()
    }, [])

    useEffect(() => {
        const getProductAll = async () => {
            const { data } = await axios.get(`${API}/products`)

            setProducts(data.listProduct)
        }

        getProductAll()
    }, [])


    useEffect(() => {
        const getProductFashionWomen = async () => {
            const result = products && products.filter(product => product.category_id.parent_id === '615435f2a0627d67a5c10fe2')

            setListProductFashionWomen(result.slice(0, 4))
        }

        getProductFashionWomen()
    }, [products])

    useEffect(() => {
        const getProductFashionMen = async () => {
            const result = products && products.filter(product => product.category_id.parent_id === '61543603a0627d67a5c10fed')

            setListProductFashionMen(result.slice(0, 4))
        }

        getProductFashionMen()
    }, [products])

    return (
        <div>
            <Slider />
            <HomePolicy />
            <div>
                <h5 className='show__wp-list-product'>Top sản phẩm đang khuyến mãi</h5>
                <ul className='show__wp-list-product'>
                    <li><Link to="">Tất cả</Link></li>
                    <li><Link to="">Nam</Link></li>
                    <li><Link to="">Nữ</Link></li>
                </ul>
                <ListProduct products={productSale} />
            </div>
            <div className='mt-4'>
                <h5 className='show__wp-list-product'>Thời trang nữ</h5>
                <ul className='show__wp-list-product'>
                    <li><Link to="">Tất cả</Link></li>
                    <li><Link to="">Nam</Link></li>
                    <li><Link to="">Nữ</Link></li>
                </ul>
                <ListProduct products={listProductFashionWomen} />
            </div>
            <div className='mt-4'>
                <h5 className='show__wp-list-product'>Thời trang nam</h5>
                <ul className='show__wp-list-product'>
                    <li><Link to="">Tất cả</Link></li>
                    <li><Link to="">Nam</Link></li>
                    <li><Link to="">Nữ</Link></li>
                </ul>
                <ListProduct products={listProductFashionMen} />
            </div>

        </div>
    )
}

export default HomePage
