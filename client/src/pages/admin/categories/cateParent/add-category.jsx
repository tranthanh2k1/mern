import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated } from '../../../../redux/actions/auth'
import { addCategory, listParentCategory } from '../../../../redux/actions/categories/cateParent'

const AddCategoryPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const history = useHistory()

    const categories = useSelector(state => state.listParentCate)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(listParentCategory())
    }, [])

    const { token } = isAuthenticated()

    const onSubmit = (data) => {
        const dataForm = {
            name: data.name,
            parent_id: data.parent_id ? data.parent_id : null
        }
        dispatch(addCategory(token, dataForm))
        if (categories && categories.error === '') {
            history.push('/admin/category')
        }
    }

    return (
        <div className="layout-content">
            <div className="layout-content-padding">
                {categories && <p className="form__error">{categories.error}</p>}
                <h3>Thêm danh mục</h3>
                <Link to='/admin/category' className="btn btn-success list-cate">Danh sách danh mục</Link>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Tên danh mục</label>
                        <input type="text" className="form-control" id="name" autoFocus
                            {...register("name", { required: true })} />
                        {errors.name && <span className="form__error">Tên danh mục không được để trống</span>}
                    </div>
                    <label htmlFor="" className="form-label">Danh mục con: </label>
                    <select className="form-select mb-4"
                        aria-label="Default select example"
                        id="parent_id"
                        {...register('parent_id')}
                    >
                        <option key="1" value="">--Danh mục cha--</option>
                        {categories.listCategory.map((category) => (
                            <>
                                <option key={category._id} value={category._id}>{category.name}</option>
                            </>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategoryPage 
