import { getAuthUserData } from "./auth-reducer";

const INITIALAZED_SUCCESS = 'INITIALAZED_SUCCESS';
const GLOBAL_ERROR = 'GLOBAL_ERROR';
const MOBILE_SIDE_BAR_ACTIVE = 'MOBILE_SIDE_BAR_ACTIVE';

let initialState = {
    initialazed: false,
    globalError: null,
    mobileSideBarActive: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITIALAZED_SUCCESS:
            return {
                ...state,
                initialazed: true
            };
        case GLOBAL_ERROR:
            return { ...state, globalError: action.error };
        case MOBILE_SIDE_BAR_ACTIVE:
            return { ...state, mobileSideBarActive: action.active };
        default:
            return state;
    };
};

const initialazedSuccess = () => ({ type: INITIALAZED_SUCCESS });
const globalErrorSuccess = (error) => ({ type: GLOBAL_ERROR, error });
export const mobileSideBarActiveSucces = (active) => ({ type: MOBILE_SIDE_BAR_ACTIVE, active });

export const initialazeApp = () => (dispatch) => {
    let promise = dispatch(getAuthUserData());
    Promise.all([promise]).then(() => {
        dispatch(initialazedSuccess());
    });
};

export const globalError = (error) => (dispatch) => {
    dispatch(globalErrorSuccess(error));
    setTimeout(() => {
        dispatch(globalErrorSuccess(null));
    }, 5000);
};

export default appReducer;