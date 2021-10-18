import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { API } from '../../../../config'
import Product from '../../home/ListProduct'
import axios from 'axios'

const ProductCateParentPage = () => {
    const [listProduct, setListProduct] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const getListProduct = async () => {
            const { data } = await axios.get(`${API}/products`)

            const result = data.listProduct.filter(product => product.category_id.parent_id === id)

            setListProduct(result)
        }

        getListProduct()
    }, [id])

    return (
        <div className='mt-4'>
            <Product products={listProduct} />
        </div>
    )
}

export default ProductCateParentPage
