import { profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";
import { globalError } from "./app-reducer";

const ADD_POST = 'ADD-POST';
const SET_USER_PROFILE = 'SET-USER-PROFILE';
const SET_STATUS = 'SET_STATUS';
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO_SUCCESS = 'SET_PHOTO_SUCCESS';

let initialState = {
    posts: [
        { id: 1, nick: 'Adam', post: 'Ok', likecount: 2 },
        { id: 2, nick: 'Oscar', post: 'Enjou', likecount: 5 }
    ],
    profile: null,
    status: ''
};

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST:
            const newPost = {
                nick: 'Mark',
                post: action.newPostBody,
                likecount: 0
            };
            return {
                ...state,
                posts: [...state.posts, newPost],
                newPostText: ''
            };
        case DELETE_POST:
            return { ...state, posts: state.posts.filter(p => p.id != action.postId) }
        case SET_USER_PROFILE:
            return { ...state, profile: action.profile };
        case SET_STATUS:
            return { ...state, status: action.status };
        case SET_PHOTO_SUCCESS:
            return { ...state, profile: { ...state.profile, photos: action.photos } };
        default:
            return state;
    };
};

const setUserProfile = (profile) => ({ type: SET_USER_PROFILE, profile });
export const addPost = (newPostBody) => ({ type: ADD_POST, newPostBody });
export const deletePost = (postId) => ({ type: DELETE_POST, postId });
export const setStatus = (status) => ({ type: SET_STATUS, status });
export const savePhotoSuccess = (photos) => ({ type: SET_PHOTO_SUCCESS, photos });

export const getProfile = (userId) => async (dispatch) => {
    let response = await profileAPI.getProfile(userId);

    dispatch(setUserProfile(response.data));
};

export const getStatus = (userId) => async (dispatch) => {
    let response = await profileAPI.getStatus(userId);

    dispatch(setStatus(response.data));
};

export const updateStatus = (status) => async (dispatch) => {
    try {
        let response = await profileAPI.updateStatus(status);

        if (response.data.resultCode === 0) {
            dispatch(setStatus(status));
        }
    } catch(error) {
        dispatch(globalError(error));
    }
};

export const savePhoto = (file) => async (dispatch) => {
    let response = await profileAPI.savePhoto(file);

    if (response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos));
    };
};

export const saveProfile = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfile(profile);

    if (response.data.resultCode === 0) {
        dispatch(getProfile(userId));
    } else {
        dispatch(stopSubmit('editProfile', { _error: response.data.messages[0].split(' ') }));
        return Promise.reject(response.data.messages[0]);
    };
};

export default profileReducer;