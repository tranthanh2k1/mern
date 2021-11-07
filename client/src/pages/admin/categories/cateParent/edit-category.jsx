import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom'
import { listParentCategory, updateCategory } from '../../../../redux/actions/categories/cateParent'
import { detail } from '../../../../api/category'

const EditCategoryPage = () => {
    const [cate, setCate] = useState({})
    console.log("cate", cate)

    const { register, handleSubmit, formState: { errors } } = useForm()

    const history = useHistory()
    const dispatch = useDispatch()

    // lấy id params trên url
    const { pathname } = useLocation()
    const arrayPathname = pathname.split("/")
    const id = arrayPathname[arrayPathname.length - 1]

    useEffect(() => {
        const getCateId = async () => {
            const data = await detail(id)
            const { category } = data
            setCate(category)
        }

        getCateId()
    }, [])

    const { listCategory } = useSelector(state => state.listParentCate)
    console.log("catelist", listCategory)

    useEffect(() => {
        dispatch(listParentCategory())
    }, [])

    let valueSelect
    valueSelect = listCategory && listCategory.find(category => category._id === cate.parent_id)
    console.log("value", valueSelect)

    const onSubmit = (data) => {
        const dataForm = {
            name: data.name ? data.name : cate.name,
            parent_id: data.parent_id ? data.parent_id : cate.parent_id
        }
        console.log("data", dataForm, id)
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
                        <input type="text" className="form-control" defaultValue={cate ? cate.name : ""} id="name"
                            {...register("name", { required: true })} />
                        {errors.name && <span className="form__error">Tên danh mục không được để trống</span>}
                    </div>
                    <label htmlFor="" className="form-label">Danh mục con: </label>
                    <select className="form-select mb-4"
                        aria-label="Default select example"
                        name="parent_id"
                        {...register("parent_id")}
                    >
                        {valueSelect ?
                            (cate.parent_id === null ?
                                (<option key="1" selected value="">--Danh mục cha--</option>)
                                : (<option key={valueSelect._id || ''} selected value={valueSelect._id || ''}>
                                    {valueSelect.name}
                                </option>)
                            )
                            : (<option key="1" selected value="null">--Danh mục cha--</option>)
                        }

                        {/* {cate ? (cate.parent_id == null ?
                            (<option key="1" selected value="">--Danh mục cha--</option>)
                            : (<option key={valueSelect._id ? valueSelect._id : ''} selected value={valueSelect._id ? valueSelect._id : ''}>
                                {valueSelect.name}</option>
                            )) : ''
                        } */}

                        {listCategory && listCategory.map((category) => (
                            <>
                                <option key={category._id} value={category._id}>{category.name}</option>
                            </>
                        ))}
                    </select>
                    <button type="submit" className="btn btn-primary mt-4">Submit</button>
                </form>
            </div>
        </div >
    )
}

export default EditCategoryPage
