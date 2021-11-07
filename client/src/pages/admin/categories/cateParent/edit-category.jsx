import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useParams } from 'react-router-dom'
import { updateCategory } from '../../../../redux/actions/categories/cateParent'
import { detail } from '../../../../api/category'

const EditCategoryPage = () => {
    const [cate, setCate] = useState({})

    const { register, handleSubmit, formState: { errors } } = useForm()

    const history = useHistory()
    console.log("pẩm", useParams())
    const { id } = useParams()
    console.log("id", id)

    useEffect(() => {
        const getCateId = async () => {
            const data = await detail(id)
            setCate(data.category)
        }

        getCateId()
    }, [])

    const categories = useSelector(state => state.listParentCate.listCategory)
    console.log("cate", categories)

    const valueSelect = categories && categories.find(category => category._id === cate.parent_id)
    console.log("value", valueSelect)

    const dispatch = useDispatch()

    const onSubmit = (data) => {
        const dataForm = {
            name: data.name ? data.name : cate.name,
            parent_id: data.parent_id ? data.parent_id : cate.parent_id
        }
        dispatch(updateCategory(dataForm, id))
        history.push('/admin/category')
    }

    return (
        <div className="layout-content">
            <div className="layout-content-padding">
                <h3>Sửa danh mục</h3>
                <Link to='/admin/category' className="btn btn-success list-cate">Danh sách danh mục</Link>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-3">
                        <label htmlFor="" className="form-label">Tên danh mục</label>
                        <input type="text" className="form-control" defaultValue={cate ? cate.name : ""}
                            {...register("name", { required: true })} />
                        {errors.name && <span className="form__error">Tên danh mục không được để trống</span>}
                    </div>
                    <label htmlFor="" className="form-label">Danh mục con: </label>
                    <select className="form-select mb-4"
                        aria-label="Default select example"
                        name="parent_id"
                        {...register("parent_id")}
                    >
                        {cate.parent_id && cate.parent_id == null ? (<option key="1" value="">--Danh mục cha--</option>)
                            : (<option key={valueSelect._id && valueSelect._id} selected value={valueSelect._id && valueSelect._id}>{valueSelect.name && valueSelect.name}</option>)
                        }
                        {categories.map((category) => (
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

export default EditCategoryPage
