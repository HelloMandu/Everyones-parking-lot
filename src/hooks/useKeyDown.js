import { useCallback, useRef } from 'react';

const useKeyDown = (onClick) => {
    const focus = useRef(null);
    const onKeyDown = useCallback(
        (e) => {
            if (e.key === 'Enter') {
                onClick();
            }
        },
        [onClick],
    );
    return [focus, onKeyDown];
};

export default useKeyDown;
