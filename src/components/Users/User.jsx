import React from 'react';
import nullAvatar from '../../assets/images/nullAvatar.jpg';
import { NavLink } from 'react-router-dom';
import s from './Users.module.css';

const User = ({ user, followingInProgres, unFollow, follow }) => {
    return (
        <div className={s.userWrapper}>
            <span className={s.dataWrapper}>
                <div>
                    <NavLink to={'/profile/' + user.id}>
                        <img src={user.photos.small != null
                            ? user.photos.small : nullAvatar} className={s.avatarsStyle} />
                    </NavLink>
                </div>
                <div className={s.dataWrapper}>
                    <span className={s.padding}>
                        <div>{user.name}</div>
                        <div>{user.status}</div>
                    </span>
                    <span className={s.padding}>
                        <div>{"u.location.country"}</div>
                        <div>{"u.location.city"}</div>
                    </span>
                    <div className={s.paddingA}>
                        {user.followed
                            ? <button className={s.f_button}
                                disabled={followingInProgres.some(id => id === user.id)}
                                onClick={() => { unFollow(user.id); }}>Unfollow</button>
                            : <button className={s.f_button}
                                disabled={followingInProgres.some(id => id === user.id)}
                                onClick={() => { follow(user.id); }}>Follow</button>
                        }
                    </div>
                </div>
            </span>
        </div>
    );
};

export default User;