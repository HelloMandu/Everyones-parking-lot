import {createAction , handleActions} from 'redux-actions';

const SET_POSITION  = 'position/SET_POSITION';
const SET_LEVEL = 'position/SET_LEVEL';


export const set_position = createAction(SET_POSITION);

export const set_level = createAction(SET_LEVEL);

const initState = {
    position :{
        lat : 0,
        lng : 0,
    },
    level : 0,
};


const user_position = handleActions(
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
    },
    initState,
);

export default user_position;