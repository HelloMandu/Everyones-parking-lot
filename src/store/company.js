import { createAction, handleActions } from "redux-actions";
import { call, put, takeLatest } from "redux-saga/effects";

import { finishLoading, startLoading } from "./loading";

import { requestGetAppInfo } from '../api/info'
/* Axios API */

const GET_COMPANY = 'user/GET_COMPANY';
const GET_COMPANY_SUCCESS = 'user/GET_COMPANY_SUCCESS';
const GET_COMPANY_FAILURE = 'user/GET_COMPANY_FAILURE';

export const getCompany = createAction(GET_COMPANY);

function* getCompanySaga(action) {
    yield put(startLoading(GET_COMPANY));
    try {
        const { payload: JWT_TOKEN } = action;
        const { data } = yield call(requestGetAppInfo, JWT_TOKEN);
        yield put({
            type: GET_COMPANY_SUCCESS,
            payload: data.info
        });
    } catch (e) {
        yield put({
            type: GET_COMPANY_FAILURE,
            payload: e,
            error: true
        });
    }
    yield put(finishLoading(GET_COMPANY));
};


export function* companySaga() {
    yield takeLatest(GET_COMPANY, getCompanySaga);
};

const initialState = {};

const company = handleActions(
    {
        [GET_COMPANY_SUCCESS]: (state, action) => ({
            ...state,
            ...action.payload
        }),
    },
    initialState
);

export default company;