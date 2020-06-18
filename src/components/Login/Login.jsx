import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { Input, createField } from '../common/FormsControls/FormsControls';
import { requiredValidator, maxLenghtCreator } from '../../utils/validators/validators';
import s from '../common/FormsControls/FormsControls.module.css';

const maxLenght30 = maxLenghtCreator(30);

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField('Login', 'login', Input, [requiredValidator, maxLenght30])}
            {createField('Password', 'password', Input, [requiredValidator, maxLenght30], { type: 'password' })}
            {createField(null, 'rememberMe', Input, null, { type: 'checkbox' }, 'remember me')}

            {captchaUrl && <img src={captchaUrl} />}
            {captchaUrl && createField('Symbols from image', 'captcha', Input, [requiredValidator]) }

            <div>
                <button>Login</button>
            </div>
            {error && <div className={s.formSummaryError}>
                {error}
            </div>}
        </form>
    );
};

const LoginFormRedux = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ getAuthLoginData, isAuth, captchaUrl }) => {
    const onSubmit = (formData) => {
        getAuthLoginData(formData.login, formData.password, formData.rememberMe, formData.captcha);
    }

    if (isAuth) {
        return <Redirect to='/profile' />
    };

    return <div>
        <h1>Login</h1>
        <LoginFormRedux onSubmit={onSubmit} captchaUrl={captchaUrl} />
    </div>
};

export default Login;