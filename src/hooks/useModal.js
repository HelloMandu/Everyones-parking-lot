import { useState, useEffect, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

const useModal = (url, modal, pushUrl) => {
    const history = useHistory();
    const [isOpen, setIsOpen] = useState(false);
    const paramQuery = pushUrl.split('?');
    const params = paramQuery[0];
    const openModal = useCallback(() => {
        const URL = `${url}/${params}`;
        if(paramQuery.length > 1){
            history.push(URL + `?${paramQuery[1]}`);
        }
        else{
            history.push(URL);
        }
    }, [history, url, params, paramQuery]);
    useEffect(()=>{
        setIsOpen(modal === params);
    },[modal, params])
    return [isOpen, openModal];
};

export default useModal;
