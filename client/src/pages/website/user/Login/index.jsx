import React from 'react'
import LoginForm from './LoginForm'

const LoginPage = () => {
    return (
        <div className="full-width full-bg">
            <div className="container">
                <div className="grid-col-2 mt-30">
                    <div>col-1</div>
                    <div className="form__center">
                        <LoginForm />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage
