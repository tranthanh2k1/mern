import React from 'react'
import RegisterForm from './RegisterForm'

const RegisterPage = () => {
    return (
        <div className="full-width full-bg">
            <div className="container">
                <div className="grid-col-2 mt-30">
                    <div>col-1</div>
                    <div className="form__center">
                        <RegisterForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage
