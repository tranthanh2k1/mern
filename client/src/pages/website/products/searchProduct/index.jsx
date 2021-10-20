import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { API } from '../../../../config'
import ListProduct from '../../home/ListProduct'

const SearchProduct = () => {
    const [searchProduct, setSearchProduct] = useState([])

    const useQuery = () => {
        return new URLSearchParams(useLocation().search);
    }

    const query = useQuery().get("name");

    useEffect(() => {
        const getSearchProduct = async () => {
            const { data } = await axios.get(`${API}/products/search?name=${query}`)
            const { product } = data
            setSearchProduct(product)
        }

        getSearchProduct()
    }, [])

    return (
        <div>
            <p className='result-search'>Kết quả tìm kiếm "{query}"</p>
            <ListProduct products={searchProduct} />
        </div>
    )
}

export default SearchProduct
