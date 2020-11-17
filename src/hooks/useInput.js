import { useState, useCallback } from 'react';

const useInput = (initialValue, callback) => {
    const [state, setState] = useState(initialValue);
    const [check, setCheck] = useState(false);
    const onChange = useCallback(
        (e) => {
            setState(e.target.value);
            if (callback !== undefined) {
                setCheck(callback(e.target.value));
            }
        },
        [setState, callback],
    );
    return [state, onChange, check, setCheck];
};

export default useInput;