import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";

import { finishLoading, startLoading } from "./loading";

import { requestGetUserInfo } from '../api/user'
/* Axios API */

const GET_USER = 'user/GET_USER';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';
const GET_USER_FAILURE = 'user/GET_USER_FAILURE';

const UPDATE_USER = 'user/UPDATE_USER';

const DELETE_USER = 'user/DELETE_USER';
const DELETE_USER_SUCCESS = 'user/DELETE_USER_SUCCESS';
const DELETE_USER_FAILURE = 'user/DELETE_USER_FAILURE';

export const getUser = createAction(GET_USER);
export const updateUser = createAction(UPDATE_USER, (target, value) => ({
    [target]: value
}));
export const deleteUser = createAction(DELETE_USER, token => token);

function* getUserSaga(action) {
    yield put(startLoading(GET_USER));
    try {
        const { payload: JWT_TOKEN } = action;
        const {data, status} = yield call(requestGetUserInfo, JWT_TOKEN);
        if (status === 202){
            localStorage.removeItem('user_id');
        }
        yield put({
            type: GET_USER_SUCCESS,
            payload: data
        });
    } catch (e) {
        yield put({
            type: GET_USER_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_USER));
};

function* deleteUserSaga(action) {
    yield put(startLoading(DELETE_USER));
    try {
        const { payload: JWT_TOKEN } = action;
        localStorage.removeItem('user_id');
        yield call(() => { }, JWT_TOKEN);
        yield put({
            type: DELETE_USER_SUCCESS,
        });
    } catch (e) {
        yield put({
            type: DELETE_USER_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(DELETE_USER));
};

export function* userSaga() {
    yield takeLatest(GET_USER, getUserSaga);
    yield takeLatest(DELETE_USER, deleteUserSaga);
};

const initialState = {};

const user = handleActions(
    {
        [GET_USER_SUCCESS]: (state, action) => ({
            ...state,
            ...action.payload.user
        }),
        [UPDATE_USER]: (state, action) => ({
            ...state,
            ...action.payload
        }),
        [DELETE_USER_SUCCESS]: (state, action) => ({})
    },
    initialState
);

export default user;