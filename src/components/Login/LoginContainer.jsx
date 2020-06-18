import React from 'react';
import Login from './Login';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getAuthLoginData } from '../../redux/auth-reducer';

class LoginContainer extends React.Component {
    render() {
        return <Login getAuthLoginData={this.props.getAuthLoginData}
            captchaUrl={this.props.captchaUrl}
            isAuth={this.props.isAuth}
            redirect={this.redirect} />
    }
};


let mapStateToProps = (state) => ({
    captchaUrl: state.auth.captchaUrl,
    isAuth: state.auth.isAuth
});

export default compose(
    connect(mapStateToProps, { getAuthLoginData })
)(LoginContainer);