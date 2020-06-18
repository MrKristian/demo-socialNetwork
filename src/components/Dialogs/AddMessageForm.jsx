import React from 'react';
import s from './Dialogs.module.css';
import { Field, reduxForm } from 'redux-form';
import { requiredValidator, maxLenghtCreator } from '../../utils/validators/validators';
import { Textarea } from '../common/FormsControls/FormsControls';

const maxLenght50 = maxLenghtCreator(50);

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<div className={s.text_items}>
				<div className={s.messageFormWrapper}>
					<Field component={Textarea} name='newMessageBody'
						validate={[requiredValidator, maxLenght50]} className={s.messageForm} />
				</div>
				<div>
					<button className={s.messageFormButton}>Надіслати</button>
				</div>
			</div>
		</form>
	);
};

export const AddMessageFormRedux = reduxForm({ form: 'dialogAddMessageForm' })(AddMessageForm);