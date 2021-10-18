import React from 'react'
import { Link } from 'react-router-dom'
import { convertNumber } from '../../../../config'

const ListProduct = ({ products }) => {
    const converPriceSale = (priceSale, priceDefault) => {
        return Number(priceDefault * ((100 - priceSale) / 100))
    }

    return (
        <div className="wp__products">
            <div className="container">
                <div className="wp__list-product">
                    {products.map(product => (
                        <div className="wp__list-product-item" key={product._id}>
                            <Link to={`/product/detail/${product._id}`} className="product_item-img-focus">
                                <img className="product__item-img-hover" src={product.image && product.image[0]} alt="image product" />
                                <div className="product__item-action">
                                    <Link to={`/product/detail/${product._id}`}>Xem chi tiết<i className="bi bi-eye"></i></Link>
                                    <Link to="#">Mua ngay<i className="bi bi-cart3"></i></Link>
                                </div>
                            </Link>
                            <p className="product__item-name"><Link to={`/product/detail/${product._id}`}>{product.name}</Link></p>
                            {product.price_sale > 0 ?
                                (<span className="product__item-price-sale">{convertNumber(converPriceSale(product.price_sale, product.price_default))}đ</span>)
                                : ''}
                            {product.price_sale > 0 ?
                                <span className="product__item-price-default">{convertNumber(product.price_default)}đ</span>
                                :
                                <span className="product__item-price-notsale">{convertNumber(product.price_default ? product.price_default : '')}đ</span>
                            }
                            {product.price_sale > 0 ? (<div className="price__sale-pt">-{product.price_sale}%</div>) : ''}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default ListProduct
