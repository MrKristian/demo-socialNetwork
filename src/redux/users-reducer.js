import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers";

let FOLLOW = 'FOLLOW';
let UNFOLLOW = 'UNFOLLOW';
let SET_USERS = 'SET_USERS';
let SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
let SET_TOTAL_COUNT = 'SET_TOTAL_COUNT';
let TOGGLE_IS_FETHING = 'TOGGLE_IS_FETHING';
let TOGGLE_IS_FOLLOWIN_PROGRES = 'TOGGLE_IS_FOLLOWIN_PROGRES';

let initialState = {
    users: [],
    pageSize: 10,
    totalUsersCount: 10,
    currentPage: 1,
    isFething: false,
    followingInProgres: []
};

const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: true })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", { followed: false })
            };
        case SET_USERS: {
            return { ...state, users: action.users };
        };
        case SET_CURRENT_PAGE: {
            return { ...state, currentPage: action.currentPage };
        };
        case SET_TOTAL_COUNT: {
            return { ...state, totalUsersCount: action.totalCount };
        };
        case TOGGLE_IS_FETHING: {
            return { ...state, isFething: action.isFething };
        };
        case TOGGLE_IS_FOLLOWIN_PROGRES: {
            return {
                ...state,
                followingInProgres: action.isFething
                    ? [...state.followingInProgres, action.userId]
                    : state.followingInProgres.filter(id => id != action.userId)
            }
        };
        default:
            return state;
    };
};

export const followSuccess = (userId) => ({ type: FOLLOW, userId });
export const unfollowSuccess = (userId) => ({ type: UNFOLLOW, userId });
export const setUsers = (users) => ({ type: SET_USERS, users });
export const setCurrentPage = (currentPage) => ({ type: SET_CURRENT_PAGE, currentPage });
export const setTotalCount = (totalCount) => ({ type: SET_TOTAL_COUNT, totalCount });
export const toggleIsFething = (isFething) => ({ type: TOGGLE_IS_FETHING, isFething });
export const toggleFethingProgres = (isFething, userId) => ({ type: TOGGLE_IS_FOLLOWIN_PROGRES, isFething, userId });

export const requestUsers = (page, pageSize) => async (dispatch) => {
    dispatch(toggleIsFething(true));
    dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFething(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalCount(data.totalCount));
};

const followUnfollowFlow = async (dispatch, userId, apiMethod, actionCreator) => {
    dispatch(toggleFethingProgres(true, userId));

    let response = await apiMethod(userId);

    if (response.data.resultCode === 0) {
        dispatch(actionCreator(userId));
    };
    dispatch(toggleFethingProgres(false, userId));
};

export const follow = (userId) => async (dispatch) => {

    followUnfollowFlow(dispatch, userId, usersAPI.follow.bind(userId), followSuccess);
};

export const unFollow = (userId) => async (dispatch) => {

    followUnfollowFlow(dispatch, userId, usersAPI.unFollow, unfollowSuccess);
};

export default usersReducer;