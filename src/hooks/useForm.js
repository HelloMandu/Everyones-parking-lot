import { useReducer, useCallback, useState, useEffect } from 'react';

const reducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value,
    };
};

const useForm = (initialForm, limit) => {
    const [state, dispatch] = useReducer(reducer, initialForm);
    const [check, setCheck] = useState(false);
    const onChange = useCallback(
        (e) => {
            if (limit !== undefined) {
                if (e.target.value.length > limit) {
                    return;
                }
            }
            dispatch(e.target);
        },
        [limit],
    );
    useEffect(() => {
        const formatCheck = Object.values(state).reduce((prev, cur) => prev && cur.length === limit, true);
        setCheck(formatCheck);
    }, [limit, state]);
    return [state, onChange, check];
};

export default useForm;
