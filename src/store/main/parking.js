// 주차공간 리스트 리덕스

import {createAction , handleActions} from 'redux-actions';
import { call, put, takeLatest } from "redux-saga/effects";
import { finishLoading, startLoading } from "../loading";

import {requestGetParkingList} from '../../api/place';

const GET_LIST = 'parking/GET_LIST';
const GET_LIST_SUCCESS ='parking/GET_LIST_SUCCESS';
const GET_LIST_ERROR = 'parking/GET_LIST_ERROR';


export const get_list = createAction(GET_LIST);


const initState={
    parking : []
}

function *getParkingList(action){
    yield put(startLoading(GET_LIST));
    try{
        const {lat,lng,range,filter} = action.payload;
        console.log(filter);
        const res = yield call(requestGetParkingList , lat,lng,range,filter);
        yield put({
            type: GET_LIST_SUCCESS,
            payload: res.data.places,
        });
    }
    catch(e){
        console.error(e);
        yield put({
            type: GET_LIST_ERROR,
            payload: e
        });
    }
    yield put(finishLoading(GET_LIST));

}

export function *parkingSaga(){
    yield takeLatest(GET_LIST, getParkingList);
}


const parking = handleActions(
    {
        [GET_LIST_SUCCESS] : (state,action)=>{
            return{
                ...state,
                parking : action.payload
            }
        }
    }, initState
)

export default parking;