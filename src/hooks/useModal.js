import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useModal = (url, list) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => {
        history.push(url);
    }, [history, url]);
    useEffect(() => {
        let open;
        if (list !== undefined) {
            open = list.reduce(
                (prev, cur) => prev || history.location.pathname === cur,
                false,
            );
        } else {
            open = history.location.pathname === url;
        }
        setIsOpen(open);
    }, [history.location.pathname, url, list]);
    return [isOpen, openModal];
};

export default useModal;
