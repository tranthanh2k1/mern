import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link, NavLink } from 'react-router-dom'
import HomePolicy from '../../../../components/website/Content/HomePolicy'
import { API } from '../../../../config'
import { convertNumber } from '../../../../config'
import ListProduct from '../../home/ListProduct'

const DetailProductPage = () => {
    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [relatedProduct, setRelateProduct] = useState([])

    const { id } = useParams()

    useEffect(() => {
        const getProductDetail = async () => {
            const { data } = await axios.get(`${API}/product/${id}`)

            setProduct(data)
        }

        getProductDetail()
    }, [id])

    useEffect(() => {
        const getListRelated = async () => {
            const { data } = await axios.get(`${API}/products/related/${id}`)

            setRelateProduct(data)
        }

        getListRelated()
    }, [id])

    const converPriceSale = (priceSale, priceDefault) => {
        return Number(priceDefault * ((100 - priceSale) / 100))
    }

    const priceSave = (priceSale, priceDefault) => {
        return Number(priceDefault - [priceDefault * ((100 - priceSale) / 100)])
    }

    const decreaseQuantity = () => {
        if (1 >= quantity) return

        setQuantity(quantity - 1)
    }

    const increaseQuantity = () => {
        if (product.quantity <= quantity) return

        setQuantity(quantity + 1)
    }

    return (
        <>
            <div className='container'>
                <div className='breadcrumb'><Link to="/">Trang chủ</Link> &nbsp;&gt;&nbsp; <Link to="#">{product.category_id && product.category_id.name}</Link> &nbsp;&gt;&nbsp; <NavLink to="#" activeStyle={{ color: '#fcaf4f' }}>{product.name}</NavLink></div>
                <div className='product__detail'>
                    <div className="product__detail-image">
                        <div className="product__detail-image-main">
                            <img src={product.image && product.image[0]} alt="image main" />
                        </div>
                        <div className="product__detail-image-other">
                            {product.image && product.image.map((item, index) => (
                                <img key={index} src={item} alt="image other" />
                            ))}
                        </div>
                    </div>
                    <div className="product__detail-description">
                        <h1 className="product__privew-name">{product.name}</h1>
                        <p className="product__privew-status">Tình trạng: <span>{product.status ? 'Còn hàng' : 'Hết hàng'}</span></p>
                        <div className="product__priview-price">
                            <div className='product-detail-price-item'
                                style={{ textAlign: product.price_sale > 0 ? 'center' : 'left' }}>
                                {product.price_sale > 0 &&
                                    (<span className='price__sale-detail'>
                                        {convertNumber(converPriceSale(product.price_sale, product.price_default))}đ
                                    </span>)}
                                <span className={product.price_sale < 1 ? 'price__sale-detail' : 'price__default-detail'}
                                    style={{ textDecorationLine: product.price_sale > 0 ? 'line-through' : 'none', marginLeft: '20px' }}
                                >
                                    {convertNumber(product.price_default ? product.price_default : '')}đ
                                </span>
                                {product.price_sale > 0 &&
                                    (<span className='price__save'>
                                        Tiết kiệm {convertNumber(priceSave(product.price_sale, product.price_default))}đ
                                    </span>)}
                            </div>
                        </div>
                        <div className="product__privew-property">Màu sắc</div>
                        <div className="product__privew-color-item">
                            {product.color && product.color.map((item, index) => (
                                <Link to="#"><div className='product-detail-color-item' key={index} style={{ backgroundColor: `${item}` }}></div></Link>
                            ))}
                        </div>
                        <div className="product__privew-property">Kích cỡ</div>
                        <div className="product__privew-size-item">
                            {product.size && product.size.map((item, index) => (
                                <Link to="#"><div className='product-detail-size-item' key={index}>{item}</div></Link>
                            ))}
                        </div>
                        <div className='product__quantity-detail'>
                            <label>Số lượng:</label>
                            <span onClick={decreaseQuantity}><i class="bi bi-dash-lg"></i></span>
                            <input type="text" readOnly value={quantity} className='input-quantity-detail' />
                            <span onClick={increaseQuantity}><i class="bi bi-plus-lg"></i></span>
                        </div>
                        <div className="product__button-detail button-add-to-cart"><Link to="#">Thêm giỏ hàng</Link></div>
                        <div className="product__button-detail button-buy"><Link to="#">Mua ngay</Link></div>
                    </div>
                </div>
                <div className='mt-4'>
                    <h5>Mô tả chi tiết sản phẩm:</h5>
                    <em>{product.description}</em>
                </div>
                <HomePolicy />
                <h5 className='product__related'>Các sản phẩm tương tự</h5>
            </div >
            <div>
                <ListProduct products={relatedProduct} />
            </div>
        </>
    )
}

export default DetailProductPage
