import React, { useEffect, useState } from 'react'
import Product from '../../home/ListProduct'
import { useParams } from 'react-router'
import { API } from '../../../../config'
import axios from 'axios'

const ProductCateChildPage = () => {
    const [productCateChild, setProductCateChild] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const getProductCateChild = async () => {
            const { data } = await axios.get(`${API}/products/catechild/${id}`)
            setProductCateChild(data.product)
        }

        getProductCateChild()
    }, [id])

    return (
        <div>
            <Product products={productCateChild} />
        </div>
    )
}

export default ProductCateChildPage
