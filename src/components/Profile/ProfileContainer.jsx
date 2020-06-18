import React from 'react';
import Profile from './Profile';
import { connect } from 'react-redux';
import { getProfile, getStatus, updateStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {

	profileData() {
		let userId = this.props.match.params.userId;
		if (!userId) {
			userId = this.props.authUserId;
			if (!userId) {
				this.props.history.push('/login');
			}
		};
		this.props.getProfile(userId);
		this.props.getStatus(userId);
	};

	componentDidMount() {
		this.profileData();
	};

	componentWillUpdate(prevProps) {
		if (this.props.match.params.userId != prevProps.match.params.userId) {
			this.profileData();
		};
	};

	render() {
		return <Profile {...this.props}
			isOwner={!this.props.match.params.userId}
			profile={this.props.profile}
			status={this.props.status}
			updateStatus={this.props.updateStatus}
			savePhoto={this.props.savePhoto}
			saveProfile={this.props.saveProfile} />			
	};
};

let mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authUserId: state.auth.userId,
	isAuth: state.auth.isAuth
});

export default compose(
	connect(mapStateToProps, { getProfile, getStatus, updateStatus, savePhoto, saveProfile }),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
