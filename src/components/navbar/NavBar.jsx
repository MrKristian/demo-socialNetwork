import React from 'react';
import s from './NavBar.module.css';
import { NavLink } from 'react-router-dom';
import Friends from './Friends/Friends';

const NavBar = (props) => {

	let FriendsNameItems = props.friends
		.map(friendsName => <Friends key={friendsName.id} name={friendsName.name} />);

	const sideBarHide = () => {
		props.mobileSideBarActiveSucces(false);
	}

	return (
		<div className={s.nav_wraper}>
			<nav onClick={sideBarHide}>
				<div className={s.h} >
					<NavLink to="/profile" activeClassName={s.active}><li>Профіль</li></NavLink>
					<NavLink to="/dialogs" activeClassName={s.active}><li>Діалогі</li></NavLink>
					<NavLink to="/users" activeClassName={s.active}><li>Користувачі</li></NavLink>
					<NavLink to="/news" activeClassName={s.active}><li>Новини</li></NavLink>
					<NavLink to="/music" activeClassName={s.active}><li>Музика</li></NavLink>
					<NavLink to="/settings" activeClassName={s.active}><li>Налаштування</li></NavLink>
				</div>
				<div className={s.friendsNavBar}>
					{FriendsNameItems}
				</div>
			</nav>
		</div>
	);
};

export default NavBar;