import React from 'react';
import s from './Profile.module.css';
import ProfileInto from './ProfileInto/ProfileInto';
import PostsContainer from './Posts/PostsContainer';


const Profile = (props) => {
	return (
		<div className={s.profile}>
			<ProfileInto saveProfile={props.saveProfile}
				savePhoto={props.savePhoto}
				isOwner={props.isOwner}
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus} />
			<PostsContainer />
		</div>
	);
};

export default Profile;