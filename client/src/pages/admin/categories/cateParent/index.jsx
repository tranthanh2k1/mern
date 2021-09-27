import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listParentCategory, removeCategory } from '../../../../redux/actions/categories/cateParent'
import { listChildCategory } from '../../../../redux/actions/categories/cateChild'

const ListCategoryPage = () => {
    const categories = useSelector(state => state.listParentCate)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listParentCategory())
    }, [])

    const onHandleClick = (id) => {
        dispatch(listChildCategory(id))
    }

    const removeCate = (id) => {
        dispatch(removeCategory(id))
    }

    return (
        <div className="layout-content">
            <div className="layout-content-padding">
                <h3>Danh sách danh mục cha</h3>
                <table className="table caption-top">
                    <caption>List of category parent</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Level</th>
                            <th scope="col">
                                <Link to="/admin/category/add" className="btn btn-success">Thêm danh mục</Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.listCategory.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{category.name}</td>
                                    <td>{category.parent_id == null ? "parent" : "child"}</td>
                                    <td>
                                        <Link to={`/admin/category/edit/${category._id}`} className="btn btn-primary mx-1">Sửa</Link>
                                        <button onClick={() => removeCate(category._id)} className="btn btn-danger mx-2">Xóa</button>
                                        <Link to={`/admin/category/child`}><button onClick={() => onHandleClick(category._id)} className="btn btn-danger">Danh mục con</button></Link>
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

export default ListCategoryPage
