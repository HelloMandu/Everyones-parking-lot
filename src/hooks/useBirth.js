import { useReducer } from 'react';

const reducer = (state, action) => {
    return {
        ...state,
        [action.name]: action.value,
    };
};

const useBirth = (initialForm) => {
    const [state, dispatch] = useReducer(reducer, initialForm);

    const onChange = (e) => {
        dispatch(e.target);
    };

    const getBirth = () => {
        return `${state.year}/${state.month}/${state.day}`
    }

    return [onChange, getBirth];
};

export default useBirth;
