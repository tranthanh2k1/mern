import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProduct, removeProduct } from '../../../redux/actions/products'

const ListProductPage = () => {
	const products = useSelector(state => state.product)

	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(listProduct())
	}, [])

	const onHandleRemove = (id) => {
		dispatch(removeProduct(id))
	}

	const convertNumber = (number) => {
		return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
	}

	return (
		<div className="layout-content">
			<div className="layout-content-padding">
				<h3>Danh sách sản phẩm</h3>
				<table className="table caption-top">
					<caption>List of product</caption>
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Tên</th>
							<th scope="col">Ảnh</th>
							<th scope="col">Giá</th>
							<th scope="col">Giảm giá</th>
							<th scope="col">Số lượng</th>
							<th scope="col">Trạng thái</th>
							<th scope="col">Màu</th>
							<th scope="col">Kích thước</th>
							<th scope="col">Danh mục</th>
							<th scope="col">
								<Link to="/admin/product/add" className="btn btn-success">Thêm sản phẩm</Link>
							</th>
						</tr>
					</thead>
					<tbody>
						{products.listProduct.map((product, index) => {
							return (
								<tr key={index}>
									<th scope="row">{index}</th>
									<td className="product__admin--name">{product.name}</td>
									<td><img className="product__admin--image" src={product.image && product.image[0]} alt="anhr" /></td>
									<td>{convertNumber(product.price_default ? product.price_default : '')}&nbsp;đ</td>
									<td>{product.price_sale ? product.price_sale : '0'}%</td>
									<td>{product.quantity}</td>
									<td>{product.status ? 'Còn hàng' : 'Hết hàng'}</td>
									<td>
										<div className="product__admin--color-item">
											{product.color && product.color.map((color, index) => <div key={index} className="product__color--item" style={{ backgroundColor: `${color}` }}></div>)}
										</div>
									</td>
									<td>
										<div className="product__admin--size-item">
											{product.size && product.size.map((size, index) => <div key={index} className="product__size--item">{size}</div>)}
										</div>
									</td>
									<td>{product.category_id && product.category_id.name}</td>
									<td>
										<Link to={`/admin/product/edit/${product._id}`} className="btn btn-primary mx-1">Sửa</Link>
										<button onClick={() => onHandleRemove(product._id)} className="btn btn-danger">Xóa</button>
									</td>
								</tr>
							)
						})}
					</tbody>
				</table>
			</div>
		</div >
	)
}

export default ListProductPage
