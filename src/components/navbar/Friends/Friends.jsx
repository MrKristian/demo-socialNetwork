import React from 'react';
import s from './Friends.module.css'

const Friends = (props) => {
	return(
		<div className={s.friendsItem}>
			<img src="https://img.devrant.com/devrant/rant/r_1973645_LFf2y.jpg" />
            <h5>{props.name}</h5>
		</div>
	);
};

export default Friends;