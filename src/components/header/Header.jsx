import React from 'react';
import s from './Header.module.css';
import '../../App.css';
import logo from '../../assets/images/logo.png';
import loginIcon from '../../assets/images/login.png';
import logoutIcon from '../../assets/images/logout.png';
import menuIcon from '../../assets/images/menuIcon.png';
import { NavLink } from 'react-router-dom';

const Header = (props) => {

	const sideBarActive = () => {
		props.mobileSideBarActiveSucces(true);
	};

	return (
		<div className={s.header}>
			<div className={s.headerItems}>
				<div className={s.menuIconWrapper} >
					<button onClick={sideBarActive} >
						<img src={menuIcon} className='menuIcon' />
					</button>
					<img src={logo} />
				</div>
			</div>
			<div className={s.loginBlock}>
				{props.isAuth
					? <NavLink to={'/profile'} onClick={props.deleteAuthLoginData}>
						<img src={logoutIcon} />
					</NavLink>
					: <NavLink to={'/login'}><img src={loginIcon} /></NavLink>}
			</div>
		</div>
	);
};

export default Header;