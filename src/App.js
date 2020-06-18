import React from 'react';
import './App.css';
import { Route, withRouter, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import NavBarContainer from './components/navbar/NavBarContainer';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { initialazeApp } from './redux/app-reducer';
import Preloader from './components/common/Preloader/Preloader';
import store from './redux/redux-store';
import { Provider } from 'react-redux';
import HeaderContainer from './components/header/HeaderContainer';
import { withSuspence } from './components/hoc/withSuspense';
import ErrorWindow from './components/common/ErrorWindow/errorWindow';
import Footer from './components/Footer/Footer';

const ProfileContainer = React.lazy(() => import('./components/Profile/ProfileContainer'));
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const UserContainer = React.lazy(() => import('./components/Users/UsersContainer'));
const LoginContainer = React.lazy(() => import('./components/Login/LoginContainer'));


class App extends React.Component {

  componentDidMount() {
    this.props.initialazeApp();
  };

  render() {

    if (!this.props.initialazed) {
      return <Preloader />
    };

    return <div className='app_wraper'>
      <HeaderContainer />
      <div className='navBarStyle'>
        <NavBarContainer />
      </div>
      {this.props.mobileSideBarActive ? <NavBarContainer className='navBarStyleActive' /> :
        <div className='app_wraper_content'>
          <Switch>
            <Route path='/profile/:userId?' render={withSuspence(ProfileContainer)} />
            <Route path='/dialogs' render={withSuspence(DialogsContainer)} />
            <Route path='/users' render={withSuspence(UserContainer)} />
            <Route path='/login' render={withSuspence(LoginContainer)} />
            <Route exact path='/' render={() => { return <Redirect to='/profile' /> }} />
            <Route path='*' render={() => { return <div>404 error</div> }} />
          </Switch>
        </div>
      }
      {this.props.globalError ? <ErrorWindow /> : null}
      <Footer />
    </div>
  };
};

const mapStateToProps = (state) => ({
  initialazed: state.app.initialazed,
  globalError: state.app.globalError,
  mobileSideBarActive: state.app.mobileSideBarActive
});

let AppContainer = compose(
  withRouter,
  connect(mapStateToProps, { initialazeApp })
)(App);

const SamuraiJSApp = (props) => {
  return <BrowserRouter>
    <Provider store={store}>
      <AppContainer />
    </Provider>
  </BrowserRouter>
};

export default SamuraiJSApp;
