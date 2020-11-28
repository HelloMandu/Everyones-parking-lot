//유저 포지션

import {createAction , handleActions} from 'redux-actions';
const SET_POSITION  = 'position/SET_POSITION';
const SET_LEVEL = 'position/SET_LEVEL';
const SET_ADDRESSS ='position/ADDRESS';
const SET_ARRIVE ='position/ARRIVE';


export const set_position = createAction(SET_POSITION);
export const set_level = createAction(SET_LEVEL);
export const set_address = createAction(SET_ADDRESSS);
export const set_arrive = createAction(SET_ARRIVE);


const initState = {
    position :{
        lat : 0,
        lng : 0,
    },
    arrive :{
        lat :0,
        lng : 0
    },
    address :null,

    level : 0,
 
};


const position = handleActions(
    {
        [SET_POSITION]: (state, action) => {
            return{
                ...state,
                position: action.payload,
            }
        },
        [SET_LEVEL]: (state, action) => {
            return{
                ...state,
                level: action.payload,
            }
        },
        [SET_ADDRESSS] : (state,action) =>{
            return{
                ...state,
                address: action.payload,
            }
        },
        [SET_ARRIVE] : (state,action) =>{
            return{
                ...state,
                arrive: action.payload,
            }
        }
    },
    initState,
);

export default position;