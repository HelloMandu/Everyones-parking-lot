import React from 'react';
import qs from 'qs';
import { getUser } from '../store/user';
import { useDispatch } from 'react-redux';
import { Paths } from '../paths';
import { useDialog } from '../hooks/useDialog';

const OAuthPage = ({ location, history }) => {
    const dispatch = useDispatch();
    const openDialog = useDialog();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { msg, token } = query;
    if (msg === 'success') {
        localStorage.setItem("user_id", token);
        dispatch(getUser(token));
        history.push(Paths.main.index);
    } else {
        openDialog('소셜 로그인에 실패하였습니다.', '잠시 후 다시 시도해 주세요.', () => history.push(Paths.auth.index));
    }
    return <></>;
};

export default OAuthPage;
