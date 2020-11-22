import { useReducer, useCallback } from 'react';

const reducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value,
    };
};

const useForm = (initialForm, limit) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const onChange = useCallback((e) => {
        if(limit !== undefined){
            if(e.target.value.length > limit){
                return;
            }
        }
        dispatch(e.target);
    }, [limit]);
    return [state, onChange];
};

export default useForm;