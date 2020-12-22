//유저 포지션

import { createAction, handleActions } from 'redux-actions';
import { call, put, delay, takeLatest } from "redux-saga/effects";
import { requsetGetAreaInfo } from '../../api/place';
import { areaFormat } from '../../lib/place';
const SET_POSITION = 'position/SET_POSITION';
const SET_LEVEL = 'position/SET_LEVEL';
const SET_ADDRESSS = 'position/SET_ADDRESSS';
const SET_ARRIVE = 'position/SET_ARRIVE';

const GET_AREA = 'position/GET_AREA';
const GET_AREA_SUCCESS = 'position/GET_AREA_SUCCESS';
const GET_AREA_ERROR = 'position/GET_AREA_ERROR';


export const set_position = createAction(SET_POSITION);
export const set_level = createAction(SET_LEVEL);
export const set_address = createAction(SET_ADDRESSS);
export const set_arrive = createAction(SET_ARRIVE);
export const get_area = createAction(GET_AREA);

const initState = {
    position: {
        lat: 0,
        lng: 0,
    },
    arrive: {
        lat: 0,
        lng: 0
    },

    address: null,
    area: null,
    level: 0,
};

function* getArea(action) {
    try {
        const { lat, lng } = action.payload;
        yield delay(1000);
        const res = yield call(requsetGetAreaInfo, lat, lng);
        const area = areaFormat(res.data.documents[0].address.region_1depth_name);
        yield put({
            type: GET_AREA_SUCCESS,
            payload: area
        });

    }
    catch (e) {
        yield put({
            type: GET_AREA_ERROR,
            payload: e,
        })
    }
}

export function* areaSaga() {
    yield takeLatest(GET_AREA, getArea);
}


const position = handleActions(
    {
        [SET_POSITION]: (state, action) => {
            return {
                ...state,
                position: action.payload,
            }
        },
        [SET_LEVEL]: (state, action) => {
            return {
                ...state,
                level: action.payload,
            }
        },
        [SET_ADDRESSS]: (state, action) => {
            return {
                ...state,
                address: action.payload,
            }
        },
        [SET_ARRIVE]: (state, action) => {
            return {
                ...state,
                arrive: action.payload,
            }
        },
    
        [GET_AREA_SUCCESS]: (state, action) => {
            return {
                ...state,
                area: action.payload
            }
        },
   
    },
    initState,
);

export default position;