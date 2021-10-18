import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { Link, useParams, useHistory } from 'react-router-dom'
import { API } from '../../../config'
import firebase from '../../../firebase'
import { updateProduct } from '../../../redux/actions/products'

const EditProductPage = () => {
    const [products, setProducts] = useState({})
    const [images, setImages] = useState([])
    const [colors, setColors] = useState([])
    const [sizes, setSizes] = useState([])
    const [categories, setCategories] = useState([])

    const { register, handleSubmit } = useForm()

    const dispatch = useDispatch()

    const { id } = useParams()

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`${API}/product/${id}`)
            setProducts(data)

            const dataImage = await axios.get(`${API}/product/${id}/image`)
            setImages(dataImage.data);

            const dataColor = await axios.get(`${API}/product/${id}/color`)
            setColors(dataColor.data)

            const dataSize = await axios.get(`${API}/product/${id}/size`)
            setSizes(dataSize.data)

            const dataCate = await axios.get(`${API}/categories/child`)
            setCategories(dataCate.data.listChild)
        }

        getProduct()
    }, [])

    const onSubmitImage = (data, e) => {
        const productImage = data.image[0];
        let storageRef = firebase.storage().ref(`images/${productImage && productImage.name}`);
        storageRef.put(productImage).then(() => {
            storageRef.getDownloadURL().then(async (url) => {
                setImages([
                    ...images,
                    url
                ])
            })
        })
        e.target.reset()
    }

    const onSubmitColor = (data, e) => {
        setColors([
            ...colors,
            data.color
        ])
        e.target.reset()
    }

    const onSubmitSize = (data, e) => {
        setSizes([
            ...sizes,
            data.size
        ])
        e.target.reset()
    }

    const onRemoveImage = (imageClick) => {
        const arrayImage = images.filter(image => image !== imageClick)

        setImages(arrayImage)
    }

    const onRemoveColor = (colorClick) => {
        const arrayColor = colors.filter(color => color !== colorClick)

        setColors(arrayColor)
    }

    const onRemoveSize = (sizeClick) => {
        const arraySize = sizes.filter(size => size !== sizeClick)

        setSizes(arraySize)
    }

    const history = useHistory()

    const onSubmit = (data) => {
        const updateProductData = {
            name: data.name ? data.name : products.name,
            price_default: data.price_default ? data.price_default : products.price_default,
            price_sale: data.price_sale ? data.price_sale : products.price_sale,
            quantity: data.quantity ? data.quantity : products.quantity,
            description: data.description ? data.description : products.description,
            image: images,
            color: colors,
            size: sizes,
            category_id: data.category_id ? data.category_id : products.category_id._id
        }

        dispatch(updateProduct(updateProductData, id))
        history.push('/admin/product')
    }

    return (
        <div className="layout-content">
            <div className="layout-content-padding">
                <h3>Sửa sản phẩm</h3>
                <Link to='/admin/product' className="btn btn-success list-cate">Danh sách sản phẩm</Link>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Tên sản phẩm</label>
                        <input type="text" className="form-control" id="name" autoFocus
                            defaultValue={products && products.name}
                            {...register("name")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Giá sản phẩm</label>
                        <input type="text" className="form-control" id="price_default"
                            defaultValue={products && products.price_default}
                            {...register("price_default")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Giảm giá</label>
                        <input type="text" className="form-control" id="price_sale"
                            defaultValue={products.price_sale}
                            {...register("price_sale")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Số lượng sản phẩm</label>
                        <input type="text" className="form-control" id="quantity"
                            defaultValue={products.quantity}
                            {...register("quantity")} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Description</label>
                        <textarea className="form-control" id="description"
                            defaultValue={products.description}
                            {...register("description")}
                        />
                    </div>
                    <label htmlFor="" className="form-label">Danh mục sản phẩm</label>
                    <select className="form-select mb-4"
                        aria-label="Default select example"
                        id="category_id"
                        {...register('category_id')}
                    >
                        {products.category_id && <option key={products.category_id._id} defaultValue={products.category_id._id}>{products.category_id.name}</option>}
                        {categories.map((category) => (
                            <>
                                <option key={category._id} value={category._id}>{category.name}</option>
                            </>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary mt-4 form__add-product">Sửa sản phẩm</button>
                </form>
                <div className="product-position">
                    <form action="" onSubmit={handleSubmit(onSubmitImage)}>
                        <label htmlFor="" className="form-label">Ảnh sản phẩm</label>
                        <div className="product__admin--list-image">
                            {images && images.map((image, index) => {
                                return (
                                    <div>
                                        <img key={index} className="product__image--add" src={image} alt="ảnh sản phẩm" />
                                        <button className="product__color--remove" onClick={() => onRemoveImage(image)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mb-3">
                            <input type="file" className="form-control width-input" id="image" {...register("image")} />
                        </div>
                        <button type="submit" className="btn btn-success">Thêm ảnh</button>
                    </form>
                    <div className="row mt-4">
                        <form action="" className="form__add-product-color col" onSubmit={handleSubmit(onSubmitColor)}>
                            <label htmlFor="" className="form-label">Màu sản phẩm</label>
                            <div className="product__color--list">
                                {colors && colors.map((color, index) =>
                                    <div className="product__color--add" style={{ backgroundColor: `${color}` }} key={index}>
                                        <button className="product__color--remove" onClick={() => onRemoveColor(color)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control width-input" id="color" {...register("color")} />
                            </div>
                            <button type="submit" className="btn btn-success">Thêm màu sắc</button>
                        </form>
                        <form action="" className="col" onSubmit={handleSubmit(onSubmitSize)}>
                            <label htmlFor="" className="form-label">Kích thước sản phẩm</label>
                            <div className="product__size--list">
                                {sizes && sizes.map((size, index) =>
                                    <div className="product__size--add" key={index}>{size}
                                        <button className="product__color--remove" onClick={() => onRemoveSize(size)}>
                                            <i className="bi bi-x-lg"></i>
                                        </button>
                                    </div>
                                )}
                            </div>
                            <div className="mb-3">
                                <input type="text" className="form-control width-input" id="size" {...register("size")} />
                            </div>
                            <button type="submit" className="btn btn-success">Thêm kích thước</button>
                        </form>
                    </div>
                </div>
            </div >
        </div >
    )
}

export default EditProductPage
