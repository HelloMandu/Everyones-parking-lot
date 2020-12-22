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
            openDialog('로그인이 필요한 서비스입니다.', "로그인을 원하시면 '예'를 눌러주세요.", () => history.replace(Paths.auth.login), true, true);
        }
    }, [history, openDialog, token])
    
    return token;
};

export default useToken;
