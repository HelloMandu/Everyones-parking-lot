import React, { useCallback } from 'react';
import qs from 'qs';
import { getUser } from '../store/user';
import { useDispatch } from 'react-redux';
import { Paths } from '../paths';
import { useDialog } from '../hooks/useDialog';
import { getMobileOperatingSystem } from '../lib/os';

const OAuthPage = ({ location, history }) => {
    const dispatch = useDispatch();
    const openDialog = useDialog();

    const query = qs.parse(location.search, {
        ignoreQueryPrefix: true,
    });
    const { msg, token } = query;

    const LoginOs = useCallback(JWT_TOKEN => {
        window.setToken = async token => {
            try {
                // 푸쉬 토큰 보내기
            } catch (e) {
                alert(e);
            }
        }

        const login_os = getMobileOperatingSystem();
        if (login_os === 'Android') {
            if (typeof window.myJs === 'undefined') {
                window.myJs.requestToken();
            }
        } else if (login_os === 'iOS') {
            if (typeof window.webkit !== 'undefined') {
                if (typeof window.webkit.messageHandlers !== 'undefined') {
                    window.webkit.messageHandlers.requestToken.postMessage("");
                }
            }
        }
    }, []);

    if (msg === 'success') {
        localStorage.setItem("user_id", token);
        dispatch(getUser(token));
        LoginOs(token);
        history.push(Paths.main.index);
    } else {
        openDialog('소셜 로그인에 실패하였습니다.', '잠시 후 다시 시도해 주세요.', () => history.push(Paths.auth.index));
    }

    
    return <></>;
};

export default OAuthPage;
