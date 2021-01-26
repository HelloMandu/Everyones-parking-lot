import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useModal = (url, modal, pushUrl) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const paramQuery = pushUrl.split('?');
    const params = paramQuery[0];
    const handleModal = useCallback(() => {
        if (!isOpen) {
            const URL = `${url}/${params}`;
            if (paramQuery.length > 1) {
                history.push(URL + `?${paramQuery[1]}`);
            }
            else {
                history.push(URL);
            }
        } else {
            history.goBack();
        }
    }, [isOpen, url, params, paramQuery, history]);
    useEffect(() => {
        setIsOpen(modal === params);
    }, [modal, params])
    return [isOpen, handleModal];
};

export default useModal;
