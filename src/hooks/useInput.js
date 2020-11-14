import { useState, useCallback } from 'react';

const useInput = (initialValue, callback) => {
    const [state, setState] = useState(initialValue);
    const [check, setCheck] = useState(false);
    const onChange = useCallback(
        (e) => {
            setState(e.target.value);
        },
        [setState],
    );
    const effect = useCallback(() => {
        if (callback !== undefined) {
            setCheck(callback(state));
        }
    }, [state, callback]);
    return [state, onChange, effect, check, setCheck];
};

export default useInput;
