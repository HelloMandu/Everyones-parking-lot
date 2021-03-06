import { useEffect, useRef } from 'react';

const useInterval = (callback, delay) => {
    const savedCallback = useRef();
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
        if (delay !== 0) {
            const interval = setInterval(() => savedCallback.current(), delay);
            return () => clearInterval(interval);
        }
    }, [delay]);
};

export default useInterval;
