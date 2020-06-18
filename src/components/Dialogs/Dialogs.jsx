import React, { useState } from 'react';
import Dialog from './Dialog/Dialog';
import s from './Dialogs.module.css';
import Message from './Messages/Messages';
import { AddMessageFormRedux } from './AddMessageForm';
import leftImg from '../../assets/images/arrowLeft.png';

const Dialogs = (props) => {

	const [hideDialogs, setHideDialogs] = useState(false);

	let DialogItem = props.dialogData.dialogData
		.map(dialog => <Dialog key={dialog.id} name={dialog.name} id={dialog.id} setHideDialogs={setHideDialogs} />);

	let MessageItems = props.dialogData.messageData
		.map(message => <Message key={message.id} message={message.message} />);

	let addNewMessage = (values) => {
		props.addMessage(values.newMessageBody)
	};

	return <div className={s.dialog_wrapper}>
		{hideDialogs ? <div className={s.message}>
			<div onClick={() => { setHideDialogs(false) }}>
				<img src={leftImg} />
			</div>
			{MessageItems}
			<AddMessageFormRedux onSubmit={addNewMessage} />
		</div>
			: <div className={s.dialog}>
				{DialogItem}
			</div>}
	</div>
};

export default Dialogs;