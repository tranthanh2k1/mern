import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { authenticate, isAuthenticated, signin } from '../../../../redux/actions/auth'

const LoginForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [error, setError] = useState("")
    const [message, setMessage] = useState("")
    const [redirectToRef, setRedirectToRef] = useState(false)

    const { user } = isAuthenticated()

    const onSubmit = (dataForm, e) => {
        signin(dataForm)
            .then(data => {
                const dataGetItem = {
                    token: data.token,
                    user: data.user
                }
                console.log(dataGetItem)
                if (data.success) {
                    e.target.reset()
                    setError("")
                    setMessage(data.message)
                    alert(data.message)
                    authenticate(dataGetItem, () => {
                        setRedirectToRef(true)
                    })
                } else {
                    setError(data.message)
                    alert(data.message)
                }
            })
    }

    const redirectUser = () => {
        if (redirectToRef) {
            if (user.role === 1) {
                return <Redirect to='/admin' />
            } else {
                return <Redirect to='/' />
            }
        }
    }

    return (
        <div className="signup">
            {redirectUser()}
            {error ? <span className='form__error'>{error}</span> : message}
            <h2 className="signup__heading">Đăng nhập</h2>
            <p className="signin__text">Nếu bán chưa có tài khoản, <Link to="/register" className="signup__link">Đăng ký tại đây</Link></p>
            <form action="" className="signup__form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form__group">
                    <label htmlFor="" className="label__form">Email của bạn:</label>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="form__input"
                        {...register('email', {
                            required: true,
                            pattern: /.+\@.+\..+/
                        })}
                    />
                    {errors?.email?.type === "required" && <p className="form__error">Email không đc để trống</p>}
                    {errors?.email?.type === "pattern" && (<p className="form__error">Email chưa đúng định dạng</p>)}
                </div>
                <div className="form__group">
                    <label htmlFor="" className="label__form">Mật khẩu:</label>
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="form__input"
                        {...register('password', {
                            required: true,
                            minLength: 6
                        })}
                    />
                    {errors?.password?.type === "required" && <p className="form__error">Mật khẩu không đc để trống</p>}
                    {errors?.password?.type === "minLength" && (<p className="form__error">Mật khẩu ít nhất 6 kí tự</p>)}
                </div>
                <Link to="/login"><p className="signin__link">Quên mật khẩu</p></Link>
                <button type="submit" className="signup__btn">Đăng nhập</button>
            </form>
        </div>
    )
}

export default LoginForm
