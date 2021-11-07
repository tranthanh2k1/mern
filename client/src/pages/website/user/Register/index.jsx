import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
    return (
        <div className="full-width background-account">
            <div className="container">
                <div className="grid-col-2 mt-30">
                    <div className='content-user'>
                        <img src="https://storage.googleapis.com/cdn.nhanh.vn/website/template/538/contentKey/6941/lo_g0yody.png" alt="logo content" />
                    </div>
                    <div className="form__center">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
