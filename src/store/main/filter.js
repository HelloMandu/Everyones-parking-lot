//유저 필터링

import {createAction , handleActions} from 'redux-actions';

const SET_FILTER  = 'filter/SET_FILTER';

export const set_filter = createAction(SET_FILTER);

const initState = {
    parking_town: true,  //주차타운
    underground_parking : true, //지하주차장
    ground_parking : true, //지상주차장
    ground_parking : true,  //지상주차장
    stated_parking : true, //지정주차장
 
};


const filter = handleActions(
    {
        [SET_FILTER] : (state,action)=>{
            return{
                ...state,
                [action.type] : action.payload,
            }
        }
    },
    initState,
);

export default filter;