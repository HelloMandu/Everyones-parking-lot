//유저 필터링

import {createAction , handleActions} from 'redux-actions';

const SET_FILTERS  = 'filter/SET_FILTERS';

export const set_filters = createAction(SET_FILTERS);

const initState = {
    parking_town: true,  //주차타운
    underground_parking : true, //지하주차장
    ground_parking : true, //지상주차장
    stated_parking : true, //지정주차장
 
};


const filters = handleActions(
    {
        [SET_FILTERS] : (state,action)=>{
            const {type,value} = action.payload;
            return{
                ...state,
                [type] : value,
            }
        }
    },
    initState,
);

export default filters;