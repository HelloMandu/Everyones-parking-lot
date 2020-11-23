import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useModal = (url, modal, params) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const openModal = useCallback(() => {
        history.push(url + `/${params}`);
    }, [history, url, params]);
    useEffect(()=>{
        setIsOpen(modal === params);
    },[modal, params])
    return [isOpen, openModal];
};

export default useModal;
