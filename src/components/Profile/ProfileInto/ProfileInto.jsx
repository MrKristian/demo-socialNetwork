import React, { useState } from 'react';
import s from './ProfileInto.module.css';
import Preloader from '../../common/Preloader/Preloader';
import nullAvatar from '../../../assets/images/nullAvatar.jpg';
import ProfileStatusWithHocks from './ProfileStatusWithHocks';
import ProfileDataForm from './ProfileDataForm';

const ProfileInto = ({ profile, status, updateStatus, isOwner, savePhoto, saveProfile, goToEditMode }) => {

	const [editMode, setEditMode] = useState(false);
	const [showChangePhotoInput, setShowChangePhotoInput] = useState(false);
	const [showProfileData, setShowProfileData] = useState(false);

	if (!profile) {
		return <Preloader />
	};

	const onMainPhotoChange = (e) => {
		if (e.target.files.length) {
			savePhoto(e.target.files[0]);
		};
	};

	const onSubmit = (formData) => {
		saveProfile(formData).then(
			() => {
				setEditMode(false);
			}
		);
	};

	const ShowChangeAvatarPhotoIntut = () => {
		if (showChangePhotoInput === true, isOwner === true) {
			return <span className={s.hiddenFileInput}>
				<p>змінити фото</p>
				<input type={'file'} onChange={onMainPhotoChange} />
			</span>
		}else{
			return null;
		}
	};

	return (
		<>
			<div className={s.profileInfo}>
				<div className={s.dataWapper}>
					<div className={s.profile_avatar}
						onMouseEnter={() => { setShowChangePhotoInput(true) }}
						onMouseLeave={() => { setShowChangePhotoInput(false) }}>
						<img src={profile.photos.large || nullAvatar} className={s.avatar} />
						{showChangePhotoInput ? <ShowChangeAvatarPhotoIntut /> : null}
					</div>
					<div className={s.nameAndStatusWrapper}>
						<h2>{profile.fullName}</h2>
						<div className={s.profileStatus} >
							<ProfileStatusWithHocks status={status} updateStatus={updateStatus} />
						</div>
						<div className={s.setShowProfileData}
							onClick={() => { setShowProfileData(true) }}
							onDoubleClick={() => { setShowProfileData(false) }}>
							<p>Показати повну інформацію</p>
						</div>
						{showProfileData && <div className={s.profileData}>
							{editMode ? <ProfileDataForm
								initialValues={profile}
								profile={profile}
								onSubmit={onSubmit} />
								: <ProfileData className={s.info}
									profile={profile}
									isOwner={isOwner}
									goToEditMode={() => { setEditMode(true) }} />}
						</div>}
					</div>
				</div>
			</div>
		</>
	);
};

const ProfileData = ({ profile, isOwner, goToEditMode }) => {
	return <div className={s.info}>
		<h3><b>Looking for a job</b>: {profile.lookingForAJob ? 'yes' : 'no'}</h3>
		{profile.lookingForAJob &&
			<div>
				<h3><b>My profesional skills</b>: {profile.lookingForAJobDescription}</h3>
			</div>}
		<p><b>About me</b> ? {profile.aboutMe}</p>
		<div>
			<b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
				return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]} />
			})}
		</div>
		<div className={s.editButton}>
			{isOwner && <button onClick={goToEditMode}>edit</button>}
		</div>
	</div>
};

export const Contact = ({ contactTitle, contactValue }) => {
	return <div className={s.contact}><b>{contactTitle}</b>: {contactValue}</div>
};

export default ProfileInto;