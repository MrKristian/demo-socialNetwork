import React from 'react';
import Header from './Header';
import { connect } from 'react-redux';
import { deleteAuthLoginData } from '../../redux/auth-reducer';
import { mobileSideBarActiveSucces } from '../../redux/app-reducer';
import { compose } from 'redux';

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props} />
    };
};

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login
});

export default compose(connect(mapStateToProps, { deleteAuthLoginData, mobileSideBarActiveSucces }))(HeaderContainer);