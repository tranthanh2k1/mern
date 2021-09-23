import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { removeChildCategory } from '../../../../redux/actions/categories/cateChild'

const ListCateChildPage = () => {
    const categories = useSelector(state => state.listChildCate.listChildCate)
    const dispatch = useDispatch()

    const removeCate = (id) => {
        dispatch(removeChildCategory(id))
    }

    return (
        <div className="layout-content">
            <div className="layout-content-padding">
                <h3>Danh sách danh mục con</h3>
                <table className="table caption-top">
                    <caption>List of category child</caption>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Level</th>
                            <th scope="col">
                                <Link to="/admin/category" className="btn btn-success">Danh sách danh mục</Link>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.map((category, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{index}</th>
                                    <td>{category.name}</td>
                                    <td>{category.parent_id == null ? "parent" : "child"}</td>
                                    <td>
                                        <Link to={`/admin/category/edit/${category._id}`} className="btn btn-primary mx-1">Sửa</Link>
                                        <button onClick={() => removeCate(category._id)} className="btn btn-danger">Xóa</button>
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

export default ListCateChildPage
