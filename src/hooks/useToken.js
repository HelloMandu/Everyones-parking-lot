import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { useDialog } from './useDialog';

import { Paths } from '../paths';

const useToken = () => {
    const history = useHistory();
    const openDialog = useDialog();
    const token = localStorage.getItem('user_id');

    useEffect(() => {
        if (token === null) {
            openDialog('로그인이 필요합니다.', '', () => history.push(Paths.auth.login), false, true);
        }
    }, [history, openDialog, token])
    
    return token;
};

export default useToken;
