import { stopSubmit } from "redux-form";
import { auth, securityAPI } from "../api/api";

const SET_USER_DATA = 'social-network/auth/SET_USER_DATA';
const GET_CAPTCHA_SUCCES = 'social-network/auth/GET_CAPTCHA_SUCCES';

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false,
    captchaUrl: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
        case GET_CAPTCHA_SUCCES:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    };
};

const setAuthUserData = (userId, email, login, isAuth) => ({
    type: SET_USER_DATA, payload: { userId, email, login, isAuth }
});

const getCaptchaUrlSucces = (captchaUrl) => ({ type: GET_CAPTCHA_SUCCES, payload: { captchaUrl } });

export const getAuthUserData = () => async (dispatch) => {
    let response = await auth.me();

    if (response.data.resultCode === 0) {
        let { id, email, login } = response.data.data;
        dispatch(setAuthUserData(id, email, login, true));
    };
};

export const getAuthLoginData = (email, password, rememberMe = false, captcha) => async (dispatch) => {
    let response = await auth.loginIn(email, password, rememberMe, captcha);

    if (response.data.resultCode === 0) {
        dispatch(getAuthUserData());
    } else {
        if (response.data.resultCode === 10) {
            dispatch(getCaptchaUrl());
        };
        let messages = response.data.messages.length > 0 ? response.data.messages[0] : 'Some error';
        dispatch(stopSubmit('login', { _error: messages }));
    }
};

export const getCaptchaUrl = () => async (dispatch) => {
    const response = await securityAPI.getCaptchaUrl();
    const captchaUrl = response.data.url;
    dispatch(getCaptchaUrlSucces(captchaUrl));
};

export const deleteAuthLoginData = () => async (dispatch) => {
    let response = await auth.loginOut();

    if (response.data.resultCode === 0) {
        dispatch(setAuthUserData(null, null, null, false));
    };
};

export default authReducer;