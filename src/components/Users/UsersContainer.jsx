import React from 'react';
import { connect } from "react-redux";
import { followSuccess, unfollowSuccess, setCurrentPage, toggleFethingProgres, requestUsers, unFollow, follow } from "../../redux/users-reducer";
import Users from "./Users";
import Preloader from '../common/Preloader/Preloader';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { getUsers, getPageSize, getTotalUsersCount, getCurrentPage, getIsFething, getFollowingInProgres } from '../../redux/users-selectors';

class UserContainer extends React.Component {
    componentDidMount () {
        const { currentPage, pageSize } = this.props;
        this.props.getUsers(currentPage, pageSize);
    };

    onPageChanged = (pageNumber) => {
        const { pageSize } = this.props;
        this.props.getUsers(pageNumber, pageSize);
    };
    render() {
        return <>
            {this.props.isFething ? <Preloader /> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPageChanged={this.onPageChanged}
                users={this.props.users}
                unFollow={this.props.unFollow}
                follow={this.props.follow}
                followingInProgres={this.props.followingInProgres} />
        </>
    };
};

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalItemsCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFething: getIsFething(state),
        followingInProgres: getFollowingInProgres(state)
    };
};

export default compose(
    withAuthRedirect,
    connect(mapStateToProps, {
        followSuccess, unfollowSuccess, setCurrentPage,
        toggleFethingProgres, getUsers: requestUsers, unFollow,
        follow
    })
)(UserContainer);