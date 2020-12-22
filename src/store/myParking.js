// 내 주차공간

import { createAction, handleActions } from 'redux-actions';
import { call, put, takeLatest } from 'redux-saga/effects';
import { finishLoading, startLoading } from './loading';

import { requestGetMyParkingList } from '../api/place';

const GET_PARKING_LIST = 'myParking/GET_LIST';
const GET_PARKING_LIST_SUCCESS = 'myParking/GET_LIST_SUCCESS';
const GET_PARKING_LIST_ERROR = 'myParking/GET_LIST_ERROR';

const FETCH_LIST = 'myParking/FETCH_LIST';

const UPDATE_ITEM = 'myParking/UPDATE_ITEM';

const DELETE_PARKING_LIST = 'myParking/DELETE_LIST'

export const getMyParkingList = createAction(
    GET_PARKING_LIST,
    (JWT_TOKEN) => JWT_TOKEN,
);
export const fetchMyParkingList = createAction(
    FETCH_LIST,
    (parkingList) => parkingList,
);

export const updateMyParkingItem = createAction(
    UPDATE_ITEM,
    (parkingInfo) => parkingInfo,
);

export const deleteMyParkingList = createAction(DELETE_PARKING_LIST)

function* getMyAllParkingList(action) {
    yield put(startLoading(GET_PARKING_LIST));
    try {
        const JWT_TOKEN = action.payload;
        const { places } = yield call(requestGetMyParkingList, JWT_TOKEN);
        const fetchData = places.slice(0, 3);
        console.log(places);
        console.log(fetchData);
        yield put({
            type: GET_PARKING_LIST_SUCCESS,
            payload: { places, fetchData },
        });
    } catch (e) {
        console.error(e);
        yield put({
            type: GET_PARKING_LIST_ERROR,
            payload: e,
        });
    }
    yield put(finishLoading(GET_PARKING_LIST));
}

export function* myParkingSaga() {
    yield takeLatest(GET_PARKING_LIST, getMyAllParkingList);
}

const initialState = {
    myAllParkingList: [],
    myParkingList: [],
};

const myParking = handleActions(
    {
        [GET_PARKING_LIST_SUCCESS]: (state, { payload }) => {
            return {
                myAllParkingList: payload.places,
                myParkingList: payload.fetchData,
            };
        },
        [FETCH_LIST]: (state, action) => {
            return {
                ...state,
                myParkingList: state.myParkingList.concat(action.payload),
            };
        },
        [UPDATE_ITEM]: (state, { payload: parkingInfo }) => {
            return {
                ...state,
                myParkingList: state.myParkingList.map((parking) =>
                    parking.place_id === parkingInfo.place_id
                        ? {
                              ...parkingInfo,
                              rental_orders: parking.rental_orders,
                          }
                        : parking,
                ),
            };
        },
        [DELETE_PARKING_LIST]: () => initialState
    },
    initialState,
);

export default myParking;
