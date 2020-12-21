// 내 주차공간

import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';

import { requestGetMyParkingList } from '../api/place';

const GET_LIST = 'myParking/GET_LIST';
const GET_LIST_SUCCESS = 'myParking/GET_LIST_SUCCESS';
const GET_LIST_ERROR = 'myParking/GET_LIST_ERROR';

const FETCH_LIST = 'myParking/FETCH_LIST';

export const getMyParkingList = createAction(
    GET_LIST,
    (JWT_TOKEN) => JWT_TOKEN,
);
export const fetchMyParkingList = createAction(
    FETCH_LIST,
    (parkingList) => parkingList,
);

function* getMyAllParkingList(action) {
    yield put(startLoading(GET_LIST));
    try {
        const JWT_TOKEN = action.payload;
        const { places } = yield call(requestGetMyParkingList, JWT_TOKEN);
        const fetchData = places.slice(0, 3);
        yield put({
            type: GET_LIST_SUCCESS,
            payload: places,
        });
        yield put({
            type: FETCH_LIST,
            payload: fetchData,
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_LIST_ERROR,
            payload: e,
        });
    }
    yield put(finishLoading(GET_LIST));
}

export function* myParkingSaga() {
    yield takeLatest(GET_LIST, getMyAllParkingList);
}

const initialState = {
    myAllParkingList: [],
    myParkingList: [],
};

const myParking = handleActions(
    {
        [GET_LIST_SUCCESS]: (state, action) => {
            return {
                ...state,
                myAllParkingList: action.payload,
            };
        },
        [FETCH_LIST]: (state, action) => {
            return {
                ...state,
                myParkingList: state.myParkingList.concat(action.payload),
            };
        },
    },
    initialState,
);

export default myParking;
