import React from 'react';
import s from './Posts.module.css';
import MyPosts from './MyPosts/MyPosts';
import { reduxForm, Field } from 'redux-form';
import { requiredValidator, maxLenghtCreator } from '../../../utils/validators/validators';
import { Textarea } from '../../common/FormsControls/FormsControls';

const maxLenght = maxLenghtCreator(50);

const AddNewPost = (props) => {
	return (
		<form onSubmit={props.handleSubmit} >
			<div className={s.textArea}>
				<Field component={Textarea} name='newPostBody' validate={[requiredValidator, maxLenght]}
					className={s.post} />
				<button className={s.postButton}>Додати пост</button>
			</div>
		</form>
	);
};

const AddNewPostRedux = reduxForm({ form: 'postAddMessageForm' })(AddNewPost);

const Posts = React.memo((props) => {
	let PostsElements = props.posts
		.map(post => <MyPosts key={post.id} post={post.post} like={post.likecount} nick={post.nick} />);

	let addPostItem = (value) => {
		props.addPost(value.newPostBody);
	};

	return (
		<div className={s.profile_s}>
			<div>
				<AddNewPostRedux onSubmit={addPostItem} />
			</div>
			<div>
				{PostsElements}
			</div>
		</div>
	);
});

export default Posts;