import React from 'react';
import { createField, Input, Textarea } from '../../common/FormsControls/FormsControls';
import { reduxForm } from 'redux-form';
import s from './ProfileInto.module.css';
import styles from '../../common/FormsControls/FormsControls.module.css';

const ProfileDataForm = ({ handleSubmit, profile, error }) => {
    return <form onSubmit={handleSubmit}>
        <div>
            <button>save</button>
            {error && <div className={styles.formSummaryError}>
                {error}
            </div>}
        </div>
        <b>Full name</b>: {createField("Full name", "fullName", Input)}
        <b>Looking for a job</b>: {createField("", "lookingForAJob", Input, [], { type: 'checkbox' })}
        <b>My profesional skills</b>: {createField("My profesional skills", "lookingForAJobDescription", Textarea)}
        <b>About me</b> ? {createField("About me", "aboutMe", Input)}
        <div>
            <b>Contacts: </b> {Object.keys(profile.contacts).map(key => {
                return <div className={s.contact} key={key}>
                    <b>{key}:{createField(key, "contacts." + key, Input)}</b>
                </div>
            })}
        </div>
    </form>
};

const ProfileDataFormRedux = reduxForm({ form: 'editProfile' })(ProfileDataForm);

export default ProfileDataFormRedux;