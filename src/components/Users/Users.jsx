import React from 'react';
import User from './User';
import s from './Users.module.css';
import Paginator from '../common/Paginator/Paginator';


const Users = ({ totalItemsCount, pageSize, currentPage, onPageChanged, users, followingInProgres, follow,
    unFollow, ...props }) => {
    return <div>
        <div className={s.paginator}>
            <Paginator totalItemsCount={totalItemsCount} pageSize={pageSize}
                currentPage={currentPage} onPageChanged={onPageChanged} />
        </div>
        <div className={s.usersWraper}>
            {users.map(u => <User user={u} followingInProgres={followingInProgres}
                unFollow={unFollow} follow={follow} key={u.id} />)}
        </div>
    </div>
};

export default Users;