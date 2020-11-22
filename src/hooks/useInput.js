import { useState, useCallback } from 'react';

const useInput = (initialValue = '', callback, limit) => {
    const [state, setState] = useState(initialValue);
    const [check, setCheck] = useState(false);
    const onChange = useCallback(
        (e) => {
            if(limit !== undefined){
                if(e.target.value.length > limit){
                    return;
                }
            }
            setState(e.target.value);
            if (callback !== undefined) {
                setCheck(callback(e.target.value));
            }
        },
        [setState, callback, limit],
    );
    return [state, onChange, check, setCheck];
};

export default useInput;