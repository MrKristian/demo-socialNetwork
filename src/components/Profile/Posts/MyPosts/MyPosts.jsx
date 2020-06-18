import React from 'react';
import s from './MyPosts.module.css';
import likeImg from '../../../../assets/images/likeImg.png';

const MyPosts = (props) => {
	return <div className={s.info}>
		<div className={s.infoItems}>
			<img src='https://i.pinimg.com/736x/4a/bc/c0/4abcc00427dbb86ee5da8270b52204f8.jpg' className={s.infoImg} />
			<div className={s.info_text}>
				<h4>{props.nick}</h4>
				<p>{props.post}</p>
				<p>{props.likecount}</p>
				<img src={likeImg} className={s.infoLikesImg} />
			</div>
		</div>

	</div>
};

export default MyPosts;