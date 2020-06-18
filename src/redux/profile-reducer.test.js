import profileReducer, { addPost, deletePost } from './profile-reducer';

let state = {
    posts: [
        { id: 1, nick: 'Adam', post: 'Ok', likecount: 2 },
        { id: 2, nick: 'Oscar', post: 'Enjou', likecount: 5 }
    ]
};

test('length of posts should be incremented', () => {
    let action = addPost('hello');
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(3);
});


test('message of new post should be hello', () => {
    let action = addPost('hello');
    let newState = profileReducer(state, action);
    expect(newState.posts[2].post).toBe('hello');
});

test('after deleting', () => {
    let action = deletePost(1000);
    let newState = profileReducer(state, action);
    expect(newState.posts.length).toBe(2);
});